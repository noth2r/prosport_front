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
