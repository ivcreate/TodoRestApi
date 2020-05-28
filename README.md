# Todo App

This is a RestAPI for todo app. All listeners on localhost:3000.

## Installation
``` sh
$ git clone https://github.com/ivcreate/TodoRestApi
$ cd TodoRestApi/
$ npm install
```
In the .env file register access to the pg database.

## Github authentication
Authentication in request requires appropriate header. 
It is assumed that the application is registered on github.
``` sh
Access-Token: token-from-github
```

## How use

To start the server.

```sh
$ npm run start
```
To start the server in dev mode.

```sh
$ npm run dev
```

Build ts code.

```sh
$ npm run build
```
#
GET request:

```
GET /todo/:todo_id
```
Returned
```
{"create_user_id":number,"assigned_user_id":number,"title":"string","text":"string","update_at":"datetime"}
```
#
POST request accepts parameters of this kind:
```
POST /todo
{"create_user_id":"number","assigned_user_id":"number","title":"string","text":"string"}
```
Returned
```
{"result":"ok","add_id":number}
```
#

PUT request accepts parameters of this kind:
```
PUT /todo
{"id": "number","title": "string","text": "string"}
```
Returned
```
{"result":"ok"}
```
Important! A put request always updates both the text and the title.
#
DELETE request:
```
DELETE /todo/:todo_id
```
Returned
```
{"result":"ok"}
```
Important! DELETE does not permanently delete todo, but only changes the flag to remote.

## Technologies

- PostgreSQL: 12.2;
- Node: 14.2.0;
- express: ^4.17.1;
- typescript: ^3.9.2;