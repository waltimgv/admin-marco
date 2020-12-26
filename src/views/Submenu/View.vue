<template>
  <v-row>
    <v-col
      cols="12"
      md="2"
      align="center"
    >
      <h2>{{ title }}</h2>
      <menu-chip :is_free="is_free"></menu-chip>

      <v-btn class="mt-4 m-auto" block color="red" :to="`/menus/${menu_id}`">
        Ver menu
      </v-btn>

      <v-btn class="mt-1 m-auto" block color="orange" :to="`/submenus/${id}/edit`">
        Editar Submenu
      </v-btn>

      <v-dialog v-model="addLinkDialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn class="mt-1 m-auto" block color="primary" v-on="on">
            Adicionar Link
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Adicionar Link</span>
          </v-card-title>
          <v-card-text>
            <link-form :loading="isLoadingAddLink" @submitted="handleAddLink">
              <v-btn color="red" @click="addLinkDialog = false">Fechar</v-btn>
            </link-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col
      cols="12"
      md="10"
    >
      <v-treeview hoverable open-on-click :items="links">
        <template v-slot:prepend="{ item }">
          <menu-chip :is_free="item.is_free"></menu-chip>
        </template>
        <template v-slot:label="{ item }">
          {{ item.title }}
        </template>
        <template v-slot:append="{ item }">
          <v-btn class="primary" color="primary" @click="() => handleOpenEditLink(item)">
            Editar Link
          </v-btn>
          <v-btn text color="red" @click="handleOpenModalRemoveLink(item)">
            <v-icon small>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-treeview>

      <v-dialog v-model="removeDialog" max-width="420">
        <v-card>
          <v-card-title class="headline">Remover Link</v-card-title>
          <v-card-text>
            Você deseja remover o link selecionado?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="removeDialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="handleRemoveLink">Remover</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editLinkDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Link</span>
          </v-card-title>
          <v-card-text>
            <link-form :loading="isLoadingEditLink" :link="editLink" @submitted="handleEditLink">
              <v-btn color="red" @click="editLinkDialog = false">Fechar</v-btn>
            </link-form>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row>
</template>

<script>
  import {getById} from '../../services/submenuService';
  import {destroy, store, update} from '../../services/linkService';
  import MenuChip from '../../components/MenuChip';
  import LinkForm from '../../components/LinkForm';

  export default {
    name: 'ViewMenu',
    components: {LinkForm, MenuChip},
    data: function () {
      return {
        id: null,
        title: '',
        is_free: false,
        menu_id: null,
        links: [],
        removeLink: {},
        editLink: {},
        removeDialog: false,
        addLinkDialog: false,
        editLinkDialog: false,
        isLoadingAddLink: false,
        isLoadingEditLink: false,
      }
    },
    methods: {
      setData(data) {
        this.id = data.id;
        this.title = data.title;
        this.is_free = data.is_free;
        this.menu_id = data.menu_id;
        this.links = data.links;
      },
      handleOpenModalRemoveLink(item) {
        this.removeLink = item;
        this.removeDialog = true;
      },
      handleOpenEditLink(item) {
        this.editLink = item;
        this.editLinkDialog = true;
      },
      handleRemoveLink() {
        const vm = this;
        destroy(this.removeLink.id)
          .then(() => {
            vm.$toast.success('Link removido com sucesso.');
            vm.links = vm.links.filter((value) => value.id !== vm.removeLink.id);
            vm.removeDialog = false;
            vm.removeLink = {};
          })
          .catch(() => vm.$toast.error('Não foi possível remover o link selecionado.'));
      },
      handleAddLink(link) {
        const vm = this;
        this.isLoadingAddLink = true;

        store({...link, submenu_id: this.id})
          .then(response => response.data)
          .then(data => {
            vm.links.push(data.link);
            vm.$toast.success('Link adicionado com sucesso.');
            vm.addLinkDialog = false;
          })
          .catch(() => vm.$toast.error('Não foi possível adicionar o link.'))
          .finally(() => vm.isLoadingAddLink = false);
      },
      handleEditLink(link) {
        const vm = this;
        const data = {...link, submenu_id: this.id};
        this.isLoadingEditLink = true;

        update(data)
          .then(() => {
            vm.$toast.success('Link alterado com sucesso.');
            vm.editLinkDialog = false;
            vm.links = vm.links.map((value) => {
              if (value.id === data.id) {
                return data;
              }

              return value;
            });
          })
          .catch(() => vm.$toast.error('Não foi possível alterar o link.'))
          .finally(() => vm.isLoadingEditLink = false);
      }
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