# 🚀 Task Manager Pro

Une application moderne de gestion de tâches développée avec Flask, containerisée avec Docker et déployable sur Kubernetes.

## ✨ Fonctionnalités

- 🎨 **Interface moderne** avec design responsive
- 📊 **Statistiques en temps réel** avec tableaux de bord
- 🎯 **Système de priorités** avec codes couleur
- ✅ **Gestion complète des tâches** (CRUD)
- 🔄 **API REST** pour l'intégration
- 📱 **Design responsive** pour mobile et desktop
- 🐳 **Containerisation Docker** complète
- ☸️ **Déploiement Kubernetes** prêt pour la production

## 📸 Aperçu

L'application offre une interface élégante avec :
- Cartes de statistiques animées
- Formulaire de création de tâches intuitif  
- Liste de tâches avec actions rapides
- Animations et effets visuels modernes

## 🛠️ Technologies utilisées

- **Backend**: Flask, SQLAlchemy, Flask-CORS
- **Frontend**: HTML5, CSS3 (animations), JavaScript (ES6+)
- **Base de données**: SQLite (facilement adaptable)
- **Containerisation**: Docker, Docker Compose
- **Orchestration**: Kubernetes
- **Serveur**: Gunicorn

## 📋 Prérequis

- Python 3.11+
- Docker et Docker Compose
- Kubernetes (kubectl configuré)
- Make (optionnel, pour les raccourcis)

## 🚀 Installation et démarrage rapide

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd task-manager-app
```

### 2. Méthode 1: Développement local
```bash
# Installation des dépendances
pip install -r requirements.txt

# Lancement de l'application
python run.py
```
Accès: http://localhost:5000

### 3. Méthode 2: Avec Docker
```bash
# Construction et lancement
docker-compose up --build

# Ou avec Make
make docker-run
```
Accès: http://localhost:5000

### 4. Méthode 3: Déploiement Kubernetes
```bash
# Déploiement complet
make k8s-deploy

# Ou manuellement
kubectl apply -f k8s/
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

### Configuration Kubernetes

Modifiez les fichiers dans `k8s/` selon vos besoins :
- **Replicas**: Ajustez le nombre d'instances
- **Resources**: Configurez les limites CPU/mémoire
- **Ingress**: Configurez votre domaine
- **Storage**: Ajustez la taille du volume

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/tasks` | Liste toutes les tâches |
| `POST` | `/api/tasks` | Crée une nouvelle tâche |
| `PUT` | `/api/tasks/<id>` | Met à jour une tâche |
| `DELETE` | `/api/tasks/<id>` | Supprime une tâche |
| `GET` | `/api/stats` | Statistiques globales |

### Exemple d'usage de l'API

```bash
# Créer une tâche
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma tâche", "priority": "high"}'

# Obtenir les statistiques
curl http://localhost:5000/api/stats
```

## 🐳 Docker

### Construction locale
```bash
docker build -t task-manager:latest .
```

### Variables d'environnement Docker
```bash
docker run -e SECRET_KEY=your-key -e DATABASE_URL=sqlite:///data/tasks.db task-manager
```

## ☸️ Kubernetes

### Déploiement

```bash
# Création du namespace
kubectl create namespace task-manager

# Déploiement des ressources
kubectl apply -f k8s/ -n task-manager

# Vérification
kubectl get pods -n task-manager
```

### Commandes utiles

```bash
# Voir les logs
kubectl logs -f deployment/task-manager-deployment -n task-manager

# Port-forward pour test local
kubectl port-forward service/task-manager-service 8080:80 -n task-manager

# Mise à l'échelle
kubectl scale deployment task-manager-deployment --replicas=5 -n task-manager

# Mise à jour
kubectl set image deployment/task-manager-deployment task-manager=task-manager:v2 -n task-manager
```

## 🧪 Tests

```bash
# Tests unitaires
python -m pytest tests/ -v

# Tests avec couverture
python -m pytest --cov=app tests/
```

## 📊 Monitoring et observabilité

### Health Checks
- **Liveness Probe**: `GET /` (vérification que l'app répond)
- **Readiness Probe**: `GET /` (vérification que l'app est prête)

### Métriques
L'application expose des statistiques via `/api/stats` :
- Nombre total de tâches
- Tâches complétées
- Taux de completion
- Répartition par priorité

## 🔒 Sécurité

- ✅ Utilisateur non-root dans le conteneur
- ✅ Variables sensibles dans des secrets Kubernetes
- ✅ CORS configuré
- ✅ Validation des données d'entrée
- ✅ Requêtes préparées (protection SQL injection)

## 🚀 Optimisations pour la production

### Performance
- **Gunicorn** avec plusieurs workers
- **Limite de ressources** Kubernetes
- **Probes** de santé configurées
- **Volume persistant** pour les données

### Scalabilité
- **Réplication** horizontale avec Kubernetes
- **LoadBalancer** pour distribution du trafic
- **Base de données** facilement remplaçable
- **API stateless** pour la mise à l'échelle

## 🛠️ Commandes Make disponibles

```bash
make install      # Installer les dépendances
make run         # Lancer en développement
make docker-run  # Lancer avec Docker
make k8s-deploy  # Déployer sur Kubernetes
make k8s-logs    # Voir les logs
make k8s-status  # Statut du déploiement
make clean       # Nettoyer Docker
make help        # Voir toutes les commandes
```

## 📈 Roadmap

- [ ] Authentification utilisateur
- [ ] Notifications en temps réel
- [ ] Export des données
- [ ] Thèmes personnalisables
- [ ] Mobile app (PWA)
- [ ] Intégrations (Slack, Teams)
