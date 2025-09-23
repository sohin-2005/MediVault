from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter(prefix="/administration", tags=["Administration"])

# ✅ Fetch all users
@router.get("/users")
def get_system_users(db: Session = Depends(get_db)):
    users = db.execute("SELECT id, name, email, role, status, last_login, created_at FROM users").fetchall()
    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "status": u.status,
            "lastLogin": u.last_login,
            "permissions": ["FULL_ACCESS"] if u.role == "admin" else ["READ_PATIENTS"],
            "createdDate": str(u.created_at),
        }
        for u in users
    ]

# ✅ Fetch system settings (could also be a config table)
@router.get("/settings")
def get_system_settings():
    return [
        {
            "category": "Security",
            "settings": [
                {"name": "Password Policy", "value": "Strong", "status": "configured"},
                {"name": "Two-Factor Authentication", "value": "Enabled", "status": "enabled"},
            ],
        },
        {
            "category": "Data Management",
            "settings": [
                {"name": "Automatic Backup", "value": "Daily", "status": "enabled"},
                {"name": "Data Retention", "value": "7 years", "status": "configured"},
            ],
        },
    ]

# ✅ Fetch system health (mock or from monitoring tool)
@router.get("/health")
def get_system_health():
    return [
        {"component": "Database", "status": "healthy", "uptime": "99.9%", "lastCheck": "2 min ago"},
        {"component": "Web Server", "status": "healthy", "uptime": "99.8%", "lastCheck": "1 min ago"},
        {"component": "Security Scanner", "status": "warning", "uptime": "98.2%", "lastCheck": "10 min ago"},
    ]

# ✅ Fetch change logs (from audit_logs table)
@router.get("/audit-logs")
def get_recent_changes(db: Session = Depends(get_db)):
    logs = db.execute("SELECT id, user, action, category, status, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 20").fetchall()
    return [
        {
            "id": l.id,
            "user": l.user,
            "action": l.action,
            "category": l.category,
            "status": l.status,
            "timestamp": str(l.created_at),
        }
        for l in logs
    ]
