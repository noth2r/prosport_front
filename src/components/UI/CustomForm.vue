<template>
  <form class="custom_form">
    <div class="fields">
      <div class="inputs" v-if="form.inputs.length > 0">
        <standard-input
          class="input"
          v-for="(input, name, i) in form.inputs"
          :key="i"
          :class="{ input_valid: input.isValid }"
          :type="input.type"
          :name="name"
          :value="input.value"
          :placeholder="input.placeholder"
          :required="input.required"
          :readonly="input.readonly"
          @input="inputEvent($event, input)"
        />
      </div>
      <div class="textareas" v-if="form.textareas.length > 0">
        <standard-textarea
          class="textarea"
          v-for="(textarea, name, i) in form.textareas"
          :key="i"
          :value="textarea.value"
          :placeholder="textarea.placeholder"
          @input="inputEvent($event, textarea)"
        />
      </div>
    </div>
    <standard-input
      v-if="form.submitBtn"
      class="submit"
      type="submit"
      :class="form.submitBtn.class"
      :name="form.submitBtn.name"
      :value="form.submitBtn.value"
    />
  </form>
</template>

<script>
export default {
  name: "custom-form",
  functional: true,

  props: {
    form: {
      inputs: {},
      textareas: {},
      submitBtn: Boolean,
    },
  },

  methods: {
    inputEvent(e, info) {
      let v = { e: e, info: info };
      let tagName = e.target.tagName;
      if (tagName === "INPUT") {
        this.$emit("change-input", v);
      } else if (tagName === "TEXTAREA") {
        this.$emit("change-textarea", v);
      }
    },
  },
};
</script>

<style scoped>
.custom_form {
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-row-gap: 1.5vmax;
}

.fields {
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-row-gap: 2.5vmax;
}

.inputs,
.textareas {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(15vmax, 1fr));
  grid-column-gap: 2.5vmax;
}

.inputs {
  grid-row-gap: 2.5vmax;
}

.textareas {
  grid-row-gap: 1.5vmax;
}

.input {
  background: none;
}

.input_valid {
  border-bottom-color: #00b600 !important;
}

.textarea {
  height: 10vmax;
}

.submit {
  width: fit-content !important;
  height: fit-content !important;
  padding: 0.5vmax 0.8vmax !important;
  cursor: pointer;
  border-radius: 0.5vmax;
  border: none !important;
  font-size: 1.2vmax !important;
  color: #fff !important;
  background: #ff8a00;
}
</style>
