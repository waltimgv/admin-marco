<template>
  <validation-observer ref="form" v-slot="{ invalid }">
    <v-form action="/" method="POST" @submit.prevent="handleAddSubmenu">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <validation-provider
            v-slot="{ errors }"
            vid="menu"
            name="Menu"
            rules="required"
          >
            <v-select
              v-model="menu_id"
              :error-messages="errors"
              label="Menu"
              required
              :items="menus"
              item-text="title"
              item-value="id"
            >
            </v-select>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <validation-provider v-slot="{ errors }" vid="title" name="Título" rules="required|max:255">
            <v-text-field
              v-model="title"
              :error-messages="errors"
              label="Título"
              type="text"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-switch
            v-model="is_free"
            :label="`Disponivel para não assinantes? ${is_free ? 'sim' : 'não'}`"
          ></v-switch>
        </v-col>
      </v-row>

      <v-btn type="submit" :disabled="invalid || loading" color="primary">
        Salvar
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script>
  import {store} from '../../services/submenuService';
  import {get} from '../../services/menuService';

  export default {
    name: 'AddSubmenu',
    data: function () {
      return {
        title: '',
        is_free: false,
        menu_id: null,
        loading: false,
        menus: [],
      }
    },
    computed: {
      submenu: function () {
        return {
          title: this.title,
          is_free: this.is_free,
          menu_id: this.menu_id,
        };
      }
    },
    methods: {
      handleAddSubmenu() {
        const vm = this;
        this.loading = true;

        store(this.submenu)
          .then(response => response.data)
          .then(data => {
            vm.$toast.success('Submenu adicionado com sucesso.');
            vm.$router.push(`/submenus/${data.submenu.id}`);
          })
          .catch(error => {
            vm.$refs.form.setErrors(error.response.data.errors);
            vm.$toast.error('Não foi possível adicionar o submenu.');
            vm.loading = false;
          });
      },
    },
    beforeRouteEnter(to, from, next) {
      get()
        .then(response => response.data)
        .then(data => next(vm => vm.menus = data))
        .catch(() => next('/404'));
    }
  }
</script>

<style scoped>

</style>