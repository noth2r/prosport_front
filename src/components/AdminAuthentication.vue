<template>
  <modal-window
    class="admin_authentication"
    title="Авторизация"
    :visible="!isAuthorized"
    @keyup.enter="_authorize"
  >
    <standard-text v-if="log.length > 0" :text="log" />
    <standard-input
      @input="email = $event.target.value"
      placeholder="Адрес электронной почты"
    />
    <standard-input
      type="password"
      @input="password = $event.target.value"
      placeholder="Пароль"
    />
    <dynamic-button class="login_btn" @click="_authorize">Войти</dynamic-button>
  </modal-window>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "admin-authentication",

  data() {
    return {
      log: "",
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapMutations({
      setAdmin: "clientInfo/setAdminMutation",
    }),

    ...mapActions({
      authorize: "admin/authorizeAction",
      validateToken: "admin/validateTokenAction",
    }),

    _authorize() {
      const { email, password } = this;

      if (email.length === 0) {
        this.log = "Введите e-mail";
      } else if (password.length === 0) {
        this.log = "Введите пароль";
      } else {
        this.authorize(this)
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              this.setAdmin(true);
            } else {
              this.log = res.msg || "Не удалось войти";
            }
          })
          .catch((rej) => {
            throw new Error(rej);
          });
      }
    },

    async _validateToken() {
      try {
        const data = await this.validateToken(this.accessToken);

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  computed: {
    ...mapGetters({
      isAuthorized: "admin/isAuthorizedGetter",
    }),
  },

  components: {
    ModalWindow,
  },

  async mounted() {
    try {
      const isTokenValid = await this._validateToken();
      this.setAdmin(isTokenValid);
    } catch (e) {
      throw new Error(e);
    }
  },
};
</script>

<style scoped>
.login_btn {
  max-width: 6.5vmax;
  padding: 0.6vmax 1vmax;

  border-radius: 0.5vmax;
}
</style>
