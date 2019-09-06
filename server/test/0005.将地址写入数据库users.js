let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dumall', (error) => {
  if (error) {
    console.log('数据库连接失败' + error);
  } else {
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
  'addressList': Array
  
});


let User = mongoose.model('User', userSchema)
// 100000077
User.create(
  [
    {
      'userId': '100000077',
      'userName': '王伟',
      'userPwd': 12345678,
      'cartList': [],
      'addressList': [
        {
          'addressId': '100001',
          'userName': 'wangwei',
          'streetName': '河北省霸州市',
          'postCode': '100001',
          'tel': '13301356209',
          'isDefault': true
        },
        {
          'addressId': '100002',
          'userName': 'aaaa',
          'streetName': '河北省固安县',
          'postCode': '100001',
          'tel': '13301356209',
          'isDefault': false
        },
        {
          'addressId': '100003',
          'userName': 'bbbb',
          'streetName': 'bbb',
          'postCode': '100001',
          'tel': '13301356209',
          'isDefault': false
        },
        {
          'addressId': '100004',
          'userName': 'cccc',
          'streetName': 'cccc',
          'postCode': '100001',
          'tel': '13301356209',
          'isDefault': false
        },
        {
          'addressId': '100005',
          'userName': 'dddd',
          'streetName': 'dddd',
          'postCode': '100001',
          'tel': '13301356209',
          'isDefault': false
        },
      ]
      
    }
  ], (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  }
)
