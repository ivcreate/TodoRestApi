import { Pool } from "pg";

class TodoModel{
    private db_connect: Pool;
    private res: any;

    constructor(pool: Pool){
        this.db_connect = pool;
    }

    public async get(id: Number): Promise<object>{
        this.res = await this.db_connect.query("SELECT create_user_id, assigned_user_id, title, text, update_at FROM todo WHERE id = $1 AND delete = 'f'",[id]);
        return this.res.rows[0];
    }

    public async insert(create_user_id: Number, assigned_user_id: Number, title: String, text: String): Promise<number>{
        const add_at: Date = new Date();
        this.res = await this.db_connect.query(`INSERT INTO todo
        (create_user_id, assigned_user_id, title, text, add_at, update_at)
        VALUES 
        ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [create_user_id, assigned_user_id, title, text, add_at, add_at]);
        return this.res.rows[0].id;
    }

    public async update(id: number, title: string, text: string): Promise<void>{
        await this.db_connect.connect()
        .then(async client => {
            const update_at: Date = new Date();
            await client.query(`UPDATE todo 
                SET title = $1, text = $2, update_at = $3
                WHERE id = $4`,
                [title, text, update_at, id])
                .then(result => {
                    if(result.rowCount != 1){
                        client.release();
                        throw new Error('Failed update');
                    }
                });
            client.release();
        });
    }

    public async delete(id: number): Promise<void>{
        await this.db_connect.connect()
        .then(async client => {
            const update_at: Date = new Date();
            await client.query(`UPDATE todo 
                SET delete = 't', update_at = $1
                WHERE id = $2`,
                [update_at, id])
                .then(result => {
                    if(result.rowCount != 1){
                        client.release();
                        throw new Error('Failed delete');
                    }
                });
            client.release();
        });
    }

    public migration(): void{
        const table_add: string = `CREATE TABLE todo (
            id serial PRIMARY KEY,
            create_user_id INT NOT NULL,
            assigned_user_id INT NOT NULL,
            title VARCHAR (50) NOT NULL,
            text TEXT NOT NULL,
            delete BOOLEAN DEFAULT false NOT NULL,
            add_at TIMESTAMP,
            update_at TIMESTAMP
        );`;

        this.db_connect.connect()
        .then(client => {
            return client
                .query(table_add)
                .catch(err => {
                    if(err.message.indexOf('already exists') === -1)
                        throw err;
            }).finally(() => client.release())
        })
        .catch(err => {
            throw err;
        });
    }
}

export default TodoModel;