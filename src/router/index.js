import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'; // Asegúrate de actualizar el camino a tu componente de login
import Timer from '@/components/Timer.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/timer',
    name: 'Timer',
    component: Timer, // Aquí usa el nombre correcto del componente
    meta: { requiresAuth: true }
  },
  // Otras rutas
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

    
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });

export default router;
