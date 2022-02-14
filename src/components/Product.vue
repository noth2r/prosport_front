<template>
  <standard-block :visible="visible" class="product" appear>
    <standard-img
      id="product_img"
      :fullPath="getFullPath"
      :path="getProductImg"
      @loaded="_imgLoad"
    />

    <div class="product_content">
      <standard-title class="product_title" :text="product.title" />
      <div class="price_btn">
        <standard-text class="product_price" :text="product.price" />
        <standard-text
          v-if="isAdmin"
          id="delete_product"
          class="product_in_basket"
          text="Удалить"
        />
        <standard-text
          v-else-if="_isItInCart"
          id="remove_from_cart"
          class="product_in_basket"
          text="Удалить из корзины"
        />
        <standard-text
          v-else
          id="add_to_cart"
          class="product_in_basket"
          text="В корзину"
        />
      </div>
    </div>
  </standard-block>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "product",
  functional: true,

  data() {
    return {
      visible: false,
      inBasket: false,
    };
  },

  props: {
    product: {},
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    _imgLoad() {
      this.visible = true;
    },
  },

  computed: {
    ...mapGetters({
      getProductsInBasket: "basketWindow/getProductsInBasketGetter",
      getProductsId: "basketWindow/getProductsIdGetter",
      isItInCart: "basketWindow/isItInCartGetter",
    }),

    getFullPath: function () {
      return Boolean(this.product.img_data) || false;
    },

    getProductImg: function () {
      return this.product.img_data || "products/" + this.product.img_path;
    },

    _isItInCart: function () {
      return this.isItInCart(this.product.id);
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .product {
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;

    overflow: hidden;
    border-radius: 0.8vmax;
  }

  .product img {
    width: 100%;
    height: 100%;

    cursor: pointer;
    object-fit: cover;
  }

  .product_content {
    max-width: inherit;

    padding: 1.5vmin;

    display: flex;
    flex-direction: column;

    grid-row-gap: 1vmin;

    border-radius: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    background: #f9f9f9;
  }

  .product_title {
    max-height: 4vmax;

    font-size: 0.8vmax;
    font-weight: 400;

    line-height: 160%;

    -ms-text-overflow: clip;
    -o-text-overflow: clip;
    text-overflow: clip;
    overflow: hidden;
    -ms-line-clamp: 2;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    display: -webkit-box;
    display: box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
  }

  .price_btn {
    display: flex;

    align-items: flex-end;

    grid-column-gap: 1vmin;
  }

  .product_price {
    font-size: 0.8vmax;
    font-weight: 500;
  }

  .product_in_basket {
    font-size: 0.8vmax;

    cursor: pointer;

    transition: 0.35s;
  }

  .product_in_basket:hover {
    color: #ff9040;
  }
}

@media screen and (orientation: portrait) {
  .product {
    width: 100%;

    position: relative;

    display: grid;

    overflow: hidden;
    border-radius: 1.5vmax;
  }

  .product img {
    width: 100%;

    cursor: pointer;

    object-fit: cover;
  }

  .product_content {
    width: 100%;
    height: 110%;

    padding: 1.5vmin;
    padding-bottom: 0;

    display: flex;
    flex-direction: column;

    grid-row-gap: 1vmin;

    border-radius: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: translate(0, -5%);

    background: #f9f9f9;
  }

  .product_title {
    width: 100%;
    max-height: 10vmax;

    font-size: 1.6vmax;
    font-weight: 400;

    line-height: 160%;
    word-break: break-all;

    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    -ms-line-clamp: 2;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    display: -webkit-box;
    display: box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
  }

  .price_btn {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    grid-column-gap: 1vmax;
  }

  .product_price {
    font-size: 1.6vmax !important;
    font-weight: 500;
  }

  .product_in_basket {
    font-size: 1.4vmax !important;

    cursor: pointer;

    transition: 0.35s;
  }

  .product_in_basket:hover {
    color: #ff9040;
  }
}

.product {
  padding: 0;
}
</style>
