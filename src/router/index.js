import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'HomeTest',
    component: () => import('../views/HomeTest.vue'),
    children: [
      {
        path: 'searchResult',
        name: 'SearchResult',
        component: () => import('../components/PopularSection.vue')
      },
      {
        path: 'moreResult',
        name: 'MoreResult',
        component: () => import('../components/PopularSection.vue')
      }
    ]
  },
  {
    path: '/cardDetail',
    name: 'CardDetail',
    component: () => import('../views/CardDetail.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
