let  mongoose = require("mongoose");
let Schema = mongoose.Schema;
let produtSchema = new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,
    "productUrl" : String,
    "productNum": Number,
    "checked": Number
});

module.exports = mongoose.model('Goods',produtSchema);
