
# main.py
import os
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import Base, engine, SessionLocal
from models import Task
from schemas import TaskCreate, TaskUpdate, TaskOut

# ---- Initialize DB ----
Base.metadata.create_all(bind=engine)

# ---- App ----
app = FastAPI(
    title="Tasks API",
    version="1.0.0",
    description="A simple CRUD API for tasks built with FastAPI + SQLAlchemy."
)

# ---- CORS (optional) ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Dependencies ----
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

API_KEY = os.getenv("API_KEY", "dev-secret-key")  # set in env for prod

def require_api_key(x_api_key: str = Header(None)):
    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key",
            headers={"WWW-Authenticate": "APIKey"},
        )

# ---- Routes ----
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

@app.post("/tasks", response_model=TaskOut, status_code=201, dependencies=[Depends(require_api_key)], tags=["tasks"])
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    task = Task(title=payload.title, description=payload.description, completed=payload.completed)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@app.get("/tasks", response_model=List[TaskOut], dependencies=[Depends(require_api_key)], tags=["tasks"])
def list_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = db.query(Task).offset(skip).limit(limit).all()
    return tasks

@app.get("/tasks/{task_id}", response_model=TaskOut, dependencies=[Depends(require_api_key)], tags=["tasks"])
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found")
    return task

@app.patch("/tasks/{task_id}", response_model=TaskOut, dependencies=[Depends(require_api_key)], tags=["tasks"])
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    return task

@app.delete("/tasks/{task_id}", status_code=204, dependencies=[Depends(require_api_key)], tags=["tasks"])
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found")
    db.delete(task)
    db.commit()
    return None
