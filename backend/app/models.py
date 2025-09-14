# app/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, DECIMAL, Date, Enum
from sqlalchemy.sql import func
from .database import Base

# simple role enum via DB-level enum string
from sqlalchemy import Enum as SAEnum

RoleEnum = SAEnum("ADMIN", "DOCTOR", "PATIENT", name="roleenum")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(RoleEnum, nullable=False)
    full_name = Column(String(255))
    phone = Column(String(50))
    photo_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    emergency_contact = Column(String(255))

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    speciality = Column(String(255))
    license_no = Column(String(100))

class Record(Base):
    __tablename__ = "records"
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    diagnosis = Column(Text)
    report_url = Column(String(500))
    allergies = Column(Text)
    vaccinations = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    medication = Column(String(255), nullable=False)
    dosage = Column(String(255))
    instructions = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    status = Column(String(20), default="BOOKED")
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String(50), default="OTHER")
    amount = Column(DECIMAL(10,2), nullable=False)
    description = Column(String(255))
    incurred_on = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(255), nullable=False)
    entity_type = Column(String(100))
    entity_id = Column(Integer)
    ip_address = Column(String(64))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
