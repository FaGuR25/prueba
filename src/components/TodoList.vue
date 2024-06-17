<template>
  <div id="app" class="container">
    <form @submit.prevent="createTask" class="task-form">
      <h1 class="label" for="task">Nueva tarea:</h1>
      <div class="input-group">
        <input v-model="newTask" id="task" class="task-input" placeholder="Escribir tarea..." />
        <button type="submit" class="task-button">Guardar</button>
      </div>
    </form>
    <ul class="task-list">
      <li v-for="task in sortedTasks" :key="task.id" :class="{ done: task.done }" class="task-item">
        <div class="task-details">
          <input type="checkbox" v-model="task.done" @change="updateTask(task.id)" class="task-checkbox" />
          <span v-if="!task.isEditing" @dblclick="editTask(task)" class="task-title">{{ task.title }}</span>
          <input v-else type="text" v-model="task.title" @blur="updateTask(task.id)" @keyup.enter="updateTask(task.id)"
            class="task-title-edit" />
        </div>
        <div class="task-actions">
          <button @click="editTask(task)" class="edit-button">✏️</button>
          <button @click="deleteTask(task.id)" class="delete-button">❌</button>
        </div>
        <span v-if="task.done" class="task-done-icon">✔️ Lista</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  computed: {
    sortedTasks() {
      return this.tasks.slice().sort((a, b) => a.done - b.done);
    }
  },
  methods: {
    createTask() {
      if (this.newTask.trim() !== '') {
        const newTask = {
          id: Date.now(),
          title: this.newTask,
          done: false,
          isEditing: false
        };
        this.tasks.push(newTask);
        this.newTask = '';
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    updateTask(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.isEditing = false;
      }
    },
    editTask(task) {
      task.isEditing = true;
    }
  }
};
</script>

<style>
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px; 
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: auto; 
}

.label {
  font-size: 24px; 
  font-family: monospace;
  margin-bottom: 10px; 
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; 
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc; 
}

.task-checkbox {
  margin-right: 6px;
}

.task-title {
  border: none;
  background: none;
  font-size: 18px;
  width: 200px;
}

.task-actions {
  margin-left: auto; 
}

.task-done-icon {
  color: green;
  margin-left: 10px;
}

.done .task-title {
  text-decoration: line-through;
  color: #999;
}

.edit-button{
  background-color: white;
}

.delete-button{
  background-color: white;
}
</style>
