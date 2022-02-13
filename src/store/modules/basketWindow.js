import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    // Товары
    productsInBasket: {},
    selectedProductsInBasket: {},
    // Сумма выбранных товаров
    sum: 0,

    // Вкладки
    activeTab: 0,
    tabs: [
      {
        title: "Корзина",
        description: "Выберите интересующие Вас товары и нажмите кнопку Далее",
      },
      {
        title: "Заказать товар",
        description: "Укажите количество нужного Вам товара",
      },
      {
        title: "Форма заказа",
        description: "Заполните форму для выполнения заказа",
      },
      {
        title: "Способ оплаты",
        description: "Выберите способ оплаты из списка ниже",
      },
    ],
    checkboxTabs: [0],
    counterTabs: [1],
    productsTabs: [0, 1],
    orderProductTabs: [2],
    paymentTabs: [3],

    // Внутренние вкладки
    innerTabs: {
      tinkoff: false,
    },

    paymentMethods: [{ paymentMethod: "tinkoff", img: "content/Tinkoff.png" }],

    // Форма заказа
    orderFormFields: {
      inputs: [
        {
          name: "mail",
          value: "",
          isValid: false,
          placeholder: "e-mail",
          check: "isEmail",
        },
        {
          type: "text",
          name: "phone",
          value: "",
          check: "isMobilePhone",
          isValid: false,
          placeholder: "Номер телефона",
        },
        {
          name: "address",
          value: "",
          isValid: false,
          placeholder: "Адрес",
        },
      ],

      textareas: [
        {
          name: "comment",
          value: "",
          placeholder: "Комментарий",
        },
      ],
    },

    // Форма оплаты
    paymentForms: {
      tinkoff: {
        inputs: [
          {
            type: "text",
            name: "phone",
            value: "",
            check: "isMobilePhone",
            readonly: true,
            placeholder: "Номер телефона",
          },
        ],
        textareas: [],
        submitBtn: {
          class: "tinkoffPayRow",
          value: "Оплатить",
        },
      },
    },
  }),

  mutations: {
    // Выбрать товар
    selectProductMutation(state, product) {
      state.selectedProductsInBasket[product.id] = product;
    },

    // Изменить количество "выбранного" товара
    changeSelectedProductCountMutation(state, { id, inBasketCount }) {
      state.selectedProductsInBasket[id].inBasketCount = inBasketCount;
    },

    // Удалить выбранный товар
    removeSelectedProductMutation(state, id) {
      delete state.selectedProductsInBasket[id];
    },

    // Перейти к следующей вкладке
    nextTabMutation(state) {
      if (state.activeTab >= state.tabs.length - 1) return;
      else state.activeTab += 1;
    },

    // Сменить текущую вкладку
    setTabMutation(state, tab) {
      state.activeTab = tab;
    },

    // Сделать поле валидным в объекте orderFromFields
    makeInputFieldValidMutation(state, fieldName) {
      state.orderFormFields.inputs.find(
        (v) => v.name === fieldName
      ).isValid = true;
    },

    // Сделать поле не валидным в объекте orderFromFields
    makeInputFieldInvalidMutation(state, fieldName) {
      state.orderFormFields.inputs.find(
        (v) => v.name === fieldName
      ).isValid = false;
    },

    // Изменить значение input в объекте orderFromFields
    changeOrderFormInputMutation(state, { fieldName, value }) {
      const field = state.orderFormFields.inputs.find(
        (el) => el.name === fieldName
      );
      field.value = value;
    },

    // Изменить значение textarea в объекте orderFromFields
    changeOrderFormTextareaMutation(state, { fieldName, value }) {
      const field = state.orderFormFields.textareas.find(
        (el) => el.name === fieldName
      );
      field.value = value;
    },

    // Изменить значение input в объекте paymentForms
    changePaymentFormInputMutation(state, { fieldName, value }) {
      const activeTab = Object.entries(state.innerTabs).find(([k, v]) =>
        v === true ? k : -1
      )[0];
      const field = state.paymentForms[activeTab]?.inputs.find(
        (el) => el.name === fieldName
      );
      field.value = value;
    },

    // Изменить значение textarea в объекте paymentForms
    changePaymentFormTextareaMutation(state, { fieldName, value }) {
      const activeTab = Object.entries(state.innerTabs).find(([k, v]) =>
        v === true ? k : -1
      )[0];
      const field = state.paymentForms[activeTab]?.textareas.find(
        (el) => el.name === fieldName
      );
      field.value = value;
    },

    // Сменить внутреннюю вкладку на активную
    setInnerTabMutation(state, tab) {
      if (state.innerTabs[tab] === undefined) return;
      state.innerTabs[tab] = true;
    },

    // Сменить внутреннюю вкладку на неактивную
    unsetInnerTabMutation(state, tab) {
      state.innerTabs[tab] = false;
    },

    saveProductsMutation(state, productsId = []) {
      sessionStorage.setItem("products_id", JSON.stringify(productsId));
    },

    pushProductsMutation(state, products) {
      const orderInfo = {
        inBasketCount: Number,
      };

      products.forEach((product) => {
        orderInfo.inBasketCount = product.quantity ? 1 : 0;
        const productInBasket = Object.assign(product, orderInfo);
        state.productsInBasket[product.id] = productInBasket;
      });
    },
  },

  getters: {
    // Получить товары из корзины
    getProductsInBasketGetter(state) {
      const productsJSON = sessionStorage.getItem("products_in_basket");
      const storedProducts = JSON.parse(productsJSON);

      return Object.assign(state.productsInBasket, storedProducts);
    },

    // Получить количество товаров в корзине
    getCountProductsInBasketGetter(state) {
      return Object.keys(state.productsInBasket).length;
    },

    // Получить активную вкладку
    getActiveTabGetter(state) {
      return state.activeTab;
    },

    // Получить все вкладки
    getTabsGetter(state) {
      return state.tabs;
    },

    // Получить количество вкладок
    getTabsCountGetter(state) {
      return state.tabs.length;
    },

    // Получить выбранные товары из корзины
    getSelectedProductsInBasketGetter(state) {
      return state.selectedProductsInBasket;
    },

    // Получить количество выбранных товаров
    getCountSelectedProductsInBasketGetter(state) {
      return Object.keys(state.selectedProductsInBasket).length;
    },

    // Получить сумму всех выбранных товаров
    getSumOfSelectedProductsGetter(state) {
      state.sum = 0;

      Object.values(state.selectedProductsInBasket).forEach((product) => {
        const price = +product.price.match(/(\d+)/)[0];

        state.sum += price * (product.inBasketCount || 1);
      });

      const sumStr = state.sum.toString();

      // Добавить пробелы после каждых 3 символов
      return sumStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
    },

    // Получить вкладки с чекбоксами
    getCheckboxTabsGetter(state) {
      return state.checkboxTabs.includes(state.activeTab);
    },

    // Получить вкладки с указанием количества товара
    getCounterTabsGetter(state) {
      return state.counterTabs.includes(state.activeTab);
    },

    // Получить вкладки с товарами
    getProductsTabsGetter(state) {
      return state.productsTabs.includes(state.activeTab);
    },

    // Получить вкладки с заказом товара
    getOrderProductTabsGetter(state) {
      return state.orderProductTabs.includes(state.activeTab);
    },

    // Получить вкладки с оплатой
    getPaymentTabsGetter(state) {
      return state.paymentTabs.includes(state.activeTab);
    },

    // Получить форму заказа
    getOrderFormFieldsGetter(state) {
      return state.orderFormFields;
    },

    // Получить input формы заказа
    getInputsOrderFormFieldsGetter(state) {
      return state.orderFormFields.inputs;
    },

    // Получить textarea формы заказа
    getTextareasOrderFormFieldsGetter(state) {
      return state.orderFormFields.textareas;
    },

    // Получить количество валидных форм
    getNumberOfValidFieldsGetter(state) {
      let values = Object.values(state.orderFormFields.inputs);
      return values.filter((field) => field.isValid).length;
    },

    // Получить количество форм
    getNumberOfFieldsGetter(state) {
      let values = Object.values(state.orderFormFields.inputs);
      return values.length;
    },

    // Получить текущее состояние внутренних вкладок оплаты
    getPaymentInnerTabGetter(state) {
      const paymentMethods = Object.values(state.paymentMethods).map(
        (v) => v.paymentMethod
      );
      const names = Object.getOwnPropertyNames(state.innerTabs);
      return names.find((name) => paymentMethods.includes(name));
    },

    // Получить форму оплаты
    getPaymentFormGetter(state, getters) {
      return state.paymentForms[getters.getPaymentInnerTabGetter];
    },

    // Получить поля ввода формы оплаты
    getInputsPaymentFormGetter(state, getters) {
      return getters.getPaymentFormGetter.inputs;
    },

    // Проверка полей формы заказа на валидность
    isInvalidInputsInFormsGetter(state, getters) {
      const inputs = [
        ...getters.getInputsPaymentFormGetter,
        ...getters.getInputsOrderFormFieldsGetter,
      ];
      return Boolean(
        inputs.find((input) => input.value === "" || input?.isValid === false)
      );
    },

    // Получить методы оплаты
    getPaymentMethodsGetter(state) {
      return state.paymentMethods;
    },

    isInnerTabGetter(state) {
      return Object.values(state.innerTabs).find((el) => el === true);
    },

    getProductsIdGetter() {
      return JSON.parse(sessionStorage.getItem("products_id"));
    },

    getStoredProductsIdLengthGetter(state, getters) {
      return !getters.getProductsIdGetter
        ? 0
        : getters.getProductsIdGetter.length;
    },

    getOrderFormDTO(state, getters) {
      const form = getters.getOrderFormFieldsGetter;
      const dto = {};
      const selectedProducts = Object.values(
        getters.getSelectedProductsInBasketGetter
      );

      for (const name in form) {
        const fields = form[name];
        fields.forEach(({ name, value }) => (dto[name] = value));
      }
      dto.amount =
        +getters.getSumOfSelectedProductsGetter.replaceAll(" ", "") * 100; // В копейках
      dto.items = selectedProducts.map(
        ({ id, title, price, inBasketCount }) => {
          title = title.slice(0, 128);
          price = parseInt(price.match(/(\d+)/)) * 100; // В копейках
          return {
            OrderId: id,
            Name: title,
            Price: price,
            Quantity: inBasketCount || 0,
            Amount: price * inBasketCount,
            Tax: "none",
          };
        }
      );

      return dto;
    },

    getSelectedProductsIdGetter(state, getters) {
      const selectedProducts = Object.assign(
        {},
        getters.getSelectedProductsInBasketGetter
      );
      const keys = Object.keys(selectedProducts);

      return keys;
    },

    isItInCartGetter: (state) => (id) => {
      const identifiers = Object.keys(state.productsInBasket);

      return identifiers.find((productId) => productId == id);
    },
  },

  actions: {
    // Добавить в корзину
    addToCartAction({ commit, getters }, product) {
      commit("pushProductsMutation", [product]);

      const productsId = new Set(getters.getProductsIdGetter ?? []);
      productsId.add(product.id);

      commit("saveProductsMutation", Array.from(productsId));
    },

    // Удалить из корзины
    removeFromCartAction({ state, commit, getters }, id) {
      // Удалить товар из "выбранных"
      commit("removeSelectedProductMutation", id);
      delete state.productsInBasket[id];

      const productsId = new Set(getters.getProductsIdGetter ?? []);
      productsId.delete(id);

      commit("saveProductsMutation", Array.from(productsId));
    },

    async orderProductsAction({ getters }) {
      try {
        const form = getters.getOrderFormDTO;
        const productId = getters.getSelectedProductsIdGetter;
        const url = "/api/tinkoff/order_products";
        const body = { form, productId };

        return await axios.post(url, body);
      } catch (error) {
        throw new Error(error);
      }
    },

    async _getProductsById({ getters }, argProductsId = []) {
      try {
        if (getters.getStoredProductsIdLengthGetter === 0 || !argProductsId)
          return;

        const productsId = getters.getProductsIdGetter;
        const url = "/api/products/get_products_by_id";
        const body = argProductsId.length ? argProductsId : productsId;

        return await axios.post(url, body);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getStoredProductsAction({ dispatch, commit }, productsId) {
      try {
        const res = await dispatch("_getProductsById", productsId);

        if (res && res.status === 200) {
          const products = res.data;

          commit("pushProductsMutation", products);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

  modules: {},
};
