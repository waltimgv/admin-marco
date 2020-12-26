<template>
  <validation-observer ref="form" v-slot="{ invalid }">
    <v-form action="/" method="POST" @submit.prevent="handleAddPlan">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <validation-provider v-slot="{ errors }" vid="number_days" name="Número de Dias" rules="required|positive">
            <v-text-field
              v-model="number_days"
              :error-messages="errors"
              label="Número de Dias"
              type="number"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <validation-provider v-slot="{ errors }" vid="price" name="Preço" rules="required|positive">
            <v-text-field
              v-model="price"
              :error-messages="errors"
              label="Preço"
              type="number"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <validation-provider v-slot="{ errors }" vid="currency" name="Moeda" rules="required">
            <v-text-field
              v-model="currency"
              :error-messages="errors"
              label="Moeda (BRL, USD)"
              type="text"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <validation-provider v-slot="{ errors }" vid="discount" name="Desconto"
                               rules="required|positive|between:0,100">
            <v-text-field
              v-model="discount"
              :error-messages="errors"
              label="Desconto (%)"
              type="number"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <v-textarea
            name="description"
            label="Descrição"
            v-model="description"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-btn type="submit" :disabled="invalid || loading" color="primary">
        Adicionar
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script>
  import {store} from '../../services/planService';

  export default {
    name: 'AddPlan',
    data: function () {
      return {
        number_days: '',
        description: '',
        price: '',
        currency: 'BRL',
        discount: 0,
        loading: false
      }
    },
    computed: {
      plan: function () {
        return {
          number_days: this.number_days,
          description: this.description,
          price: this.price,
          currency: this.currency,
          discount: this.discount,
        };
      }
    },
    methods: {
      handleAddPlan() {
        const vm = this;
        this.loading = true;

        this.plan.price = this.replacePoints(this.plan.price);
        this.plan.discount = this.replacePoints(this.plan.discount);

        store(this.plan)
          .then(() => {
            vm.$toast.success('Plano adicionado com sucesso.');
            vm.$router.push('/plans');
          })
          .catch(error => {
            vm.$refs.form.setErrors(error.response.data.errors);
            vm.$toast.error('Não foi possível adicionar o plano.');
            vm.loading = false;
          });
      },

      replacePoints(value) {
        if (value && typeof value === "string" && value.indexOf(',')) {
          value = value.replace(",", ".");
          value = parseFloat(value);
        }
        return value;
      },
    }
  }
</script>

<style scoped>

</style>