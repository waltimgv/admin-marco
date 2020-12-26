<template>
  <v-app-bar
    id="app-bar"
    fixed
    app
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    height="60"
  >
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn class="hidden-md-and-up" dark icon v-on="on">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>
    </v-menu>

    <v-toolbar-title class="hidden-sm-and-down font-weight-light">
      <v-img :src="logo" max-width="100" />
    </v-toolbar-title>

    <v-spacer />

    <v-menu
      v-if="user"
      v-model="menuLogin"
      :close-on-content-click="false"
      :max-width="300"
      max-height="auto"
      bottom
      right
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <template v-if="user">
            <span class="hidden-sm-and-down">{{ user.name }}</span>
            <v-avatar class="hidden-md-and-up">
              <img :alt="user.name" :src="user.picture" />
            </v-avatar>
          </template>
        </v-btn>
      </template>

      <template v-if="user">
        <v-card class="mb-0 mt-0">
          <user-profile-card :user="user" @logout="logout()" />
        </v-card>
      </template>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import UserProfileCard from "../UserProfileCard";

export default {
  name: "DashboardCoreAppBar",
  components: {
    UserProfileCard
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    menuLogout: false,
    menuLeft: [{ title: "Buy Now", to: "/#buy-now", auth: false }],
    menuRight: [
      { title: "PRO Strategies", to: "/strategies/pro", auth: true },
      { title: "MY Strategies", to: "/strategies/mine", auth: true },
      { title: "Price", to: "/price", auth: true }
    ]
  }),
  computed: {
    ...mapState(["barColor", "user", "jwt", "menu_login"]),
    menuLogin: {
      get() {
        return this.menu_login;
      },
      set(val) {
        this.setMenuLogin(val);
      }
    },
    menu() {
      return [...this.menuLeft, ...this.menuRight];
    },
    logo() {
      return require("../../assets/logo.jpg");
    }
  },
  methods: {
    ...mapMutations({
      setUser: "SET_USER",
      setJwt: "SET_JWT",
      setMenuLogin: "SET_MENU_LOGIN"
    }),
    menuNeedsLogin(item) {
      if (item.auth && this.user) {
        return true;
      }

      if (item.auth === false) {
        return !this.user;
      }

      return false;
    },
    logout() {
      this.setMenuLogin(false);
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
