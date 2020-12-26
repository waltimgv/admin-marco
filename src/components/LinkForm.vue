<template>
  <v-container>
    <validation-observer ref="form" v-slot="{ invalid }">
      <v-form action="/" method="POST" @submit.prevent="handleAddLink">
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
        <slot></slot>
      </v-form>
    </validation-observer>
  </v-container>
</template>

<script>
  export default {
    name: 'LinkForm',
    props: {
      link: {
        type: Object,
        default: () => ({}),
      },
      loading: {
        type: Boolean,
        default: () => false,
      }
    },
    data: function () {
      return {
        id: this.link.id,
        title: this.link.title,
        is_free: this.link.is_free || false,
      }
    },
    watch: {
      link: {
        deep: true,
        handler() {
          this.id = this.link.id;
          this.title = this.link.title;
          this.is_free = this.link.is_free || false;
        }
      }
    },
    methods: {
      handleAddLink() {
        this.$emit('submitted', {
          id: this.id,
          title: this.title,
          is_free: this.is_free,
        })
      }
    }
  }
</script>

<style scoped>

</style>