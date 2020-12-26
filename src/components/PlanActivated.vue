<template>	
  <v-card :class="classes" :flat="flat">	
    <v-card-title>	
      Plano Ativo	
    </v-card-title>	
    <v-card-text>	
      <p class="red--text" v-if="!lastPlan">Usuário não possui nenhum plano cadastrado.</p>	
      <div v-else>	
        <v-list>	
          <v-list-item-group color="primary">	
            <v-list-item>	
              <v-list-item-avatar>	
                <v-icon>mdi-credit-card</v-icon>	
              </v-list-item-avatar>	
              <v-list-item-content>	
                <v-list-item-title>	
                  {{ lastPlan.paid_at | dateMoment }}	
                </v-list-item-title>	
                <v-list-item-subtitle v-text="'Data da Compra'"></v-list-item-subtitle>	
              </v-list-item-content>	
            </v-list-item>	
            <v-list-item>	
              <v-list-item-avatar>	
                <v-icon>mdi-calendar-clock</v-icon>	
              </v-list-item-avatar>	
              <v-list-item-content>	
                <v-list-item-title v-text="`${lastPlan.plan_days} dias`"></v-list-item-title>	
                <v-list-item-subtitle v-text="'Dias restantes'"></v-list-item-subtitle>	
              </v-list-item-content>	
            </v-list-item>	
            <v-list-item>	
              <v-list-item-avatar>	
                <v-icon>mdi-calendar-question</v-icon>	
              </v-list-item-avatar>	
              <v-list-item-content>	
                <v-list-item-title>	
                  <template v-if="lastPlan.is_canceled">	
                    <span class="text-danger">Assinatura cancelada</span>	
                  </template>	
                  <template v-else>	
                    {{ lastPlan.expire_at | dateMomentNotHour }}	
                  </template>	
                </v-list-item-title>	
                <v-list-item-subtitle v-text="'Próxima data de cobrança'"></v-list-item-subtitle>	
              </v-list-item-content>	
            </v-list-item>	
          </v-list-item-group>	
        </v-list>	
      </div>	

      <v-spacer></v-spacer>	

      <slot></slot>	

    </v-card-text>	
  </v-card>	
</template>	

<script>	
  import {mapMutations} from 'vuex';	
  export default {	
    name: 'PlanActivated',	
    props: {	
      lastPlan: {
        required: true
      },	
      classes: {	
        type: String,	
        default: () => ('px-5 py-3'),	
      },	
      flat: Boolean,	
      notCancelPlan: Boolean,	
    },	
    methods: {	
      ...mapMutations({	
        setUserPlan: 'SET_USER_PLAN',	
      }),	
    }	
  }	
</script>	

<style scoped>	
</style> 