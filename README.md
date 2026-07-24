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

## Status Codes

| Status Code | Meaning |
| --- | --- |
| `200 OK` | The request worked and the API returned data. |
| `201 Created` | A new task was created successfully. |
| `204 No Content` | A task was deleted successfully. There is no response body. |
| `400 Bad Request` | The request body is missing or invalid. |
| `404 Not Found` | The task id does not exist. |

## Sample Inputs and Outputs

### Check Server Health

This checks if the API is running.

```bash
curl -i http://localhost:3000/health
```

Output:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"status":"ok"}
```

### Get All Tasks

This returns the current list of tasks.

```bash
curl -i http://localhost:3000/tasks
```

Output:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {"id":1,"title":"do flyrank assignment","done":true},
  {"id":2,"title":"do leetcode problems","done":false},
  {"id":3,"title":"do codeforces problems","done":false}
]
```

### Create a Task

This creates a new task. Only `title` is required in the request body.

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"learn swagger"}'
```

Output:

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"id":4,"title":"learn swagger","done":false}
```

### Create Task Error

This happens when the request body is empty.

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
```

Output:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{"error":"Body of POST request cannot be empty"}
```

### Update a Task

This updates an existing task by id.

```bash
curl -i -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"finish assignment","done":true}'
```

Output:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"id":1,"title":"finish assignment","done":true}
```

### Task Not Found Error

This happens when the task id does not exist.

```bash
curl -i http://localhost:3000/tasks/99
```

Output:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{"error":"Task 99 not found"}
```

### Delete a Task

This deletes a task by id.

```bash
curl -i -X DELETE http://localhost:3000/tasks/1
```

Output:

```http
HTTP/1.1 204 No Content
```

## Swagger Documentation

Start the server and open this URL in your browser:

```text
http://localhost:3000/docs
```

Swagger reads from `openapi.json`, so update that file whenever you add or change API routes.
