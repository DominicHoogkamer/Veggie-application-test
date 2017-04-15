<template>
<div>
    <input type="text" v-model="product">
    <button @click.prevent="addNewProduct">Add Product</button>
    <ul>
        <li v-for="product in products">{{ product }}</li>
    </ul>
</div>
</template>


<script>
    export default {
        data: function () {
            return {
                product: ''
            };
        },
        props: ['products'],
        methods: {
            addNewProduct() {
                this.products.push(this.product);
                this.product = '';
            }
        }
    }
</script>