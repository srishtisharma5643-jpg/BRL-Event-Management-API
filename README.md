# BRL Event Management API

## Project Description

This project is a REST API for managing events.

The API is built using:
- Node.js
- Express.js
- MongoDB
- Mongoose

## Base URL

http://localhost:3000

## API Endpoints

### 1. Get All Events

**Method:** GET

**URL:**
`/events`

**Purpose:** Fetch all events.

**Optional Query Parameters:**
- `search` - Search events by title
- `status` - Filter events by status
- `page` - Page number
- `limit` - Number of events per page
- `sort` - Sort events by a field

**Example:**
`GET /events?search=BRL&page=1&limit=10&sort=date`

**Success Response:** `200 OK`

---

### 2. Get Event by ID

**Method:** GET

**URL:**
`/events/:id`

**Purpose:** Fetch a single event using its ID.

**Success Response:** `200 OK`

**If event is not found:** `404 Not Found`

---

### 3. Create Event

**Method:** POST

**URL:**
`/events`

**Purpose:** Create a new event.

**Request Body:**

```json
{
  "title": "BRL Backend Workshop",
  "description": "Backend Development Workshop",
  "date": "2026-10-10",
  "location": "AKGEC",
  "capacity": 100
}




# BRL Event Management API

A RESTful Event Management API built using Node.js, Express.js and MongoDB.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- Postman

## Features

- User registration
- Secure password hashing
- User login with JWT authentication
- Get current authenticated user
- Logout
- Protected event routes
- Create, read, update and delete events
- Event search
- Event filtering
- Pagination
- Sorting
- Input validation
- Duplicate event checking
- Proper HTTP status codes

## Project Structure

management/
- controllers/
- middleware/
- models/
- routes/
- server.js
- .env
- .gitignore
- package.json

## Environment Variables

Create a `.env` file:

JWT_SECRET=your_secret_key
PORT=3000

Do not commit the `.env` file to GitHub.

## Installation

Install dependencies:

npm install

Start the server:

node server.js

Server runs on:

http://localhost:3000

## Authentication APIs

### Register

POST /auth/register

Body:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123"
}

### Login

POST /auth/login

Body:

{
  "email": "test@example.com",
  "password": "Password123"
}

Login returns a JWT token.

### Get Current User

GET /auth/me

Authentication: Bearer Token

### Logout

POST /auth/logout

Authentication: Bearer Token

## Event APIs

### Get All Events

GET /events

Authentication: Not required

### Get Single Event

GET /events/:id

Authentication: Not required

### Create Event

POST /events

Authentication: Bearer Token required

### Update Event

PUT /events/:id

Authentication: Bearer Token required

### Delete Event

DELETE /events/:id

Authentication: Bearer Token required

## Query Parameters

The event listing API supports:

- search
- status
- page
- limit
- sort

Example:

GET /events?search=workshop&page=1&limit=10&sort=date

## HTTP Status Codes

200 - Successful request

201 - Resource created

400 - Invalid request or validation error

401 - Authentication required or invalid credentials

404 - Resource not found

409 - Conflict or duplicate resource

500 - Server error

## Postman Variables

The Postman collection uses:

{{baseUrl}}
{{authToken}}
{{eventId}}

Example:

{{baseUrl}}/events/{{eventId}}

## Database

MongoDB is used as the database and Mongoose is used for database interaction.

## Security

- Passwords are stored using bcrypt hashing.
- JWT is used for authentication.
- Protected routes use authentication middleware.
- `.env` is excluded from Git using `.gitignore`.
- Passwords are never returned in the user profile response.