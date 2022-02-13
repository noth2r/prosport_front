<template>
  <div>
    <div class="cap" ref="cap" :class="{ cap_active: search === true }">
      <div class="cap_content">
        <logo-type
          @click="$router.push(`/`)"
          class="logo_type"
          :class="{ logo_type_active: search === true }"
        />
        <standard-input
          class="search"
          @input-input="
            setSearchInput($event.target.value);
            setSearchIsActive();
            changeDynamicBtn();
          "
          :value="searchInput"
          @input-focus="
            setSearchIsActive();
            changeDynamicBtn();
          "
          @keydown.enter="
            searchQuery();
            changeDynamicBtn();
          "
        />
        <dynamic-button
          :style="{ background: currentBtnColor }"
          class="dynamic_btn"
          @click="dynamicButtonClick"
        >
          <transition-group
            name="dynamic_btn_img"
            v-for="(icon, name) in icons"
            :key="name"
          >
            <standard-img
              v-if="icon === currentIcon"
              class="dynamic_btn_img"
              :path="icon"
            />
          </transition-group>
        </dynamic-button>
      </div>
    </div>
    <div
      class="cap_hidden_observer"
      ref="observer"
      @click="
        setSearchIsInactive();
        changeDynamicBtn();
      "
    ></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "cap",
  functional: true,

  props: {
    productsCount: Number,
  },

  methods: {
    ...mapMutations({
      setSearchInput: "cap/setSearchInputMutation",
      setSearchIsActive: "cap/setSearchIsActiveMutation",
      setSearchIsInactive: "cap/setSearchIsInactiveMutation",
      changeDynamicBtn: "cap/changeDynamicBtnMutation",
      dynamicButtonClick: "cap/dynamicButtonClickMutation",
      setDynamicButton: "cap/setDynamicButtonMutation",
      searchQuery: "cap/searchQueryMutation",
    }),
  },

  computed: {
    ...mapState({
      search: (state) => state.cap.search,
      searchInput: (state) => state.cap.searchInput,
      currentBtnColor: (state) => state.cap.currentBtnColor,
      dynamicBtnColors: (state) => state.cap.dynamicBtnColors,
      currentIcon: (state) => state.cap.currentIcon,
      icons: (state) => state.cap.icons,
    }),

    ...mapGetters({
      getLandscapeOrientation: "clientInfo/getLandscapeOrientationGetter",
    }),
  },

  mounted() {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        this.$refs.cap.classList.remove("cap_fixed");
      } else {
        this.$refs.cap.classList.add("cap_fixed");
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .cap_hidden_observer {
    position: absolute;
    top: 0;
    left: 0;
    height: 10vh;
    z-index: -1;
  }

  .cap {
    width: 100%;
    height: 7.5vh;

    display: flex;

    align-items: center;
    justify-content: center;

    z-index: 100;
    overflow: hidden;

    background: #fff;

    transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .cap_fixed {
    position: fixed;

    animation: cap 0.5s;
  }

  @keyframes cap {
    0% {
      transform: translate(0, -10vh);
    }
  }

  .cap_active {
    margin-left: 10vw;
    margin-top: 15vh;

    width: 80vw;

    border-radius: 1.2vmax;

    background: #eee;
  }

  .cap_active ~ .cap_hidden_observer {
    width: 100%;
    height: 100%;
  }

  .cap_content {
    width: 80vw;
    height: 100%;

    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    transition: inherit;
  }

  .logo_type {
    width: 7.5vmax;
    padding: 0.8vmin 0;

    transition: inherit;
  }

  .logo_type_active {
    width: 0;
    padding: 0;
  }

  .cap_active .search {
    margin-left: 0;
  }

  .search {
    padding: 1.5vmin 2vmin !important;
  }

  .dynamic_btn {
    width: 7.5vmax;
    height: 100%;
  }

  .dynamic_btn_img {
    width: 2.2vmax;

    position: absolute;
  }

  .dynamic_btn_img-enter-active,
  .dynamic_btn_img-leave-active {
    transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .dynamic_btn_img-enter-to {
    animation: come_in 0.5s;
  }

  .dynamic_btn_img-leave-to {
    animation: come_out 0.5s;
  }
}

@media screen and (orientation: portrait) {
  .cap_hidden_observer {
    position: absolute;
    top: 0;
    left: 0;
    height: 10vh;
    z-index: -1;
  }

  .cap {
    width: 100%;
    height: 7.5vh;

    display: flex;

    align-items: center;
    justify-content: center;

    z-index: 100;
    overflow: hidden;

    background: #fff;

    transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .cap_fixed {
    position: fixed;

    animation: cap 0.5s;
  }

  @keyframes cap {
    0% {
      transform: translate(0, -10vh);
    }
  }

  .cap_active {
    margin-left: 10vw;
    margin-top: 15vh;

    width: 80vw;

    border-radius: 1vmax;

    background: #eee;
  }

  .cap_active ~ .cap_hidden_observer {
    width: 100%;
    height: 100%;
  }

  .cap_content {
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    transition: inherit;

    background: #fff;
  }

  .logo_type {
    width: 10vmax;
    padding: 2.5vmin;

    transition: inherit;
  }

  .logo_type_active {
    width: 0;
    padding: 0;
  }

  .cap_active .search {
    margin-left: 0;
  }

  .search {
    border-left: 0.5vmin solid #eee !important;
  }

  .dynamic_btn {
    width: 10vmax;
    height: 100%;
  }

  .dynamic_btn_img {
    width: 3.2vmax;

    position: absolute;
  }

  .dynamic_btn_img-enter-active,
  .dynamic_btn_img-leave-active {
    transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .dynamic_btn_img-enter-to {
    animation: come_in 0.5s;
  }

  .dynamic_btn_img-leave-to {
    animation: come_out 0.5s;
  }
}

.search {
  border: none !important;
  outline: none;
  text-align: center;

  transition: inherit !important;
}

@keyframes come_in {
  0% {
    transform: translate(-10vmax, 0) scale3d(1.6, 0, 1);
  }

  100% {
    transform: translate(0);
  }
}

@keyframes come_out {
  100% {
    transform: translate(10vmax, 0) scale3d(1.6, 0, 1);
  }
}
</style>
