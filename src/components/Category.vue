<template>
  <div class="category_subcategories">
    <transition
      appear
      appear-class="appear-class"
      appear-active-class="appear-active-class"
      name="category"
    >
      <standard-title
        class="category"
        @click="setCategory"
        :class="{ category_active: categoryActive }"
        :text="title"
      />
    </transition>
    <transition name="subcategories_line" v-show="categoryActive">
      <div class="subcategories_line">
        <div class="subcategory_line">
          <span></span>
        </div>
        <div class="subcategories">
          <transition-group
            name="subcategories_list"
            v-for="(subcategory, i) in category"
            :key="i"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div v-if="categoryActive" :data-index="i">
              <standard-text
                class="subcategory"
                @click="
                  setSearchInput(subcategory);
                  setSearchIsActive();
                  changeDynamicBtn();
                "
                :text="subcategory"
              />
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "category-subcategories",

  props: {
    title: String,
    category: Set,
  },

  data() {
    return {
      categoryActive: false,
      animAppearanceDisappearance: "translate(-2vmax, 0) scale(0)",
    };
  },

  methods: {
    ...mapMutations({
      setSearchInput: "cap/setSearchInputMutation",
      setSearchIsActive: "cap/setSearchIsActiveMutation",
      changeDynamicBtn: "cap/changeDynamicBtnMutation",
    }),

    setCategory: function () {
      if (this.categoryActive) this.categoryActive = false;
      else this.categoryActive = true;
    },

    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.transform = this.animAppearanceDisappearance;
    },

    enter: function (el, done) {
      let delay = el.dataset.index * 100;

      setTimeout(function () {
        el.style.cssText = "";
        done;
      }, delay);
    },

    leave: function (el, done) {
      let delay = el.dataset.index * 100;

      setTimeout(function () {
        el.style.opacity = 0;
        el.style.transform = this.animAppearanceDisappearance;
        done;
      }, delay);
    },
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .category {
    font-size: 1vmax;
    font-weight: 400;

    cursor: pointer;
  }

  .category_subcategories {
    grid-row-gap: 0.6vmax;
  }

  .subcategories_line {
    grid-template-columns: 1vmax 1fr;
  }

  .subcategory {
    font-size: 0.8vmax;
    font-weight: 400;

    cursor: pointer;
  }

  .category:hover,
  .subcategory:hover {
    color: #ff9040;
  }
}

@media screen and (orientation: portrait) {
  .category {
    font-size: 1.8vmax;
    font-weight: 400;

    cursor: pointer;
  }

  .category_subcategories {
    grid-row-gap: 1vmax;
  }

  .subcategories_line {
    grid-template-columns: 1.5vmax 1fr;
  }

  .subcategory {
    font-size: 1.6vmax;
    font-weight: 400;

    cursor: pointer;
  }
}

.category_subcategories {
  display: flex;
  flex-direction: column;

  transition: 0.5s;
}

.category_subcategories * {
  width: fit-content;
  transition: inherit;
}

.category_active {
  color: #ff9040;
}

.subcategories_line {
  height: 100%;

  display: grid;
}

.subcategories {
  height: 100%;

  display: flex;
  flex-direction: column;
  grid-row-gap: 1vmax;
}

.subcategory_line {
  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;
}

.subcategory_line span {
  width: 0.25vmin;
  height: 100%;

  border-radius: 1vmax;

  background: #ff9040;
}

/* Anim start */
.subcategories_line-enter-active,
.subcategories_line-leave-active,
.subcategories_list-move {
  transition: 0.5s;
}

.subcategories_line-enter-from,
.subcategories_line-leave-to {
  height: 0;
  overflow: hidden;
  opacity: 0;
}

.appear-class {
  opacity: 1;
}

.appear-active-class {
  opacity: 0;
  transform: translate(0, 50%);

  transition: 0.5s;
}
/* Anim end */
</style>
