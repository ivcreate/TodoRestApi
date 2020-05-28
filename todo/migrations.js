"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connect_1 = __importDefault(require("../db_connect"));
const table_add = `CREATE TABLE todo (
                        id serial PRIMARY KEY,
                        create_user_id INT NOT NULL,
                        assigned_user_id INT NOT NULL,
                        title VARCHAR (50) NOT NULL,
                        text TEXT NOT NULL,
                        add_at TIMESTAMP,
                        update_at TIMESTAMP
                    );`;
function migration_todo() {
    db_connect_1.default.connect()
        .then(client => {
        return client
            .query(table_add)
            .catch(err => {
            if (!err.message.indexOf('already exists'))
                throw err;
        });
    })
        .catch(err => {
        console.log(err);
        throw err;
    });
}
exports.default = migration_todo;
