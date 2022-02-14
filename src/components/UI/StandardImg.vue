<template>
  <img :src="exception || loadImg" @load="onload" @error="onerror" />
</template>

<script>
export default {
  name: 'standard-img',
  functional: true,

  props: {
    path: {
      type: String,
      required: true,
    },
    folder: [String, Boolean],
    fullPath: Boolean,
  },

  data() {
    return {
      loaded: false,
      exception: null,
    }
  },

  methods: {
    onload() {
      this.loaded = true
      this.$emit('loaded')
    },

    onerror() {
      this.exception = new URL('/content/not_found.svg', window.location.origin).href
    },
  },

  computed: {
    loadImg(path) {
      path = '/'.concat(this.path || path)
      return new URL(path, window.location.origin).href
    },
  },
}
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
