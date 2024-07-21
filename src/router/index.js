import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import CreatePostit from '@/views/CreatePostit.vue'
import ShowPostIt from '@/views/singlePostit/ShowPostIt.vue'
import UpdatePostit from '@/views/singlePostit/UpdatePostit.vue'
import NotFound from '@/components/NotFound.vue'
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
      component: AboutView
    },
    {
      path: '/note/show/:id',
      name: 'show',
      component: ShowPostIt
    },
    {
      path: '/note/update/:id',
      name: 'update',
      component: UpdatePostit
    },
    {

      path: '/:pathname(.*)*',
      name: 'notFound',
      component: NotFound

    },
    {
      path: '/note/update/:pathname(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
