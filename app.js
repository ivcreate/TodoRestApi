"use strict";
/*import express, {Application, Request, Response, NextFunction} from 'express';
import body_parser from "body-parser"
import Todo from "./todo/todo";
import fs from "fs";
import siteReq from './functions/siteRequest';

const env = JSON.parse(fs.readFileSync(".env", "utf-8"));

const app: Application = express();

function errorHandler(err: Error, res: Response, text: String = "Something failed!", code: number = 500){
    res.status(code).send({ error: text });
    console.log(err.message);
}

app.use(body_parser.urlencoded({
    extended: false
 }));

app.use(body_parser.json());

app.get('/todo/:id',async (req: Request, res: Response) => {
    const todo = new Todo();
    try{
        const result = await todo.get(Number.parseInt(req.params.id))
        res.send(JSON.stringify(result));
    }catch(err){
        errorHandler(err, res, err.message);
    }
});

app.get("/todo", (req: Request, res: Response) => {
    res.send(`<form class="form"  action="/todo" method="post" name="regForm">
    <div class="form-group">
        <input type="text" name="username" class="form-control" id="username" placeholder="Username">
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
</form>
`);
});

app.post('/todo', async (req: Request, res: Response) => {
    const todo = new Todo;
    try{
        await todo.add(req.body.create_user_id, req.body.assigned_user_id, req.body.title, req.body.text);
        res.send(JSON.stringify({result: "ok"}));
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
        console.log(req.params.id);
        await todo.delete(Number.parseInt(req.params.id));
        res.send(JSON.stringify({result: "ok"}));
    }catch(err){
        errorHandler(err,res,err.message)
    }
});

app.get('/oauth', (req: Request, res: Response) => {
   res.send(`
        <a href="https://github.com/login/oauth/authorize?client_id=7a55afbb3119f655459a">Authorizing</a>
   `);
});

app.post('/test',(req: Request, res: Response) => {
    res.send(req.body);
});

app.get('/oauth/callback', (req: Request, res: Response) => {
    const postData = JSON.stringify({
        client_id: env.GITHUB.CLIENT_ID,
        client_secret : env.GITHUB.CLIENT_SECRET,
        code : req.query.code.toString(),
    });
    const options = {
      hostname: 'github.com',
      port: 443,
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
           'Content-Type': 'application/json',
           'Content-Length': postData.length
         }
    };
    try{
        siteReq(options,postData);
    }catch(err){
        errorHandler(err, res, err.message);
    }
    res.send(`
         Hello world
    `);
 });

app.listen(3000, () => {
    const todo = new Todo;
    todo.migration();
});*/ 
