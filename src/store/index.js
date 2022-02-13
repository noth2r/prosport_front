import { createStore } from "vuex";

import admin from "./modules/admin";
import basketWindow from "./modules/basketWindow";
import cap from "./modules/cap";
import clientInfo from "./modules/clientInfo";
import products from "./modules/products";
import search from "./modules/search";
import modalWindows from "./modules/modalWindows";

export default createStore({
  state: () => ({
    // API_URL: "http://localhost:3030",
    // API_URL: window.location.origin + ":3030",
    // API_URL: "https://3030-usr9548-prosport-xdkzn250pd8.ws-eu31.gitpod.io/",
    PICTURE_NOT_FOUND: "not_found.svg",
  }),

  modules: {
    admin,
    basketWindow,
    cap,
    clientInfo,
    products,
    search,
    modalWindows,
  },
});
