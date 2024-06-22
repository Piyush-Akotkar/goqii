# CRUD application with React, Node.js, Express, and MySQL

This is a simple CRUD application built with React for the frontend and Node.js with Express for the backend. The application performs CRUD operations with a MySQL database.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MySQL

## Backend Setup

1. Navigate to the `server` directory

2. Install the required dependencies: `npm install`

3. Create a `.env` file in the `server` directory and add your database configuration:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=crud_db
```

4. Create MySQL database and the `users` table:
```sql
CREATE DATABASE crud_db;

USE crud_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
5. Start the backend server: `npm start`

## Frontend Setup

1. Navigate to the `client` directory

2. Install the required dependencies: `npm install`

3. Create a `.env` file in the `frontend` directory and add the API URL:
    ```
    REACT_APP_API_URL=http://localhost:8080/api
    ```

4. Start the React development server: `npm start`

5. Open your browser and navigate to `http://localhost:3000`




