<template>
  <div class="btn">
    <standard-img class="img" src="content/back.svg" />
    <standard-text class="text" :text="text || 'Назад'" :appear="false" />
  </div>
</template>

<script>
export default {
  name: "back",
  functional: true,

  props: {
    text: String,
  },
};
</script>

<style scoped>
.btn {
  width: 2.4vmax;
  height: 2.4vmax;
  padding: 1vmax;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-gap: 0vmax;

  cursor: pointer;
  border-radius: 10vmax;
  background: #aaa;
  transition: 0.35s;
}

.btn:hover {
  grid-column-gap: 0.5vmax;
  background: none;
}

.img,
.text {
  transition: inherit;
}

.btn:hover .img {
  filter: none;
}

.img {
  width: 0.9vmax;
  height: 0.9vmax;
  filter: brightness(2);
}

.btn:hover .text {
  width: 100%;
  transform: scale(1) translate(0);
  opacity: 1;
}

.text {
  width: 0;
  color: #7a7a7a !important;
  transform: scale(0) translate(-100%, 0);

  opacity: 0;
}
</style>
