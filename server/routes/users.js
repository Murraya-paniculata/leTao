let express = require('express');
let router = express.Router();
let User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login",function (req,res,next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param,function (err,doc) {
        if(err){
            res.json({
                status: '1',
                msg: err.message
            })
        }else{
            if(doc){
                res.cookie('userId',doc.userId,{
                    path: '/',
                    maxAge: 1000*60*60
                });
                res.cookie('userName',doc.userName,{
                    path: '/',
                    maxAge: 1000*60*60
                });
                // req.session.user = doc;
                res.json({
                    status: '0',
                    msg: '',
                    result: doc
                });
            }
        }
    },'users')
});


//登出接口
router.post('/logout',function (req,res,next) {
    res.cookie("userId",'',{
        path: '/',
        maxAge: -1
    });
    res.jsonp({
        status: "0",
        msg: '1',
        result: ''
    })
});

//检查用户是否登录
router.get("/checkLogin",function (req,res,next) {
    if(req.cookies.userName){
        res.json({
            status: "0",
            msg: '',
            result: req.cookies.userName
        })
    }else{
        res.json({
            status: "0",
            msg: '未登录',
            result: ''
        })
    }
});


//查询当前用户的购物车列表
router.get("/cartList",function (req,res,next) {
    let userId = req.cookies.userId;
    User.findOne({userId: userId},function(err,doc){
        if(err){
            res.json({
                status: "1",
                msg: error,
                result: ''
            })
        }else{
            if(doc){
                res.json({
                    status: '0',
                    mes: '',
                    result: doc.cartList
                })
            }
        }
    })
});

//删除购物车数据
router.post('/cart/deleteProduct',function (req,res,next) {
   let productId = req.body.productId;
   let userId = req.cookies.userId;
   User.update({
       userId: userId
   },{ $pull: {
       'cartList': {
           'productId': productId
       }
   }
   },function (err,doc) {
       if(err){
           res.json({
               status: '1',
               mes: err.message,
               result: ''
           })
       }else{
           if(doc){
               res.json({
                   status: '0',
                   mes: '',
                   result: '删除成功！'
               })
           }
       }
   })
});

router.post('/cartEdit',function (req,res,next) {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    User.update({
        'userId': userId,
        'cartList.productId': productId
    },{
        'cartList.$.productNum': productNum,
        'new': true
    },function (err,doc) {
        if(err){
            res.json({
                status: '1',
                msg: '',
                result: ''
            })
        }else{
            console.log(77777,doc);
            if(doc){
                res.json({
                    status: '0',
                    msg: '',
                    result: '修改数量成功'
                })
            }
        }
    })
});

router.post('/editCheckAll',function (req,res) {
    let userId = req.cookies.userId;
    let checkAll = req.body.checkAll?'1':'0';
    User.findOne({userId: userId},function (err,user) {
        if(err){
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        }else{
            if(user){
                user.cartList.forEach((item)=>{
                    item.checked = checkAll;
                });
                user.save(function (err1,doc) {
                    if(err1){
                        res.json({
                            status: '1',
                            msg: err1.message,
                            result: ''
                        })
                    }else{
                        if(doc){
                            res.json({
                                status: '0',
                                msg: '',
                                result: doc
                            })
                        }
                    }
                })
            }
        }
    })
});

router.post('/editCheck',function (req,res) {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let checked = req.body.checked?'1':'0';
    User.update({
        'userId': userId,
        'cartList.productId': productId
    },{
        'cartList.$.checked': checked
    },function(err,doc){
        if(err){
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        }else{
            console.log(9999,doc);
            if(doc){
                res.json({
                    status: '0',
                    msg: '',
                    result: doc
                })
            }
        }
    })
});

module.exports = router;
