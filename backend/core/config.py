from pydantic_settings import BaseSettings
from typing import Dict, Any
import os

class DatabaseSettings(BaseSettings):
    DATABASE_TYPE: str = os.getenv("DATABASE_TYPE", "postgresql")
    
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "manpower_planning")
    
    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_PORT: str = os.getenv("MYSQL_PORT", "3306")
    MYSQL_USER: str = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "root")
    MYSQL_DB: str = os.getenv("MYSQL_DB", "manpower_planning")
    
    @property
    def database_config(self) -> Dict[str, Dict[str, str]]:
        return {
            "postgresql": {
                "host": self.POSTGRES_HOST,
                "port": self.POSTGRES_PORT,
                "user": self.POSTGRES_USER,
                "password": self.POSTGRES_PASSWORD,
                "database": self.POSTGRES_DB
            },
            "mysql": {
                "host": self.MYSQL_HOST,
                "port": self.MYSQL_PORT,
                "user": self.MYSQL_USER,
                "password": self.MYSQL_PASSWORD,
                "database": self.MYSQL_DB
            }
        }
    
    @property
    def database_url(self) -> str:
        config = self.database_config[self.DATABASE_TYPE]
        if self.DATABASE_TYPE == "postgresql":
            return f"postgresql://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"
        else:
            return f"mysql://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"

settings = DatabaseSettings() 