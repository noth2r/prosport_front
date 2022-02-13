<template>
  <modal-window
    :title="getTabs[getActiveTab].title"
    :description="
      getCountProductsInBasket > 0
        ? getTabs[getActiveTab].description
        : 'Товары не найдены'
    "
    :visible="isVisible"
    @noVisible="_noVisible"
  >
    <div class="modal_window_content" v-if="getCountProductsInBasket > 0">
      <!-- Вкладки -->
      <transition name="content">
        <div v-if="!isInnerTab">
          <products-in-basket-tab
            v-if="getProductsTabs"
            class="products_in_basket"
            :products="getProducts"
          />
          <order-product-tab v-if="getOrderProductTabs" />
          <payment-methods-tab v-if="getPaymentTabs" />
        </div>
      </transition>
      <!-- Внутренние вкладки -->
      <transition name="content">
        <div v-if="isInnerTab">
          <product-payment-form-tab v-if="getPaymentInnerTab" />
        </div>
      </transition>
    </div>
    <transition name="internal_navbar" appear>
      <internal-navbar
        class="internal_navbar"
        v-if="getCountSelectedProductsInBasket > 0 && !isInnerTab"
        :text="additionResult"
        :activeTab="getActiveTab"
        :tabsCount="getTabsCount"
        @next-tab="nextTab"
        @set-tab="setTab"
      />
    </transition>
  </modal-window>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";

const ModalWindow = defineAsyncComponent(() =>
  import("@/components/ModalWindow")
);
const ProductsInBasketTab = defineAsyncComponent(() =>
  import("@/components/ProductsInBasketTab.vue")
);
const OrderProductTab = defineAsyncComponent(() =>
  import("@/components/OrderProductTab.vue")
);
const PaymentMethodsTab = defineAsyncComponent(() =>
  import("@/components/PaymentMethodsTab.vue")
);
const ProductPaymentFormTab = defineAsyncComponent(() =>
  import("@/components/ProductPaymentFormTab.vue")
);
const InternalNavbar = defineAsyncComponent(() =>
  import("@/components/InternalNavbar.vue")
);

export default {
  name: "basket-window",

  functional: true,

  components: {
    ModalWindow,
    ProductsInBasketTab,
    OrderProductTab,
    PaymentMethodsTab,
    ProductPaymentFormTab,
    InternalNavbar,
  },

  computed: {
    ...mapGetters({
      getBasketWindow: "modalWindows/getBasketWindowGetter",
      getActiveTab: "basketWindow/getActiveTabGetter",
      getTabs: "basketWindow/getTabsGetter",
      getCountProductsInBasket: "basketWindow/getCountProductsInBasketGetter",
      getTabsCount: "basketWindow/getTabsCountGetter",
      getCountSelectedProductsInBasket:
        "basketWindow/getCountSelectedProductsInBasketGetter",
      getSumOfSelectedProducts: "basketWindow/getSumOfSelectedProductsGetter",
      getProductsInBasket: "basketWindow/getProductsInBasketGetter",
      getSelectedProductsInBasket:
        "basketWindow/getSelectedProductsInBasketGetter",
      getProductsTabs: "basketWindow/getProductsTabsGetter",
      getOrderProductTabs: "basketWindow/getOrderProductTabsGetter",
      getPaymentTabs: "basketWindow/getPaymentTabsGetter",
      getPaymentInnerTab: "basketWindow/getPaymentInnerTabGetter",
      getNumberOfValidFields: "basketWindow/getNumberOfValidFieldsGetter",
      getNumberOfFields: "basketWindow/getNumberOfFieldsGetter",
      isInnerTab: "basketWindow/isInnerTabGetter",
      getStoredProductsIdLength: "basketWindow/getStoredProductsIdLengthGetter",
    }),

    additionResult: function () {
      if (this.getActiveTab === 0)
        return (
          this.getCountSelectedProductsInBasket +
          " из " +
          this.getCountProductsInBasket
        );
      else if (this.getActiveTab === 1)
        return this.getSumOfSelectedProducts + " руб";
      else if (this.getActiveTab === 2)
        return this.getNumberOfValidFields + " из " + this.getNumberOfFields;
      else return "";
    },

    getProducts: function () {
      return this.getActiveTab === 0
        ? this.getProductsInBasket
        : this.getSelectedProductsInBasket;
    },

    isVisible: function () {
      return this.getBasketWindow.visible;
    },
  },

  methods: {
    ...mapMutations({
      nextTab: "basketWindow/nextTabMutation",
      setTab: "basketWindow/setTabMutation",
      pushProducts: "basketWindow/pushProductsMutation",
    }),

    ...mapActions({
      getProductsById: "basketWindow/getProductsByIdAction",
      getStoredProducts: "basketWindow/getStoredProductsAction",
      setWindowVisible: "modalWindows/setWindowVisibleAction",
    }),

    _noVisible() {
      this.setWindowVisible("basketWindow");
    },

    async updateBasket() {
      try {
        if (!this.isVisible || this.getStoredProductsIdLength === 0) return;

        await this.getStoredProducts();
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  watch: {
    isVisible: function (visible) {
      if (!visible) return;

      this.updateBasket().catch((e) => {
        throw new Error(e);
      });
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: portrait) {
  .modal_window_content {
    margin-top: 1vmax;
  }
}

.modal_window_content {
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  z-index: 2;

  transition: 0.5s;
}

.modal_window_content > * {
  height: 100%;
  overflow-y: auto;
}

/* Anim start */
.content-enter-active {
  transition: 0.5s;
}
.content-leave-active {
  transition: 0.1s;
}

.content-enter-active,
.content-leave-to {
  position: absolute;
  transform: scale(0.9);
  opacity: 0;
}

.content-enter-to {
  position: relative;
  transform: scale(1);
  opacity: 1;
}
/* Anim end */

.products_in_basket {
  overflow-y: auto;
  border-radius: 0.5vmax;

  transition: 0.5s;
}

.internal_navbar,
.internal_navbar-enter-to {
  min-height: 7.5vmin;

  padding: 1.5vmin;
  padding-bottom: 0;

  opacity: 1;
  transform: translate(0);
  z-index: 1;
  overflow: hidden;
  transition: 0.25s ease;
}

.internal_navbar-enter-active,
.internal_navbar-leave-active {
  transition: 0.25s ease;
}

.internal_navbar-enter-active,
.internal_navbar-leave-to {
  height: 0;
  padding: 0;
  opacity: 0;
  transform: translate(0, -50%);
}
</style>
