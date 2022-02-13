<template>
  <div class="nav_tabs">
    <div
      class="tab"
      v-for="(tab, i) in count"
      :key="i"
      :class="{ active_tab: i === activeTab }"
      @click="$emit('tabClick', i)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "nav-tabs",
  functional: true,

  props: {
    count: Number,
    activeTab: Number,
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .nav_tabs {
    grid-column-gap: 1vmax;
  }

  .tab {
    width: 1.2vmin;
    height: 1.2vmin;

    cursor: pointer;
  }

  .active_tab {
    width: 3vmin;
  }
}

@media screen and (orientation: portrait) {
  .nav_tabs {
    grid-column-gap: 1.5vmax;
  }

  .tab {
    width: 1.2vmax;
    height: 1.2vmax;
  }

  .active_tab {
    width: 3vmax;
  }
}

.nav_tabs {
  display: flex;

  transition: 0.5s;
}

.tab {
  border-radius: 5vmax;

  transition: inherit;

  background: grey;
}

.active_tab {
  background: #0094ff;
}
</style>
