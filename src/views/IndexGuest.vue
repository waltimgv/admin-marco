<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <base-material-card color="primary" class="px-5 py-3">
          <v-form action="/login" method="POST" v-model="isValid">
            <v-card-text>
              <v-text-field
                id="email"
                label="E-mail"
                name="email"
                type="email"
                :rules="[v => !!v || 'Email é obrigatório']"
                v-model="email"
                required
              />

              <v-text-field
                id="password"
                label="Senha"
                name="password"
                type="password"
                :rules="[v => !!v || 'Senha é obrigatório']"
                v-model="password"
                required
              />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" :disabled="!isValid || isLoading" color="primary" @click="handleLogin">Entrar</v-btn>
            </v-card-actions>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlanMixin from "../components/mixin/plan-mixin";
import { login } from "../services/authService";
import { mapMutations } from "vuex";

export default {
  name: "IndexGuest",
  mixins: [PlanMixin],
  data: function() {
    return {
      email: "",
      password: "",
      isValid: true,
      isLoading: false,
      snackbar: false,
    };
  },
  computed: {
    login: function() {
      return { email: this.email, password: this.password };
    }
  },
  methods: {
    ...mapMutations({
      setUser: "SET_USER",
      setJwt: "SET_JWT"
    }),
    callbackSuccess(data) {
      this.setUser(JSON.stringify(data.user));
      this.setJwt(data.access_token);
    },
    callbackError() {
      this.setJwt(null);
      this.setUser(null);
    },
    handleLogin(event) {
      const vm = this;
      event.preventDefault();
      this.isLoading = true;

      login(this.login)
        .then(response => response.data)
        .then(data => vm.callbackSuccess(data))
        .catch(() => {
          vm.callbackError();
          vm.$toast.error("Credenciais incorretas, tente novamente.");
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>

<style scoped>
</style>