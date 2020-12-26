<template>
  <validation-observer ref="form" v-slot="{ invalid }">
    <v-form action="/" method="POST" @submit.prevent="handleEditPlan">
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
        Salvar
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script>
  import {getById, update} from '../../services/planService';

  export default {
    name: 'EditPlan',
    data: function () {
      return {
        id: null,
        number_days: '',
        description: '',
        price: '',
        currency: 'BRL',
        discount: '',
        loading: false,
      }
    },
    computed: {
      plan: function () {
        return {
          id: this.id,
          number_days: this.number_days,
          description: this.description,
          currency: this.currency,
          price: this.price,
          discount: this.discount,
        };
      }
    },
    methods: {
      setData(data) {
        this.id = data.id;
        this.number_days = data.number_days;
        this.description = data.description;
        this.price = data.price;
        this.currency = data.currency;
        this.discount = data.discount;
      },
      handleEditPlan() {
        const vm = this;
        this.loading = true;

        this.plan.price = this.replacePoints(this.plan.price);
        this.plan.discount = this.replacePoints(this.plan.discount);

        update(this.plan)
          .then(() => {
            vm.$toast.success('Plano alterado com sucesso.');
            vm.$router.push('/plans');
          })
          .catch(error => {
            vm.$refs.form.setErrors(error.response.data.errors);
            vm.$toast.error('Não foi possível alterar o plano.');
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