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

router.get('/', (req, res, next) => {
  // Goods.create([
  //     {
  //       "productId":"10001",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"mi6.jpg"
  //     },
  //     {
  //       "productId":"10002",
  //       "productName":"小米笔记本",
  //       "salePrice":"3999",
  //       "productImage":"note.jpg"
  //     },
  //     {
  //       "productId":"10003",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"mi6.jpg"
  //     },
  //     {
  //       "productId":"10004",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"1.jpg"
  //     },
  //     {
  //       "productId":"10005",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"2.jpg"
  //     },
  //     {
  //       "productId":"10006",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"3.jpg"
  //     },
  //     {
  //       "productId":"10007",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"4.jpg"
  //     },
  //     {
  //       "productId":"10008",
  //       "productName":"小米6",
  //       "salePrice":"2499",
  //       "productImage":"5.jpg"
  //     }],(err,doc)=>{
  //     if(err){
  //       console.log(err);
  //     }else{
  //       console.log(doc);
  //     }
  //   })
  // res.send('hell')
  
  Goods.find({}, (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg:msg.message
        })
      } else {
        // res.send(doc)
        console.log(doc);
        res.json({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      }
    })
})

module.exports = router
