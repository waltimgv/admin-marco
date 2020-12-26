import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import http from './http';
import vuetify from './plugins/vuetify';
import VueSocialAuth from 'vue-social-auth';
import VueAxios from 'vue-axios';
import moment from 'moment';
import RefrestJWTToken from './plugins/refreshToken';

import './plugins/base';
import './plugins/chartist';
import './plugins/vee-validate';
import './sass/app.scss';

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

Vue.use(VueAxios, http);
Vue.use(RefrestJWTToken);

Vue.filter('dateMoment', (value) => moment(value).format('DD/MM/YYYY HH:mm:ss'));
Vue.filter('dateMomentNotHour', (value) => moment(value).format('DD/MM/YYYY'));

Vue.use(VueSocialAuth, {
  providers: {
    facebook: {
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      redirectUri: `${process.env.VUE_APP_URI}/auth/facebook/callback`,
    },
    google: {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      redirectUri: `${process.env.VUE_APP_URI}/auth/google/callback`,
    }
  }
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app');
