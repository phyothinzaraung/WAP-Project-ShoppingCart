const Product = require("../models/product");

exports.getAllProduct = (req, res, next) =>{
    res.json(Product.getAllProducts());
}