<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
    >
      <template v-slot:top>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" dark to="plans/add">Novo Plano</v-btn>
      </template>
      <template v-slot:item.currency="{ item }">
        {{ item.currency || "" }}
      </template>
      <template v-slot:item.duration="{ item }">
        {{ item.number_days }} dias
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ item.created_at | dateMoment }}
      </template>
      <template v-slot:item.updated_at="{ item }">
        {{ item.updated_at | dateMoment }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="primary" :to="`plans/${item.id}/edit`">
          <v-icon
            small
            class="mr-2"
          >
            mdi-pencil
          </v-icon>
        </v-btn>

        <v-btn text color="red" v-on="on" @click="handleOpenModalRemovePlan(item)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="removeDialog" max-width="420">
      <v-card>
        <v-card-title class="headline">Remover Plano</v-card-title>
        <v-card-text>
          Você deseja remover o plano selecionado?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="removeDialog = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="handleRemovePlan">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {destroy, get} from '../../services/planService';

  export default {
    name: 'Plan',
    data: function () {
      return {
        removeDialog: false,
        removePlan: {},
        search: '',
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Moeda',
            value: 'currency',
            align: 'center'
          },
          {
            sortable: true,
            text: 'Duração',
            value: 'duration',
            align: 'center'
          },
          {
            sortable: true,
            text: 'Criado em',
            value: 'created_at',
            align: 'center'
          },
          {
            sortable: true,
            text: 'Última modificação',
            value: 'updated_at',
            align: 'center'
          },
          {
            sortable: false,
            text: '',
            value: 'actions',
            align: 'center'
          },
        ],
        items: [],
      }
    },
    methods: {
      handleOpenModalRemovePlan(plan) {
        this.removePlan = plan;
        this.removeDialog = true;
      },
      handleRemovePlan() {
        const vm = this;
        destroy(this.removePlan.id)
          .then(() => {
            vm.$toast.success('Plano removido com sucesso.');
            vm.items = vm.items.filter((value) => value.id !== vm.removePlan.id);
            vm.removeDialog = false;
            vm.removePlan = {};
          })
          .catch(() => vm.$toast.error('Não foi possível remover o plano selecionado.'));
      },
    },
    beforeRouteEnter(to, from, next) {
      get()
        .then(response => response.data)
        .then(data => next(vm => vm.items = data))
        .catch(() => next('/404'));
    }
  }
</script>

<style lang="sass">
  #upgrade
    .v-data-table
      th, td
        border: none !important
</style>
