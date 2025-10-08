from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database import get_db, engine
from app.models import Hello, Base, Sample

# Create all tables in the database (will not recreate existing tables)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Pydantic models for request validation
class MessageRequest(BaseModel):
    message: str

class UserRequest(BaseModel):
    name: str

class User(BaseModel):
    id: int
    name: str

# --- Pydantic schemas (define BEFORE endpoints!) ---
class SampleSchema(BaseModel):
    name: str
    description: Optional[str] = None

class SampleResponse(SampleSchema):
    id: int
    class Config:
        orm_mode = True

# In-memory user storage
users_db: List[User] = [
    User(id=1, name="Alice"),
    User(id=2, name="Bob")
]

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
async def get_hello():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/users")
async def get_users():
    return users_db

from fastapi import HTTPException

@app.patch("/api/hello")
async def patch_hello(request: MessageRequest, db: Session = Depends(get_db)):
    hello = db.query(Hello).first()
    if not hello:
        return {"detail": "No hello message to update."}
    hello.message = request.message
    db.commit()
    db.refresh(hello)
    return {"id": hello.id, "message": hello.message}

@app.post("/api/users")
async def create_user(request: UserRequest):
    new_id = max([u.id for u in users_db], default=0) + 1
    new_user = User(id=new_id, name=request.name)
    users_db.append(new_user)
    return new_user



@app.post("/api/samples/", response_model=SampleResponse)
async def create_sample(sample: SampleSchema, db: Session = Depends(get_db)):
    db_sample = Sample(**sample.dict())
    db.add(db_sample)
    db.commit()
    db.refresh(db_sample)
    return db_sample

@app.get("/api/samples/", response_model=List[SampleResponse])
async def read_samples(db: Session = Depends(get_db)):
    return db.query(Sample).all()

@app.get("/api/samples/{sample_id}", response_model=SampleResponse)
async def read_sample(sample_id: int, db: Session = Depends(get_db)):
    sample = db.query(Sample).filter(Sample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")
    return sample

@app.put("/api/samples/{sample_id}", response_model=SampleResponse)
async def update_sample(sample_id: int, sample: SampleSchema, db: Session = Depends(get_db)):
    db_sample = db.query(Sample).filter(Sample.id == sample_id).first()
    if not db_sample:
        raise HTTPException(status_code=404, detail="Sample not found")
    db_sample.name = sample.name
    db_sample.description = sample.description
    db.commit()
    db.refresh(db_sample)
    return db_sample

@app.delete("/api/samples/{sample_id}")
async def delete_sample(sample_id: int, db: Session = Depends(get_db)):
    db_sample = db.query(Sample).filter(Sample.id == sample_id).first()
    if not db_sample:
        raise HTTPException(status_code=404, detail="Sample not found")
    db.delete(db_sample)
    db.commit()
    return {"ok": True}