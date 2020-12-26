<template>
  <v-dialog v-model="modal" max-width="520" persistent>
    <v-card>
      <template v-if="is_payment_loading">
        <v-card-title class="headline text-uppercase">Verificando seu pedido</v-card-title>

        <v-card-text>
          <v-progress-linear
            indeterminate
            color="primary"
            class="mb-0 mt-2"
          ></v-progress-linear>
        </v-card-text>
      </template>
      <template v-if="is_completed_payment">
        <v-card-title class="headline text-uppercase">Plano Contratado com Sucesso</v-card-title>

        <v-card-text class="text-center">
          <v-icon class="icon-check">mdi-check</v-icon>
          <p>Agora que possui um plano ativo já pode começar a criar suas combinações.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="modal = false"
          >
            Fechar
          </v-btn>

          <v-btn color="green darken-1" @click="moveToCombination" text>
            Ir para combinações
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';

  export default {
    name: 'PaymentPlanModal',
    computed: {
      ...mapState(['payment_status', 'payment_modal']),
      modal: {
        get() {
          return this.payment_modal;
        },
        set(val) {
          this.setPaymentModal(val);
        },
      },
      is_completed_payment: function () {
        return this.payment_status === 'ACTIVE';
      },
      is_payment_loading: function () {
        return this.payment_status === 'LOADING';
      },
    },
    methods: {
      ...mapMutations({
        setPaymentModal: 'SET_PAYMENT_MODAL',
        setPaymentStatus: 'SET_PAYMENT_STATUS',
      }),
      moveToCombination() {
        this.setPaymentModal(false);
        this.$router.push('/strategies/mine');
      }
    },
    watch: {
      modal: function () {
        this.setPaymentStatus('LOADING');
      }
    },
  }
</script>

<style scoped>
  .icon-check {
    font-size: 18em !important;
  }
</style>