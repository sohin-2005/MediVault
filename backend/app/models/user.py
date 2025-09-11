from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base
import enum

class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    DOCTOR = "DOCTOR"
    PATIENT = "PATIENT"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    full_name = Column(String(255))
    phone = Column(String(50))
    photo_url = Column(String(500))
    created_at = Column(TIMESTAMP, server_default=func.now())
