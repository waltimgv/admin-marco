import {refresh} from '../services/authService';

const RefrestJWTToken = {
  intervalID: null,
  refresh: (callbackSuccess, callbackError) => {
    refresh()
      .then(response => response.data)
      .then(data => callbackSuccess(data))
      .catch(error => callbackError(error.response));
  },

  install(Vue) {
    Vue.prototype.$refreshToken = (callbackSuccess, callbackError) => {
      this.refresh(callbackSuccess, callbackError);
    };

    Vue.prototype.$setIntervalRefreshToken = (callbackSuccess, callbackError, timeout = 200000) => {
      clearInterval(this.intervalID);
      this.intervalID = setInterval(() => this.refresh(callbackSuccess, callbackError), timeout);
    };

    Vue.prototype.$clearIntervalRefreshToken = () => {
      clearInterval(this.intervalID);
    }
  }
};

export default RefrestJWTToken;