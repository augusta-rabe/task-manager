class TaskManager {
    constructor() {
        this.init();
        this.modal = document.getElementById('taskModal');
        this.confirmModal = document.getElementById('confirmModal');
        this.taskToDelete = null;
    }

    async init() {
        await this.loadTasks();
        await this.loadStats();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createTask();
        });

        // Fermer le modal en cliquant en dehors
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Fermer le modal avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });

        // Gestion de la confirmation de suppression
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            if (this.taskToDelete) {
                this.confirmDeleteTask(this.taskToDelete);
            }
        });

        // Fermer le modal de confirmation en cliquant en dehors
        window.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) {
                this.closeConfirmModal();
            }
        });
    }

    async loadTasks() {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            this.renderTasks(tasks);
        } catch (error) {
            console.error('Erreur lors du chargement des tâches:', error);
            this.renderError();
        }
    }

    async loadStats() {
        try {
            const response = await fetch('/api/stats');
            const stats = await response.json();
            this.renderStats(stats);
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques:', error);
        }
    }

    renderStats(stats) {
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('completedTasks').textContent = stats.completed;
        document.getElementById('pendingTasks').textContent = stats.pending;
        document.getElementById('completionRate').textContent = Math.round(stats.completion_rate) + '%';
    }

    renderTasks(tasks) {
        const container = document.getElementById('tasksList');
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>Aucune tâche</h3>
                    <p>Commencez par ajouter votre première tâche!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tasks.map(task => `
            <div class="task-item ${task.priority} ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-header">
                    <div class="task-title">
                        <span>${task.title} </span>
                        <span class="priority-badge priority-${task.priority}" style="margin-left:15px;">${this.getPriorityText(task.priority)}</span>
                    </div>
                    <div class="task-actions">
                        <button class="btn-small btn-complete" onclick="taskManager.toggleTask(${task.id}, ${!task.completed})">
                            <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                        </button>
                        <button class="btn-small btn-delete" onclick="taskManager.openConfirmModal(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">                            
                    ${task.description ? `<p style="margin-bottom: 10px; color: #666;">${task.description}</p>` : ''}
                    <small style="color: #999;">${new Date(task.created_at).toLocaleDateString('fr-FR')}</small>
                </div>
            </div>
        `).join('');
    }

    getPriorityText(priority) {
        const priorities = {
            'low': 'Faible',
            'medium': 'Moyenne',
            'high': 'Élevée'
        };
        return priorities[priority] || priority;
    }

    openModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async createTask() {
        const form = document.getElementById('taskForm');
        const formData = new FormData(form);
        
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority')
        };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                form.reset();
                this.closeModal();
                await this.loadTasks();
                await this.loadStats();
            }
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
            alert('Erreur lors de la création de la tâche');
        }
    }

    async toggleTask(taskId, completed) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed })
            });

            if (response.ok) {
                await this.loadTasks();
                await this.loadStats();
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
        }
    }

    openConfirmModal(taskId) {
        this.taskToDelete = taskId;
        this.confirmModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeConfirmModal() {
        this.confirmModal.style.display = 'none';
        this.taskToDelete = null;
        document.body.style.overflow = 'auto';
    }

    async confirmDeleteTask(taskId) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.closeConfirmModal();
                await this.loadTasks();
                await this.loadStats();
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
        }
    }

    renderError() {
        document.getElementById('tasksList').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i>
                <h3>Erreur de chargement</h3>
                <p>Impossible de charger les tâches</p>
            </div>
        `;
    }
}

// Initialiser l'application
const taskManager = new TaskManager();