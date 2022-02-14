import axios from "axios";
import SortProductsWorker from "@/workers/SortProducts.worker.js?worker";

export default {
  namespaced: true,
  strict: true,

  state: () => ({
    sortedProducts: {},

    productChanges: {
      id: 0,
      product_category: "",
      product_subcategory: "",
      title: "",
      description: "",
      units: "",
      img_path: "",
      img_data: "",
      img_file: {},
      price: 0,
      quantity: 0,
      amount: 0,
      inBasketCount: 0,
    },
  }),

  mutations: {
    clearProductsMutation(state) {
      state.sortedProducts = {}
    },

    updateProductTitleMutation(state, v) {
      state.productChanges.title = v ?? "";
    },

    updateProductDescriptionMutation(state, v) {
      state.productChanges.description = v ?? "";
    },

    updateProductCategoryMutation(state, v) {
      state.productChanges.product_category = v ?? "";
    },

    updateProductSubcategoryMutation(state, v) {
      state.productChanges.product_subcategory = v ?? "";
    },

    updateProductPriceMutation(state, v) {
      state.productChanges.price = v ?? 0;
    },

    updateProductAmountMutation(state, v) {
      state.productChanges.amount = v ?? 0;
    },

    updateProductQuantityMutation(state, v) {
      state.productChanges.quantity = v ?? 0;
    },

    _updateProductImg(state, { imgPath, imgData }) {
      state.productChanges.img_path = imgPath ?? "";
      state.productChanges.img_data = imgData ?? "";
    },

    updateProductChangesMutation(state, product) {
      const productChanges = state.productChanges;
      state.productChanges = Object.assign(productChanges, product);
    },

    _removeProductImgMutation(state, id) {
      const index = state.products.findIndex((product) => id === product.id);

      state.products[index].img_path = this.state.PICTURE_NOT_FOUND;
      state.products[index].img_data = "";
      state.products[index].img_file = "";
    },

    removeProductChangesMutation(state) {
      for (const key in state.productChanges) {
        const type = typeof state.productChanges[key]; /* String | Number */
        state.productChanges[key] = type === "number" ? 0 : "";
      }
    },

    _removeProductFromState(state, id) {
      const index = state.products.findIndex((product) => product?.id === id);
      state.products.splice(index, 1);
    },
  },

  actions: {
    async setSortedProductsAction({ state }, products) {
      queueMicrotask(() => {
        if (Object.keys(state.sortedProducts).length === 0) {
          state.sortedProducts = products;
        } else {
          const keys = Object.keys(products);
          for (const key of keys) {
            if (
              Object.prototype.hasOwnProperty.call(state.sortedProducts, key)
            ) {
              state.sortedProducts[key] = state.sortedProducts[key].concat(
                products[key]
              );
            } else {
              state.sortedProducts[key] = [products[key]];
            }
          }
        }
      });
    },

    async getProductByIdAction({ state }, id) {
      return state.products.find((product) => product.id === id);
    },

    _encodeUTF8(_, data) {
      const textEncoderUTF8 = new TextEncoder("utf-8");
      const json = JSON.stringify(data);
      const bytes = textEncoderUTF8.encode(json);

      return bytes;
    },

    _decodeUTF8(_, bytes) {
      const textDecoderUTF8 = new TextDecoder("utf-8");
      const decoded = textDecoderUTF8.decode(bytes);
      const data = JSON.parse(decoded);

      return data;
    },

    _onMessageSortedProducts({ dispatch }, bytes) {
      dispatch("_decodeUTF8", bytes)
        .then((sortedProducts) =>
          dispatch("setSortedProductsAction", sortedProducts)
        )
        .catch(console.error);
    },

    async sortProductsAction({ dispatch }, bytesObj) {
      try {
        const sortProductsWorker = new SortProductsWorker();
        const bytes = new Uint8Array(Object.values(bytesObj));

        sortProductsWorker.onmessage = ({ data }) =>
          dispatch("_onMessageSortedProducts", data).then(() =>
            sortProductsWorker.terminate()
          );

        sortProductsWorker.postMessage({ data: bytes });
      } catch (error) {
        console.error(error);
      }
    },

    // Запрос на получение товаров
    async getProductsAction({ dispatch }) {
      try {
        const url = "/api/products?from=0";
        const { data } = await axios.get(url);

        await dispatch("sortProductsAction", data);
      } catch (e) {
        console.error(e);
      }
    },

    // Запрос на получение товаров по категории
    async getProductsByCategoryAction({ state, dispatch }, category) {
      try {
        const productsLength =
          Object.keys(state.sortedProducts[category]).length ?? 0;
        const url = `/api/products/get_products_by_category?category=${category}&from=${productsLength}`;
        const { data } = await axios.get(url);

        await dispatch("sortProductsAction", data);
      } catch (e) {
        console.error(e);
      }
    },

    async removeProductImgAction({ commit }, id) {
      try {
        commit("_removeProductImgMutation", id);

        const url = "/api/admin/remove_product_img";
        const body = { id };
        const accessToken = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };

        await axios.post(url, body, config);
      } catch (error) {
        console.error(error);
      }
    },

    async _readFile(state, file) {
      try {
        const reader = new FileReader();

        return new Promise((res, rej) => {
          reader.readAsDataURL(file);
          reader.addEventListener("load", () => res(reader.result));
          reader.addEventListener("abort", () => rej("FileReader error"));
        });
      } catch (err) {
        console.error(err);
      }
    },

    async loadImgAction({ state, commit, dispatch }, event) {
      try {
        const file = await event.target.files[0];
        const imgData = await dispatch("_readFile", file);
        const imgPath = file.name;

        state.productChanges.img_file = file;

        commit("_updateProductImg", { imgPath, imgData });

        return imgData;
      } catch (err) {
        console.error(err);
      }
    },

    async removeProductAction({ commit }, id) {
      try {
        commit("_removeProductFromState", id);

        const url = "/api/admin/remove_product";
        const body = { id };
        const accessToken = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const res = await axios.post(url, body, config);
        const data = res.data;

        return data;
      } catch (e) {
        console.error(e);
      }
    },

    async _updateProductByIdClient({ state }) {
      const changes = state.productChanges;
      const id = changes.id;
      const index = state.products.findIndex((product) => id === product.id);
      const product = state.products[index];

      state.products[index] = Object.assign(product, changes);
    },

    async _updateProductQuery(state, product) {
      try {
        const entries = Object.entries(product);
        const formData = new FormData();

        entries.forEach(([key, value]) => formData.append(key, value));

        const accessToken = localStorage.getItem("accessToken");
        const url = "/api/admin/update_product";
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const res = await axios.post(url, formData, config);
        const data = res.data;

        return data;
      } catch (e) {
        console.error(e);
      }
    },

    async _getProductDTO({ state }) {
      const product = state.productChanges;

      return Object.assign(
        {},
        {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          amount: product.amount,
          img_path: product.img_path,
          img_file: product.img_file,
          product_category: product.product_category,
          product_subcategory: product.product_subcategory,
        }
      );
    },

    async updateProductAction({ state, dispatch }) {
      try {
        const productDTO = await dispatch("_getProductDTO");

        await dispatch("_updateProductByIdClient");
        await dispatch("_updateProductQuery", productDTO);

        return Object.assign({}, state.productChanges);
      } catch (e) {
        console.error(e);
      }
    },
  },

  getters: {
    getSortedProductsGetter(state) {
      return state.sortedProducts;
    },

    getUploadedPictureGetter(state) {
      return state.productChanges.img_data;
    },

    getCategoriesSubcategoriesGetter(state) {
      const categories = {};

      for (const key in state.sortedProducts) {
        const category = state.sortedProducts[key];
        categories[key] = Object.values(category).reduce(
          (acc, elem) => acc.add(elem.product_subcategory),
          new Set()
        );
      }

      return categories;
    },
  },
  modules: {},
};
