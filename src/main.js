// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload) //注意一定要删除这个，因为这个犯了好几次错了

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,///?????????
  error: '/static/logo.png',//如果没有获取真实图片显示这个图片
  loading: '/static/loading-svg/loading-bars.svg',//懒加载图片
  attempt: 1///???????
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
