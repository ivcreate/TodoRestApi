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
const https_1 = __importDefault(require("https"));
function siteRequest(options, req, next, postData) {
    const request = https_1.default.get(options, (response) => __awaiter(this, void 0, void 0, function* () {
        let result = "";
        response.on('data', (chunk) => {
            result += chunk;
        });
        response.on('end', () => {
            req.body.user_info = JSON.parse(result);
            next();
        });
    }));
    if (postData)
        request.write(postData);
    request.end();
}
function getUserGithub(token, req, next) {
    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/user',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Test',
            'Authorization': 'token ' + token
        }
    };
    siteRequest(options, req, next);
}
exports.default = getUserGithub;
