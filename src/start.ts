import cluster from 'cluster';
import server from './server';
import {checkLogsPath} from './functions/logs';


const port: number = 3000;

if (cluster.isMaster) {

    checkLogsPath();
    
    const cpu_count = require('os').cpus().length;

    for (let i = 0; i < cpu_count; i++) {
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        cluster.fork();
    }

    cluster.on('fork', (worker) => {
        console.log(`Worker #${worker.id} is online`);
    });

    cluster.on('listening', (worker, address) => {
        console.log(`The worker #${worker.id} is now connected to ${JSON.stringify(address)}`);
    });

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.id} is dead =(`);
        cluster.fork();
    });
} else {
    server(port);
    process.on('uncaughtException', (err) => {
        console.error(`${(new Date).toUTCString()} uncaught exception: ${err.message}`);
        console.error(err.stack);
        process.exit(1);
    });
}