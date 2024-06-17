<template>
  <div id="app" class="container">
    <form @submit.prevent="createTask" class="task-form">
      <h1 class="label" for="task">Nueva tarea:</h1>
      <div class="input-group">
        <input v-model="newTask" id="task" class="task-input" placeholder="Escribir tarea..." />
        <button type="submit" class="task-button">Guardar</button>
      </div>
    </form>
    <ul class="List">
      <li v-for="task in sortedTasks" :key="task.id" :class="{ done: task.done }" class="task-item">
        <div class="task-details">
          <input type="checkbox" v-model="task.done" @change="updateTask(task.id)" class="task-checkbox" />
          <input type="text" v-model="task.title" @change="updateTask(task.id)" class="task-title" />
        </div>
        <button @click="deleteTask(task.id)" class="delete">❌</button>
        <span v-if="task.done" class="task-done-icon">  ✔️ Lista  </span>
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
          done: false
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
        task.done = task.done;
        task.title = task.title;
      }
    }
  }
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 300px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: auto; 

}

.label {
  font-size: 50px;
  font-family: monospace;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.task-input {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-family: monospace;
  background-color: #fbfdfc;
  border-radius: 5px;
}

.task-button {
  border-radius: 5px;
  background-color: lightcyan;
  border-style: 1px;
  border-color: lightblue;
  margin-left: 5px;
  font-family: monospace;
  height: 38px;
  width: 100px;
  font-size: 18px;
}

.List {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #0c0b0b;
}

.task-details {
  display: flex;
  align-items: center;
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


.delete {
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;
}

.task-done-icon {
  color: green;
  margin-left: 10px;
}

.done .task-title {
  text-decoration: line-through;
  color: #999;
}
</style>