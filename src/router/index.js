import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Login from '../components/pages/Login.vue';
import EmployeePanelPage from "../components/pages/EmployeePanelPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: ProductList },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true },
    { path: '/employeepanel', component: EmployeePanelPage }
  ]
})

export default router
