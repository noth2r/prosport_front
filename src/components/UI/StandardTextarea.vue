<template>
  <textarea class="standard_textarea" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
  name: "standard-textarea",
  functional: true,

  props: {
    placeholder: String,
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .standard_textarea {
    font-size: max(0.9vmax, 0.6em);
  }
}

@media screen and (orientation: portrait) {
  .standard_textarea {
    font-size: max(1.6vmax, 0.6em);
  }
}

.standard_textarea {
  padding: 1vmin;
  border: 0.2vmin solid #aaa;
  border-radius: 0.5vmax;
  outline-color: #aaa;
  line-height: 160%;
  color: #646464;
  resize: none;
}
</style>
