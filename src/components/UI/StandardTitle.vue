<template>
  <transition name="title" apear>
    <div class="standard_styles" :key="text">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "standard-title",
  functional: true,

  props: {
    text: [String, Number],
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .standard_styles {
    font-size: max(1.2vmax, 0.8em);

    line-height: 140%;

    color: #646464;
  }
}

@media screen and (orientation: portrait) {
  .standard_styles {
    font-size: max(2.2vmax, 0.6em);

    line-height: 160%;

    color: #646464;
  }
}

.standard_styles {
  font-weight: 500;
}

.title-enter-active,
.title-leave-active {
  transition: 0.5s;
}

.title-leave-active {
  position: absolute;
}

.title-enter-active {
  opacity: 0;
  transform: translate(2.5%, 0);
}

.title-enter-to {
  opacity: 1;
  transform: translate(0);
}

.title-leave-to {
  transform: translate(-50%, 0) scale(0);
  opacity: 0;
}
</style>
