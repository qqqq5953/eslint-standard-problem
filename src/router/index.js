import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'HomeTest',
    component: () => import('../views/HomeTest.vue'),
    children: [
      {
        path: 'searchResult',
        name: 'searchResult',
        component: () => import('../views/SearchResult.vue')
      },
      {
        path: 'filterResult',
        name: 'filterResult',
        // component: () => import('../components/FilterSection.vue')
        component: () => import('../views/FilterResult.vue')
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
