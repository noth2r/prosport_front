<template>
  <standard-block class="block_with_title" :visible="visible">
    <standard-title
      v-if="title"
      style="color: #0094ff"
      class="title"
      :text="title"
    />
    <standard-text v-if="description" :text="description" />
    <slot></slot>
  </standard-block>
</template>

<script>
export default {
  name: "block-with-title",
  functional: true,

  props: {
    title: String,
    description: String,
    visible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.block_with_title {
  display: grid;

  grid-row-gap: 1vmax;
}
</style>
