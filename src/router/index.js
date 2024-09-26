import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductByCate from '../views/ProductByCategoryView.vue'
import ProductDetail from '../views/DetailProductView.vue'

import Login from '../components/LoginComponent.vue'
import Register from '../components/RegisterComponent.vue'
import Profile from '../views/ProfileView.vue'
import Cart from '../views/CartView.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
 
    {
      path: '/login',
      name: 'Login',
      component: Login,
      
      
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
 
    {
      path: '/productbycategory/:id',
      name: 'ProductByCategory',
      component: ProductByCate
    },
    {
      path: '/product/detail/:id',
      name: 'DetailProduct',
      component: ProductDetail
    }
  ]
})

export default router
