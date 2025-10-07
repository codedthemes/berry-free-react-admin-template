from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Pydantic models for request bodies
class HelloMessage(BaseModel):
    message: str

class UserCreate(BaseModel):
    name: str

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


@app.post("/api/hello")
async def post_hello(hello: HelloMessage):
    """
    Receives a hello message and returns a response.
    """
    return {"message": f"Received: {hello.message}", "status": "success"}


@app.post("/api/users")
async def create_user(user: UserCreate):
    """
    Creates a new user and returns the user data with a generated ID.
    """
    # In a real app, this would save to a database
    # For now, we'll just return the user with a mock ID
    return {"id": 3, "name": user.name, "status": "created"}
