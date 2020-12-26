<template>
  <v-card class="mb-0 mt-0">
    <v-card-text>
      <v-btn
        block
        color="blue-grey"
        class="mb-2 white--text v-btn-google"
        @click="handleSocialLogin('google')"
      >
        <v-icon left dark>mdi-google-glass</v-icon>
        Com Google
      </v-btn>

      <v-btn
        block
        color="blue-grey"
        class="white--text v-btn-facebook"
        @click="handleSocialLogin('facebook')"
      >
        <v-icon left dark>mdi-facebook-box</v-icon>
        Com Facebook
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import {socialLogin} from '../services/authService';
import {mapMutations, mapState} from 'vuex';
import vuetifyToast from 'vuetify-toast';

export default {
  name: 'LoginCard',
  computed: {
    ...mapState(['interval_refresh_token']),
  },
  methods: {
    ...mapMutations({
      setUser: 'SET_USER',
      setJwt: 'SET_JWT',
      setRefresh: 'SET_INTERVAL_REFREST_TOKEN',
      setTermsUseModal: 'SET_TERMS_USE_MODAL',
    }),
    callbackSuccess(data) {
      this.setUser(JSON.stringify(data.user));
      this.setJwt(data.access_token);
    },
    callbackError() {
      this.setJwt(null);
      this.setUser(null);
    },
    handleSocialLogin(provider) {
      const vm = this;

      this.$auth.authenticate(provider).then(response => {
        socialLogin(provider, response)
          .then(response => response.data)
          .then(data => {
            vm.callbackSuccess(data);
            vm.setTermsUseModal(data.user.is_terms_use_accepted === false);
          })
          .catch(() => vuetifyToast.error('Ocorreu um erro, não foi possível entrar.'));
      }).catch(() => vuetifyToast.error('Credenciais incorretas, tente novamente.'));
    },
  }
}
</script>

<style scoped>
  .v-btn.v-btn-google {
    background-color: #ea4335 !important;
    border-color: #b32519 !important;
  }
  .v-btn.v-btn-facebook {
    background-color: #3b5998 !important;
    border-color: #183677 !important;
  }
</style>