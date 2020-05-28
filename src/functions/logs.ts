import fs from 'fs';
import {Request} from 'express';

async function writeAccessLog(req: Request, text: string): Promise<void>{
    const file_name = 'access' + getFileNameDate() + '.log';
    const time: string = getTime();
    fs.appendFile("./logs/access/"+file_name, `\n${time} ${text} ${req.ip} ${req.url} ${req.method} ${Object.keys(req.body).length != 0 ? JSON.stringify(req.body) : ''}` ,function(err){
        if(err) throw err;
    });
}

async function writeErrorLog(error: Error): Promise<void>{
    const file_name = 'errors' + getFileNameDate() + '.log';
    const time: string = getTime();
    console.log(error);
    fs.appendFile("./logs/errors/"+file_name, `\n${time} ${error.name} ${error.message} ${error.stack}` ,function(err){
        if(err) throw err;
    });
}

async function checkLogsPath(){
    fs.exists('./logs',(res)=>{
        if(res === false)
            fs.mkdirSync('./logs');
    });

    fs.exists('./logs/access',(res)=>{
        if(res === false)
            fs.mkdirSync('./logs/access');
    });

    fs.exists('./logs/errors',(res)=>{
        if(res === false)
            fs.mkdirSync('./logs/errors');
    });

}

function getFileNameDate(): string{
    const date = new Date();    
    const month = date.getMonth() + 1;
    return date.getFullYear()+ '-' + (month < 10 ? '0' : '') + month + '-' + 
    (date.getDate() < 10 ? '0' : '') + date.getDate();
}

function getTime(): string{
    const date: Date = new Date();
    return (date.getHours()<10?'0':'') + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + 
    ':' + (date.getSeconds()<10?'0':'') + date.getSeconds() + "." + date.getMilliseconds();
}

export {checkLogsPath,writeAccessLog,writeErrorLog};