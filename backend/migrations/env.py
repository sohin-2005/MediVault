# migrations/env.py
from app.database import Base
from app import models

import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

# ensure backend package is importable: add project root to sys.path
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_ROOT = os.path.normpath(os.path.join(CURRENT_DIR, ".."))
sys.path.append(PROJECT_ROOT)

# Now import your app settings and metadata
from app.database import Base, settings  # settings reads .env to get DATABASE_URL
# Also import models so that Base.metadata includes them
import app.models  # noqa: F401

# this is the Alembic Config object, which provides access to the .ini file values
config = context.config

# set sqlalchemy.url dynamically from settings
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# set target_metadata for 'autogenerate'
target_metadata = Base.metadata

def run_migrations_offline():
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
