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
          <a href="javascript:void(0)" class="price" @click="sortGoods()">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt="1"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>

                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import './../assets/css/base.css'/*也就是reset.css*/
  import './../assets/css/product.css'

  import NavHeader from "components/NavHeader"
  import NavFooter from "components/NavFooter"
  import NavBread from "components/NavBread"
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: [],
        sortFlag: true,
        page: 1,
        pageSize:8,
        sort: null,
        busy: true,
        loading:false,
      }
    },

    mounted() {
      this.getGoodsList()
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
          sort: this.sortFlag ? 1 : -1
        }
        this.loading = true;
        //在config/index.js中设置完之后直接使用这个，并且把之前配置的前端接口注释掉
          axios.get("/goods", {
            params: param
          }).then((res) => {
            res = res.data
            this.loading = true;
            if (res.status == '0') {
              if(flag){
                this.goodsList = this.goodsList.concat(res.result.list)

                if(res.result.count==0){
                  this.busy = true
                }else{
                  this.busy=false
                }
              }else{
                this.goodsList = res.result.list
                this.busy=false
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
      }


    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  }
</script>
<style>
  .load-more{
    width: 100%;
    text-align: center;
  }
</style>
