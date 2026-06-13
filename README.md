# TaskFlow - Secure Task Management Portal

A full-stack Task Management Portal built using React, Node.js, Express, MongoDB, and JWT Authentication. The application enables users to securely manage their tasks with complete CRUD functionality and protected routes.

---

## Project Overview

TaskFlow is a secure task management system that allows users to:

* Register and create an account
* Login using JWT Authentication
* Create new tasks
* View all their tasks
* Update task details and status
* Delete tasks
* Access protected routes securely

This project demonstrates authentication, authorization, REST APIs, CRUD operations, database integration, and frontend-backend communication.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Token Authentication
* Protected Routes
* Persistent Login Sessions
* Secure Password Hashing using bcrypt

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Task Status Tracking
* User-Specific Task Storage

### User Experience

* Responsive Design
* Modern Dashboard UI
* Form Validation
* Error Handling
* Loading States

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MongoDB
* Mongoose

### Tools

* Postman
* Git
* GitHub
* VS Code

---

## Project Structure

```text
TaskFlow/
│
├── task-manager-backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── task-manager-frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/taskflow.git

cd taskflow
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd task-manager-backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd task-manager-frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /register
```

#### Login User

```http
POST /login
```

---

### Tasks

#### Get All Tasks

```http
GET /tasks
```

#### Create Task

```http
POST /tasks
```

#### Update Task

```http
PUT /tasks/:id
```

#### Delete Task

```http
DELETE /tasks/:id
```

---

## Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. Backend verifies credentials.
4. JWT token is generated.
5. Token is stored in local storage.
6. Protected routes require valid JWT token.
7. Requests include Authorization header.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Database Schema

### User Model

```javascript
{
  username: String,
  email: String,
  password: String
}
```

### Task Model

```javascript
{
  title: String,
  description: String,
  status: String,
  user: ObjectId
}
```

---

## Testing

API endpoints were tested using Postman.

Test Cases:

* User Registration
* User Login
* JWT Verification
* Create Task
* Fetch Tasks
* Update Task
* Delete Task
* Unauthorized Access Handling

---

## Learning Outcomes

Through this project, the following concepts were implemented:

* RESTful API Development
* CRUD Operations
* JWT Authentication
* Password Hashing
* Middleware Usage
* MongoDB Integration
* React Frontend Development
* API Consumption using Axios
* Protected Routes
* Full-Stack Development

---

## Future Enhancements

* Task Priorities
* Due Dates
* Dark Mode
* Profile Management
* Email Notifications
* Dashboard Analytics
* Task Categories
* Team Collaboration
* Real-Time Updates using Socket.IO

---

## Author

Prakash

Full Stack Developer | MERN Stack Enthusiast | AI & ML Undergraduate

GitHub: https://github.com/PrakashNarayanam

LinkedIn: https://linkedin.com/in/narayanam-prakash

---

## License

This project is created for learning, academic, and portfolio purposes.
