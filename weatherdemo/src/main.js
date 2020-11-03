import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "./router/index.js"
import vant from './vant.config.js'
import infiniteScroll from "vue-infinite-scroll";
// import elementUI from './elementUI.config' 
// import BMap from 'bmap'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(vant)
Vue.use(infiniteScroll);
// Vue.use(elementUI)
// Vue.use(BMap)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
