# test_settings.py
from app.config import Settings  # or wherever your Settings class is

settings = Settings()
print(settings.dict())
