export default {
  namespaced: true,

  state: () => ({
    /*
      visible - Component visible
      hidden - Collapsed view
    */

    basketWindow: {
      visible: false,
      hidden: false,
    },

    productWindow: {
      visible: false,
      hidden: false,
      value: {},
    },
  }),

  mutations: {
    setProductImgWindowMutation(state, imgData) {
      state.productWindow.value.img_data = imgData;
    },

    removeProductImgPathMutation(state) {
      state.productWindow.value.img_path = "not_found.svg";
    },

    removeProductImgDataMutation(state) {
      state.productWindow.value.img_data = "";
    },

    removeAllVisibleMutation(state) {
      for (const window in state) {
        state[window].visible = false;
      }
    },

    changeWindowHideModeMutation(state, window) {
      try {
        const hidden = state[window].hidden;
        state[window].hidden = !hidden;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  actions: {
    setWindowVisibleAction({ state, commit }, window) {
      try {
        const windowVisible = state[window].visible;
        commit("removeAllVisibleMutation");
        state[window].visible = !windowVisible;
      } catch (error) {
        throw new Error(error);
      }
    },

    async setProductWindowAction({ state }, product) {
      state.productWindow.value = product;
    },
  },

  getters: {
    canScrollBodyGetter(state) {
      for (const window in state) {
        if (state[window].visible && state[window].hidden === false) {
          return false;
        }
      }
      return true;
    },

    getBasketWindowGetter(state) {
      return state.basketWindow;
    },

    getProductWindowVisibleGetter(state) {
      return state.productWindow.visible;
    },

    getBasketWindowVisibleGetter(state) {
      return state.basketWindow.visible;
    },

    getProductGetter(state) {
      return state.productWindow.value;
    },
  },
};
