<template>
  <div class="payment_methods_tab">
    <standard-img
      class="payment_method"
      v-for="(paymentMethod, i) in getPaymentMethods"
      :key="i"
      :src="paymentMethod.img"
      @click="setInnerTab(paymentMethod.paymentMethod)"
      alt=""
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "payment-tab",
  functional: true,

  methods: {
    ...mapMutations({
      setInnerTab: "basketWindow/setInnerTabMutation",
    }),
  },

  computed: {
    ...mapGetters({
      getPaymentMethods: "basketWindow/getPaymentMethodsGetter",
    }),
  },
};
</script>

<style scoped>
.payment_methods_tab {
  max-width: 100%;
  height: 100%;
  padding: 1.5vmax 1vmax;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12vmax, 1fr));
  grid-column-gap: 2.5vmax;
  grid-row-gap: 2.5vmax;
}

.payment_method {
  width: 100%;
  max-width: 12vmax;
  display: flex;
  cursor: pointer;
  transition: 0.5s;
  filter: grayscale(0.2);
}

.payment_method:hover {
  filter: grayscale(0);
}
</style>
