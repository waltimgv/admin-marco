<template>
  <v-row>
    <v-col
      cols="12"
      md="2"
      align="center"
    >
      <h2>{{ title }}</h2>
      <menu-chip :is_free="is_free"></menu-chip>

      <v-btn class="mt-4 m-auto" block color="secondary" :to="`/menus/${id}/edit`">
        Editar Menu
      </v-btn>

      <v-btn class="mt-1 m-auto" block color="primary" to="/submenus/add">
        Adicionar Submenu
      </v-btn>

    </v-col>
    <v-col
      cols="12"
      md="10"
    >
      <v-treeview hoverable open-on-click :items="submenus">
        <template v-slot:prepend="{ item }">
          <menu-chip :is_free="item.is_free"></menu-chip>
        </template>
        <template v-slot:label="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:append="{ item }">
          <v-btn color="secondary" :to="`/submenus/${item.id}`">
            Ver submenu
          </v-btn>
          <v-btn color="primary" :to="`/submenus/${item.id}/edit`">
            Editar submenu
          </v-btn>
        </template>
      </v-treeview>
    </v-col>
  </v-row>
</template>

<script>
  import {getById} from '../../services/menuService';
  import MenuChip from "../../components/MenuChip";

  export default {
    name: 'ViewMenu',
    components: {MenuChip},
    data: function () {
      return {
        id: null,
        title: '',
        is_free: false,
        submenus: [],
      }
    },
    methods: {
      setData(data) {
        this.id = data.id;
        this.title = data.title;
        this.is_free = data.is_free;
        this.submenus = data.submenus;
      },
    },
    beforeRouteEnter(to, from, next) {
      getById(to.params.id)
        .then(response => response.data)
        .then(data => next(vm => vm.setData(data)))
        .catch(() => next('/404'));
    }
  }
</script>

<style scoped>

</style>