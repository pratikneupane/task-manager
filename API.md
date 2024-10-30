## Base URL
`http://localhost:3000/api/v1`

## Authentication
All routes except `/auth/login` and `/auth/register` require authentication via JWT token in cookie. The token is automatically handled through cookies, so no manual token management is needed in the request headers.

- Cookie name: `TASK_MANAGER_TOKEN`
- Cookie attributes: `HttpOnly, Secure`

## Error Responses
All endpoints may return these error responses:

```json
{
  "message": "Error message here",
  "status": 400 // Status code
}
```

Common error status codes:
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden (Not allowed to access resource)
- `404` - Not Found
- `500` - Internal Server Error

## Endpoints

### POST /api/v1/auth/login
Authenticate user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** 200 OK
```json
{
    "message": "Login successful",
    "response": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjBkMmNhYjVjNjhmYmFhYWQ0YTg5YiIsImVtYWlsIjoicnVwZXNoQGdtYWlsLmNvbSIsImlhdCI6MTczMDI4ODQzNSwiZXhwIjoxNzMwMzc0ODM1fQ.T6i9PczHqqe2ku5xR45Izax_BGU7b6Vdr3J_yGY4R7c",
        "user": {
            "_id": "6720d2cab5c68fbaaad4a89b",
            "email": "user@example.com",
            "password": "$2a$10$5CcPEvGtZ1IdXp2/WEHAret0pDJ0myFVHzIJxGKBlT7KM9GlA0/tO",
            "createdAt": "2024-10-29T12:19:22.825Z",
            "updatedAt": "2024-10-29T12:19:22.825Z",
            "__v": 0
        }
    }
}
```

### POST /api/v1/auth/register
Create a new user account.

**Request Body:**
```json
{
    "email": "nayaUser@gmail.com",
    "password": "NayaPassword321$"
}
```

**Response:** 201 Created
```json
{
    "message": "User registered successfully",
    "response": {
        "email": "nayaUser@gmail.com",
        "password": "$2a$10$LGhdSG.2K4y6hM4D2RuCZ.EKzNDjLXZPnamGegPBXa4EdP4gw57le",
        "_id": "67221b7eadfb4c873960abb5",
        "createdAt": "2024-10-30T11:41:50.781Z",
        "updatedAt": "2024-10-30T11:41:50.781Z",
        "__v": 0
    }
}
```

### GET /api/v1/tasks
Retrieve all tasks for the authenticated user.

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)

**Response:** 200 OK
```json
{
    "message": "Tasks Fetched Successfully",
    "response": [
        {
            "_id": "67221c17adfb4c873960abc0",
            "title": "Naya Task",
            "description": "Alik arkai tara ramro task",
            "status": "TODO",
            "user": "67221b7eadfb4c873960abb5",
            "__v": 0
        },
        {
            "_id": "67221c1dadfb4c873960abc2",
            "title": "Naya Task 2",
            "description": "Alik arkai tara ramro task 2",
            "status": "TODO",
            "user": "67221b7eadfb4c873960abb5",
            "__v": 0
        }
    ],
    "count": 2
}
```

### POST /api/v1/tasks
Create a new task.

**Request Body:**
```json
{
    "title": "Naya Task",
    "description": "Ekdam ramro task"
}
```

**Response:** 201 Created
```json
{
    "message": "Task Created Successfully",
    "response": {
        "title": "Naya Task",
        "description": "Ekdam ramro task",
        "status": "TODO",
        "user": "6720d2cab5c68fbaaad4a89b",
        "_id": "67221ba5adfb4c873960abb7",
        "__v": 0
    }
}
```

### PUT /api/v1/tasks/:id
Update an existing task.

**URL Parameters:**
- `id`: Task ID (required)

**Request Body:**
```json
{
    "title": "New Task Test",
    "description": "Desc",
    "status": "DONE"
}
```

**Response:** 200 OK
```json
{
    "message": "Task Updated Successfully",
    "response": {
        "_id": "67221c17adfb4c873960abc0",
        "title": "New Task Test",
        "description": "Desc",
        "status": "DONE",
        "user": "67221b7eadfb4c873960abb5",
        "__v": 0
    }
}
```

### DELETE /api/v1/tasks/:id
Delete a specific task.

**URL Parameters:**
- `id`: Task ID (required)

**Response:** 200 OK
```json
{
    "message": "Task Deleted Successfully",
    "response": {
        "_id": "67221c17adfb4c873960abc0",
        "title": "New Task Test",
        "description": "Desc",
        "status": "DONE",
        "user": "67221b7eadfb4c873960abb5",
        "__v": 0
    }
}
```

### GET /api/v1/tasks/search
Search tasks by title or description.

**Query Parameters:**
- `query` (required): Search query string

**Response:** 200 OK
```json
{
    "message": "Tasks Found Successfully",
    "response": [
        {
            "_id": "67221c1dadfb4c873960abc2",
            "title": "Naya Task 2",
            "description": "Alik arkai tara ramro task 2",
            "status": "TODO",
            "user": "67221b7eadfb4c873960abb5",
            "__v": 0
        }
    ]
}
```

## Data Validation
- Email must be a valid email format
- Password must be at least 6 characters
- Task title must be between 1 and 100 characters
- Task description cannot be empty
- Task status must be one of: "TODO", "IN_PROGRESS", "DONE"

## Best Practices
1. Always handle potential errors in your requests
2. Use appropriate HTTP methods for operations
3. Include error handling for network issues
4. Implement proper token storage and management
5. Use the pagination parameters for large datasets