<template>
  <v-row justify="center" class="p-0">
    <v-col cols="12" md="6">
      <v-card class="m-0 elevation-0" flat>
        <v-card-title>Dados do Usuário</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="user.picture" :alt="user.name" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <validation-observer ref="form" v-slot="{ invalid }">
            <v-form action="/" method="POST" @submit.prevent="handleEditUser">
              <v-row>
                <v-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    vid="role"
                    name="Tipo de Usuário"
                    rules="required"
                  >
                    <v-select
                      v-model="role"
                      :error-messages="errors"
                      label="Tipo de Usuário"
                      required
                      :items="roles"
                    ></v-select>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-spacer />

              <v-btn type="submit" :disabled="invalid || loading" color="primary">Salvar</v-btn>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <plan-activated classes="m-0 elevation-0" flat :last-plan="lastPlan" not-cancel-plan>
        <v-dialog v-model="dialog" v-if="isPlanExpired && !isAdmin" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn block color="primary" v-on="on">Adicionar Plano ---</v-btn>
          </template>
          <v-card>
            <v-card-text>
              <validation-observer ref="formAddPlan" v-slot="{ invalid }">
                <v-form action="/" method="POST" @submit.prevent="handleAddPlan">
                  <v-row>
                    <v-col cols="12" md="12">
                      <validation-provider
                        v-slot="{ errors }"
                        vid="plan"
                        name="Plano"
                        rules="required"
                      >
                        <v-select
                          v-model="plan"
                          :error-messages="errors"
                          label="Plano"
                          :item-text="(item) => `${item.number_days} dias | ${item.currency==='BRL'? 'Real': 'Dólar'}`"
                          return-object
                          required
                          :items="plans"
                        ></v-select>
                      </validation-provider>
                    </v-col>
                  </v-row>

                  <v-spacer />

                  <div class="text-right">
                    <v-btn color="blue" text @click="() => dialog = false">Fechar</v-btn>
                    <v-btn color="green" :disabled="invalid || loading" text type="submit">Adicionar</v-btn>
                  </div>
                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-dialog>
      </plan-activated>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="m-0 elevation-0" flat>
        <v-card-title>Alterar Senha</v-card-title>
        <v-card-text>
          <validation-observer ref="formPassword" v-slot="{ invalid }">
            <v-form action="/" method="POST" @submit.prevent="handleEditUserPassword">
              <v-row>
                <v-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    vid="password"
                    name="Senha"
                    rules="required"
                  >
                    <v-text-field
                      v-model="password"
                      :error-messages="errors"
                      label="Senha"
                      type="password"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    vid="password_confirmation"
                    name="Senha"
                    rules="required|confirmed:password"
                  >
                    <v-text-field
                      v-model="password_confirmation"
                      :error-messages="errors"
                      label="Confirmar senha"
                      type="password"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-spacer />

              <v-btn type="submit" :disabled="invalid || loading" color="primary">Salvar</v-btn>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6"></v-col>
  </v-row>
</template>

<script>
import { addPlan, getById, update, changePassword } from "../../services/userService";
import { listPlans } from "../../services/paypalService";
import UserFormMixin from "../../components/mixin/user-form-mixin";
import PlanActivated from "../../components/PlanActivated";
import { mapMutations, mapState } from "vuex";

export default {
  name: "EditUser",
  components: { PlanActivated },
  mixins: [UserFormMixin],
  data: function() {
    return {
      dialog: false,
      isAdmin: false,
      lastPlan: null,
      isPlanExpired: false,
      loading: false,
      password: '',
      password_confirmation: '',
    };
  },
  computed: {
    ...mapState(["plans"]),
    user: function() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        role: this.role,
        picture: this.picture
      };
    },
    passwordData: function () {
      return {
        password: this.password,
        password_confirmation: this.password_confirmation,
      }
    }
  },
  methods: {
    ...mapMutations({
      setPlans: "SET_PLANS"
    }),
    setData(data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.role = data.role;
      this.isAdmin = data.is_admin;
      this.lastPlan = data.last_plan;
      this.isPlanExpired = data.is_plan_expired;
      this.picture = data.picture;
    },
    handleEditUser() {
      const vm = this;
      this.loading = true;

      update(this.user)
        .then(() => vm.$toast.success("Usuário alterado com sucesso."))
        .catch(error => {
          vm.$refs.form.setErrors(error.response.data.errors);
          vm.$toast.error("Não foi possível alterar o usuário.");
        })
        .finally(() => (vm.loading = false));
    },
    handleEditUserPassword() {
      const vm = this;
      this.loading = true;

      changePassword(this.user.id, this.passwordData)
        .then(() => vm.$toast.success("Senha do usuário alterada com sucesso."))
        .catch(error => {
          vm.$refs.formPassword.setErrors(error.response.data.errors);
          vm.$toast.error("Não foi possível alterar a senha do usuário.");
        })
        .finally(() => vm.loading = false);
    },
    handleAddPlan() {
      const vm = this;
      this.loading = true;

      addPlan(this.user.id, vm.plan)
        .then(response => response.data)
        .then(data => {
          vm.dialog = false;
          vm.isPlanExpired = false;
          vm.lastPlan = data;
          vm.$toast.success("Plano adicionado com sucesso.");
        })
        .catch(error => {
          vm.$refs.formAddPlan.setErrors(error.response.data.errors);
          vm.$toast.error("Não foi possível adicionar plano para o usuário.");
        })
        .finally(() => vm.loading = false);
    }
  },
  mounted() {
    const vm = this;
    listPlans()
      .then(response => response.data)
      .then(data => vm.setPlans(data))
      .catch(() => vm.$toast.error("Ocorreu um erro, não foi possível carregar os planos."));

    console.log('this.plans', this.plans);
  },
  beforeRouteEnter(to, from, next) {
    getById(to.params.id)
      .then(response => response.data)
      .then(data => next(vm => vm.setData(data)))
      .catch(() => next("/404"));
  }
};
</script>

<style scoped>
.m-0 {
  margin: 0 !important;
}
</style>