import Vue from 'vue';
import Vuetify from 'vuetify';
import VuetifyToast from 'vuetify-toast-snackbar';

Vue.use(Vuetify, {});

const theme = {
  primary: '#4CAF50',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
};

const vuetify = new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})

Vue.use(VuetifyToast, {
  $vuetify: vuetify.framework,
  x: 'center',
});

export default vuetify;