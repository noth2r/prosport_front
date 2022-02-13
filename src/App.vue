<template>
  <div class="child_root">
    <basket-window
      :hiddenMode="true"
      @hiddenModeTrue="changeWindowHideMode('basketWindow')"
      @hiddenModeFalse="changeWindowHideMode('basketWindow')"
    />
    <product-modal-window
      :hiddenMode="true"
      @hiddenModeTrue="changeWindowHideMode('productWindow')"
      @hiddenModeFalse="changeWindowHideMode('productWindow')"
    />
    <cap />
    <div class="content_wrapper">
      <router-view v-slot="{ Component }">
        <transition name="content">
          <component v-show="!getSearchState" :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";

const BasketWindow = defineAsyncComponent(() =>
  import("@/components/BasketWindow")
);
const ProductModalWindow = defineAsyncComponent(() =>
  import("@/components/ProductModalWindow")
);
const Cap = defineAsyncComponent(() => import("@/components/Cap"));

export default {
  components: {
    Cap,
    BasketWindow,
    ProductModalWindow,
  },

  computed: {
    ...mapGetters({
      getSearchState: "cap/getSearchStateGetter",
      canScrollBody: "modalWindows/canScrollBodyGetter",
    }),
  },

  methods: {
    ...mapMutations({
      changeWindowHideMode: "modalWindows/changeWindowHideModeMutation",
    }),

    ...mapActions({
      getClientInfo: "clientInfo/getClientInfoAction",
    }),
  },

  watch: {
    canScrollBody(bool) {
      document.documentElement.style.overflow = bool ? "" : "hidden";
    },
  },

  beforeMount() {
    this.getClientInfo();
  },
};
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: url("./assets/fonts/Roboto/Roboto-Regular.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: "Roboto";
  src: url("./assets/fonts/Roboto/Roboto-Medium.ttf") format("truetype");
  font-style: normal;
  font-weight: 500;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

::-webkit-scrollbar {
  width: 0.8vmax;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #bebebe;
  border-radius: 10vmax;
}
::-webkit-scrollbar-track {
  background: #eee;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

body {
  margin: 0;
  padding: 0;
  background: #eee;
}

@media screen and (orientation: landscape) {
  .content_wrapper {
    padding: 2vmax 10vmax;
  }
}

@media screen and (orientation: portrait) {
  .content_wrapper {
    padding: 2vmax 1vmax;
  }
}

.content_wrapper:empty {
  padding: 0;
}

.content-enter-active,
.content-leave-active {
  transition: 0.35s;
}

.content-enter-active,
.content-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.content-enter-to {
  transform: scale(1);
  opacity: 1;
}
</style>
