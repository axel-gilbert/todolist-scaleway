from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password, get_current_user
from app.db.init_db import get_db
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserCreate, User as UserSchema

router = APIRouter()

@router.post("/auth/login", response_model=Token)
def login(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    Obtenir le token d'accès JWT pour l'accès
    """
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Assurer que l'ID utilisateur est une chaîne pour le JWT
    user_id_str = str(user.id)
    print(f"Création d'un token pour l'utilisateur ID: {user_id_str}")
    
    return {
        "access_token": create_access_token(
            data={"sub": user_id_str}, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/auth/register", response_model=Token)
def register(*, db: Session = Depends(get_db), user_in: UserCreate) -> Any:
    """
    Créer un nouvel utilisateur et retourner un token pour la connexion automatique
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="L'utilisateur avec cet email existe déjà",
        )
    
    user = User(
        email=user_in.email,
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        hashed_password=get_password_hash(user_in.password),
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Générer un token pour la connexion automatique
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    user_id_str = str(user.id)
    
    return {
        "access_token": create_access_token(
            data={"sub": user_id_str}, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.get("/users/me", response_model=UserSchema)
def get_current_user_info(current_user: User = Depends(get_current_user)) -> Any:
    """
    Récupérer les informations de l'utilisateur actuellement connecté
    """
    return current_user 