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
    {
      path: '/access/gate',
      name: 'access-gate',
      component: () => import('@/views/AccessGateView.vue'),
    },
    {
      path: '/access/turnstile',
      name: 'access-turnstile',
      component: () => import('@/views/AccessTurnstileView.vue'),
    },
    {
      path: '/access/barrier',
      name: 'access-barrier',
      component: () => import('@/views/AccessBarrierView.vue'),
    },
    {
      path: '/security',
      name: 'security',
      component: () => import('@/views/SecurityView.vue'),
    },
    {
      path: '/security/camera',
      name: 'security-camera',
      component: () => import('@/views/SecurityCameraView.vue'),
    },
    {
      path: '/energy',
      name: 'energy',
      component: () => import('@/views/EnergyView.vue'),
    },
  ],
})

export default router
