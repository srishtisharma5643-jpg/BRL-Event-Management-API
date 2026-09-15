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