import axios from "axios"

export default {
  namespaced: true,

  state: () => ({
    query: "",
    productsFound: [],
    isLoading: false,
  }),

  mutations: {
    setQueryMutation(state, val) {
      state.query = val;
    },

    clearProductsMutation(state) {
      state.productsFound = [];
    },
  },

  actions: {
    async setProductsFoundAction({ state }, data) {
      queueMicrotask(() => {
        const products = Object.values(data);
        state.productsFound = state.productsFound.concat(products);
      });
    },

    async searchProductsAction({ state, getters, dispatch }) {
      if (state.isLoading || state.query?.length < 3) {
        return;
      }

      state.isLoading = true;
      const from =
        getters.getProductsCountGetter === 0
          ? 0
          : getters.getProductsCountGetter;
      const q = `q=${state.query}&from=${from}`;
      axios
        .get(`/api/products/search?${q}`)
        .then((res) => {
          const data = res.data;
          if (data) {
            state.isLoading = false;
            dispatch("setProductsFoundAction", data);
          }
        })
        .catch(console.error);
    },
  },

  getters: {
    getProductsFoundGetter(state, getters) {
      if (getters.getProductsCountGetter > 0) {
        return state.productsFound;
      } else {
        return false;
      }
    },

    getProductsCountGetter(state) {
      return state.productsFound.length || 0;
    },
  },
  modules: {},
};
