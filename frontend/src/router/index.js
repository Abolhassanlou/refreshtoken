import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Me from '../components/Me.vue';
import Home from '../components/Home.vue';

const routes = [
  { path: '/', component: Home }, // Home page
  { path: '/login', component: Login },
  { path: '/users/me', component: Me, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;