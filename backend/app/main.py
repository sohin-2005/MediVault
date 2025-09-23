from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text

from app.database import engine, Base

# 🚨 This will create tables automatically if they don't exist
Base.metadata.create_all(bind=engine)

from .database import get_db
from app.routers import expenses, appointments, audit_logs, users, auth

app = FastAPI(
    title="MediVault API",
    description="Medical records management system",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers (✅ make sure no double-prefix issue)
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(expenses.router, prefix="/api/expenses", tags=["Expenses"])
app.include_router(appointments.router, prefix="/api/appointments", tags=["Appointments"])
app.include_router(audit_logs.router, prefix="/api/audit-logs", tags=["Audit Logs"])

# Root routes
@app.get("/")
def root():
    return {"message": "Welcome to MediVault API"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "MediVault API"}

@app.on_event("startup")
async def on_startup():
    print("🚀 MediVault API started successfully!")
    try:
        db = next(get_db())
        db.execute(text("SELECT 1"))
        db.close()
        print("✅ Database connection successful")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "status_code": exc.status_code},
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    # ⚠️ Log full exception for debugging
    print(f"🔥 Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "status_code": 500},
    )

# Entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
