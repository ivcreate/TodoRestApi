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
const db_connect_1 = __importDefault(require("../db_connect"));
const model_1 = __importDefault(require("./model"));
class Todo {
    constructor() {
        this.model = new model_1.default(db_connect_1.default);
    }
    migration() {
        this.model.migration();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            id = this.validNumber('id', id);
            const result = yield this.model.get(id);
            return result;
        });
    }
    add(create_user_id, assigned_user_id, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            create_user_id = this.validNumber('create_user_id', create_user_id);
            assigned_user_id = this.validNumber('assigned_user_id', assigned_user_id);
            title = this.validText('title', title);
            text = this.validText('text', text);
            yield this.model.insert(create_user_id, assigned_user_id, title, text);
        });
    }
    update(id, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            id = this.validNumber('id', id);
            title = this.validText('title', title);
            text = this.validText('text', text);
            yield this.model.update(id, title, text);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            id = this.validNumber('id', id);
            yield this.model.delete(id);
        });
    }
    validText(name, text) {
        if (!text || text.length == 0)
            throw new Error(`${name} is empty`);
        const sumbols = [`"`, `/`, `'`, '`'];
        return text.split("").map(item => {
            if (sumbols.indexOf(item) != -1)
                return `\\` + item;
            return item;
        }).join("");
    }
    validNumber(name, value) {
        if (!value || value < 1)
            throw new Error(`${name} incorrectly`);
        return value;
    }
}
exports.default = Todo;
