from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String(255), nullable=False)
    entity_type = Column(String(100))
    entity_id = Column(Integer)
    ip_address = Column(String(64))
    created_at = Column(TIMESTAMP, server_default=func.now())
