<template>
  <transition name="standard_block" appear>
    <div class="standard_block" v-show="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "standard-block",
  functional: true,

  props: {
    title: String,
    visible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.standard_block {
  padding: 1.2vmax;

  display: flex;
  flex-direction: column;

  border-radius: 1vmax;

  background: #fff;
}

.standard_block-enter-active,
.standard_block-leave-active {
  transition: 0.4s;
}

.standard_block-enter-active,
.standard_block-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.standard_block-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
