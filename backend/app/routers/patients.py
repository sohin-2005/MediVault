# routes/patients.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Patient  # assuming you have a Patient model in models.py

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return patients
