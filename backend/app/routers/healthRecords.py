from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import MedicalHistory, LabResult, Allergy, Vaccination

router = APIRouter(prefix="/health-records", tags=["Health Records"])

# ----------------------------
# GET all health records (for dashboard)
# ----------------------------
@router.get("/")
def get_health_records(db: Session = Depends(get_db)):
    history = db.query(MedicalHistory).all()
    labs = db.query(LabResult).all()
    allergies = db.query(Allergy).all()
    vaccinations = db.query(Vaccination).all()

    return {
        "medicalHistory": [h.as_dict() for h in history],
        "labResults": [l.as_dict() for l in labs],
        "allergies": [a.as_dict() for a in allergies],
        "vaccinations": [v.as_dict() for v in vaccinations],
    }
