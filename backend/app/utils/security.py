from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.database import Settings   # ✅ import from database.py

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hashing
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

# JWT
def create_access_token(data: dict, expires_minutes: int = None):
    settings = Settings()   # ✅ use from database.py

    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=expires_minutes or settings.JWT_EXPIRES_MINUTES
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
