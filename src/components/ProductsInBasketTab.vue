<template>
  <div class="products_in_basket">
    <transition-group name="product_in_basket">
      <product-in-basket
        class="product_in_basket"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </transition-group>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
const ProductInBasket = defineAsyncComponent(() =>
  import("@/components/ProductInBasket")
);

export default {
  name: "products-in-basket-tab",
  functional: true,

  props: {
    products: Object,
  },

  components: {
    ProductInBasket,
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .products_in_basket {
    grid-row-gap: 0.5vmax;
  }
}

@media screen and (orientation: portrait) {
  .products_in_basket {
    grid-row-gap: 1vmax;
  }
}

.products_in_basket {
  min-width: 65vw;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
}

.product_in_basket-enter-active,
.product_in_basket-leave-active,
.product_in_basket-move {
  transition: 0.5s;
}

.product_in_basket-enter,
.product_in_basket-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}
</style>
