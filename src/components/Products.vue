<template>
  <block-with-title :title="title" class="products">
    <transition name="preload_anim">
      <div class="preload" v-show="loading">
        <standard-img :path="'content/logo_notext.png'" />
      </div>
    </transition>
    <div class="products_box">
      <div style="position: relative">
        <div
          v-observe-visibility="{
            callback: _observerCallbackTop,
            throttle: 300,
          }"
          style="width: 100%; height: 2vmax; position: absolute; top: 0"
        ></div>
        <div class="content" @click="_productClick">
          <TransitionGroup name="products-list">
            <div v-for="product in productsChunk" :key="product.id">
              <product
                :id="product.id"
                :class="classProduct"
                :product="product"
                :isAdmin="isAdmin"
              />
            </div>
          </TransitionGroup>
        </div>
        <div
          v-observe-visibility="{
            callback: _observerCallbackBottom,
            throttle: 300,
          }"
          style="width: 100%; height: 2vmax; position: absolute; bottom: 0"
        ></div>
      </div>
    </div>
  </block-with-title>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { ObserveVisibility } from "vue3-observe-visibility";

const Product = defineAsyncComponent(() => import("@/components/Product"));

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
      chunkStartIndex: 0,
      chunkSize: 30,
      productsChunk: [],
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

    _emitGetProducts() {
      this.$emit("get-products", this.title);
    },

    loadPreview() {
      this.loading = true;
      this.$nextTick()
        .then(() => {
          this.loading = false;
        })
        .catch((rej) => {
          throw new Error(rej);
        });
    },

    loadProducts() {
      if (!this.loading) {
        this._emitGetProducts();
        this.loadPreview();
      }
    },

    _observerCallbackTop(isVisible) {
      if (isVisible && !this.loading && this.chunkStartIndex > 0) {
        this._productsChunkUp();
      }
    },

    _observerCallbackBottom(isVisible) {
      if (isVisible && !this.loading) {
        this._productsChunkDown();
      }
    },

    _searchProductById(id) {
      for (const key in this.products) {
        const product = this.products[key];
        if (id == product.id) {
          return product;
        }
      }

      return null;
    },

    _showProduct(productId) {
      const product = this._searchProductById(productId);
      this.setProductWindow(product)
        .then(() => this.setWindowVisible("productWindow"))
        .catch(console.error);
    },

    _addToCart(productId) {
      const product = this._searchProductById(productId);
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

    _productsChunkUp() {
      queueMicrotask(() => {
        if (this._getPreviousChunkStartIndex > 0) {
          this.chunkStartIndex = this._getPreviousChunkStartIndex;
          const end = this.chunkStartIndex + this.chunkSize;
          this.productsChunk = this.products.slice(this.chunkStartIndex, end);
        }
      });
    },

    _productsChunkDown() {
      queueMicrotask(() => {
        if (this._getNextChunkEndIndex < this._getProductsLength) {
          this.chunkStartIndex = this._getNextChunkStartIndex;
          const end = this.chunkStartIndex + this.chunkSize;
          this.productsChunk = this.products.slice(this.chunkStartIndex, end);
        } else {
          this.loadProducts();
        }
      });
    },
  },

  watch: {
    products: function (newProducts) {
      this._productsChunkDown();
    },
  },

  computed: {
    _getProductsLength() {
      return this.products?.length || 0;
    },
    _getProductsChunkLength() {
      return this.productsChunk?.length || 0;
    },
    _getNextChunkStartIndex() {
      return this.chunkStartIndex + this.chunkSize * 0.5;
    },
    _getNextChunkEndIndex() {
      return this._getNextChunkStartIndex + this.chunkSize;
    },
    _getPreviousChunkStartIndex() {
      return this.chunkStartIndex - this.chunkSize * 0.5;
    },
  },

  mounted() {
    this._productsChunkDown();
    this.$nextTick(() => {
      this.chunkStartIndex = this._getPreviousChunkStartIndex;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.products {
  position: relative;
}
.preload_anim-enter-active {
  transition: 2s ease;
}

.preload_anim-leave-active {
  transition: 1s;
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
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  z-index: 10;
  background: rgba(250, 250, 250, 1);
}

.preload img {
  width: 4vmax;
  height: 4vmax;
  animation: 1s infinite 0s load linear;
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

.products-list-enter-active,
.products-list-leave-active {
  transition: all 0.5s;
}

.products-list-enter-from,
.products-list-leave-to {
  opacity: 0;
  transform: translate(0) scale(0.6);
}

.content {
  overflow: hidden;
}

@media screen and (orientation: landscape) {
  .content {
    width: 100%;
    height: 100%;

    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(12vmax, 1fr));

    grid-column-gap: 1vmax;
    grid-row-gap: 1.5vmax;

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

    border-radius: inherit;
  }
}

.content {
  padding-right: 1vmax;
}
</style>
