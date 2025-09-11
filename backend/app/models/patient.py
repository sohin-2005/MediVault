from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    emergency_contact = Column(String(255))
