# Task Manager Application Documentation

## Overview
A full-stack task management application built with React (Frontend) and Node.js/Express (Backend) that allows users to manage tasks with CRUD operations and user authentication.

## Technology Stack
### Frontend
- **Framework**: React with TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Form Validation**: Zod
- **Routing**: React Router Dom
- **Authentication**: Custom auth using Context + Local Storage

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (stored in cookies)

## Documentation
- [API Documentation](./API.md) - Detailed API endpoints and usage

## Project Structure

## Authentication Flow
1. **Registration**: Users register with email and password
2. **Login**: Users login to receive a JWT token
3. **Token Storage**: 
   - JWT stored in HTTP-only cookie
   - User data stored in localStorage
4. **Authentication Check**: `useIsLogin` hook checks auth status and redirects if needed

## Data Models

### User Model
```typescript
interface User {
  email: string;
  password: string; // Hashed
}
```

### Task Model
```typescript
interface Task {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}
```

## Validation
Using Zod for schema validation:

### Login Validation
```typescript
loginSchema = {
  email: string().email(),
  password: string().min(6)
}
```

### Task Validation
```typescript
taskSchema = {
  title: string().min(1).max(100),
  description: string().min(1),
  status: enum(['TODO', 'IN_PROGRESS', 'DONE'])
}
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user

### Tasks
- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/search?query="search+query"` - Search Task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## Security Considerations
1. Passwords are hashed before storage
2. JWT tokens stored in HTTP-only cookies
3. Protected routes using authentication middleware
4. Input validation using Zod schemas
5. CORS configuration for API security
