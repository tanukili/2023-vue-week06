import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'carts',
        name: 'carts',
        component: () => import('../views/CartsView.vue'),
      },
    ],
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue'),
    children: [
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('../views/admin/AdminProducts.vue'),
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('../views/admin/OrdersView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
