import { createRouter, createWebHistory } from 'vue-router'
import PessoasView from '../views/PessoasView.vue'

const routes = [
    {
        path: '/',
        name: 'Pessoas',
        component: PessoasView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router