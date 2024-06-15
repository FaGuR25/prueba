import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Timer from './components/Timer.vue';
import GitSearch from './components/GitSearch.vue';
import TodoList from './components/TodoList.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/timer',
    name: 'Timer',
    component: Timer, 
  },
  {
    path: '/gitSearch',
    name: 'GitSearch',
    component: GitSearch, 
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: TodoList, 
  },

  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
