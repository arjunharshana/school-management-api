# School Management API

A robust Node.js and Express RESTful API for managing school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a given geographic location using the Haversine formula.

## Features

- **Add School**: Add a new school with its name, address, latitude, and longitude.
- **List Schools**: Retrieve all schools sorted by their distance from a specified geographic coordinate (latitude and longitude).
- **Data Validation**: Comprehensive input validation using [Zod](https://zod.dev/).
- **Distance Calculation**: Accurate geographical distance calculation using the Haversine formula.
- **Standardized Responses**: Consistent JSON response structures for both success and error cases.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MySQL2**: MySQL client for Node.js
- **Zod**: TypeScript-first schema declaration and validation library
- **Cors**: Cross-Origin Resource Sharing middleware
- **Dotenv**: Environment variable management

## Project Structure

```text
school-management-api/
├── config/
│   └── db.js
├── controllers/
│   └── schoolController.js
├── routes/
│   └── schoolRoutes.js
├── utils/
│   ├── distance.js
│   ├── response.js
│   └── validators.js
├── init_db.sql
├── server.js
├── schoolAPI.postman_collection.json
├── package.json
└── .env
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server

### Installation

1. **Clone the repository or navigate to the project directory:**

   ```bash
   cd school-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Database Setup:**
   - Ensure your MySQL server is running.
   - Run the provided `init_db.sql` script to create the database and the `schools` table.

   ```sql
   CREATE DATABASE IF NOT EXISTS school_db;
   USE school_db;

   CREATE TABLE IF NOT EXISTS schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
   );
   ```

4. **Environment Configuration:**
   - Create a `.env` file in the root directory.
   - Add your database credentials and preferred port:

   ```bash
   #If using cloud database
   DATABASE_URL=your_database_url
   PORT=3000

   #If using local database
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_db

   ```

### Running the Application

**Development Mode (with auto-restart via nodemon):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server will start on the port specified in your `.env` file (default is `3000`).

## API Endpoints

### 1. Add a School

- **URL:** `/api/addSchool`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Description:** Adds a new school record to the database.

**Request Body:**

```json
{
  "name": "Springfield Elementary",
  "address": "123 Main St, Springfield",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "schoolId": 1
  }
}
```

**Error Response (400 Bad Request - Validation Error):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "message": "Name is required"
    }
  ]
}
```

### 2. List Schools

- **URL:** `/api/listSchools`
- **Method:** `GET`
- **Description:** Retrieves a list of all schools, sorted by their distance from the user's provided coordinates.

**Query Parameters:**

- `latitude` (Required): User's current latitude.
- `longitude` (Required): User's current longitude.

**Example Request:**
`/api/listSchools?latitude=39.7817&longitude=-89.6501`

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Schools listed successfully",
  "data": [
    {
      "id": 1,
      "name": "Springfield Elementary",
      "address": "123 Main St, Springfield",
      "latitude": 39.7817,
      "longitude": -89.6501,
      "distance": 0
    },
    {
      "id": 2,
      "name": "Shelbyville High",
      "address": "456 Oak St, Shelbyville",
      "latitude": 39.4054,
      "longitude": -88.8093,
      "distance": 83.5
    }
  ]
}
```

## Postman Collection

A Postman collection (`schooAPI.postman_collection.json`) is included in the project root. You can import this file directly into Postman to test the endpoints easily.
