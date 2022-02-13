<template>
  <div class="quantity_counter">
    <standard-text class="counter_decr" @click="calc()" text="-" />
    <input type="number" class="counter_text" :value="counter" @input="input" />
    <standard-text class="counter_inc" @click="fold()" text="+" />
  </div>
</template>

<script>
export default {
  name: "quantity-counter",

  props: {
    min: Number,
    max: Number,
  },

  data() {
    return {
      counter: 1,
    };
  },

  methods: {
    isNum(v) {
      return typeof v === "number";
    },

    calc(num = 1) {
      if (this.lessThan) this.counter = this.min;
      else this.counter -= this.isNum(num) ? num : 1;
    },

    fold(num = 1) {
      if (this.moreThan) this.counter = this.max;
      else this.counter += this.isNum(num) ? num : 1;
    },

    input(e) {
      let v = e.target.value;
      this.counter = +v;
      if (v.length > 1 && v.search(/^0(\d+)$/) !== -1)
        e.target.value = v.substring(1);
    },
  },

  computed: {
    lessThan: function () {
      return this.min !== undefined && this.counter < this.min;
    },

    moreThan: function () {
      return this.max !== undefined && this.counter >= this.max;
    },
  },

  watch: {
    counter: function (v) {
      if (this.lessThan) this.counter = this.min;
      else if (this.moreThan) this.counter = this.max;

      this.$emit("counterChange", v);
    },
  },
};
</script>

<style scoped>
.quantity_counter {
  display: flex;

  align-items: center;
  justify-content: center;
}

.counter_decr,
.counter_inc {
  width: 25%;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 1.4vmax;
  font-weight: 500;
  color: #484848;

  cursor: pointer;
  user-select: none;
}

.counter_text {
  width: 100%;
  max-width: 3em;

  font-size: 1.8vmax;
  text-align: center;
  color: #484848;

  border: none;
  background: none;
  outline-color: #aaa;
}

.counter_text::-webkit-outer-spin-button,
.counter_text::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
