<template>
  <button class="dynamic_button" @click="$emit('button-click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "dynamic-button",
  functional: true,
};
</script>

<style scoped>
@media screen and (orientation: portrait) {
  .dynamic_button {
    font-size: 1.6vmax !important;
  }
}

.dynamic_button {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  overflow: hidden;
  border: none;
  cursor: pointer;
  outline: none;

  font-size: 1vmax;
  color: #fff;

  transition: 0.5s;

  background: #ff9040;
}

.dynamic_button:hover {
  filter: brightness(1.2);
}
</style>
