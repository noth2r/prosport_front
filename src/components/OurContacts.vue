<template>
  <standard-block class="our_contacts">
    <standard-text class="standard_text" text="8 (000) 000-00-00" />
    <standard-text class="standard_text" text="8 (000) 000-00-00" />
  </standard-block>
</template>

<script>
export default {
  name: "our-contacts",
  functional: true,
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  .our_contacts {
    height: 100%;

    display: flex;
    flex-direction: row;

    justify-content: space-around;
  }

  .standard_text {
    font-size: 1.2vmax;
  }
}

@media screen and (orientation: portrait) {
  .our_contacts {
    height: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1vmax;
    grid-row-gap: 1vmax;
  }

  .standard_text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8vmax;
  }
}
</style>
