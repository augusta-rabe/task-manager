# 🚀 Task Manager Pro

Une application moderne de gestion de tâches développée avec Flask, containerisée avec Docker et déployable sur Kubernetes.

## ✨ Fonctionnalités

- 🎨 **Interface moderne et intuitive**
  - Design responsive et épuré
  - Animations fluides et transitions élégantes
  - Thème sombre avec dégradés modernes
  - Modales interactives pour les actions importantes
  - Statistiques en temps réel avec cartes animées

- 📊 **Tableau de bord dynamique**
  - Vue d'ensemble des tâches en temps réel
  - Statistiques visuelles avec icônes
  - Taux de completion automatique
  - Filtrage par priorité avec code couleur
  - Interface adaptative pour mobile et desktop

- 🎯 **Gestion avancée des tâches**
  - Création rapide via modal
  - Système de priorités (Faible, Moyenne, Élevée)
  - Confirmation de suppression élégante
  - Actions rapides (compléter/supprimer)
  - Historique des dates de création

- 🔄 **API REST complète**
  - Endpoints CRUD pour les tâches
  - Statistiques en temps réel
  - Validation des données
  - Réponses JSON structurées
  - Gestion des erreurs

- 🛡️ **Sécurité et Performance**
  - Validation côté serveur
  - Protection CSRF
  - Requêtes préparées
  - Optimisation des performances
  - Gestion des erreurs robuste

- 🐳 **Infrastructure moderne**
  - Containerisation Docker
  - Orchestration Kubernetes
  - Configuration via variables d'environnement
  - Mise à l'échelle horizontale
  - Monitoring intégré

## 📸 Aperçu

L'application offre une expérience utilisateur premium avec :
- **Interface principale**
  - En-tête avec titre et bouton d'action rapide
  - Cartes de statistiques animées
  - Liste de tâches interactive
  - Modales élégantes pour les actions

- **Fonctionnalités clés**
  - Ajout de tâches via modal
  - Confirmation de suppression stylisée
  - Filtrage visuel par priorité
  - Actions rapides sur les tâches
  - Statistiques en temps réel

## 🛠️ Technologies utilisées

- **Backend**
  - Flask (Framework Python)
  - SQLAlchemy (ORM)
  - Flask-CORS (Gestion CORS)
  - Gunicorn (Serveur WSGI)

- **Frontend**
  - HTML5 & CSS3 moderne
  - JavaScript (ES6+)
  - Font Awesome (Icônes)
  - Animations CSS personnalisées

- **Base de données**
  - SQLite (Développement)
  - PostgreSQL (Production)

- **Infrastructure**
  - Docker & Docker Compose
  - Kubernetes
  - Nginx Ingress
  - Gunicorn

## 📋 Prérequis

- Python 3.11+
- Docker & Docker Compose
- Kubernetes (kubectl configuré)
- Make (optionnel)

## 🚀 Installation rapide

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd task-manager-app
```

### 2. Développement local
```bash
# Installation
make install

# Lancement
make run
```
Accès: http://localhost:5000

### 3. Docker
```bash
# Construction et lancement
make docker-run

# Arrêt
make docker-stop
```

### 4. Kubernetes
```bash
# Déploiement
make k8s-deploy

# Vérification
make k8s-status

# Logs
make k8s-logs
```

## 📁 Structure du projet

```
task-manager-app/
├── app/
│   ├── __init__.py          # Configuration Flask
│   ├── models.py           # Modèles de données
│   ├── routes.py           # Routes et API
│   └── templates/
│       └── index.html      # Interface utilisateur
├── k8s/                    # Configurations Kubernetes
│   ├── deployment.yaml     # Déploiement
│   ├── service.yaml        # Service
│   ├── ingress.yaml        # Ingress
│   └── configmap-secret.yaml # Configuration
├── tests/                  # Tests unitaires
├── requirements.txt        # Dépendances Python
├── Dockerfile             # Image Docker
├── docker-compose.yml     # Orchestration locale
├── Makefile              # Raccourcis de commandes
└── README.md             # Documentation
```

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|---------|
| `SECRET_KEY` | Clé secrète Flask | `dev-secret-key` |
| `DATABASE_URL` | URL de la base de données | `sqlite:///tasks.db` |
| `FLASK_ENV` | Environnement | `development` |

### Interface utilisateur

L'application propose une interface moderne avec :
- **En-tête**
  - Titre de l'application
  - Bouton d'ajout rapide
  - Design responsive

- **Tableau de bord**
  - Cartes de statistiques
  - Animations au survol
  - Mise à jour en temps réel

- **Liste des tâches**
  - Filtrage par priorité
  - Actions rapides
  - Confirmation de suppression
  - Design adaptatif

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/tasks` | Liste toutes les tâches |
| `POST` | `/api/tasks` | Crée une nouvelle tâche |
| `PUT` | `/api/tasks/<id>` | Met à jour une tâche |
| `DELETE` | `/api/tasks/<id>` | Supprime une tâche |
| `GET` | `/api/stats` | Statistiques globales |

## 🐳 Docker

### Construction
```bash
make docker-build
```

### Variables d'environnement
```bash
docker run -e SECRET_KEY=your-key -e DATABASE_URL=postgresql://user:pass@db:5432/tasks task-manager
```

## ☸️ Kubernetes

### Déploiement
```bash
# Déploiement complet
make k8s-deploy

# Vérification
make k8s-status

# Logs
make k8s-logs
```

### Commandes utiles
```bash
# Port-forward
make k8s-port-forward

# Mise à l'échelle
make k8s-scale

# Nettoyage
make k8s-delete
```

## 🧪 Tests

```bash
# Tests unitaires
make test

# Tests avec couverture
python -m pytest --cov=app tests/
```

## 🔒 Sécurité

- ✅ Validation des données
- ✅ Protection CSRF
- ✅ Requêtes préparées
- ✅ Variables d'environnement
- ✅ Utilisateur non-root dans Docker

## 🚀 Optimisations

### Performance
- Gunicorn avec workers multiples
- Mise en cache des statistiques
- Optimisation des requêtes SQL
- Compression des assets

### UX/UI
- Design responsive
- Animations fluides
- Modales interactives
- Feedback visuel
- Gestion des erreurs

## 📈 Roadmap

- [ ] Authentification utilisateur
- [ ] Thèmes personnalisables
- [ ] Export des données
- [ ] Notifications en temps réel
- [ ] Application mobile (PWA)
- [ ] Intégrations (Slack, Teams)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
