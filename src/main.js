import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router.js'
Vue.use(ElementUI)
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')