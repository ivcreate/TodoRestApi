import {NextFunction, Request} from 'express';
import https, { RequestOptions } from 'https';

function siteRequest(options: RequestOptions, req: Request, next: NextFunction, postData?: string){
    const request = https.get(options, async (response) => {
        let result: string = "";

        response.on('data', (chunk: Buffer) => {
            result += chunk;            
        });

        response.on('end', () => {
            req.body.user_info = JSON.parse(result);
            next();
        });
      });
    if(postData)      
        request.write(postData);
    request.end();
}

function getUserGithub(token: string, req: Request, next: NextFunction){
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


export default getUserGithub