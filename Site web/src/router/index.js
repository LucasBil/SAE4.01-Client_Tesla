import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/models',
      name: 'models',
      component: () => import('../views/ModelsView.vue')
    },
    {
      path: '/cars:nomModele',
      name: 'cars',
      component: () => import('../views/CarsView.vue')
    },
    {
      path: '/carsavailable',
      name: 'carsavailable',
      component: () => import('../views/CarsAvailableView.vue')
    },
    {
      path: '/mershs',
      name: 'mershs',
      component: () => import('../views/MershsView.vue')
    },
    {
      path: '/mersh:idMersh',
      name: 'mersh',
      component: () => import('../views/MershView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/createaccount',
      name: 'createaccount',
      component: () => import('../views/CreateAccountView.vue')
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('../views/DevView.vue')
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: () => import('../views/PDF.vue')
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('../views/ThemeView.vue')
    },
    { 
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView 
    }
  ]
})

export default router
