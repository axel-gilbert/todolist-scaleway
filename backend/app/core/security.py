from datetime import datetime, timedelta
from typing import Any, Dict, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.core.config import settings
from app.db.init_db import get_db
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentification invalide",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print(f"Token reçu: {token}")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        print(f"Payload décodé: {payload}")
        
        user_id = payload.get("sub")
        print(f"ID utilisateur extrait: {user_id}, type: {type(user_id)}")
        
        if user_id is None:
            print("Aucun ID utilisateur trouvé dans le token")
            raise credentials_exception
            
        # Assurer que user_id est une chaîne pour la comparaison
        user_id_str = str(user_id)
        print(f"Recherche de l'utilisateur avec ID: {user_id_str}")
    except JWTError as e:
        print(f"Erreur JWT: {e}")
        raise credentials_exception
    
    # Rechercher l'utilisateur par ID
    user = db.query(User).filter(User.id == user_id_str).first()
    
    # Si l'utilisateur n'est pas trouvé par ID chaîne, essayer avec un ID entier
    if user is None:
        try:
            user_id_int = int(user_id)
            print(f"Tentative avec ID numérique: {user_id_int}")
            user = db.query(User).filter(User.id == user_id_int).first()
        except (ValueError, TypeError):
            pass
    
    if user is None:
        print(f"Aucun utilisateur trouvé avec ID: {user_id}")
        raise credentials_exception
        
    print(f"Utilisateur trouvé: {user.id}, {user.first_name} {user.last_name}")
    return user 