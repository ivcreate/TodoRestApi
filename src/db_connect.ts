import {Pool} from 'pg';
import fs from "fs";

const env = JSON.parse(fs.readFileSync(".env", "utf-8"));

export default new Pool({
    user: env.PGSQL.USER,
    host: env.PGSQL.HOST,
    database: env.PGSQL.DATABASE,
    password: env.PGSQL.PASS,
    port: env.PGSQL.POST,
    max: 10,
  });