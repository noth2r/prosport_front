<template>
  <div class="search_page">
    <div class="search_content">
      <products
        :title="'Найдено товаров: ' + this.getProductsCount"
        :products="getProductsFound"
        class="supplies"
        @get-products="searchProducts"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";
const Products = defineAsyncComponent(() =>
  import("@/components/Products")
);

export default {
  name: "search-page",
  functional: true,

  components: {
    Products,
  },

  methods: {
    ...mapActions({
      getProducts: "products/getProductsAction",
      getCategories: "products/getCategoriesAction",
      searchProducts: "search/searchProductsAction",
    }),

    ...mapMutations({
      clearProducts: "search/clearProductsMutation",
    }),
  },

  computed: {
    ...mapGetters({
      getProductsFound: "search/getProductsFoundGetter",
      getProductsCount: "search/getProductsCountGetter",
      getQuery: "search/getQueryGetter",
    }),
  },

  beforeRouteLeave() {
    this.clearProducts();
  },
};
</script>

<style scoped>
.search_content {
  min-height: 75vh;

  display: flex;
  flex-direction: column;
}

@media screen and (orientation: landscape) {
  .supplies {
    max-height: 85vh;
  }
}

@media screen and (orientation: portrait) {
  .supplies {
    max-height: 85vh;
  }
}

.categories,
.add_email,
.our_contacts {
  height: 100%;
}
</style>
