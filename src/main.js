import Vue from 'vue'
import VueFire from 'vuefire'
import App from './components/App.vue'

Vue.use(VueFire)

new Vue({
  el: '#app',
  render: h => h(App)
})