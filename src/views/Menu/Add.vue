<template>
  <validation-observer ref="form" v-slot="{ invalid }">
    <v-form action="/" method="POST" @submit.prevent="handleAddMenu">
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
  import {store} from '../../services/menuService';

  export default {
    name: 'AddMenu',
    data: function () {
      return {
        title: '',
        is_free: false,
        loading: false,
      }
    },
    computed: {
      menu: function () {
        return {
          title: this.title,
          is_free: this.is_free,
        };
      }
    },
    methods: {
      handleAddMenu() {
        const vm = this;
        this.loading = true;

        store(this.menu)
          .then(response => response.data)
          .then(data => {
            vm.$toast.success('Menu adicionado com sucesso.');
            vm.$router.push(`/menus/${data.menu.id}`);
          })
          .catch(error => {
            vm.$refs.form.setErrors(error.response.data.errors);
            vm.$toast.error('Não foi possível adicionar o menu.');
            vm.loading = false;
          });
      },
    }
  }
</script>

<style scoped>

</style>