<template>
  <div class="internal_navbar">
    <standard-text class="text" :text="text" />
    <nav-tabs
      class="nav_tabs"
      :count="tabsCount"
      :activeTab="activeTab"
      @tab-click="tabClick"
    />
    <dynamic-button class="btn_next" @click="nextTab"> Далее </dynamic-button>
  </div>
</template>

<script>
export default {
  name: "internal-navbar",
  functional: true,

  props: {
    text: String,
    activeTab: Number,
    tabsCount: Number,
  },

  methods: {
    nextTab() {
      this.$emit("next-tab");
    },

    tabClick(tab) {
      this.$emit("set-tab", tab);
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .nav_tabs {
    display: flex;
    justify-content: flex-end;
  }
}
@media screen and (orientation: portrait) {
  .nav_tabs {
    justify-self: center;
  }
}

.internal_navbar {
  display: flex;
  align-items: center;
  grid-column-gap: 1vmax;
}

.text,
.nav_tabs,
.btn_next {
  width: 100%;
}

.text {
  font-weight: 500 !important;
}

.btn_next {
  max-width: fit-content;
  padding: 0.6vmax 1.2vmax;
  justify-self: end;
  border-radius: 10vmax;
  background: #0094ff !important;
}
</style>
