"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const server_1 = __importDefault(require("./server"));
const port = 3000;
if (cluster_1.default.isMaster) {
    const cpuCount = require('os').cpus().length;
    // Fork workers.
    for (let i = 0; i < 2; i++) {
        cluster_1.default.schedulingPolicy = cluster_1.default.SCHED_NONE;
        cluster_1.default.fork();
    }
    cluster_1.default.on('fork', (worker) => {
        console.log(`Worker #${worker.id} is online`);
    });
    cluster_1.default.on('listening', (worker, address) => {
        console.log(`The worker #${worker.id} is now connected to ${JSON.stringify(address)}`);
        // Worker is waiting for Master's message
        worker.on('message', messageHandler);
    });
    cluster_1.default.on('exit', (worker) => {
        console.log(`Worker ${worker.id} is dead =(`);
        cluster_1.default.fork();
    });
    // Count requests
    let numRequests = 0;
    function messageHandler(msg) {
        //if (msg.cmd && msg.cmd === 'notifyRequest') {
        numRequests += 1;
        console.log(`Requests received: ${numRequests}`);
        //}
    }
}
else {
    server_1.default(process, port);
    process.on('uncaughtException', (err) => {
        console.error(`${(new Date).toUTCString()} uncaught exception: ${err.message}`);
        console.error(err.stack);
        process.exit(1);
    });
}
