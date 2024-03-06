import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import AddStock from '../views/AddStockView.vue'
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from '../views/auth/RegistrationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Add-stock',
    name: 'AddStock',
    component: AddStock
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authData = $cookies.get('userData')
  if (to.path === "/") {
    return next();
  }
  if (to.path == "/login") {
    if (authData) {
      return next('/')
    } else {
      return next()
    }
  }
  if (!authData) return next({ name: 'login' })

  return next()
})

export default router
