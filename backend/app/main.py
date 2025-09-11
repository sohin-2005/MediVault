# app/main.py
from fastapi import FastAPI
from .database import engine, Base
from . import models  # ensure models are imported so metadata is registered

app = FastAPI(title="MediVault API")

@app.get("/health")
def health():
    return {"status": "ok"}

# DEVELOPMENT ONLY: create tables if you want to bypass Alembic (not for prod)
@app.on_event("startup")
def on_startup():
    # uncomment to create tables automatically (useful for quick dev)
    # Base.metadata.create_all(bind=engine)
    pass
