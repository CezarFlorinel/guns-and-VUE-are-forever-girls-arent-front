import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import Login from '../components/pages/Login.vue';
import MakeAccount from '../components/pages/MakeAccount.vue';
import UserProfile from '../components/pages/UserProfile.vue';
import Guns from '../components/pages/Guns.vue';
import Modifications from '../components/pages/Modifications.vue';
import FavoriteGuns from '../components/pages/Favourite.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: ProductList },
    { path: '/login', component: Login },
    { path: '/makeaccount', component: MakeAccount },
    { path: '/userprofile', component: UserProfile },
    { path: '/modifications', component: Modifications },
    { path: '/guns', component: Guns },
    { path: '/favouriteguns', component: FavoriteGuns },
  ]
})

export default router
