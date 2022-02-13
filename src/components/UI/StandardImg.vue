<template>
  <img @load="onload" :src="loadImg()" />
</template>

<script>
export default {
  name: "standard-img",

  props: {
    src: {
      type: String,
      required: true,
    },
    folder: [String, Boolean],
    fullPath: Boolean,
  },

  data() {
    return {
      loaded: false,
    };
  },

  methods: {
    loadImg(path = this.src) {
      try {
        return new URL(`./src/assets/${path}`, "http://127.0.0.1:3060");
      } catch (error) {
        console.log(error);
        return new URL("./src/assets/content/not_found.svg", "http://127.0.0.1:3060");
      }
    },

    onload() {
      this.loaded = true;
      this.$emit("loaded");
    },
  },
};
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
