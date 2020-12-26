import {get as getRoles} from '../../services/roleService';

export default {
  data: function () {
    return {
      id: null,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: null,
      plan: null,
      picture: '',
    }
  },
  computed: {
    user: function () {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        role: this.role,
        picture: this.picture,
      };
    },
    roles: {
      get() {
        return this.$store.state.roles_select
      },
      set(val) {
        this.$store.commit('SET_ROLES', val)
      },
    },
    plans: {
      get() {
        return this.$store.state.plans_select
      },
      set(val) {
        this.$store.commit('SET_PLANS_SELECT', val)
      },
    }
  },
  created() {
    const vm = this;

    if (!this.roles.length) {
      getRoles()
        .then(response => response.data)
        .then(data => vm.roles = data)
        .catch(error => console.error(error));
    }
  }
};
