let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let usersSchema = new Schema({
    "userId": String,
    "userPwd": String,
    "orderList": Array,
    "carList": [{
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

module.exports = mongoose.model('Users', usersSchema);
