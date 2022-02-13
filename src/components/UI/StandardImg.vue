<template>
  <img @load="onload" :src="loadImg" />
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
    }
  },

  methods: {
    onload() {
      this.loaded = true
      this.$emit('loaded')
    },
  },

  computed: {
    loadImg(path = '/') {
      try {
        path = '/'.concat(this.path ? this.path : path)
        return new URL(path, import.meta.url)
      } catch (error) {
        console.log(error)
        return new URL('/content/not_found.svg', import.meta.url)
      }
    },
  },
}
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
