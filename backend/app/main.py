from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database import get_db, engine
from app.models import Hello, Base, Sample, User  # SQLAlchemy models only!

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- Pydantic schemas (for request/response only!) ---
class MessageRequest(BaseModel):
    message: str

class HelloResponse(BaseModel):
    id: int
    message: str
    class Config:
        orm_mode = True

class UserRequest(BaseModel):
    name: str

class UserResponse(BaseModel):
    id: int
    name: str
    class Config:
        orm_mode = True

class SampleSchema(BaseModel):
    name: str
    description: Optional[str] = None

class SampleResponse(SampleSchema):
    id: int
    class Config:
        orm_mode = True

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello", response_model=List[HelloResponse])
async def get_hellos(db: Session = Depends(get_db)):
    return db.query(Hello).all()

@app.get("/api/users", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.post("/api/hello", response_model=HelloResponse)
async def post_hello(request: MessageRequest, db: Session = Depends(get_db)):
    hello = db.query(Hello).first()
    if not hello:
        hello = Hello(message=request.message)
        db.add(hello)
    else:
        hello.message = request.message
    db.commit()
    db.refresh(hello)
    return hello

@app.post("/api/users", response_model=UserResponse)
async def create_user(request: UserRequest, db: Session = Depends(get_db)):
    user = User(name=request.name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

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