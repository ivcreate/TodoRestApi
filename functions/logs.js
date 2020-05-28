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
exports.writeErrorLog = exports.writeAccessLog = exports.checkLogsPath = void 0;
const fs_1 = __importDefault(require("fs"));
function writeAccessLog(req, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const file_name = 'access' + getFileNameDate() + '.log';
        const time = getTime();
        fs_1.default.appendFile("./logs/access/" + file_name, `\n${time} ${text} ${req.ip} ${req.url} ${req.method} ${Object.keys(req.body).length != 0 ? JSON.stringify(req.body) : ''}`, function (err) {
            if (err)
                throw err;
        });
    });
}
exports.writeAccessLog = writeAccessLog;
function writeErrorLog(error) {
    return __awaiter(this, void 0, void 0, function* () {
        const file_name = 'errors' + getFileNameDate() + '.log';
        const time = getTime();
        console.log(error);
        fs_1.default.appendFile("./logs/errors/" + file_name, `\n${time} ${error.name} ${error.message} ${error.stack}`, function (err) {
            if (err)
                throw err;
        });
    });
}
exports.writeErrorLog = writeErrorLog;
function checkLogsPath() {
    return __awaiter(this, void 0, void 0, function* () {
        fs_1.default.exists('./logs', (res) => {
            if (res === false)
                fs_1.default.mkdirSync('./logs');
        });
        fs_1.default.exists('./logs/access', (res) => {
            if (res === false)
                fs_1.default.mkdirSync('./logs/access');
        });
        fs_1.default.exists('./logs/errors', (res) => {
            if (res === false)
                fs_1.default.mkdirSync('./logs/errors');
        });
    });
}
exports.checkLogsPath = checkLogsPath;
function getFileNameDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    return date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' +
        (date.getDate() < 10 ? '0' : '') + date.getDate();
}
function getTime() {
    const date = new Date();
    return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() +
        ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + "." + date.getMilliseconds();
}
