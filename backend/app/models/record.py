from sqlalchemy import Column, Integer, Text, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"))
    diagnosis = Column(Text)
    report_url = Column(String(500))
    allergies = Column(Text)
    vaccinations = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
