<template>
  <div class="add_email">
    <block-with-title
      title="Добавьте e-mail"
      description="
      Подпишитесь на рассылку, чтобы Мы могли отправлять новые товары Вам на e-mail.
    "
    >
      <form @submit.prevent>
        <standard-input class="standard_input" placeholder="12345@mail.com" />
        <dynamic-button class="dynamic_btn">Отправить</dynamic-button>
      </form>
    </block-with-title>
  </div>
</template>

<script>
export default {
  name: "add-email",

  functional: true,
};
</script>

<style scoped>
@media screen and (orientation: landscape) {
  form {
    grid-row-gap: 1vmax;
  }

  .standard_input {
    height: 6.5vh;
  }

  .dynamic_btn {
    max-width: 6.5vmax;
    padding: 1vmin;
  }
}

@media screen and (orientation: portrait) {
  form {
    grid-row-gap: 1.5vmax;
  }

  .standard_input {
    height: 6vh;
    font-size: 1.6vmax !important;
  }

  .dynamic_btn {
    width: 10vmax;
    padding: 1vmax;
  }
}

.add_email {
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
}

.standard_input {
  padding: 1vmax;

  border-radius: 0.5vmax;
  border: none;

  background: #f5f5f5;
}

.dynamic_btn {
  border-radius: 0.5vmax;
}
</style>
