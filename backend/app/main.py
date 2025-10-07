from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Pydantic models for request validation
class MessageRequest(BaseModel):
    message: str

class UserRequest(BaseModel):
    name: str

class User(BaseModel):
    id: int
    name: str

# In-memory user storage
users_db: List[User] = [
    User(id=1, name="Alice"),
    User(id=2, name="Bob")
]

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
    return users_db


@app.post("/api/hello")
async def post_hello(request: MessageRequest):
    """
    Accepts a message and echoes it back.
    """
    return {"message": request.message}


@app.post("/api/users")
async def create_user(request: UserRequest):
    """
    Creates a new user and adds it to the in-memory list.
    """
    new_id = max([u.id for u in users_db], default=0) + 1
    new_user = User(id=new_id, name=request.name)
    users_db.append(new_user)
    return new_user


