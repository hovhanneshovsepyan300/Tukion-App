import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store'
import router from './route/router';
import VueYoutube from 'vue-youtube';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false

 
Vue.use(VueYoutube);

Vue.use(vuetify, {
  iconfont: 'mdiSvg'
})



// if (!window['YTConfig']) {var YTConfig = {'host': 'https://www.youtube.com'};}

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
