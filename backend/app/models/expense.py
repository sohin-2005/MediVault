from sqlalchemy import Column, Integer, String, DECIMAL, Date, TIMESTAMP, Enum, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class ExpenseCategory(str, enum.Enum):
    CONSULTATION = "CONSULTATION"
    MEDICINE = "MEDICINE"
    LAB = "LAB"
    OTHER = "OTHER"

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(Enum(ExpenseCategory), server_default="OTHER")
    amount = Column(DECIMAL(10, 2), nullable=False)
    description = Column(String(255))
    incurred_on = Column(Date, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
