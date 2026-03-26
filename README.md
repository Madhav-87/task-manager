# Task Manager App
 
A full-stack task management web application built with React and Node.js. Users can log in, create tasks, edit them, and delete them. Built as a learning project to practice REST API design, JWT authentication, and React custom hooks.
 
---
 
## Tech Stack
 
**Frontend**
- React 19
- React Router DOM
- Axios
- React Toastify
- Vite
 
**Backend**
- Node.js
- Express.js
- MySQL2
- JSON Web Token (JWT)
- Helmet
- CORS
- Express Rate Limiter
 
---
 
## Features
 
- User login with JWT authentication
- Create, read, update, and delete tasks
- Protected routes using auth middleware
- Rate limiting (100 requests per minute)
- Custom React hooks for API calls
- Toast notifications for user feedback
 
---
 
## Project Structure
 
```
project/
├── task-manager-frontend/       # React frontend (Vite)
│   ├── src/
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── deleteTask.js
│   │   │   └── fecthEdit.js
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   └── Content.jsx
│   └── package.json
│
└── task-manager-backend/        # Express backend
    ├── app/app.js               # Express setup, middleware
    ├── routes/router.js         # API routes
    ├── controller/controller.js # Route handlers
    ├── model/db.js              # Database queries
    ├── services/dbConn.js       # MySQL connection pool
    ├── utils/authMiddleware.js  # JWT verify middleware
    └── server.js                # Entry point
```
 
---
 
## API Endpoints
 
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/user/login` | No | Login and get JWT token |
| POST | `/user/title` | Yes | Create a new task |
| GET | `/user/tasks` | Yes | Get all tasks for logged-in user |
| PATCH | `/user/task/update` | Yes | Update an existing task |
| DELETE | `/user/task/update` | Yes | Delete a task |
 
> All protected routes require `Authorization: Bearer <token>` header.
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js (v18 or above)
- MySQL
 
### 1. Clone the repository
 
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
 
### 2. Setup the Backend
 
```bash
cd task-manager-backend
npm install
```
 
Create a `.env` file in the `config/` folder based on `.env.example`:
 
```bash
cp config/.env.example config/.env
```
 
Fill in your values:
 
```
SERVER_PORT=3000
JWT_SECRETE_KEY=your_secret_key_here
DB_PASS=your_mysql_password_here
```
 
Start the backend server:
 
```bash
node server.js
```
 
### 3. Setup the Frontend
 
```bash
cd task-manager-frontend
npm install
npm run dev
```
 
The app will run at `http://localhost:5173`
 
---
 
## Database Setup
 
Create a MySQL database named `taskMang` and run the following SQL:
 
```sql
CREATE DATABASE taskMang;
USE taskMang;
 
CREATE TABLE useraccount (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
 
CREATE TABLE userTask (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid INT NOT NULL,
  task VARCHAR(255) NOT NULL,
  info TEXT,
  FOREIGN KEY (userid) REFERENCES useraccount(id)
);
```
 
---
 
## Environment Variables
 
Create `config/.env` in the backend folder. Never commit this file.
 
| Variable | Description |
|----------|-------------|
| `SERVER_PORT` | Port the backend runs on (e.g. 3000) |
| `JWT_SECRETE_KEY` | Secret key for signing JWT tokens |
| `DB_PASS` | MySQL database password |
 
---
 
## What I Learned
 
- Building a REST-style API with Express.js
- JWT-based stateless authentication
- Protecting routes with custom middleware
- Writing custom React hooks to separate API logic from UI
- Connecting React frontend to a Node.js backend
- Using rate limiting and Helmet for basic API security
 
---
 
## Known Improvements
 
- URL path design can be improved to follow REST conventions more strictly (e.g. `/tasks/:id`)
- Passwords should be hashed using bcrypt before storing
- Error handling in auth middleware needs a try/catch around `jwt.verify()`
 
---
 
## Author
 
Built by Madhav Bondhare
 
Feel free to raise issues or suggestions!
 
