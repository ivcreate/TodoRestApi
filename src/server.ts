import express, {Application, Request, Response, NextFunction} from 'express';
import body_parser from "body-parser"
import Todo from "./todo/todo";
import getUserGithub from './functions/siteRequest';
import {writeAccessLog, writeErrorLog, checkLogsPath} from './functions/logs';

function serverStart(port: number = 3000){
    const app: Application = express();

    function errorHandler(err: Error, res: Response, text: string = "Something failed!", code: number = 500){
        res.status(code).send({ error: text });
        writeErrorLog(err);
        console.log('errorHandler: '+err.message);
    }

    app.use(body_parser.urlencoded({
        extended: false
    }));

    app.use(body_parser.json());

    app.use('/todo', (req: Request, res: Response, next: NextFunction) => {
        const token = req.get('Access-Token');
        if(token !== undefined){
            getUserGithub(token, req, next);
        }else{
            const err = new Error("empty access token");
            errorHandler(err, res, err.message, 401);
        }
    });

    app.use('/todo', (req: Request, res: Response, next: NextFunction) => {
        if(req.body.user_info.id){
            writeAccessLog(req, req.body.user_info.id + " " + req.body.user_info.login);
            next();
        }else{
            const err = new Error("autorization failed");
            errorHandler(err, res, err.message, 401);
        }
    });

    app.get('/todo/:id',async (req: Request, res: Response) => {
        const todo = new Todo();
        try{
            const result = await todo.get(Number.parseInt(req.params.id))
            res.send(JSON.stringify(result));
        }catch(err){
            errorHandler(err, res, err.message);
        }
    });

    app.post('/todo', async (req: Request, res: Response) => {
        const todo = new Todo;
        try{
            const id: number = await todo.add(req.body.create_user_id, req.body.assigned_user_id, req.body.title, req.body.text);
            res.send(JSON.stringify({result: "ok", add_id: id}));
        }catch(err){  
            errorHandler(err, res, err.message);
        }
    });

    app.put('/todo', async (req: Request, res: Response) => {
        const todo = new Todo;
        try{
            await todo.update(req.body.id, req.body.title, req.body.text);
            res.send(JSON.stringify({result: "ok"}));
        }catch(err){
            errorHandler(err, res, err.message);
        }
    });

    app.delete('/todo/:id', async (req: Request, res:Response) => {
        const todo = new Todo();
        try{
            await todo.delete(Number.parseInt(req.params.id));
            res.send(JSON.stringify({result: "ok"}));
        }catch(err){
            errorHandler(err,res,err.message)
        }
    });

    app.listen(port, () => {
        const todo = new Todo;
        todo.migration();
        checkLogsPath();
    });

    
}

export default serverStart;