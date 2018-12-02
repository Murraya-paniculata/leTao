let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let usersSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": Number,
        "productImage": String,
        "productUrl": String,
        "checked": String,
        "productNum": String
    }],
    "addressList": Array
});

module.exports = mongoose.model('User', usersSchema);
