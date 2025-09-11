from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    speciality = Column(String(255))
    license_no = Column(String(100))
