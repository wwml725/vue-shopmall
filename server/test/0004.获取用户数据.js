let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dumall',(error)=>{
  if(error){
    console.log('数据库连接失败' + error);
  }else{
    console.log('数据库连接成功');
  }
});

let userSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [{
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    'checked': String,
    'productNum': Number,
  }
  ],
  'addressList':Array
  
});


let User = mongoose.model('User',userSchema)
// 100000077
User.find({'userName': '王'},(err,doc)=>{
    if(err){
      console.log(err);
    }else{
      console.log(doc);
    }
  }

)
