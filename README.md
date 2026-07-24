# Simple Task API

This is a small Express.js REST API for managing tasks. It stores tasks in memory, so the data resets whenever the server restarts.

The project also includes Swagger documentation from `openapi.json`, available at `http://localhost:3000/docs` after the API is running.

## Install and Run

Make sure Node.js is installed, then run this one command from the project folder:

```bash
npm install && npm start
```

The server runs on:

```text
http://localhost:3000
```

## Endpoints

| Method | Endpoint | Description | Success Response |
| --- | --- | --- | --- |
| GET | `/` | Returns basic API information | `200 OK` |
| GET | `/health` | Checks if the server is running | `200 OK` |
| GET | `/tasks` | Returns all tasks | `200 OK` |
| POST | `/tasks` | Creates a new task | `201 Created` |
| GET | `/tasks/:id` | Returns one task by id | `200 OK` |
| PUT | `/tasks/:id` | Updates one task by id | `200 OK` |
| DELETE | `/tasks/:id` | Deletes one task by id | `204 No Content` |
| GET | `/docs` | Opens the Swagger UI documentation | `200 OK` |

## Example Request

After starting the server, test it with:

```bash
curl -i http://localhost:3000/health
```

Example output:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 15
ETag: W/"f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Date: Fri, 24 Jul 2026 09:34:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"ok"}
```

## Request Body Examples

Create a task:

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"learn swagger"}'
```

Update a task:

```bash
curl -i -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"finish assignment","done":true}'
```

Delete a task:

```bash
curl -i -X DELETE http://localhost:3000/tasks/1
```

## Swagger Documentation

Start the server and open this URL in your browser:

```text
http://localhost:3000/docs
```

Swagger reads from `openapi.json`, so update that file whenever you add or change API routes.
