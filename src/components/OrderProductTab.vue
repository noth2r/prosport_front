<template>
  <standard-block class="order_product">
    <custom-form
      :form="getOrderFormFields"
      @change-input="changeInput"
      @change-textarea="changeTextarea"
    />
  </standard-block>
</template>

<script>
import validator from "validator";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "order-product-tab",
  functional: true,

  computed: {
    ...mapGetters({
      getOrderFormFields: "basketWindow/getOrderFormFieldsGetter",
      getInputsOrderFormFields: "basketWindow/getInputsOrderFormFieldsGetter",
      getTextareasOrderFormFields:
        "basketWindow/getTextareasOrderFormFieldsGetter",
    }),
  },

  methods: {
    ...mapMutations({
      makeInputFieldValid: "basketWindow/makeInputFieldValidMutation",
      makeInputFieldInvalid: "basketWindow/makeInputFieldInvalidMutation",
      changeOrderFormInput: "basketWindow/changeOrderFormInputMutation",
      changeOrderFormTextarea: "basketWindow/changeOrderFormTextareaMutation",
    }),

    firstLetterToUpperCase: (v) => v[0]?.toUpperCase() + v?.substring(1),
    // Проверка на пустоту поля
    isEmpty: (v) => v === "",

    changeInput(v) {
      let val = v.e.target.value;
      let field = v.info;
      if (field.firstLetterToUpperCase)
        v.e.target.value = this.firstLetterToUpperCase(val);
      this.changeOrderFormInput({ fieldName: field.name, value: val });

      if (
        (!this.isEmpty(val) && field.check === undefined) ||
        (field.check && validator[field.check](val))
      )
        this.makeInputFieldValid(field.name);
      else this.makeInputFieldInvalid(field.name);
    },

    changeTextarea(v) {
      let val = v.e.target.value;
      let field = v.info;
      this.changeOrderFormTextarea({ fieldName: field.name, value: val });
    },
  },
};
</script>

<style scoped>
.order_product {
  padding: 0 !important;
  background: none;
}
</style>
