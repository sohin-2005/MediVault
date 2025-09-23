from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None
    DATABASE_URL_LOCAL: Optional[str] = None
    DATABASE_URL_DOCKER: Optional[str] = None

    JWT_SECRET: str = "supersecretkey"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRES_MINUTES: int = 60

    # Pydantic settings
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def effective_db_url(self) -> str:
        """Return whichever DB URL is available, in priority order"""
        if self.DATABASE_URL:
            return self.DATABASE_URL
        if self.DATABASE_URL_LOCAL:
            return self.DATABASE_URL_LOCAL
        if self.DATABASE_URL_DOCKER:
            return self.DATABASE_URL_DOCKER
        raise ValueError("❌ No valid DATABASE_URL found in environment")


settings = Settings()
