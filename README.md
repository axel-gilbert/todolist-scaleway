# Application Django conteneurisée

Cette application Django est conteneurisée avec Docker pour faciliter le déploiement et le développement. L'application utilise PostgreSQL comme base de données.

## Prérequis

- Docker
- Docker Compose

## Configuration

L'application utilise un fichier `.env` pour configurer les variables d'environnement. Vous pouvez personnaliser les paramètres suivants :

```
# Django settings
DEBUG=True
SECRET_KEY=dev_key_replace_in_production
ALLOWED_HOSTS=localhost,127.0.0.1

# Database settings
DB_ENGINE=django.db.backends.postgresql
DB_NAME=django_db
DB_USER=django_user
DB_PASSWORD=django_password
DB_HOST=db
DB_PORT=5432
```

## Installation et démarrage

1. Clonez ce dépôt :
   ```bash
   git clone <votre-dépôt>
   cd <dossier-du-projet>
   ```

2. Construisez et démarrez les conteneurs :
   ```bash
   docker-compose up --build
   ```

3. L'application sera accessible à l'adresse : http://localhost:8000

## Commandes utiles

- Démarrer les conteneurs en arrière-plan :
  ```bash
  docker-compose up -d
  ```

- Arrêter les conteneurs :
  ```bash
  docker-compose down
  ```

- Exécuter des commandes Django :
  ```bash
  docker-compose exec web python core/manage.py <commande>
  ```

- Créer des migrations :
  ```bash
  docker-compose exec web python core/manage.py makemigrations
  ```

- Appliquer les migrations :
  ```bash
  docker-compose exec web python core/manage.py migrate
  ```

- Créer un super utilisateur :
  ```bash
  docker-compose exec web python core/manage.py createsuperuser
  ```

- Accéder à la base de données PostgreSQL :
  ```bash
  docker-compose exec db psql -U django_user -d django_db
  ```

## Déploiement en production

Pour le déploiement en production, assurez-vous de :
1. Modifier la variable `DEBUG` à `False` dans le fichier .env
2. Générer et définir une nouvelle clé secrète pour `SECRET_KEY`
3. Configurer correctement `ALLOWED_HOSTS` dans le fichier .env
4. Utiliser des mots de passe forts pour la base de données
5. Configurer un proxy inverse comme Nginx en production 