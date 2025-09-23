import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# --- Path setup ---
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_ROOT = os.path.normpath(os.path.join(CURRENT_DIR, ".."))
sys.path.append(PROJECT_ROOT)

# --- Import app modules ---
from app.database import Base  # contains declarative Base
import app.models  # noqa: F401 (ensures all models are registered)
from app.config import settings  # your app settings

# --- Alembic config ---
config = context.config

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ✅ Pick the right DB URL
# - Use DATABASE_URL_LOCAL when running Alembic locally
# - Fall back to DATABASE_URL (used inside Docker)
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)




# Metadata for autogenerate
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
