"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TodoModel {
    constructor(pool) {
        this.db_connect = pool;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.res = yield this.db_connect.query("SELECT create_user_id, assigned_user_id, title, text, update_at FROM todo WHERE id = $1 AND delete = 'f'", [id]);
            return this.res.rows[0];
        });
    }
    insert(create_user_id, assigned_user_id, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const add_at = new Date();
            this.res = yield this.db_connect.query(`INSERT INTO todo
        (create_user_id, assigned_user_id, title, text, add_at, update_at)
        VALUES 
        ($1, $2, $3, $4, $5, $6) RETURNING id`, [create_user_id, assigned_user_id, title, text, add_at, add_at]);
            return this.res.rows[0].id;
        });
    }
    update(id, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db_connect.connect()
                .then((client) => __awaiter(this, void 0, void 0, function* () {
                const update_at = new Date();
                yield client.query(`UPDATE todo 
                SET title = $1, text = $2, update_at = $3
                WHERE id = $4`, [title, text, update_at, id])
                    .then(result => {
                    if (result.rowCount != 1) {
                        client.release();
                        throw new Error('Failed update');
                    }
                });
                client.release();
            }));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db_connect.connect()
                .then((client) => __awaiter(this, void 0, void 0, function* () {
                const update_at = new Date();
                yield client.query(`UPDATE todo 
                SET delete = 't', update_at = $1
                WHERE id = $2`, [update_at, id])
                    .then(result => {
                    if (result.rowCount != 1) {
                        client.release();
                        throw new Error('Failed delete');
                    }
                });
                client.release();
            }));
        });
    }
    migration() {
        const table_add = `CREATE TABLE todo (
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
                if (err.code !== "42P07")
                    throw err;
            }).finally(() => client.release());
        })
            .catch(err => {
            throw err;
        });
    }
}
exports.default = TodoModel;
