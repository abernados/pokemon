import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import OTP from '../views/OTP.vue'
import Success from '../views/Success.vue'

Vue.use(VueRouter)
export const BASE_ROUTE = process.env.SWIPEBIT_API_HOSTNAME || '/'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login2',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/otp',
    name: 'OTP',
    component: OTP,
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: BASE_ROUTE

})


router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
  }
  return middleware[0]({
      ...context
  })
})
export default router
