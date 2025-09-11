from sqlalchemy import Column, Integer, Text, DateTime, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class AppointmentStatus(str, enum.Enum):
    BOOKED = "BOOKED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    status = Column(Enum(AppointmentStatus), server_default="BOOKED")
    notes = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
