<template>
  <v-app>
    <dashboard-core-app-bar />
    <dashboard-core-view />
    <payment-plan-modal />
  </v-app>
</template>

<script>
import { me } from "./services/profileService";
import { mapMutations, mapState } from "vuex";
import DashboardCoreAppBar from "./components/core/AppBar";
import DashboardCoreView from "./components/core/View";
import PaymentPlanModal from "./components/PaymentPlanModal";

export default {
  name: "App",
  components: {
    PaymentPlanModal,
    DashboardCoreAppBar,
    DashboardCoreView
  },
  computed: {
    ...mapState(["jwt", "interval_refresh_token"])
  },
  methods: {
    ...mapMutations({
      setUser: "SET_USER",
      setToken: "SET_JWT",
      setRefresh: "SET_INTERVAL_REFREST_TOKEN",
      setTermsUseModal: "SET_TERMS_USE_MODAL",
      setMenus: "SET_MENUS",
      setTable: "SET_COMBINATION_TABLE",
      setPlans: "SET_PLANS"
    }),
    checkAuthUser() {
      const vm = this;
      if (this.jwt && this.jwt !== "null") {
        me()
          .then(response => response.data)
          .then(data => {
            vm.setUser(JSON.stringify(data));
            vm.setTermsUseModal(data.is_terms_use_accepted === false);
          })
          .catch(() => {
            vm.setToken(null);
            vm.setUser(null);
          });
      }
    }
  }
};
</script>
