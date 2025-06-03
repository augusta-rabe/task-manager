.PHONY: install run build test docker-build docker-run k8s-deploy k8s-delete clean

# Variables
APP_NAME = task-manager
IMAGE_NAME = task-manager:latest
NAMESPACE = task-manager

# Installation des dépendances
install:
	pip install -r requirements.txt

# Lancement en mode développement
run:
	python run.py

# Tests
test:
	python -m pytest tests/ -v

# Construction de l'image Docker
docker-build:
	docker build -t $(IMAGE_NAME) .

# Lancement avec Docker
docker-run:
	docker-compose up --build

# Arrêt Docker
docker-stop:
	docker-compose down

# Déploiement Kubernetes complet
k8s-deploy:
	kubectl create namespace $(NAMESPACE) --dry-run=client -o yaml | kubectl apply -f -
	kubectl apply -f k8s/ -n $(NAMESPACE)
	kubectl rollout status deployment/$(APP_NAME)-deployment -n $(NAMESPACE)

# Suppression du déploiement Kubernetes
k8s-delete:
	kubectl delete namespace $(NAMESPACE)

# Voir les logs Kubernetes
k8s-logs:
	kubectl logs -f deployment/$(APP_NAME)-deployment -n $(NAMESPACE)

# Port-forward pour accès local
k8s-port-forward:
	kubectl port-forward service/$(APP_NAME)-service 8080:80 -n $(NAMESPACE)

# Mise à l'échelle
k8s-scale:
	kubectl scale deployment $(APP_NAME)-deployment --replicas=5 -n $(NAMESPACE)

# Statut du déploiement
k8s-status:
	kubectl get all -n $(NAMESPACE)

# Nettoyage
clean:
	docker system prune -f
	docker volume prune -f

# Aide
help:
	@echo "Commandes disponibles:"
	@echo "  install         - Installer les dépendances"
	@echo "  run            - Lancer en mode développement"
	@echo "  test           - Exécuter les tests"
	@echo "  docker-build   - Construire l'image Docker"
	@echo "  docker-run     - Lancer avec Docker Compose"
	@echo "  k8s-deploy     - Déployer sur Kubernetes"
	@echo "  k8s-delete     - Supprimer le déploiement"
	@echo "  k8s-logs       - Voir les logs"
	@echo "  k8s-status     - Voir le statut"
	@echo "  clean          - Nettoyer Docker"