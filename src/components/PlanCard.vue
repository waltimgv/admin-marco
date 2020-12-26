<template>
  <base-material-card class="px-5 py-3">
    <template v-slot:heading>
      <div class="text-center text-uppercase">
        Plano de {{ plan.number_days }} dias
      </div>
    </template>

    <v-card-text>
      <v-card-text class="clearfix">
        <p>{{ plan.description }}</p>
        <p class="display-1 float-right">
          <template v-if="plan.has_discount">
            <small class=" display-6 text--disabled">R$ {{ plan.price }}</small>
            <span class="red--text">R$ {{ plan.discount_price }}</span>
          </template>
          <template v-else>
            R$ {{ plan.price }}
          </template>
        </p>
      </v-card-text>

      <div class="component-frame">
        <div v-if="showPaypalButton" :id="`paypal-button-plan-${plan.id}`"></div>
        <div v-else-if="user && user.last_plan">
          <v-btn v-if="user.last_plan.plan_id === plan.id" block color="primary">Plano Assinado</v-btn>
        </div>
        <v-btn v-else-if="!user" dark block @click="login()">Login</v-btn>
      </div>
    </v-card-text>
  </base-material-card>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';
  import {addPlanToUser} from '../services/paypalService';

  export default {
    name: 'PlanCard',
    props: {
      plan: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        paypalButtonRendered: false,
      };
    },
    computed: {
      ...mapState(['user']),
      paypalPlanOptions() {
        const vm = this;
        return {
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              'plan_id': vm.plan.paypal_id
            });
          },
          onApprove: function(data, actions) {
            vm.setPaymentModal(true);

            return actions.subscription.get().then((details) => {
              addPlanToUser(details, vm.plan, vm.user)
                .then(response => response.data)
                .then(data => {
                  vm.setPaymentStatus(details.status);
                  vm.setUserPlan(data);
                  vm.setUserPlanExpired(false);
                })
                .catch(() => {
                  vm.setPaymentModal(false);
                });
            });
          }
        }
      },
      showPaypalButton() {
        return this.user && (this.user.is_plan_expired || (this.user.last_plan && this.user.last_plan.is_canceled));
      }
    },
    methods: {
      ...mapMutations({
        setPaymentModal: 'SET_PAYMENT_MODAL',
        setUserPlan: 'SET_USER_PLAN',
        setUserPlanExpired: 'SET_USER_PLAN_EXPIRED',
        setPaymentStatus: 'SET_PAYMENT_STATUS',
        setMenuLogin: 'SET_MENU_LOGIN'
      }),
      mountButtonPaypal() {
        if (!this.paypalButtonRendered && this.showPaypalButton) {
          window.paypal.Buttons(this.paypalPlanOptions).render(`#paypal-button-plan-${this.plan.id}`);
          this.paypalButtonRendered = true;
        }
      },
      login() {
        this.setMenuLogin(true);
      }
    },
    mounted() {
      this.mountButtonPaypal();
    }
  }
</script>

<style scoped>
  .component-frame {
    position: relative;
    z-index: 1;
  }
</style>