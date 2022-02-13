import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    isAuthorized: false,
  }),
  mutations: {
    setAuthorizeMutation(state, bool) {
      state.isAuthorized = bool;
    },

    storeTokensMutation(state, { accessToken, refreshToken }) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
  },

  getters: {
    isAuthorizedGetter(state) {
      return state.isAuthorized;
    },

    getAccessTokenGetter() {
      return localStorage.getItem("accessToken");
    },

    getRefreshTokenGetter() {
      return localStorage.getItem("refreshToken");
    },
  },

  actions: {
    async authorizeAction({ commit }, { email, password }) {
      try {
        const url = "/api/admin/login";
        const body = { email, password };
        const res = await axios.post(url, body);
        const data = res.data;

        if (data.accessToken) {
          commit("setAuthorizeMutation", true);
          commit("storeTokensMutation", data);
        }

        return data ?? false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async validateTokenAction({ commit, getters }) {
      try {
        const accessToken = getters.getAccessTokenGetter;
        const url = "/api/admin/validate";
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const { data } = await axios.post(
          url,
          {},
          config
        ); /* Output: object | false */

        commit("setAuthorizeMutation", data);

        return Boolean(data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
