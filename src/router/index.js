import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView
}, {
  path: '/async-upload',
  name: 'async-upload',
  component: () => import( /* webpackChunkName: "AsyncUpload" */ '../views/AsyncUpload.vue')
}, ]

const router = new VueRouter({
  routes
})

export default router