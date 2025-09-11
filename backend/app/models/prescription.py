from sqlalchemy import Column, Integer, String, Text, Date, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

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
    created_at = Column(TIMESTAMP, server_default=func.now())
