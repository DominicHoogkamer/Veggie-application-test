<template>
<div>
    <product-grid :products="products"></product-grid>
</div>
</template>


<script>
import ProductGrid from './ProductGrid.vue';

export default {
    data: function(){
        return {
        products: [
            'Cheese',
            'Peanutbutter'
        ]
        }
    },
    components: {
        productGrid: ProductGrid,
    }
}
</script>