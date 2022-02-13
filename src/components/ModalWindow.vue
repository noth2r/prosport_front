<template>
  <transition name="modal">
    <div
      v-if="visible"
      v-swipe="visibleParams"
      class="modal_window"
      :class="{ modal_window_hide: hide }"
      @click="noVisible"
    >
      <transition name="content">
        <standard-block
          v-show="visible"
          @click.stop
          class="block_with_title"
          :class="{ fullscreen_mode: mobileFullscreen, hidden_mode: hide }"
        >
          <div v-if="getPortraitOrientation" class="top_strip_wrapper">
            <span class="top_strip"></span>
          </div>
          <div class="content">
            <div class="title_and_description">
              <standard-title
                style="color: #0094ff"
                class="title"
                :text="title"
                v-if="title"
              />
              <standard-text :text="description" v-if="description" />
            </div>
            <slot></slot>
          </div>
        </standard-block>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "modal-window",

  props: {
    title: String,
    description: String,
    visible: Boolean,
    hiddenMode: Boolean,
  },

  data() {
    return {
      mobileFullscreen: false,
      hide: false,
      visibleParams: {
        dist: document.documentElement.clientWidth / 10,
        swipeToBotFn: () => {
          if (this.mobileFullscreen) {
            this.mobileFullscreen = false;
          } else if (this.hiddenMode && !this.hide) {
            this.hide = true;
            this._hiddenModeTrue();
          } else {
            this._hiddenModeFalse();
            this.noVisible();
          }
        },
        swipeToTopFn: () => {
          if (this.hide) {
            this.hide = false;
            this._hiddenModeFalse();
          } else if (!this.mobileFullscreen) {
            this.mobileFullscreen = true;
          }
        },
      },
    };
  },

  methods: {
    noVisible() {
      this.$emit("noVisible");
    },

    _hiddenModeTrue() {
      this.$emit("hidden-mode-true");
    },

    _hiddenModeFalse() {
      this.$emit("hidden-mode-false");
    },
  },

  computed: {
    ...mapGetters({
      getPortraitOrientation: "clientInfo/getPortraitOrientationGetter",
    }),
  },

  updated() {
    if (this.visible) {
      this.hide = false;
      this.mobileFullscreen = false;
    }
  },
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .modal_window {
    align-items: center;
    justify-content: center;
  }

  .block_with_title {
    min-width: 30vw;
    max-width: 70vw;

    max-height: 80vh;
  }

  .content-enter-active,
  .content-leave-to {
    transform: scale(0.9);
  }

  .content-enter-to {
    transform: scale(1);
  }
}

@media screen and (orientation: portrait) {
  .modal_window {
    padding: 0 1.5vmax;
    padding-bottom: 3.5vmax;
    align-items: flex-end;
    justify-content: center;
  }

  .modal_window_hide {
    padding-bottom: 7.5vmax;
  }

  .block_with_title {
    width: 100vw;
    max-height: 50vh;
    padding: 2.5vmax 1.5vmax !important;
    border-radius: 2.5vmax !important;
  }

  .hidden_mode {
    pointer-events: auto;
    width: 10vmax;
    max-height: 1vmin;
    padding: 0 !important;
    grid-row-gap: 0 !important;
    background: none !important;
    border-radius: 5vmax !important;
  }

  .hidden_mode .content {
    height: 0;
    opacity: 0;
    display: none;
    transition: inherit !important;
  }

  .top_strip_wrapper {
    width: 100%;
    height: 1vmin;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hidden_mode .top_strip {
    width: 15vmax;
    background: #888;
  }

  .top_strip {
    width: 5vmax;
    height: 100%;
    border-radius: 5vmax;
    background: #bbb;
    transition: 0.5s;
  }

  .content-enter-active,
  .content-leave-to {
    transform: translate(0, 100%);
  }

  .content-enter-to {
    transform: translate(0);
  }
}

.modal_window_hide {
  pointer-events: none;
  background: none !important;
}

.modal_window {
  width: 100vw;
  height: 100%;
  max-height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;

  z-index: 200;
  transition: 0.5s;

  background: rgba(0, 0, 0, 0.8);
}

.fullscreen_mode {
  max-height: 85vh !important;
}

.block_with_title,
.block_with_title .content {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  grid-row-gap: 1vmax;
  transition: 0.5s;
}

.title_and_description {
  display: grid;
  grid-row-gap: 0.5vmax;
}

.content {
  height: 100%;
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.5s;
}

.modal-enter-active,
.modal-leave-to {
  opacity: 0;
  pointer-events: none;
}

.modal-enter-to {
  opacity: 1;
}

.content-enter-active,
.content-leave-active {
  transition: 0.5s;
}
</style>
