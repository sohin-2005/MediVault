from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, DECIMAL, Date
from sqlalchemy.sql import func
from .database import Base
from sqlalchemy import Enum as SAEnum
from datetime import date

# Role Enum
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
    frequency = Column(String(100))
    duration = Column(String(100))
    instructions = Column(Text)
    refills_left = Column(Integer)
    progress = Column(Integer)
    status = Column(String, default="active")
    start_date = Column(Date)
    end_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class MedicationHistory(Base):
    __tablename__ = "medication_history"
    id = Column(Integer, primary_key=True, autoincrement=True)
    medication = Column(String)
    dosage = Column(String)
    frequency = Column(String)
    prescribed_by = Column(String)
    prescribed_date = Column(Date)
    completed_date = Column(Date)
    status = Column(String)

class DrugInteraction(Base):
    __tablename__ = "drug_interactions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    medications = Column(String)  # e.g., "Lisinopril, Potassium Supplements"
    severity = Column(String)
    description = Column(Text)
    recommendation = Column(Text)

class Reminder(Base):
    __tablename__ = "reminders"
    id = Column(Integer, primary_key=True, autoincrement=True)
    medication = Column(String)
    time = Column(String)
    status = Column(String)  # "pending", "done"

class MedicalHistory(Base):
    __tablename__ = "medical_history"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, default=date.today)
    diagnosis = Column(String, nullable=False)
    doctor = Column(String, nullable=False)
    status = Column(String, nullable=False)   # e.g. "Ongoing", "Managed"
    severity = Column(String, nullable=False) # e.g. "Mild", "Moderate"

class LabResult(Base):
    __tablename__ = "lab_results"
    id = Column(Integer, primary_key=True, autoincrement=True)
    test = Column(String, nullable=False)
    date = Column(Date, default=date.today)
    result = Column(String, nullable=False)
    values = Column(String, nullable=True)
    status = Column(String, default="completed")

class Allergy(Base):
    __tablename__ = "allergies"
    id = Column(Integer, primary_key=True, autoincrement=True)
    allergen = Column(String, nullable=False)
    reaction = Column(String, nullable=False)
    severity = Column(String, nullable=False)  # e.g. Severe, Moderate
    date_reported = Column(Date, default=date.today)

class Vaccination(Base):
    __tablename__ = "vaccinations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    vaccine = Column(String, nullable=False)
    date = Column(Date, default=date.today)
    dose_number = Column(String, nullable=True)  # e.g. Booster, Annual
    next_due = Column(Date, nullable=True)
    status = Column(String, default="up_to_date")

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
