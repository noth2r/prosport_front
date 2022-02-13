<template>
  <block-with-title :title="title" class="products">
    <transition name="preload_anim">
      <div class="preload" v-show="loading">
        <standard-img src="content/logo_notext.png" />
      </div>
    </transition>
    <div class="products_box">
      <div class="content" @click="_productClick">
        <div v-for="product in products" :key="product.id">
          <product
            :id="product.id"
            :class="classProduct"
            :product="product"
            :isAdmin="isAdmin"
          />
        </div>
      </div>
      <div
        v-observe-visibility="{
          callback: _observerCallback,
          intersection,
          throttle: 300,
        }"
        style="width: 100%; height: 1vmax"
      ></div>
    </div>
  </block-with-title>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { ObserveVisibility } from "vue3-observe-visibility";

const Product = defineAsyncComponent(() => import("@/components/Product.vue"));

export default {
  name: "products",

  directives: {
    ObserveVisibility,
  },

  props: {
    title: String,
    isAdmin: Boolean,
    products: Array,
  },

  components: {
    Product,
  },

  data() {
    return {
      intersection: {
        rootMargin: "0px",
        threshold: 0,
      },
      loading: true,
      classProduct: "product",
      productIdList: {
        productImg: "product_img",
        deleteProduct: "delete_product",
        addToCart: "add_to_cart",
        removeFromCart: "remove_from_cart",
      },
    };
  },

  methods: {
    ...mapActions({
      setProductWindow: "modalWindows/setProductWindowAction",
      removeFromCart: "basketWindow/removeFromCartAction",
      setWindowVisible: "modalWindows/setWindowVisibleAction",
      addToCart: "basketWindow/addToCartAction",
    }),

    _loadProducts() {
      this.$emit("get-products", this.title);
    },

    _observerCallback(isVisible) {
      if (isVisible) {
        this.loading = true;
        this._loadProducts();
        this.$nextTick()
          .then(() => {
            this.loading = false;
          })
          .catch((rej) => {
            throw new Error(rej);
          });
      }
    },

    searchProductById(id) {
      for (const key in this.products) {
        const product = this.products[key];
        if (id == product.id) {
          return product;
        }
      }

      return null;
    },

    _showProduct(productId) {
      const product = this.searchProductById(productId);
      this.setProductWindow(product)
        .then(() => this.setWindowVisible("productWindow"))
        .catch(console.error);
    },

    _addToCart(productId) {
      const product = this.searchProductById(productId);
      this.addToCart(product);
    },

    _removeFromCart(productId) {
      this.removeFromCart(productId);
    },

    _deleteProduct(productId) {
      this.$emit("delete-product", productId);
    },

    _productClick(event) {
      const currentElement = event.target;
      const elementId = event.target.id;
      const productId = currentElement.closest("." + this.classProduct).id;

      if (elementId === this.productIdList.productImg) {
        this._showProduct(productId);
      } else if (elementId === this.productIdList.addToCart) {
        this._addToCart(productId);
      } else if (elementId === this.productIdList.removeFromCart) {
        this._removeFromCart(productId);
      } else if (elementId === this.productIdList.deleteProduct) {
        this._deleteProduct(productId);
      }
    },
  },

  mounted() {
    setTimeout(this._loadProducts, 1000);
    this.loading = false;
  },
};
</script>

<style scoped>
.products {
  position: relative;
}

.preload_anim-enter-active,
.preload_anim-leave-active {
  transition: 1s ease-in;
}

.preload_anim-enter-active img,
.preload_anim-leave-active img {
  animation: load 1.5s infinite linear;
}

.preload_anim-enter,
.preload_anim-leave-to {
  opacity: 0;
}

.preload {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  z-index: 10;
  background: rgba(250, 250, 250, 0.9);
}

.preload img {
  width: 4vmax;
  height: 4vmax;
}

@keyframes load {
  100% {
    transform: rotate(360deg);
  }
}

.products_box {
  overflow: auto;
  transition: 0.25s;
}

@media screen and (orientation: landscape) {
  .content {
    width: 100%;
    height: 100%;

    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(12vmax, 1fr));

    grid-column-gap: 1vmax;
    grid-row-gap: 1.5vmax;

    overflow-x: hidden;
    overflow-y: auto;
    border-radius: inherit;
  }
  .content .product {
    width: 100%;
    height: 100%;
  }
}

@media screen and (orientation: portrait) {
  .content {
    width: 100%;
    height: 100%;

    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(28vw, 1fr));

    grid-column-gap: 1.5vmax;
    grid-row-gap: 1.5vmax;

    overflow-x: hidden;
    overflow-y: auto;
    border-radius: inherit;
  }
}

.content {
  padding-right: 1vmax;
}
</style>
