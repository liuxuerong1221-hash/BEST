import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/meeting-room',
      name: 'meeting-room',
      component: () => import('@/views/MeetingRoomView.vue'),
    },
    {
      path: '/access',
      name: 'access',
      component: () => import('@/views/AccessView.vue'),
    },
  ],
})

export default router
