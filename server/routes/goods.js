let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Goods = require('../models/goods');
let User = require('../models/user');


/*
* 连接数据库
* */
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
    console.log('mongodb connected!!')
});

mongoose.connection.on("error", function () {
    console.log("mongodb connected fail...")
})

mongoose.connection.on("disconnected", function () {
    console.log('mongodb connected disconnected.')
})

router.get("/list", function (req, res, next) {
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let priceLevel = req.param('priceLevel');
    let priceGt = '', priceLt = '';
    let sort = req.param("sort");
    let skip = (page - 1) * pageSize;
    let params = {};
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLt = 100;
                break;
            case '1':
                priceGt = 100;
                priceLt = 500;
                break;
            case '2':
                priceGt = 500;
                priceLt = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLt = 3000;
                break;
            case '4':
                priceGt = 3000;
                priceLt = 8000;
                break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLt
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice': sort});
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.josn({
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
            })
        }
    })
});

//加入购物车功能
router.post("/addCart", function (req, res, next) {
    let userId = req.cookies.userId;
    console.log(7777, userId);
    let productId = req.body.productId;
    User.findOne({userId: userId}, function (err, userDoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: 'error'
            })
        } else {
            if (userDoc) {
                let goodsItem = '';
                userDoc.cartList.forEach((item) => {
                    if (item.productId === productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                if (goodsItem) {
                    userDoc.save(function (err2, doc2) {
                        if (err2) {
                            res.josn({
                                status: '1',
                                msg: err2.message
                            });
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'success!!!!'
                            })
                        }
                    })
                } else {
                    Goods.findOne({
                        productId: productId
                    }, function (err1, doc) {
                        console.log(7777, doc);
                        if (err) {
                            res.josn({
                                status: '1',
                                msg: err1.message
                            });
                        } else {
                            if (doc) {
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function (err2, doc2) {
                                    if (err2) {
                                        res.josn({
                                            status: '1',
                                            msg: err2.message,
                                            result: 'success!!!!'
                                        });
                                    } else {
                                        res.json({
                                            status: '0',
                                            msg: '',
                                            result: 'success!!!!'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    }, 'users')
});

module.exports = router;
