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

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
import Vuex from 'vuex'
Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    nickName:'',//用户名
    cartCount:0,//购物车商品数量
  },
  mutations:{//专门用来改变状态的
    updateUserInfo(state,nickName){
      state.nickName = nickName
    },
    updateCartCount(state,cartCount){
      if(cartCount){
        state.cartCount += cartCount;
      }else{
        state.cartCount = "";
      }
    }
  }
});


Vue.config.productionTip = false
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  
  components: { App },
  template: '<App/>'
})
