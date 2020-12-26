import Vue from 'vue'
import {extend, localize, ValidationObserver, ValidationProvider,} from 'vee-validate'
import {between, required_if, confirmed, email, max, min, numeric, required,} from 'vee-validate/dist/rules'
import pt_BR from 'vee-validate/dist/locale/pt_BR';

localize('pt_BR', pt_BR);

extend('email', email);
extend('max', max);
extend('min', min);
extend('numeric', numeric);
extend('required', required);
extend('between', between);
extend('confirmed', confirmed);
extend('required_if', required_if);

extend('positive', {
  validate: value => value >= 0,
  message: 'O valor deve ser maior que zero',
});

Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
