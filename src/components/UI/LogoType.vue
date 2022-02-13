<template>
  <div class="logo_type">
    <standard-img class="img" :src="'content/logo_square.png'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "logo-type",
  functional: true,

  computed: {
    ...mapGetters({
      getLandscapeOrientation: "clientInfo/getLandscapeOrientationGetter",
    }),
  },
};
</script>

<style scoped>
.logo_type {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo_type .img,
.logo_type span {
  cursor: pointer;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
