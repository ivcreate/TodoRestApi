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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todo_1 = __importDefault(require("./todo/todo"));
const siteRequest_1 = __importDefault(require("./functions/siteRequest"));
const logs_1 = require("./functions/logs");
function serverStart(port = 3000) {
    const app = express_1.default();
    function errorHandler(err, res, text = "Something failed!", code = 500) {
        res.status(code).send({ error: text });
        logs_1.writeErrorLog(err);
        console.log('errorHandler: ' + err.message);
    }
    app.use(body_parser_1.default.urlencoded({
        extended: false
    }));
    app.use(body_parser_1.default.json());
    app.use('/todo', (req, res, next) => {
        const token = req.get('Access-Token');
        if (token !== undefined) {
            siteRequest_1.default(token, req, next);
        }
        else {
            const err = new Error("empty access token");
            errorHandler(err, res, err.message, 401);
        }
    });
    app.use('/todo', (req, res, next) => {
        if (req.body.user_info.id) {
            logs_1.writeAccessLog(req, req.body.user_info.id + " " + req.body.user_info.login);
            next();
        }
        else {
            const err = new Error("autorization failed");
            errorHandler(err, res, err.message, 401);
        }
    });
    app.get('/todo/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const todo = new todo_1.default();
        try {
            const result = yield todo.get(Number.parseInt(req.params.id));
            res.send(JSON.stringify(result));
        }
        catch (err) {
            errorHandler(err, res, err.message);
        }
    }));
    app.post('/todo', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const todo = new todo_1.default;
        try {
            const id = yield todo.add(req.body.create_user_id, req.body.assigned_user_id, req.body.title, req.body.text);
            res.send(JSON.stringify({ result: "ok", add_id: id }));
        }
        catch (err) {
            errorHandler(err, res, err.message);
        }
    }));
    app.put('/todo', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const todo = new todo_1.default;
        try {
            yield todo.update(req.body.id, req.body.title, req.body.text);
            res.send(JSON.stringify({ result: "ok" }));
        }
        catch (err) {
            errorHandler(err, res, err.message);
        }
    }));
    app.delete('/todo/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const todo = new todo_1.default();
        try {
            yield todo.delete(Number.parseInt(req.params.id));
            res.send(JSON.stringify({ result: "ok" }));
        }
        catch (err) {
            errorHandler(err, res, err.message);
        }
    }));
    app.listen(port, () => {
        const todo = new todo_1.default;
        todo.migration();
    });
}
exports.default = serverStart;
