
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Defaults safe for dev; override with env vars
    DB_DRIVER: str = "postgresql+psycopg"  # or mysql+mysqldb / mysql+pymysql
    DB_USER: str = "appuser"
    DB_PASSWORD: str = "secret"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "appdb"

    SQLALCHEMY_ECHO: bool = False
    SQLALCHEMY_POOL_SIZE: int = 10
    SQLALCHEMY_MAX_OVERFLOW: int = 20
    SQLALCHEMY_POOL_PRE_PING: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

def build_sync_db_url() -> str:
    return f"{settings.DB_DRIVER}://{settings.DB_USER}:{settings.DB_PASSWORD}" \
           f"@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"

