import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Login from '../components/pages/Login.vue';
import MakeAccount from '../components/pages/MakeAccount.vue';
import UserProfile from '../components/pages/UserProfile.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: ProductList },
    { path: '/login', component: Login },
    { path: '/makeaccount', component: MakeAccount },
    { path: '/userprofile', component: UserProfile },


    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true }


  ]
})

export default router
