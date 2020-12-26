<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Pesquisar"
      single-line
      hide-details
      class="mb-2 mt-0 pt-0 float-right"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      item-key="id"
      class="clearfix"
    >
      <template v-slot:item.is_blocked="{ item }">
        <block-user :user="item"/>
      </template>
      <template v-slot:item.plan="{ item }">
        <plan-days :user="item"/>
      </template>
      <template v-slot:item.role="{ item }">
        {{ item.role_formatted }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ item.created_at | dateMoment }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="primary" :to="`users/${item.id}/edit`">
          <v-icon
            small
            class="mr-2"
          >
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn v-if="!(user.id === item.id)" text color="red" @click="handleOpenModalRemoveUser(item)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="removeDialog" persistent max-width="420">
      <v-card>
        <v-card-title class="headline">Remover Usuário</v-card-title>
        <v-card-text>
          Você deseja remover o usuário {{ removeUser.name }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text :disabled="isLoading" @click="removeDialog = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text :disabled="isLoading" @click="handleRemoveUser">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {destroy, get} from '../../services/userService';
  import PlanDays from '../../components/PlanDays';
  import BlockUser from '../../components/BlockUser';

  export default {
    name: 'User',
    components: {
      PlanDays,
      BlockUser
    },
    data: function () {
      return {
        removeDialog: false,
        isLoading: false,
        search: '',
        removeUser: {},
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Nome',
            value: 'name',
            align: 'center'
          },
          {
            sortable: true,
            text: 'E-mail',
            value: 'email',
            align: 'center'
          },
          {
            sortable: false,
            text: 'Status',
            value: 'is_blocked',
            align: 'center'
          },
          {
            sortable: false,
            text: 'Plano',
            value: 'plan',
            align: 'center'
          },
          {
            sortable: true,
            text: 'Tipo',
            value: 'role',
            align: 'center'
          },
          {
            sortable: true,
            text: 'Criado em',
            value: 'created_at',
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
    computed: {
      user: function () {
        return this.$store.state.user;
      }
    },
    methods: {
      handleOpenModalRemoveUser(user) {
        this.removeUser = user;
        this.removeDialog = true;
      },
      handleRemoveUser() {
        const vm = this;
        vm.isLoading = true;

        destroy(this.removeUser.id)
          .then(() => {
            vm.$toast.success('Usuário removido com sucesso.');
            vm.items = vm.items.filter((value) => value.id !== vm.removeUser.id);
            vm.removeUser = {};
            vm.removeDialog = false;
          })
          .catch(() => vm.$toast.error('Não foi possível remover o usuário selecionado.'))
          .finally(() => vm.isLoading = false);
      }
    },
    beforeRouteEnter(to, from, next) {
      get()
        .then(response => response.data)
        .then(data => next(vm => vm.items = data))
        .catch(() => next('/404'));
    }
  }
</script>

<style scoped>
  .clearfix {
    clear: both;
  }
</style>