"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const env = JSON.parse(fs_1.default.readFileSync(".env", "utf-8"));
exports.default = new pg_1.Pool({
    user: env.PGSQL.USER,
    host: env.PGSQL.HOST,
    database: env.PGSQL.DATABASE,
    password: env.PGSQL.PASS,
    port: env.PGSQL.POST,
    max: 10,
});
