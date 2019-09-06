let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': [
    {
      'orderId': String,
      'orderTotal': String,
      'addressInfo': String,
      'goodsList': Array,
      'orderStatus': String,
      'createDate': String,
    }
  ],
  'cartList': [
    {
    'productId': String,
    'productName': String,
    'salePrice': String,
    'productImage': String,
    'checked': String,
    'productNum': Number,
  }
  ],
  'addressList':[
    {
      'addressId': String,
      'userName': String,
      'streetName':String,
      'postCode':String,
      'tel': String,
      'isDefault': Boolean
    },
  ]
  
});
module.exports = mongoose.model('User', userSchema)
