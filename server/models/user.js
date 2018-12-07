let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let usersSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": [{
            "orderId": String,
            "orderTotal": String,
            "addressInfo": Object,
            "goodsList": Array,
            "orderStatus": String,
            "createDate": String
        }
    ],
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": Number,
        "productImage": String,
        "productUrl": String,
        "checked": String,
        "productNum": String
    }],
    "addressList": [
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": String,
            "tel": String,
            "isDefault": Boolean
        }
    ]
});

module.exports = mongoose.model('User', usersSchema);
