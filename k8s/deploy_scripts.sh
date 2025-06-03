#!/bin/bash
# deploy.sh - Script de déploiement complet

echo "🚀 Déploiement de Task Manager Pro"

# 1. Construction de l'image Docker
echo "📦 Construction de l'image Docker..."
docker build -t task-manager:latest .

# 2. Test local avec Docker Compose
echo "🧪 Test local avec Docker Compose..."
docker-compose up -d
echo "✅ Application disponible sur http://localhost:5000"
echo "Appuyez sur une touche pour continuer vers Kubernetes..."
read -n 1

# 3. Arrêt du test local
docker-compose down

# 4. Déploiement Kubernetes
echo "☸️  Déploiement sur Kubernetes..."

# Création du namespace
kubectl create namespace task-manager --dry-run=client -o yaml | kubectl apply -f -

# Application des configurations
kubectl apply -f k8s/configmap-secret.yaml -n task-manager
kubectl apply -f k8s/deployment.yaml -n task-manager
kubectl apply -f k8s/service.yaml -n task-manager
kubectl apply -f k8s/ingress.yaml -n task-manager

# Attente du déploiement
echo "⏳ Attente du déploiement..."
kubectl rollout status deployment/task-manager-deployment -n task-manager

# Vérification du statut
echo "📊 Statut du déploiement:"
kubectl get pods -n task-manager
kubectl get services -n task-manager

echo "✅ Déploiement terminé!"
echo "🌐 Accédez à votre application via le LoadBalancer ou l'Ingress"

# Commandes utiles
echo ""
echo "📋 Commandes utiles:"
echo "- Voir les logs: kubectl logs -f deployment/task-manager-deployment -n task-manager"
echo "- Port-forward: kubectl port-forward service/task-manager-service 8080:80 -n task-manager"
echo "- Mise à l'échelle: kubectl scale deployment task-manager-deployment --replicas=5 -n task-manager"