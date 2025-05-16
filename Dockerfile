FROM python:3.11-slim

# Définir des variables d'environnement
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Installer les dépendances système pour PostgreSQL
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier les fichiers de dépendances
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Rendre le script d'entrée exécutable (avec correction des permissions)
RUN chmod +x /app/entrypoint.sh

# Exposer le port sur lequel l'application s'exécutera
EXPOSE 8000

# Utiliser le script d'entrée
ENTRYPOINT ["/app/entrypoint.sh"]

# Commande pour démarrer l'application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "src.wsgi:application", "--pythonpath", "core"] 