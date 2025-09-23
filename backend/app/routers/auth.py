from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
import bcrypt
from jose import jwt, JWTError
from pydantic import BaseModel, EmailStr
from enum import Enum

from app.database import get_db, Settings
from app.models import User

# Router (⚠️ no prefix here, main.py already adds /api/auth)
router = APIRouter(tags=["Auth"])

# Security
security = HTTPBearer()

settings = Settings()
SECRET_KEY = settings.JWT_SECRET
ALGORITHM = settings.JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.JWT_EXPIRES_MINUTES


# Enums
class AccountType(str, Enum):
    patient = "patient"
    doctor = "doctor"
    admin = "admin"


class Gender(str, Enum):
    male = "male"
    female = "female"
    other = "other"
    prefer_not_to_say = "prefer_not_to_say"


# Schemas
class UserRegistration(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    phone_number: str
    date_of_birth: str
    gender: Gender
    account_type: AccountType
    address: str
    emergency_contact: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    account_type: AccountType


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    account_type: str


class UserResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    account_type: str
    is_verified: bool
    created_at: datetime


# Utility Functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )


def get_current_user(db: Session = Depends(get_db), user_id: int = Depends(verify_token)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


# Routes
@router.post("/register", response_model=dict)
async def register(user_data: UserRegistration, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    if len(user_data.password) < 8:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be at least 8 characters")

    hashed_password = hash_password(user_data.password)

    try:
        date_of_birth = datetime.strptime(user_data.date_of_birth, "%Y-%m-%d").date()

        new_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        password_hash=hashed_password,
        phone_number=user_data.phone_number,
        date_of_birth=date_of_birth,
        gender=user_data.gender.value,
        account_type=user_data.account_type.value,
        address=user_data.address,
        emergency_contact=user_data.emergency_contact,
        is_verified=False,
        # no need to pass created_at, DB sets it automatically
    )


        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "User registered successfully",
            "user_id": new_user.id,
            "email": new_user.email,
        }

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD",
        )
    except Exception as e:
        db.rollback()
        # log error for debugging
        print(f"🔥 Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user",
        )


@router.post("/login", response_model=Token)
async def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    if user.account_type != login_data.account_type.value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid account type")

    if not user.is_verified:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account not verified")

    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "account_type": user.account_type}
    )

    return Token(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        account_type=user.account_type,
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        account_type=current_user.account_type,
        is_verified=current_user.is_verified,
        created_at=current_user.created_at,
    )
