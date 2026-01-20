
# schemas.py
from pydantic import BaseModel, Field

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = Field(None, max_length=1024)
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=255)
    description: str | None = Field(None, max_length=1024)
    completed: bool | None = None

class TaskOut(TaskBase):
    id: int

    class Config:
        from_attributes = True  # enables ORM -> schema
