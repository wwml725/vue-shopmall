<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)"
             class="price"
             v-bind:class="{'sort-up':sortFlag}"
             @click="sortGoods()">Price
            <svg class="icon icon-arrow-short" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill="#333333"
                    d="M525.339326 186.172452L801.789086 462.622212c12.496698 12.496698 32.758136 12.496698 45.254834 0 12.497405-12.497405 12.496698-32.758136 0-45.254834l-331.014362-331.014362c-12.496698-12.496698-32.757429-12.497405-45.254834 0l-341.795619 339.143969c-12.496698 12.496698-12.496698 32.758136 0 45.254834 12.496698 12.496698 32.758136 12.496698 45.254834 0l287.10586-284.454209L461.372325 925.726242c0 17.673427 14.32669 32.000117 32.000118 32.000117 17.67272-0.000707 31.99941-14.327398 32.000117-32.000117l-0.032527-739.553083z"/>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')"
                     v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}}
                  - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt="1"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>

                    <div class="btn-area" @click="addCart(item.productId)">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30"
                   class="load-more">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--登录验证-->
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        请先登录，否则无法登录
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
      </div>

    </modal>
    <!--加入购物车成功-->
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import './../assets/css/base.css'/*也就是reset.css*/
  import './../assets/css/product.css'

  import NavHeader from "components/NavHeader"
  import NavFooter from "components/NavFooter"
  import NavBread from "components/NavBread"
  import Modal from "components/Modal"
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: [],
        sortFlag: true,
        page: 1,
        pageSize: 8,
        sort: null,
        busy: true,
        loading: false,
        mdShow: false,
        mdShowCart: false,
        priceChecked: 'all',
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          }
        ],
      }
    },

    mounted() {
      this.getGoodsList()
      // this.getCartCount()
    },

    methods: {
      jump() {
        this.$router.push('/cart')
      },
      getGoodsList(flag) {
        //这里是通过vue-cli设置后台代理接口获取的数据，我们应该前后端分离，之后会从后台数据库中获取数据
        // axios.get("/goods").then((result)=>{
        //   console.log(result);
        //   let data = result.data
        //   console.log(data);
        //   this.goodsList = data.result
        // })
        //获取商品数据的数据接口  由于存在跨域问题，所以，需要设置一个接口代理
        // axios.get('http://localhost:3000/goods/').then((result)=>{
        //   console.log(result);
        // })

        var param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        this.loading = true;
        //在config/index.js中设置完之后直接使用这个，并且把之前配置的前端接口注释掉
        axios.get("/goods/list", {
          params: param
        }).then((res) => {
          res = res.data
          this.loading = false;
          if (res.status == '0') {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list)
              if (res.result.count == 0) {
                this.busy = true
              } else {
                this.busy = false
              }
            } else {
              this.goodsList = res.result.list
              this.busy = false
            }
          } else {
            this.goodsList = []
          }
        })
      },

      sortGoods() {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList()
      },
      loadMore() {
        this.busy = true
        setTimeout(() => {
          this.page++
          this.getGoodsList(true)
        }, 1500);
      },
      setPriceFilter(index) {
        this.priceChecked = index;
        this.page = 1;
        this.getGoodsList();
      },
      addCart(productId) {
        console.log(productId);
        axios.post('/goods/addCart', {
          productId: productId
        }).then((res) => {
          console.log(res);
          res = res.data
          if (res.status == 0) {
            // alert('添加成功')
            this.mdShowCart = true
            this.$store.commit("updateCartCount",1);
          } else {
            // alert('msg:'+res.msg)
            this.mdShow = true
          }
        })
      },
      closeModal() {
        this.mdShow = false
      },
      getCartCount(){
        axios.get("users/getCartCount").then(res=>{
          var res = res.data;
          this.$store.commit("updateCartCount",res.result);
        });
      }

    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    }
  }
</script>
<style>
  .load-more {
    width: 100%;
    text-align: center;
  }
</style>
