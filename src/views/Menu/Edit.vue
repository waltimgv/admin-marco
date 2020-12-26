<template>
  <validation-observer ref="form" v-slot="{ invalid }">
    <v-form action="/" method="POST" @submit.prevent="handleEditMenu">
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
  import {getById, update} from '../../services/menuService';

  export default {
    name: 'EditMenu',
    data: function () {
      return {
        id: null,
        title: '',
        is_free: false,
        loading: false,
      }
    },
    computed: {
      menu: function () {
        return {
          id: this.id,
          title: this.title,
          is_free: this.is_free,
        };
      }
    },
    methods: {
      setData(data) {
        this.id = data.id;
        this.title = data.title;
        this.is_free = data.is_free;
      },
      handleEditMenu() {
        const vm = this;
        this.loading = true;

        update(this.menu)
          .then(() => {
            vm.$toast.success('Menu alterado com sucesso.');
            vm.$router.push(`/menus/${vm.id}`);
          })
          .catch(error => {
            vm.$refs.form.setErrors(error.response.data.errors);
            vm.$toast.error('Não foi possível alterar o menu.');
            vm.loading = false;
          });
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