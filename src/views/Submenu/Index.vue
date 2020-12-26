<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-btn color="primary" class="mb-2" dark to="submenus/add">Novo Submenu</v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
          class="mb-2 mt-0 pt-0"
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.menu="{ item }">
      {{ item.menu.title }}
    </template>
    <template v-slot:item.is_free="{ item }">
      <menu-chip :is_free="item.is_free"></menu-chip>
    </template>
    <template v-slot:item.created_at="{ item }">
      {{ item.created_at | dateMoment }}
    </template>
    <template v-slot:item.updated_at="{ item }">
      {{ item.updated_at | dateMoment }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn text color="secondary" :to="`submenus/${item.id}`">
        <v-icon
          small
          class="mr-2"
        >
          mdi-eye
        </v-icon>
      </v-btn>
      <v-btn text color="primary" :to="`submenus/${item.id}/edit`">
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-dialog v-model="removeDialog" persistent max-width="420">
        <template v-slot:activator="{ on }">
          <v-btn text color="red" v-on="on" @click="handleOpenModalRemoveSubmenu(item)">
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Remover Submenu</v-card-title>
          <v-card-text>
            Você deseja remover o submenu selecionado? Lembre que todos os links também serão desativados.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="removeDialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="handleRemoveSubmenu">Remover</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
  import {destroy, get} from '../../services/submenuService';
  import MenuChip from '../../components/MenuChip';

  export default {
    name: 'Submenu',
    components: {MenuChip},
    data: function () {
      return {
        removeDialog: false,
        removeSubmenu: {},
        search: '',
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Título',
            value: 'title',
            align: 'center'
          },
          {
            sortable: false,
            text: 'Menu',
            value: 'menu',
            align: 'center'
          },
          {
            sortable: false,
            text: 'Disponibilidade',
            value: 'is_free',
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
        items: []
      }
    },
    methods: {
      handleOpenModalRemoveSubmenu(submenu) {
        this.removeSubmenu = submenu;
      },
      handleRemoveSubmenu() {
        const vm = this;
        destroy(this.removeSubmenu.id)
          .then(() => {
            vm.$toast.success('Submenu removido com sucesso.');
            vm.items = vm.items.filter((value) => value.id !== vm.removeMenu.id);
            vm.removeDialog = false;
            vm.removeMenu = {};
          })
          .catch(() => vm.$toast.error('Não foi possível remover o submenu selecionada.'));
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