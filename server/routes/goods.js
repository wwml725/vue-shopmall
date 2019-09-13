var express = require('express');
var router = express.Router()
var mongoose = require("mongoose")
var Goods = require("../models/goods")

//连接数据库
mongoose.connect('mongodb://localhost:27017/dumall')
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success');
})
mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail');
})
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected');
})


//获取商品列表：localhost:3000/goods/list
router.get('/list', (req, res, next) => {
  // Goods.create([
  //     {
  //       "productId":"10001",
  //       "productName":"小米音响",
  //       "salePrice":129.00,
  //       "productImage":"1.jpg"
  //     },
  //     {
  //       "productId":"10002",
  //       "productName":"头戴式耳机-3",
  //       "salePrice":80.00,
  //       "productImage":"2.jpg"
  //     },
  //     {
  //       "productId":"10003",
  //       "productName":"Ear700",
  //       "salePrice":700.00,
  //       "productImage":"3.jpg"
  //     },
  //     {
  //       "productId":"10004",
  //       "productName":"Leme",
  //       "salePrice":299.00,
  //       "productImage":"4.jpg"
  //     },
  //     {
  //       "productId":"10005",
  //       "productName":"Letv",
  //       "salePrice":149.00,
  //       "productImage":"5.jpg"
  //     },
  //     {
  //       "productId":"10006",
  //       "productName":"智能插线板",
  //       "salePrice":59.00,
  //       "productImage":"6.jpg"
  //     },
  //     {
  //       "productId":"10007",
  //       "productName":"Ear1000",
  //       "salePrice":1000.00,
  //       "productImage":"7.jpg"
  //     },
  //     {
  //       "productId":"10008",
  //       "productName":"小米净水器",
  //       "salePrice":1999,
  //       "productImage":"8.jpg"
  //     },
  //   {
  //     "productId":"10008",
  //     "productName":"IH 电饭煲",
  //     "salePrice":999,
  //     "productImage":"9.jpg"
  //   },
  //
  //   {
  //     "productId":"10008",
  //     "productName":"小米电视机",
  //     "salePrice":2399.00,
  //     "productImage":"10.jpg"
  //   },
  //
  //   {
  //     "productId":"10008",
  //     "productName":"Ear 1600",
  //     "salePrice":1600.00,
  //     "productImage":"13.jpg"
  //   },
  //
  //   {
  //     "productId":"10008",
  //     "productName":"小米数据线",
  //     "salePrice":13.00,
  //     "productImage":"15.jpg"
  //   },
  //
  //   {
  //     "productId":"10008",
  //     "productName":"小米6手机",
  //     "salePrice":2999,
  //     "productImage":"mi6.jpg"
  //   },
  //   {
  //     "productId":"10008",
  //     "productName":"小米摄像头",
  //     "salePrice":299.00,
  //     "productImage":"photo.jpg"
  //   },
  //   {
  //     "productId":"10008",
  //     "productName":"小米平衡车",
  //     "salePrice":1299,
  //     "productImage":"pingheng.jpg"
  //   },
  //
  //   {
  //     "productId":"10008",
  //     "productName":"自拍杆",
  //     "salePrice":39.00,
  //     "productImage":"zipai.jpg"
  //   },
  //
  // ],(err,doc)=>{
  //     if(err){
  //       console.log(err);
  //     }else{
  //       console.log(doc);
  //     }
  //   })
  // res.send('hell')
  
  //从url地址中获取不同的数据
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page - 1) * pageSize;
  let params = {};
  
  // 大于，小于
  var priceGt = '', priceLte = '';
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLte = 100;
        break;
      case '1':
        priceGt = 100;
        priceLte = 500;
        break;
      case '2':
        priceGt = 500;
        priceLte = 1000;
        break;
      case '3':
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort});
  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  })
  
  //加入到购物车：localhost:3000/goods/addCart
  router.post('/addCart', (req, res, next) => {
    var userId = '100000077', productId = req.body.productId;
    var User = require('../models/user')
    //在数据库中通过用户ID查找某一个用户，没有用户报错，如果找到了这个用户，
    User.findOne({userId: userId}, (err, userDoc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        //意思就是说如果存在这个用户了，通过这个商品ID在数据库中找到对应的商品，将数据在保存到user中
        if (userDoc) {
          let goodsItem = '';
          userDoc.cartList.forEach((item,index)=>{
            if(item.productId==productId){
              goodsItem = item;
              item.productNum++
              console.log(item.productNum);}
          })
          //如果购物车里有了，只改变数量
          if(goodsItem){
            userDoc.save((err2,doc2)=>{
              if(err2){
                res.json(
                  {
                    status: '1',
                    msg: err.message
                  }
                )
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'success'
                })
              }
            })
  
          }else{
            //如果没有那就通过id在goodList中找到商品，保存到用户购物车中
            Goods.findOne({productId: productId}, (err, doc) => {
              if (err) {
                res.json({
                  status: '1',
                  msg: err.message
                })
              } else {
                if(doc){
                  console.log(doc);
                  // console.log(doc.productId);
                  console.log(typeof doc);
                  //这两行为什么没有起作用？？？
                  doc.productNum=1;
                  doc.checked=1;
        
                  userDoc.cartList.push(doc);
                  userDoc.save((err2,doc2)=>{
                    if(err2){
                      res.json(
                        {
                          status: '1',
                          msg: err.message
                        }
                      )
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'success'
                      })
                    }
                  })
                }
              }
            })
          }
        }
      }
      
    })
  });
})

module.exports = router
