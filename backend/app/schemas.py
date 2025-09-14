from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

# ------------------------
# Expenses
# ------------------------
class ExpenseBase(BaseModel):
    patient_id: int
    category: str
    amount: float
    description: Optional[str] = None
    incurred_on: date

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    category: Optional[str] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    incurred_on: Optional[date] = None

class ExpenseOut(ExpenseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ------------------------
# Appointments
# ------------------------
class AppointmentBase(BaseModel):
    patient_id: int
    doctor_id: int
    scheduled_at: datetime
    status: Optional[str] = "BOOKED"
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    scheduled_at: Optional[datetime] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class AppointmentOut(AppointmentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ------------------------
# Audit Logs
# ------------------------
class AuditLogBase(BaseModel):
    user_id: Optional[int] = None
    action: str
    entity_type: Optional[str] = None
    entity_id: Optional[int] = None
    ip_address: Optional[str] = None

class AuditLogCreate(AuditLogBase):
    pass

class AuditLogOut(AuditLogBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
