import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/List.vue'
import Create from '../components/Create.vue'
import Edit from '../components/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/create/:id',
      name: 'create',
      component: Create
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
  ]
})

export default router
