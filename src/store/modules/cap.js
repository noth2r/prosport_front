import router from "@/router/router";

export default {
  namespaced: true,

  state: () => ({
    search: false,
    searchInput: "",
    currentBtnColor: "#ff9040",
    dynamicBtnColors: { orange: "#ff9040", grey: "#7a7a7a", blue: "#71B2FF" },
    currentIcon: "content/basket_icon.svg",
    icons: {
      basket: "content/basket_icon.svg",
      search: "content/search_icon.svg",
      clear: "content/clear_icon.svg",
    },
  }),

  mutations: {
    setSearchInputMutation(state, val) {
      state.searchInput = val;
    },

    setSearchIsActiveMutation(state) {
      state.search = true;
    },

    setSearchIsInactiveMutation(state) {
      state.search = false;
    },

    setIconMutation(state, { icon, color }) {
      state.currentIcon = icon;
      state.currentBtnColor = color;
    },

    setIconBasketMutation(state) {
      let icon = state.icons.basket;
      let color = state.dynamicBtnColors.orange;

      this.commit("cap/setIconMutation", { icon, color });
    },

    setIconSearchMutation(state) {
      let icon = state.icons.search;
      let color = state.dynamicBtnColors.grey;

      this.commit("cap/setIconMutation", { icon, color });
    },

    setIconClearMutation(state) {
      let icon = state.icons.clear;
      let color = state.dynamicBtnColors.blue;

      this.commit("cap/setIconMutation", { icon, color });
    },

    changeDynamicBtnMutation(state) {
      if (state.searchInput.length > 0 && !state.search) {
        this.commit("cap/setIconClearMutation");
      } else if (state.search) {
        this.commit("cap/setIconSearchMutation");
      } else if (!state.search) {
        this.commit("cap/setIconBasketMutation");
      }
    },

    homeMutation(state) {
      state.searchInput = "";
      this.commit("cap/changeDynamicBtnMutation");
      router.push("/");
    },

    searchQueryMutation(state) {
      if (state.searchInput.length === 0) return;

      router.push({ path: `/search/` });
      state.search = false;
      this.commit("cap/changeDynamicBtnMutation");
      this.commit("search/setQueryMutation", state.searchInput);
      this.dispatch("search/searchProductsAction");
    },

    dynamicButtonClickMutation(state) {
      if (state.currentIcon === state.icons.basket && state.search === false)
        this.dispatch("modalWindows/setWindowVisibleAction", "basketWindow");
      else if (state.currentIcon === state.icons.clear)
        this.commit("cap/homeMutation");
      else if (
        state.currentIcon === state.icons.search &&
        state.searchInput.length > 0
      ) {
        this.commit("cap/searchQueryMutation");
      }
    },
  },

  getters: {
    getSearchStateGetter(state) {
      return state.search;
    },
  },
  actions: {},
  modules: {},
};
