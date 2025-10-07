from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS for React frontend running on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
async def get_hello():
    """
    Returns a greeting message from the API.
    """
    return {"message": "Hello from FastAPI!"}


@app.get("/api/users")
async def get_users():
    """
    Returns a list of sample users.
    """
    return [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"}
    ]
