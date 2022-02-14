<template>
  <div class="home_page">
    <div v-for="(category, name, index) in getSortedProducts" :key="name">
      <products
        v-if="index < 6"
        class="products"
        :title="name"
        :products="category"
        @get-products="getProductsByCategory"
      />
    </div>
    <div class="categories_info">
      <categories class="categories" title="Категории" />
      <add-email class="add_email" />
      <our-contacts class="our_contacts" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters, mapActions, mapMutations } from "vuex";

const Products = defineAsyncComponent(() =>
  import("@/components/Products")
);
import Categories from "@/components/Categories";
import AddEmail from "@/components/AddEmail";
import OurContacts from "@/components/OurContacts";

export default {
  name: "home-page",
  functional: true,

  components: {
    Products,
    Categories,
    AddEmail,
    OurContacts,
  },

  methods: {
    ...mapActions({
      getProducts: "products/getProductsAction",
      getProductsByCategory: "products/getProductsByCategoryAction",
    }),

    ...mapMutations({
      clearProducts: "products/clearProductsMutation",
    }),
  },

  computed: {
    ...mapGetters({
      getSortedProducts: "products/getSortedProductsGetter",
    }),
  },

  mounted() {
    this.getProducts().catch((rej) => {
      throw new Error(rej);
    });
  },

  beforeRouteLeave() {
    this.clearProducts();
  },
};
</script>

<style scoped>
.home_page {
  display: flex;
  flex-direction: column;

  justify-content: center;

  grid-row-gap: 1.5vmax;
}

@media screen and (orientation: landscape) {
  .products {
    max-height: 70vh;
  }

  .products:hover {
    max-height: 80vh;

    transition: 0.25s 0.5s;
  }

  .categories_info {
    width: 100%;
    height: 100%;

    display: grid;

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 0.2fr;

    grid-column-gap: 1.5vmax;
    grid-row-gap: 1.5vmax;
  }

  .categories {
    grid-column-start: 1;
    grid-column-end: 3;

    grid-row-start: 1;
    grid-row-end: 3;
  }
}

@media screen and (orientation: portrait) {
  .products {
    max-height: 75vh;
  }
  .categories_info {
    width: 100%;
    height: 100%;
    max-height: 65vh;

    display: grid;

    grid-column-gap: 1.5vmax;
    grid-row-gap: 1.5vmax;
  }
}

.categories,
.add_email,
.our_contacts {
  height: 100%;
}
</style>
