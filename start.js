"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const server_1 = __importDefault(require("./server"));
const logs_1 = require("./functions/logs");
const port = 3000;
if (cluster_1.default.isMaster) {
    logs_1.checkLogsPath();
    const cpu_count = require('os').cpus().length;
    for (let i = 0; i < cpu_count; i++) {
        cluster_1.default.schedulingPolicy = cluster_1.default.SCHED_NONE;
        cluster_1.default.fork();
    }
    cluster_1.default.on('fork', (worker) => {
        console.log(`Worker #${worker.id} is online`);
    });
    cluster_1.default.on('listening', (worker, address) => {
        console.log(`The worker #${worker.id} is now connected to ${JSON.stringify(address)}`);
    });
    cluster_1.default.on('exit', (worker) => {
        console.log(`Worker ${worker.id} is dead =(`);
        cluster_1.default.fork();
    });
}
else {
    server_1.default(port);
    process.on('uncaughtException', (err) => {
        console.error(`${(new Date).toUTCString()} uncaught exception: ${err.message}`);
        console.error(err.stack);
        process.exit(1);
    });
}
