<template>
  <div class="admin">
    <admin-authentication />
    <div v-for="(category, name, index) in getSortedProducts" :key="name">
      <products
        v-if="index < 6"
        class="products"
        :key="name"
        :title="name"
        :products="category"
        :isAdmin="isAdmin"
        @get-products="getProductsByCategory"
        @delete-product="deleteProduct"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters, mapActions } from "vuex";
const AdminAuthentication = defineAsyncComponent(() =>
  import("@/components/AdminAuthentication")
);
const Products = defineAsyncComponent(() =>
  import("@/components/Products")
);

export default {
  name: "admin-page",
  functional: true,

  components: {
    AdminAuthentication,
    Products,
  },

  methods: {
    ...mapActions({
      getProducts: "products/getProductsAction",
      getProductsByCategory: "products/getProductsByCategoryAction",
      removeProduct: "products/removeProductAction",
    }),

    deleteProduct(id) {
      this.removeProduct(id).catch((error) => {
        throw new Error(error);
      });
    },
  },

  computed: {
    ...mapGetters({
      getSortedProducts: "products/getSortedProductsGetter",
      isAdmin: "clientInfo/isAdminGetter",
    }),
  },

  mounted() {
    if (Object.keys(this.getSortedProducts).length === 0) {
      this.getProducts().catch((rej) => {
        throw new Error(rej);
      });
    }
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .products {
    max-height: 85vh;
  }
}

@media screen and (orientation: portrait) {
  .products {
    max-height: 85vh;
  }
}
</style>
