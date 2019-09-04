let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dumall', (error) => {
  if (error) {
    console.log('数据库连接失败' + error);
  } else {
    console.log('数据库连接成功');
  }
});

let productSchema = new mongoose.Schema({
  "productId": String,
  "productName": String,
  "salePrice": Number,
  "productImage": String,
  'checked': String,
  'productNum': Number,
});

let Goods = mongoose.model('Good', productSchema)

Goods.create(
  [
    {
      "productId": "10001",
      "productName": "小米音响",
      "salePrice": 129.00,
      "productImage": "1.jpg"
    },
    {
      "productId": "10002",
      "productName": "头戴式耳机-3",
      "salePrice": 80.00,
      "productImage": "2.jpg"
    },
    {
      "productId": "10003",
      "productName": "Ear700",
      "salePrice": 700.00,
      "productImage": "3.jpg"
    },
    {
      "productId": "10004",
      "productName": "Leme",
      "salePrice": 299.00,
      "productImage": "4.jpg"
    },
    {
      "productId": "10005",
      "productName": "Letv",
      "salePrice": 149.00,
      "productImage": "5.jpg"
    },
    {
      "productId": "10006",
      "productName": "智能插线板",
      "salePrice": 59.00,
      "productImage": "6.jpg"
    },
    {
      "productId": "10007",
      "productName": "Ear1000",
      "salePrice": 1000.00,
      "productImage": "7.jpg"
    },
    {
      "productId": "10008",
      "productName": "小米净水器",
      "salePrice": 1999,
      "productImage": "8.jpg"
    },
    {
      "productId": "10009",
      "productName": "IH 电饭煲",
      "salePrice": 999,
      "productImage": "9.jpg"
    },
    
    {
      "productId": "10010",
      "productName": "小米电视机",
      "salePrice": 2399.00,
      "productImage": "10.jpg"
    },
    
    {
      "productId": "10011",
      "productName": "Ear 1600",
      "salePrice": 1600.00,
      "productImage": "13.jpg"
    },
    
    {
      "productId": "10012",
      "productName": "小米数据线",
      "salePrice": 13.00,
      "productImage": "15.jpg"
    },
    
    {
      "productId": "10013",
      "productName": "小米6手机",
      "salePrice": 2999,
      "productImage": "mi6.jpg"
    },
    {
      "productId": "10013",
      "productName": "小米摄像头",
      "salePrice": 299.00,
      "productImage": "photo.jpg"
    },
    {
      "productId": "10015",
      "productName": "小米平衡车",
      "salePrice": 1299,
      "productImage": "pingheng.jpg"
    },
    
    {
      "productId": "10016",
      "productName": "自拍杆",
      "salePrice": 39.00,
      "productImage": "zipai.jpg"
    },
  ], (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  }
)
