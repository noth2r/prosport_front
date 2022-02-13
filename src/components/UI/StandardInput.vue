<template>
  <input
    type="text"
    class="standard_input"
    @focus="$emit('input-focus', $event)"
    @blur="$emit('input-blur', $event)"
    @input="$emit('input-input', $event)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "standard-input",
  functional: true,

  props: {
    placeholder: {
      type: String,
      default: "Поиск",
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .standard_input {
    padding: 0.8vmin 0.5vmin;
    font-size: max(0.9vmax, 0.6em);
  }
}
@media screen and (orientation: portrait) {
  .standard_input {
    padding: 2vmin 0vmin;
    font-size: max(1.8vmax, 0.6em);
  }
}

.standard_input {
  width: 100%;
  height: 100%;

  border: none;
  border-bottom: 0.2vmin solid #aaa;
  outline-color: #aaa;

  font-weight: 400;

  color: #646464;
  transition: 0.25s;
}

.standard_input input::placeholder {
  color: #7a7a7a;
}
</style>
