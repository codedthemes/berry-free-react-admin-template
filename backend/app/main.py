from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database import get_db, engine
from app.models import Hello, Base, Sample, TesteUser, User
import os
from dotenv import load_dotenv

# Load variables from .env into environment
load_dotenv()

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

class TesteUserRequest(BaseModel):
    name: str

class TesteUserResponse(BaseModel):
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


class UserInDB(BaseModel):
    hashed_password: str

# CONFIGURATION
# python -c "import secrets; print(secrets.token_urlsafe(64))"
SECRET_KEY = os.environ["JWT_SECRET_KEY"]
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dummy database
fake_users_db = {
    "leandro": {
        "username": "leandro",
        "full_name": "Leandro Afonso",
        "email": "leandro@gix.com",
        "hashed_password": pwd_context.hash("123"),
        "disabled": False,
    },
    "joao": {
        "username": "joao",
        "full_name": "Joao Teste",
        "email": "joao@gix.com",
        "hashed_password": pwd_context.hash("123"),
        "disabled": False,
    }
}

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

@app.get("/api/users", response_model=List[TesteUserResponse])
async def get_users(db: Session = Depends(get_db)):
    return db.query(TesteUser).all()

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

@app.post("/api/users", response_model=TesteUserResponse)
async def create_user(request: TesteUserRequest, db: Session = Depends(get_db)):
    user = TesteUser(name=request.name)
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




# Utility functions
def verify_password(plain_password, hashed_password):
    print(plain_password)

    return pwd_context.verify(plain_password, hashed_password)

def get_user(db, username: str):
    if username in db:
        return UserInDB(**db[username])

def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Dependency to get current user from token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Token endpoint
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Protected endpoint
@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user