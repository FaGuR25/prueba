<template>
    <div id="app">
      <form @submit.prevent="createTask">
        <label class="label" for="task">Nueva tarea:</label>
        <input type="text" v-model="newTask" id="task" />
        <input type="submit" value="Crear tarea" />
      </form>
      <ul>
        <li v-for="task in sortedTasks" :key="task.id" :class="{ done: task.done }">
          <input type="checkbox" v-model="task.done" @change="updateTask(task.id)" />
          <input type="text" v-model="task.title" @change="updateTask(task.id)" />
          <button @click="deleteTask(task.id)">Eliminar</button>
          <span v-if="task.done">✔️</span>
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
  .done {
    text-decoration: line-through;
  }
  </style>
  