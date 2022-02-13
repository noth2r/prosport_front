<template>
  <div class="product_in_basket">
    <transition name="checkbox_visible">
      <div
        v-if="getCheckboxTabs && product.quantity > 0"
        class="checkbox"
        :class="{ checkbox_checked: isItInBasket }"
        @click="productClick()"
      >
        <input type="checkbox" :checked="isItInBasket" />
      </div>
    </transition>
    <div
      class="product"
      :class="{ product_active: isItInBasket }"
      @click="productClick()"
      v-swipe="productSwipeParams"
    >
      <div class="product_img">
        <standard-img
          class="img"
          :fullPath="getFullPath"
          :path="getProductImg"
        />
      </div>
      <div class="product_in_basket_content">
        <div class="product_in_basket_text">
          <standard-text class="standard_text" :text="product.title" />
          <standard-text
            class="standard_text"
            :text="product.quantity > 0 ? product.description : 'Нет в наличии'"
          />
        </div>
        <standard-text class="price" :text="product.price" />
        <div class="arc"></div>
      </div>
    </div>
    <div
      v-if="getCheckboxTabs"
      class="remove_from_basket"
      :class="{ trash_can: trashCan }"
    >
      <standard-img
        src="content/remove.svg"
        @click="removeFromCart(product.id)"
      />
    </div>
    <transition name="counter_visible">
      <quantity-counter
        v-if="getCounterTabs && product.quantity > 0"
        :min="1"
        :max="product.quantity"
        :count="product.InBasketCount ?? 1"
        @counter-change="counterChange"
        class="counter"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "product-in-basket",

  props: {
    product: Object,
  },

  data() {
    return {
      checkbox: false,
      trashCan: false,
      productSwipeParams: {
        dist: document.documentElement.clientWidth / 30,
        swipeToRightFn: () => {
          this.productClick();
        },
        swipeToLeftFn: () => {
          this.trashCan = this.trashCan ? false : true;
        },
      },
    };
  },

  methods: {
    ...mapActions({
      removeFromCart: "basketWindow/removeFromCartAction",
    }),

    ...mapMutations({
      removeSelectedProduct: "basketWindow/removeSelectedProductMutation",
      selectProduct: "basketWindow/selectProductMutation",
      changeSelectedProductCount:
        "basketWindow/changeSelectedProductCountMutation",
    }),

    productClick() {
      // Если текущая вкладка не включает чекбоксы,
      // Или товар отсутствует - Проигнорировать операцию
      if (!this.getCheckboxTabs || this.product.quantity === 0) return;

      this.isItInBasket
        ? this.removeSelectedProduct(this.product.id)
        : this.selectProduct(this.product);
    },

    counterChange(v) {
      let params = {
        id: this.product.id,
        inBasketCount: v,
      };
      this.changeSelectedProductCount(params);
    },
  },

  computed: {
    ...mapGetters({
      getSelectedProductsInBasket:
        "basketWindow/getSelectedProductsInBasketGetter",
      getCheckboxTabs: "basketWindow/getCheckboxTabsGetter",
      getCounterTabs: "basketWindow/getCounterTabsGetter",
    }),

    isItInBasket: function () {
      return Object.values(this.getSelectedProductsInBasket).includes(
        this.product
      );
    },

    getFolder: function () {
      return this.product.img_path === "not_found.svg" ? false : "products";
    },

    getFullPath: function () {
      return Boolean(this.product.img_data) || false;
    },

    getProductImg: function () {
      return this.product.img_data || "content/" + this.product.img_path;
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .product_in_basket {
    min-height: 12.5vh;
    max-height: 15vh;
    border-radius: 1vmax;
  }

  .checkbox_checked,
  .product_in_basket:hover .checkbox {
    min-width: 5vw !important;
    transform: scale(1) !important;
  }
}

@media screen and (orientation: portrait) {
  .product_in_basket {
    height: 10vmax;
    border-radius: 1.5vmax;
  }

  .product_in_basket_text .standard_text {
    font-size: 1.2vmax;
  }
}

input[type="checkbox"] {
  width: 1.4vmax;
  height: 1.4vmax;

  cursor: pointer;
}

.product_in_basket {
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.product_in_basket .checkbox {
  min-width: 0;
  width: 0;
  max-width: 5vw;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  transform: scale(0);

  transition: 0.5s;
}

/* Anim start */

.checkbox_visible-enter-active,
.checkbox_visible-leave-to {
  min-width: 0 !important;
  width: 0 !important;
  transform: scale(0) !important;
}

/* Anim end */

.counter {
  width: 12.5vmax;
  overflow: hidden;
}

/* Anim start */
.counter_visible-enter-active,
.counter_visible-leave-active {
  transition: 0.5s;
}

.counter_visible-enter-active,
.counter_visible-leave-to {
  width: 0;
  opacity: 0;
  transform: scale(0);
}

.counter_visible-enter-to {
  width: 12.5vmax;
  opacity: 1;
  transform: scale(1);
}
/* Anim end */

.product {
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;

  display: grid;

  grid-template-columns: 10vmax 1fr;
  grid-template-rows: 100%;

  border: 0vmin solid #00000000;
  border-radius: inherit;
  overflow: hidden;
  cursor: pointer;

  transition: 0.5s;

  background: #efefef;
}

.product_img {
  width: 100%;

  position: relative;

  display: flex;

  align-items: center;
  justify-content: center;
}

.product_img .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product_in_basket_content {
  width: 100%;
  max-height: inherit;

  position: relative;

  padding: 0.5vmax 1vmax;

  display: grid;

  grid-template-columns: 5fr 1fr;
  grid-column-gap: 1vmax;

  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product_in_basket_text *,
.price {
  z-index: 1;
}

.product_in_basket_text {
  width: 100%;

  display: grid;
  flex-direction: column;
  grid-template-rows: repeat(auto-fit, minmax(2vmax, 1fr));

  grid-row-gap: 0.5vmin;
}

.product_in_basket_text .standard_text {
  height: 100%;

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

.product_in_basket_content .price {
  min-width: max-content;

  font-weight: 500;

  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  -ms-line-clamp: 1;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  display: -webkit-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  word-wrap: none;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

.product_active .product_in_basket_text *,
.product_active .price {
  color: #fff !important;
  transition: 0.5s !important;
}

.product_active .arc {
  transform: translate(0);
  opacity: 1;
}

.arc {
  width: 120%;
  height: 120%;
  position: absolute;
  z-index: 0;
  opacity: 0;
  transform: translate(-100%, 0);
  border-radius: 0 10vmax 10vmax 0;
  background: #0094ff;
  transition: 0.5s;
}

.remove_from_basket {
  width: 0;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  transform: scale(0);

  transition: 0.5s;
}

.remove_from_basket img {
  width: 2vmax;
  cursor: pointer;
}

.trash_can,
.product_in_basket:hover .remove_from_basket {
  width: 7.5vmax;

  transform: scale(1);
}
</style>
