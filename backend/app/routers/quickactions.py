from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base


class QuickAction(Base):
    __tablename__ = "quick_actions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(100), nullable=False)              # e.g. "Add New Patient"
    description = Column(Text, nullable=True)                # e.g. "Register a new patient"
    icon = Column(String(50), nullable=True)                 # e.g. "UserPlus"
    color = Column(String(50), nullable=True)                # e.g. "bg-blue-500 hover:bg-blue-600"
    route = Column(String(200), nullable=True)               # frontend route e.g. "/patients"
    api_endpoint = Column(String(200), nullable=True)        # backend API e.g. "/patients"
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
