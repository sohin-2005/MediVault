from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter()

@router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_patients = db.execute("SELECT COUNT(*) FROM patients").scalar()
    total_records = db.execute("SELECT COUNT(*) FROM records").scalar()
    todays_appointments = db.execute(
        "SELECT COUNT(*) FROM appointments WHERE DATE(date) = CURDATE()"
    ).scalar()
    pending_reviews = db.execute(
        "SELECT COUNT(*) FROM reviews WHERE status = 'pending'"
    ).scalar()

    return [
        {"title": "Total Patients", "value": total_patients, "change": "+12%", "icon": "Users", "changeType": "positive"},
        {"title": "Medical Records", "value": total_records, "change": "+8%", "icon": "FileText", "changeType": "positive"},
        {"title": "Appointments Today", "value": todays_appointments, "change": "+5%", "icon": "Calendar", "changeType": "positive"},
        {"title": "Pending Reviews", "value": pending_reviews, "change": "-2%", "icon": "AlertTriangle", "changeType": "negative"},
    ]
