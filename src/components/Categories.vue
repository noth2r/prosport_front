<template>
  <block-with-title class="categories_box" :title="title">
    <div class="categories">
      <category
        v-for="(category, name) in getCategoriesSubcategories"
        :key="name"
        :title="name"
        :category="category"
      />
    </div>
  </block-with-title>
</template>

<script>
import { mapGetters } from "vuex";

import Category from "@/components/Category";

export default {
  name: "categories",
  functional: true,

  components: {
    Category,
  },

  props: {
    title: String,
  },

  computed: {
    ...mapGetters({
      getCategoriesSubcategories: "products/getCategoriesSubcategoriesGetter",
    }),
  },
};
</script>

<style scoped>
.categories_box {
  height: 100%;

  background: #fff !important;
}

.categories {
  display: flex;
  flex-direction: column;

  grid-row-gap: 1vmax;

  overflow: auto;
}
</style>
