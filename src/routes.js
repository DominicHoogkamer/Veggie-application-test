import Home from './components/Home.vue';
import ProductGrid from './components/ProductGrid.vue';
import Product from './components/Product.vue';
import AddProduct from './components/AddProdcut.vue';





export const routes = [
    { path: '/', component: AddProduct},
    { path: '/products', component: Home }
];