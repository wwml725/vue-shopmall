var express = require('express');
var router = express.Router();
// require('./../util/util')
var User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});


//【登录功能】：实际就是将输入的数据，和数据库中的数据进行比对，如果一样就是登陆上了，并且将这些信息保存在cookie中，用来验证用户是否登录，一般情况下将数据保存在cookie中以后，刷新页面就会是页面保持在没有登陆的状态，因此每一次刷新页面，都会先获取cookie中的数据，与数据库中进行对比，如果对比成功，就保持在登录状态
//localhost:3000/users/login
router.post("/login", function (req,res,next) {
  //查找条件
  var param = {
    userName:req.body.userName,//req.body是前端post提交过来的数据
    userPwd:req.body.userPwd
  };
  User.findOne(param, function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
      });
  
      console.log(err);
    }else{
      console.log(doc);//如果没有找到就是null
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        //req.session.user = doc;
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        });
      }else{
        res.json({
          msg:'用户名或者密码错误!!!!!!!server'
        })
      }
    }
  });
});


//登出接口   就是清除cookie记录
//localhost:3000/users/logout
router.post("/logout", function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});


//登录验证 通过id验证是否登录
//如果cookie中保存了id，就代表登陆了，并且返回登录的用户名（这样做貌似不太好吧？？）
//页面中登录和不登录显示的内容是不一样的
router.get("/checkLogin", function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName || ''
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

//获取购物车列表数据
router.get('/cartList',(req,res,next)=>{
  let userId= req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
          res.json({
            status:'0',
            msg:'',
            result:doc.cartList
          })
      }
    }
  })
})

//删除购物车中的某一项数据
router.post("/cartDel", function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId;
  User.update({userId:userId},{$pull:{'cartList':{'productId':productId}}}, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });
});


//修改商品数量或者选中商品
router.post("/cartEdit", function (req,res,next) {
  var userId = req.cookies.userId;
  var  productId = req.body.productId;
  var  productNum = req.body.productNum;
  var  checked = req.body.checked;
  
  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
  }, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  })
});


//将数据库的checked全选
router.post("/editCheckAll", function (req,res,next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll?'1':'0';
  User.findOne({userId:userId}, function (err,user) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(user){
        //获取数据，遍历每一个checked，改为是否选中
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        })
        //改完之后提交数据库
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1,message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            });
          }
        })
      }
    }
  });
});


// //查询用户地址接口
router.get("/addressList", function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId}, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      });
    }
  })
});


// // //设置默认地址接口
router.post("/setDefault", function (req,res,next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'addressId is null',
      result:''
    });
  }else{
    User.findOne({userId:userId}, function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        var addressList = doc.addressList;
        addressList.forEach((item)=>{
          if(item.addressId ==addressId){
            item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        });
        console.log(addressList);
        console.log(addressList[0]);
  
        doc.save(function (err1,doc1) {
          if(err){
            res.json({
              status:'1',
              msg:err.message,
              result:''
            });
          }else{
            console.log(doc1.addressList[0]);
            res.json({
              status:'0',
              msg:'',
              result:''
            });
          }
        })
      }
    });
  }
});


// //删除地址接口
router.post("/delAddress", function (req,res,next) {
  var userId = req.cookies.userId,addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  }, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:''
      });
    }
  });
});


//
// router.post("/payMent", function (req,res,next) {
//   var userId = req.cookies.userId,
//     addressId = req.body.addressId,
//     orderTotal = req.body.orderTotal;
//   User.findOne({userId:userId}, function (err,doc) {
//     if(err){
//       res.json({
//         status:"1",
//         msg:err.message,
//         result:''
//       });
//     }else{
//       var address = '',goodsList = [];
//       //获取当前用户的地址信息
//       doc.addressList.forEach((item)=>{
//         if(addressId==item.addressId){
//           address = item;
//         }
//       })
//       //获取用户购物车的购买商品
//       doc.cartList.filter((item)=>{
//         if(item.checked=='1'){
//           goodsList.push(item);
//         }
//       });
//
//       var platform = '622';
//       var r1 = Math.floor(Math.random()*10);
//       var r2 = Math.floor(Math.random()*10);
//
//       var sysDate = new Date().Format('yyyyMMddhhmmss');
//       var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
//       var orderId = platform+r1+sysDate+r2;
//       var order = {
//         orderId:orderId,
//         orderTotal:orderTotal,
//         addressInfo:address,
//         goodsList:goodsList,
//         orderStatus:'1',
//         createDate:createDate
//       };
//
//       doc.orderList.push(order);
//
//       doc.save(function (err1,doc1) {
//         if(err1){
//           res.json({
//             status:"1",
//             msg:err.message,
//             result:''
//           });
//         }else{
//           res.json({
//             status:"0",
//             msg:'',
//             result:{
//               orderId:order.orderId,
//               orderTotal:order.orderTotal
//             }
//           });
//         }
//       });
//     }
//   })
// });
//
// //根据订单Id查询订单信息
// router.get("/orderDetail", function (req,res,next) {
//   var userId = req.cookies.userId,orderId = req.param("orderId");
//   User.findOne({userId:userId}, function (err,userInfo) {
//     if(err){
//       res.json({
//         status:'1',
//         msg:err.message,
//         result:''
//       });
//     }else{
//       var orderList = userInfo.orderList;
//       if(orderList.length>0){
//         var orderTotal = 0;
//         orderList.forEach((item)=>{
//           if(item.orderId == orderId){
//             orderTotal = item.orderTotal;
//           }
//         });
//         if(orderTotal>0){
//           res.json({
//             status:'0',
//             msg:'',
//             result:{
//               orderId:orderId,
//               orderTotal:orderTotal
//             }
//           })
//         }else{
//           res.json({
//             status:'120002',
//             msg:'无此订单',
//             result:''
//           });
//         }
//       }else{
//         res.json({
//           status:'120001',
//           msg:'当前用户未创建订单',
//           result:''
//         });
//       }
//     }
//   })
// });





// router.get("/getCartCount", function (req,res,next) {
//   if(req.cookies && req.cookies.userId){
//     console.log("userId:"+req.cookies.userId);
//     var userId = req.cookies.userId;
//     User.findOne({"userId":userId}, function (err,doc) {
//       if(err){
//         res.json({
//           status:"0",
//           msg:err.message
//         });
//       }else{
//         let cartList = doc.cartList;
//         let cartCount = 0;
//         cartList.map(function(item){
//           cartCount += parseFloat(item.productNum);
//         });
//         res.json({
//           status:"0",
//           msg:"",
//           result:cartCount
//         });
//       }
//     });
//   }else{
//     res.json({
//       status:"0",
//       msg:"当前用户不存在"
//     });
//   }
// });




module.exports = router;
