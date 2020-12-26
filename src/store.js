import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: localStorage.getItem('jwt_token'),
    user: JSON.parse(localStorage.getItem('user')),
    plans: [],
    combination_table: [],
    combination_percents: [100, 75, 67, 50, 33, 25],
    combination_colors: [
      '#fbdb71', '#f09759', '#da756f', '#f081a0', '#529151', '#4fb6fb', '#a798de',
      '#ebd42a', '#f27131', '#f04a37', '#93e762', '#008efc', '#625aab'
    ],
    drawer: null,
    menus: [],
    roles_select: [],
    plans_select: [],
    payment_modal: false,
    payment_status: 'LOADING',
    menu_login: false,
    termsuse_modal: false,
    interval_refresh_token: 200000
  },
  mutations: {
    SET_USER(state, payload) {
      if (payload) {
        localStorage.setItem('user', payload);
      } else {
        localStorage.removeItem('user');
      }

      state.user = JSON.parse(payload);
    },
    SET_JWT(state, payload) {
      if (payload) {
        localStorage.setItem('jwt_token', payload);
      } else {
        localStorage.removeItem('jwt_token');
      }

      state.jwt = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_ROLES(state, payload) {
      state.roles_select = Object.entries(payload).map(item => ({text: item[1], value: item[0]}));
    },
    SET_PLANS_SELECT(state, payload) {
      state.plans_select = payload;
    },
    SET_PLANS(state, payload) {
      state.plans = payload;
    },
    SET_INTERVAL_REFREST_TOKEN(state, payload) {
      state.interval_refresh_token = payload;
    },
    SET_MENUS(state, payload) {
      state.menus = payload;
    },
    SET_COMBINATION_TABLE(state, payload) {
      state.combination_table = payload;
    },
    SET_PAYMENT_MODAL(state, payload) {
      state.payment_modal = payload;
    },
    SET_PAYMENT_STATUS(state, payload) {
      state.payment_status = payload;
    },
    SET_USER_PLAN(state, payload) {
      state.user.last_plan = payload;
    },
    SET_USER_PLAN_EXPIRED(state, payload) {
      state.user.is_plan_expired = payload;
    },
    SET_MENU_LOGIN(state, payload) {
      state.menu_login = payload;
    },
    SET_TERMS_USE_MODAL(state, payload) {
      state.termsuse_modal = payload;
    },
    SET_USER_TERMS_USE(state, payload) {
      state.user.is_terms_use_accepted = payload;
    }
  }
})
