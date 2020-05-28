import pool from "../db_connect";
import Model from "./model";

class Todo {
    private model: Model;

    constructor(){
        this.model = new Model(pool);
    }

    public migration(){
        this.model.migration();
    }

    public async get(id: number): Promise<object>{
        id = this.validNumber('id',id);
        const result = await this.model.get(id);
        if(result)
            return result;
        else
            return {result: 'empty'};
    }

    public async add(create_user_id: number, assigned_user_id: number, title: string, text: string): Promise<number>{
        create_user_id = this.validNumber('create_user_id', create_user_id);
        assigned_user_id = this.validNumber('assigned_user_id', assigned_user_id);
        title = this.validText('title', title);
        text = this.validText('text', text);
        const add_id: number = await this.model.insert(create_user_id,assigned_user_id,title,text);
        return add_id;
    }

    public async update(id: number, title: string, text: string): Promise<void>{
        id = this.validNumber('id', id);
        title = this.validText('title', title);
        text = this.validText('text', text);
        await this.model.update(id,title,text);
    }

    public async delete(id: number): Promise<void>{
        id = this.validNumber('id',id);
        await this.model.delete(id);
    }

    private validText(name: string,text: string):string {
        if(!text || text.length == 0)
            throw new Error(`${name} is empty`);
        const sumbols: Array<string> = [`"`,`/`,`'`,'`'];
        
        return text.split("").map(item => {
            if(sumbols.indexOf(item) != -1)
                return `\\`+item;
            return item
        }).join("");
    }

    private validNumber(name: string, value: number): number{
        if(!value || value < 1)
            throw new Error(`${name} incorrectly`);
        return value;
    }
}

export default Todo;