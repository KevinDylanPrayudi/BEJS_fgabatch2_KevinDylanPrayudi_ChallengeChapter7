import { createWebHistory, createRouter } from 'vue-router'

import LoginView from './components/LoginForm.vue'
import Dashboard from './components/Dashboard.vue'
import ChangePassword from './components/ChangePassword.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import Registration from './components/Registration.vue'
import PreForgotPassword from './components/PreForgotPassword.vue'

const routes = [
  { name: 'login', path: '/login', component: LoginView },
  { name: 'dashboard', path: '/dashboard', component: Dashboard },
  { name: 'change-password', path: '/change-password', component: ChangePassword },
  { path: '/reset-password', component: ForgotPassword },
  { name: 'registration', path: '/registration', component: Registration },
  { name: 'forgot-password', path: '/forgot-password', component: PreForgotPassword }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (to.path !== '/login' && ($cookies.get('token') === null || $cookies.get('token') === undefined)) {
    console.log(to.path)
    if (to.path !== '/reset-password' && to.path !== '/registration' && to.path !== '/forgot-password') {
      return {
        name: 'login'
      }
    }
  } else if (to.path !== '/reset-password' && to.path !== '/forgot-password' && to.path === '/login' && to.path !== '/registration' && $cookies.get('token') !== null) {
    return {
      name: 'dashboard'
    }
  } else if (to.path === '/') {
    return {
      name: 'dashboard'
    }
  }
})

export default router