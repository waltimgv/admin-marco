<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <img :src="user.picture" :alt="user.name">
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-btn block color="red" @click="logout()">Logout</v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
  import {logout} from '../services/authService';
  import {mapMutations} from 'vuex'

  export default {
    name: 'UserProfileCard',
    props: {
      user: {
        type: Object,
        required: true
      },
    },
    methods: {
      ...mapMutations({
        setUser: 'SET_USER',
        setJwt: 'SET_JWT',
        setTermsUseModal: 'SET_TERMS_USE_MODAL',
      }),
      menuNeedsLogin(item) {
        if (item.auth) {
          return this.user;
        }

        return true;
      },
      logout() {
        const vm = this;
        vm.menuLogin = false;

        logout()
          .then(() => {
            vm.$toast.error('Você saiu com sucesso.');
            vm.$emit('logout', true);
            vm.setUser(null);
            vm.setJwt(null);
            vm.$clearIntervalRefreshToken();
          });
      },
      termsuse() {
        this.setTermsUseModal(true);
      }
    },
  }
</script>
