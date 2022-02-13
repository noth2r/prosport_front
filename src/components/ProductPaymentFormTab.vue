<template>
  <div class="product_payment_form_tab">
    <back @click="unsetInnerTab(getPaymentInnerTab)" />
    <standard-text v-if="messageText.length > 0" :text="messageText" />
    <custom-form
      :form="getPaymentForm"
      @submit.prevent="submit()"
      @change-input="changeInput($event)"
      @change-textarea="changeTextarea($event)"
    />
    <standard-text
      :appear="false"
      :text="`Сумма: ${getSumOfSelectedProducts} руб.`"
    ></standard-text>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "product-payment-form-tab",

  data() {
    return {
      messageText: "",
    };
  },

  mounted() {
    const fieldName = "phone";
    const value = this.getInputsOrderFormFields.find(
      (input) => input.name === fieldName
    ).value;
    this.changePaymentFormInput({ fieldName, value });
  },

  methods: {
    ...mapMutations({
      unsetInnerTab: "basketWindow/unsetInnerTabMutation",
      changePaymentFormInput: "basketWindow/changePaymentFormInputMutation",
      changePaymentFormTextarea:
        "basketWindow/changePaymentFormTextareaMutation",
    }),

    ...mapActions({
      orderProducts: "basketWindow/orderProductsAction",
    }),

    changeMessageText(v = "") {
      this.messageText = v;
    },

    async submit() {
      try {
        let messageText = "";

        if (this.isInvalidInputsInForms) {
          // Если поля не валидные
          messageText = "Заполните пустые поля";
        } else {
          const { data, status } = await this.orderProducts();

          if (status >= 200 && status < 300) {
            window.location.href = data.PaymentURL;
          }
        }

        this.changeMessageText(messageText);
      } catch (error) {
        console.error(error);
        this.changeMessageText("Произошла ошибка, попробуйте позже");
      }
    },

    changeInput(obj) {
      const input = obj.e.target;
      const { value, info } = input;
      const args = { value, fieldName: info.name };
      this.changePaymentFormInput(args);
    },

    changeTextarea(obj) {
      let args = { value: obj.e.target.value, fieldName: obj.info.name };
      this.changePaymentFormTextarea(args);
    },
  },

  computed: {
    ...mapGetters({
      getPaymentForm: "basketWindow/getPaymentFormGetter",
      getInputsPaymentForm: "basketWindow/getInputsPaymentFormGetter",
      getInputsOrderFormFields: "basketWindow/getInputsOrderFormFieldsGetter",
      getPaymentInnerTab: "basketWindow/getPaymentInnerTabGetter",
      getOrderFormFields: "basketWindow/getOrderFormFieldsGetter",
      getSumOfSelectedProducts: "basketWindow/getSumOfSelectedProductsGetter",
      isInvalidInputsInForms: "basketWindow/isInvalidInputsInFormsGetter",
    }),
  },
};
</script>

<style scoped>
.product_payment_form_tab {
  /* padding: 0.5vmax; */
  display: grid;
  grid-row-gap: 1.5vmax;
}
</style>
