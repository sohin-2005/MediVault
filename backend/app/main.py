from fastapi import FastAPI
from .database import engine, Base
from . import models
from app.routers import expenses_router, appointments_router, audit_logs_router

app = FastAPI(title="MediVault API")

# Register routers
app.include_router(expenses_router, prefix="/expenses", tags=["Expenses"])
app.include_router(appointments_router, prefix="/appointments", tags=["Appointments"])
app.include_router(audit_logs_router, prefix="/audit-logs", tags=["Audit Logs"])

@app.get("/health")
def health():
    return {"status": "ok"}


# DEVELOPMENT ONLY: auto-create tables (don’t use in production)
@app.on_event("startup")
def on_startup():
    # Base.metadata.create_all(bind=engine)  # uncomment if skipping Alembic migrations
    pass
