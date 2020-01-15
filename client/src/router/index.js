import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Secured from '../components/Secured'

export default new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/secured', name: 'secured', component: Secured }
  ]
})
