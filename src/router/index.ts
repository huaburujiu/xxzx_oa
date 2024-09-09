import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '信息中心综合系统',
        requiresAuth: true
      }
    },
    {
      path: '/trip/new',
      name: 'tripNew',
      component: () => import('../views/trip/TripNewView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/trip/ongo',
      name: 'tripOngo',
      component: () => import('../views/trip/TripOngoView.vue')
    },
    {
      path: '/trip/done',
      name: 'tripDone',
      component: () => import('../views/trip/TripDoneView.vue')
    },
    {
      path: '/mission/report',
      name: 'missionReport',
      component: () => import('../views/mission/MissionReport.vue')
    },
    {
      path: '/mission/sum',
      name: 'missionSum',
      component: () => import('../views/mission/MissionSum.vue')
    },
    {
      path: '/mission/show/:id',
      name: 'missionShow',
      component: () => import('../views/mission/MissionShow.vue')
    },
    {
      path: '/mission/edit/:id',
      name: 'missionEdit',
      component: () => import('../views/mission/MissionEdit.vue')
    },
    {
      path: '/maintenance/report',
      name: 'maintenanceReport',
      component: () => import('../views/maintenance/maintenanceReport.vue')
    },
    {
      path: '/maintenance/edit/:id',
      name: 'maintenanceEdit',
      component: () => import('../views/maintenance/maintenanceEdit.vue')
    },
    {
      path: '/maintenance/show/:id',
      name: 'maintenanceShow',
      component: () => import('../views/maintenance/maintenanceShow.vue')
    },
    {
      path: '/maintenance/sum',
      name: 'maintenanceSum',
      component: () => import('../views/maintenance/maintenanceSum.vue')
    }
  ]
})

export default router
