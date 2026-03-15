#  School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** that allows users to add schools and retrieve them sorted by proximity to a given location using the **Haversine formula**.



##  Features

- Add new schools with name, address, latitude, and longitude
- List all schools sorted by distance from a user-specified location
- Input validation on all fields
- Distance calculation using the Haversine formula
- Clean MVC folder structure

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL 8.0 |
| DB Driver | mysql2 |
| Environment | dotenv |
| Dev Tool | nodemon |

---

##  Project Structure

```
school-management-api/
│
├── config/
│   └── db.js                  #MySql
│
├── controllers/
│   └── schoolController.js    
│
├── middlewares/
│   └── validate.js            
│
├── routes/
│   └── schoolRoutes.js        # Route
│
├── utils/
│   └── haversine.js           # Haversine distance calculation
│
├── .env.example               
├── .gitignore
├── package.json
└── server.js                  
```

---



### Prerequisites
- Node.js v18+
- MySQL 8.0+

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/school-management-api.git
cd school-management-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```
Fill in your MySQL credentials in the `.env` file.

**4. Set up the database**

Run the SQL commands from the [Database Setup](#-database-setup) section below.

**5. Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:3000`

---

##  Environment Variables

Create a `.env` file in the root directory using `.env.example` as a template:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

---

##  Database Setup

Run the following SQL in your MySQL client:

```sql
CREATE DATABASE school_management;

USE school_management;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---

##  API Documentation

### Base URL
```
http://localhost:3000/api
```

---

### 1. Add School

**Endpoint**
```
POST /api/addSchool
```

**Request Body**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Noida, UP",
  "latitude": 28.5355,
  "longitude": 77.3910
}
```

**Validation Rules**
| Field | Rule |
|---|---|
| name | Required, non-empty string |
| address | Required, non-empty string |
| latitude | Required, number between -90 and 90 |
| longitude | Required, number between -180 and 180 |

**Success Response** `201 Created`
```json
{
  "message": "School added successfully.",
  "schoolId": 1
}
```

**Error Response** `400 Bad Request`
```json
{
  "error": "All fields are required."
}
```

---

### 2. List Schools

**Endpoint**
```
GET /api/listSchools
```

**Query Parameters**
| Parameter | Type | Required | Description |
|---|---|---|---|
| latitude | Float | Yes | User's current latitude |
| longitude | Float | Yes | User's current longitude |

**Example Request**
```
GET /api/listSchools?latitude=22.8046&longitude=86.2029
```

**Success Response** `200 OK`
```json
{
  "message": "Schools fetched successfully.",
  "userLocation": {
    "latitude": 22.8046,
    "longitude": 86.2029
  },
  "total": 3,
  "schools": [
    {
      "id": 3,
      "name": "Kendriya Vidyalaya",
      "address": "Jugsalai, Jamshedpur",
      "latitude": 22.7726,
      "longitude": 86.1875,
      "distance_km": 3.89
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Noida, UP",
      "latitude": 28.5355,
      "longitude": 77.391,
      "distance_km": 1088.40
    }
  ]
}
```

**Error Response** `400 Bad Request`
```json
{
  "error": "latitude and longitude query params are required."
}
```

---

##  Postman Collection

The Postman collection is included in this repository as a JSON file.

**To use it:**
1. Download `School-management-api.postman_collection.json` from this repo
2. Open Postman
3. Click **Import**
4. Select the downloaded file
5. All requests will be ready to use instantly



##  How Distance Sorting Works

The API uses the **Haversine Formula** to calculate the straight-line distance between two geographic coordinates, accounting for the Earth's curvature.

```
Distance = 2R × arcsin(√(sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)))
```

Where **R = 6371 km** (Earth's radius). Schools are then sorted in ascending order of distance from the user's location.

---

##  Author

Made with ❤️ as part of a Node.js backend assignment.