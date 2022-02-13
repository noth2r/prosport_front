<template>
  <modal-window
    class="product_modal_window"
    @noVisible="_noVisible"
    :visible="getProductWindowVisible"
  >
    <div class="product_content">
      <div class="editable_img">
        <div v-if="contentEditable">
          <div class="remove_img">
            <span @click="removeImg()">
              <standard-img src="content/remove.svg" />
            </span>
          </div>
          <input
            accept="image/*"
            type="file"
            id="load_img"
            @change="updateImg($event)"
          />
        </div>
        <label for="load_img" class="load_img">
          <standard-img :fullPath="getFullPath" :path="getProductImg" />
        </label>
      </div>

      <form v-if="contentEditable" class="product_info" @submit.prevent>
        <div class="column">
          <standard-text text="Название" />
          <standard-textarea
            class="column_textarea"
            :value="getProduct.title"
            @input="updateTitle($event.target.value)"
          />
        </div>
        <div class="column">
          <standard-text text="Стоимость" />
          <standard-input
            class="column_input"
            :value="getProduct.price || '0 руб.'"
            placeholder="Стоимость"
            @input="updatePrice($event.target.value)"
          />
        </div>
        <div class="column">
          <standard-text text="Количество" />
          <standard-input
            type="number"
            max="9999999"
            min="0"
            class="column_input"
            :value="getProduct.quantity || 0"
            @input="updateQuantity($event.target.value)"
          />
        </div>
        <div class="column">
          <standard-text text="Категория" />
          <standard-input
            class="column_input"
            :value="getProduct.product_category || ''"
            @input="updateCategory($event.target.value)"
          />
        </div>
        <div class="column">
          <standard-text text="Подкатегория" />
          <standard-input
            class="column_input"
            :value="getProduct.product_subcategory || ''"
            @input="updateSubcategory($event.target.value)"
          />
        </div>
        <div class="column">
          <standard-text text="Описание" />
          <standard-textarea
            class="column_textarea"
            :value="getProduct.description"
            @input="updateDescription($event.target.value)"
          />
        </div>
        <div class="price_btn">
          <dynamic-button
            @click="cancel()"
            class="dynamic_btn"
            style="background: #999"
          >
            Отмена
          </dynamic-button>
          <dynamic-button @click="save()" class="dynamic_btn">
            Сохранить
          </dynamic-button>
        </div>
      </form>

      <div
        v-else
        class="product_info"
        :class="{ product_info_admin: isAdmin }"
        @click="contentClick"
      >
        <div class="column">
          <standard-title class="product_title" :text="getProduct.title" />
        </div>

        <standard-text
          v-if="getProduct.quantity === 0"
          class="product_quantity"
          text="Нет в наличии"
        />

        <div class="price_btn">
          <standard-text class="product_price" :text="getProduct.price" />
          <standard-text
            v-if="isAdmin"
            class="product_in_basket"
            @click="deleteProduct()"
            text="Удалить"
          />
          <standard-text
            v-else-if="_isItInCart"
            class="product_in_basket"
            @click="removeFromCart(getProduct.id)"
            text="Удалить из корзины"
          />
          <standard-text
            v-else
            class="product_in_basket"
            @click="addToCart(getProduct)"
            text="В корзину"
          />
        </div>
        <div class="column" v-if="getProduct.quantity">
          <standard-text text="Количество" />
          <standard-text :text="getProduct.quantity" />
        </div>
        <div class="column" v-if="getProduct.product_category">
          <standard-text text="Категория" />
          <standard-text :text="getProduct.product_category" />
        </div>
        <div class="column" v-if="getProduct.product_subcategory">
          <standard-text text="Подкатегория" />
          <standard-text :text="getProduct.product_subcategory" />
        </div>
        <standard-text
          class="product_description"
          :text="getProduct.description"
        />
      </div>
    </div>
  </modal-window>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";
const ModalWindow = defineAsyncComponent(() =>
  import("@/components/ModalWindow")
);

