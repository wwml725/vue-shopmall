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
  //       "productPrice":"2499",
  //       "productImg":"mi6.jpg"
  //     },
  //     {
  //       "productId":"10002",
  //       "productName":"小米笔记本",
  //       "productPrice":"3999",
  //       "productImg":"note.jpg"
  //     },
  //     {
  //       "productId":"10003",
  //       "productName":"小米6",
  //       "productPrice":"2499",
  //       "productImg":"mi6.jpg"
  //     },
  //     {
  //       "productId":"10004",
  //       "productName":"小米6",
  //       "productPrice":"2499",
  //       "productImg":"1.jpg"
  //     },
  //     {
  //       "productId":"10005",
  //       "productName":"小米6",
  //       "productPrice":"2499",
  //       "productImg":"2.jpg"
  //     },
  //     {
  //       "productId":"10006",
  //       "productName":"小米6",
  //       "productPrice":"2499",
  //       "productImg":"3.jpg"
  //     },
  //     {
  //       "productId":"10007",
  //       "productName":"小米6",
  //       "productPrice":"2499",
  //       "productImg":"4.jpg"
  //     },
  //     {
  //       "productId":"10008",
  //       "productName":"小米6",
  //       "productPrice":"2499",
  //       "productImg":"5.jpg"
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
          status: '1'
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
