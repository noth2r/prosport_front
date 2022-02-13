<template>
  <transition
    appear
    appear-class="footer-class"
    appear-active-class="footer-active-class"
  >
    <div class="footer">
      <logo-type class="logo" @click="$router.push(`/`)" />
    </div>
  </transition>
</template>

<script>
export default {
  name: "standard-footer",
  functional: true,
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 12.5vh;

  padding: 1.5vh 10vw;

  display: flex;

  align-items: center;

  background: #e9e9e9;
}

.footer-class {
  opacity: 1;
}

.footer-active-class {
  opacity: 0;
  transform: translate(50%, 0);

  transition: 0.5s;
}

.logo {
  width: 5vmax;
  height: 5vmax;
  padding: 0 !important;
}
</style>
