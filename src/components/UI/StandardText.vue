<template>
  <transition name="text" :appear="appear">
    <div class="standard_styles" :key="text">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "standard-text",

  functional: true,

  props: {
    text: [String, Number],
    appear: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .standard_styles {
    font-size: max(0.8vmax, 0.5em);

    line-height: 160%;

    color: #646464;
  }
}

@media screen and (orientation: portrait) {
  .standard_styles {
    font-size: max(1.6vmax, 0.5em);

    line-height: 160%;

    color: #646464;
  }
}

.standard_styles {
  font-weight: 400;
}

.text-enter-active,
.text-leave-active {
  transition: 0.5s;
}

.text-leave-active {
  position: absolute;
}

.text-enter-active {
  opacity: 0;
  transform: translate(2.5%, 0);
}

.text-enter-to {
  opacity: 1;
  transform: translate(0);
}

.text-leave-to {
  transform: translate(-50%, 0) scale(0);
  opacity: 0;
}
</style>
