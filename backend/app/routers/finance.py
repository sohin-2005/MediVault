# routes/finance.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter(prefix="/finance", tags=["Finance"])

@router.get("/")
def get_finance(db: Session = Depends(get_db)):
    return {
        "monthlySpending": [...],
        "expenseCategories": [...],
        "recentTransactions": [...],
        "yearlyBudget": {...},
    }
