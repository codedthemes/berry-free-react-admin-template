# FastAPI Backend for Berry React Admin Template

This is a FastAPI backend that provides API endpoints for the Berry React Admin Template frontend.

## Features

- **GET /api/hello** - Returns a greeting message
- **POST /api/hello** - Accepts a message and echoes it back
- **GET /api/users** - Returns a list of sample users
- **POST /api/users** - Creates a new user and adds it to the in-memory list
- CORS support for `http://localhost:3000` (React frontend)

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python3 -m venv venv
```

3. Activate the virtual environment:
   - On Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. Install the dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend

Start the FastAPI server using uvicorn:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`

## API Endpoints

### GET /api/hello

Returns a greeting message.

**Response:**
```json
{
  "message": "Hello from FastAPI!"
}
```

**Example:**
```bash
curl http://localhost:8000/api/hello
```

### POST /api/hello

Accepts a message and echoes it back.

**Request Body:**
```json
{
  "message": "Your custom message"
}
```

**Response:**
```json
{
  "message": "Your custom message"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from the client!"}'
```

### GET /api/users

Returns a list of sample users.

**Response:**
```json
[
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"}
]
```

**Example:**
```bash
curl http://localhost:8000/api/users
```

### POST /api/users

Creates a new user and adds it to the in-memory list.

**Request Body:**
```json
{
  "name": "John Doe"
}
```

**Response:**
```json
{
  "id": 3,
  "name": "John Doe"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'
```

## Interactive API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Development

The `--reload` flag enables auto-reload on code changes, which is useful during development.

## Integration with React Frontend

The backend is configured to accept requests from the React frontend running on `http://localhost:3000`. Make sure both the backend and frontend are running simultaneously for proper integration.

To start the React frontend, navigate to the `vite` directory and run:
```bash
npm install  # or yarn install
npm start    # or yarn start
```
