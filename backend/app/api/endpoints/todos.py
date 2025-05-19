from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate, Todo as TodoSchema
from app.core.deps import get_current_active_user
from app.db.init_db import get_db
from app.models.user import User

router = APIRouter()

@router.get("/todos", response_model=List[TodoSchema])
def read_todos(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Récupérer tous les todos de l'utilisateur connecté
    """
    todos = db.query(Todo).filter(Todo.user_id == current_user.id).offset(skip).limit(limit).all()
    return todos

@router.post("/todos", response_model=TodoSchema)
def create_todo(
    *,
    db: Session = Depends(get_db),
    todo_in: TodoCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Créer un nouveau todo
    """
    todo = Todo(
        title=todo_in.title,
        description=todo_in.description,
        completed=todo_in.completed,
        user_id=current_user.id,
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@router.get("/todos/{todo_id}", response_model=TodoSchema)
def read_todo(
    *,
    db: Session = Depends(get_db),
    todo_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Récupérer un todo par ID
    """
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )
    return todo

@router.put("/todos/{todo_id}", response_model=TodoSchema)
def update_todo(
    *,
    db: Session = Depends(get_db),
    todo_id: int,
    todo_in: TodoUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Mettre à jour un todo
    """
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )
    
    update_data = todo_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(todo, field, value)
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@router.delete("/todos/{todo_id}", response_model=TodoSchema)
def delete_todo(
    *,
    db: Session = Depends(get_db),
    todo_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Supprimer un todo
    """
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )
    
    db.delete(todo)
    db.commit()
    return todo 