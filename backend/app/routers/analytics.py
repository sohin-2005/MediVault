from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter(prefix="/analytics", tags=["Analytics"])

# ✅ System usage stats (users, sessions, records over time)
@router.get("/system-usage")
def get_system_usage(db: Session = Depends(get_db)):
    rows = db.execute("SELECT month, users, sessions, records FROM system_usage ORDER BY month").fetchall()
    return [dict(r) for r in rows]

# ✅ Patient demographics (by age group)
@router.get("/demographics")
def get_patient_demographics(db: Session = Depends(get_db)):
    rows = db.execute("SELECT age_group, count, percentage FROM demographics").fetchall()
    return [dict(r) for r in rows]

# ✅ Appointment metrics
@router.get("/appointments")
def get_appointment_metrics(db: Session = Depends(get_db)):
    return [
        {"metric": "Average Wait Time", "value": "12 minutes", "trend": "down", "change": "-8%"},
        {"metric": "Completion Rate", "value": "94%", "trend": "up", "change": "+2%"},
        {"metric": "No-Show Rate", "value": "8%", "trend": "down", "change": "-3%"},
        {"metric": "Satisfaction", "value": "4.7/5", "trend": "up", "change": "+0.2"},
    ]

# ✅ Audit logs
@router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.execute("SELECT id, user, action, patient, ip_address, status, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 20").fetchall()
    return [
        {
            "id": l.id,
            "user": l.user,
            "action": l.action,
            "patient": l.patient,
            "ipAddress": l.ip_address,
            "status": l.status,
            "timestamp": str(l.created_at),
        }
        for l in logs
    ]

# ✅ Exported reports
@router.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    reports = db.execute("SELECT id, report_name, generated_by, date_generated, format, size, download_count FROM reports").fetchall()
    return [dict(r) for r in reports]