export default {
  name: "product-modal-window",

  data() {
    return {
      contentEditable: false,
    };
  },

  components: {
    ModalWindow,
  },

  computed: {
    ...mapGetters({
      isAdmin: "clientInfo/isAdminGetter",
      getProductWindowVisible: "modalWindows/getProductWindowVisibleGetter",
      getProduct: "modalWindows/getProductGetter",
      getProductsInBasket: "basketWindow/getProductsInBasketGetter",
      getUploadedPicture: "products/getUploadedPictureGetter",
      isItInCart: "basketWindow/isItInCartGetter",
    }),

    id: function () {
      return this.getProduct.id;
    },

    getFolder: function () {
      return this.getProduct.img_path === "not_found.svg" &&
        !this.getProduct.img_data
        ? false
        : "products";
    },

    getFullPath: function () {
      return Boolean(this.getProduct.img_data || false);
    },

    getProductImg: function () {
      return this.getProduct.img_data || "products/" + this.getProduct.img_path;
    },

    _isItInCart: function () {
      return this.isItInCart(this.id);
    },
  },

  methods: {
    ...mapActions({
      addToCart: "basketWindow/addToCartAction",
      removeFromCart: "basketWindow/removeFromCartAction",
      removeProduct: "products/removeProductAction",
      loadImg: "products/loadImgAction",
      getProductById: "products/getProductByIdAction",
      updateProduct: "products/updateProductAction",
      setProductWindow: "modalWindows/setProductWindowAction",
      removeProductImg: "products/removeProductImgAction",
      setWindowVisible: "modalWindows/setWindowVisibleAction",
    }),

    ...mapMutations({
      setVisible: "modalWindows/setVisibleProductWindowMutation",
      updateTitle: "products/updateProductTitleMutation",
      updateDescription: "products/updateProductDescriptionMutation",
      updateCategory: "products/updateProductCategoryMutation",
      updateSubcategory: "products/updateProductSubcategoryMutation",
      updatePrice: "products/updateProductPriceMutation",
      updateAmount: "products/updateProductAmountMutation",
      updateQuantity: "products/updateProductQuantityMutation",
      updateImg: "products/updateProductImgMutation",
      updateProductChanges: "products/updateProductChangesMutation",
      removeProductChanges: "products/removeProductChangesMutation",
      setProductImgWindow: "modalWindows/setProductImgWindowMutation",
      removeProductImgPath: "modalWindows/removeProductImgPathMutation",
      removeProductImgData: "modalWindows/removeProductImgDataMutation",
    }),

    editMode(bool) {
      this.contentEditable = bool ?? this.contentEditable ? false : true;

      if (!this.contentEditable === false)
        this.updateProductChanges(this.getProduct);
    },

    _noVisible() {
      this.setWindowVisible("productWindow");
      this.removeProductChanges();
      this.editMode(true);
    },

    removeImg() {
      this.contentEditable = false;
      const id = this.getProduct.id;

      this.removeProductImg(id)
        .then(this.removeProductImgPath)
        .then(this.removeProductImgData)
        .catch((error) => {
          throw new Error(error);
        });
    },

    async updateImg(event) {
      try {
        const productImg = await this.loadImg(event);

        this.setProductImgWindow(productImg);
      } catch (error) {
        throw new Error(error);
      }
    },

    contentClick() {
      if (this.isAdmin) {
        this.removeProductChanges();
        this.editMode();
      }
    },

    cancel() {
      this.contentClick();
      this.removeProductImgData();
    },

    save() {
      this.updateProduct()
        .then(this.setProductWindow)
        .then(this.contentClick)
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
};
</script>

<style scoped>
.product_modal_window {
}

@media screen and (orientation: landscape) {
  .product_content {
    min-height: 40vh;

    display: grid;

    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 100%;
    grid-column-gap: 1.5vmax;
  }

  .editable_img .remove_img {
    width: 100%;
    height: 30%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 2;
  }

  .editable_img .remove_img:hover span {
    opacity: 1;
    transform: translate(0) scale(1);
    background: rgba(0, 0, 0, 0.6);
  }

  .editable_img .remove_img span {
    width: 6vmin;
    height: 6vmin;
    position: absolute;
    top: 35%;
    padding: 0.7vmax;
    border-radius: 50vmax;
    background: none;
    cursor: pointer;
    opacity: 0;
    transform: translate(0, -50%) scale(0.6);
    transition: 0.25s;
  }

  .product_title {
    padding: 0 !important;

    font-weight: 400 !important;
  }

  .product_info {
    max-height: inherit;
  }

  .price_btn {
    grid-column-gap: 1vmax;
  }
}

@media screen and (orientation: portrait) {
  .product_content {
    display: grid;

    grid-row-gap: 1.5vmax;
    overflow-y: auto;
  }

  .product_title {
    padding: 0 !important;

    font-size: 2vmax !important;
    font-weight: 400 !important;
  }

  .product_info {
    max-height: 40vh;
  }

  .price_btn {
    grid-column-gap: 1.5vmax;
  }

  .product_price,
  .product_in_basket {
    font-size: 1.8vmax !important;
  }
}

.product_content {
  width: 100%;
  height: 100%;
  max-width: inherit;
  max-height: inherit;
}

.product_content img,
.product_title,
.product_price,
.product_description,
.product_in_basket {
  transition: 0.35s;
}

.editable_img {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 1vmax;
}

.editable_img .remove_img img {
  height: 100%;
  object-fit: contain;
  filter: brightness(5);
}

.editable_img input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.product_content img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  transition: 0.5s;
}

.product_info {
  width: 100%;
  height: 100%;

  padding-right: 0.5vmax;

  display: flex;
  flex-direction: column;

  grid-row-gap: 1.5vmax;
  overflow-x: hidden;
  overflow-y: auto;
}

.price_btn {
  display: flex;

  align-items: center;
}

.product_price {
}

.product_in_basket {
  cursor: pointer;
  user-select: none;
}

.product_in_basket:hover {
  color: #ff9040;
}

.product_description {
  width: 100%;
  height: 100%;
  word-wrap: break-word !important;
}

.column {
  display: flex;
  flex-direction: column;
  grid-row-gap: 0.3vmax;
}

.column_textarea {
  height: 15vh;
}

.dynamic_btn {
  padding: 1.2vmin 1.5vmin;
  border-radius: 0.5vmax;
}
</style>
