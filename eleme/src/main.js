// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
//阿里巴巴矢量图标库
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(Element)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
