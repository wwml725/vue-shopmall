let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dullmall',(error)=>{
    if(error){
        console.log('数据库连接失败' + error);
    }else{
        console.log('数据库连接成功');
    }
});

let productSchema = new mongoose.Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String,
});

let Goods = mongoose.model('Good',productSchema)

Goods.find({},(err,doc)=>{
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
})