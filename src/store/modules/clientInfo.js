export default {
  namespaced: true,

  state: () => ({
    isAdmin: false,
    clientWidth: window.innerWidth,
    clientHeight: window.innerHeight,
    landscapeOrientation: false,
    portraitOrientation: false,
  }),
  getters: {
    isAdminGetter(state) {
      return state.isAdmin;
    },
    getLandscapeOrientationGetter(state) {
      return state.landscapeOrientation;
    },

    getPortraitOrientationGetter(state) {
      return state.portraitOrientation;
    },
  },
  mutations: {
    setOrientationMutation(state) {
      if (state.clientWidth > state.clientHeight) {
        state.landscapeOrientation = true;
      } else {
        state.portraitOrientation = true;
      }
    },

    setAdminMutation(state, bool = false) {
      state.isAdmin = bool;
    },
  },
  actions: {
    getClientInfoAction({ commit }) {
      commit("setOrientationMutation");
    },
  },
};
