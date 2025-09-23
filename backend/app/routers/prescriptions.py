# routes/prescriptions.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Prescription, MedicationHistory, DrugInteraction, Reminder  # assume you have these models

router = APIRouter(prefix="/prescriptions", tags=["Prescriptions"])

@router.get("/")
def get_prescriptions(db: Session = Depends(get_db)):
    active = db.query(Prescription).filter(Prescription.status == "active").all()
    history = db.query(MedicationHistory).all()
    interactions = db.query(DrugInteraction).all()
    reminders = db.query(Reminder).all()
    
    return {
        "activePrescriptions": active,
        "medicationHistory": history,
        "drugInteractions": interactions,
        "upcomingReminders": reminders,
    }
