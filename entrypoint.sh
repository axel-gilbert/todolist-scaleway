#!/bin/bash

# Fonction pour attendre que PostgreSQL soit prêt
wait_for_postgres() {
  echo "Waiting for PostgreSQL..."
  
  while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER > /dev/null 2>&1; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 1
  done
  
  echo "PostgreSQL is up - continuing"
}

# Attendre que PostgreSQL soit prêt
wait_for_postgres

# Appliquer les migrations
echo "Applying migrations..."
cd core
python manage.py migrate --noinput

# Collecter les fichiers statiques
echo "Collecting static files..."
python manage.py collectstatic --noinput
cd ..

# Exécuter la commande passée à Docker
exec "$@" 