import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Timer from './components/Timer.vue';
import GitSearch from './components/GitSearch.vue';
import TodoList from './components/TodoList.vue';
import Home from './components/Home.vue';

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
  {
    path: '/home',
    name: 'Home',
    component: Home, 
  },


  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
