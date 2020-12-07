// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css' //los css se tienen que exportar de forma completa
import VueLocalStorage from 'vue-localstorage' //los modulos que se exportant de forma general se tienen que añadir despues con Vue.use()
Vue.use(VueLocalStorage)
import VueClipboards from 'vue-clipboards'
Vue.use(VueClipboards)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
