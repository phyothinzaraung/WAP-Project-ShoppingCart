const ShoppingCart = require("../models/shopping-cart");

exports.getShoppingCart = (req, res, next)=>{
    const carts = ShoppingCart.getShoppingCardByUserId(req.params.userId);
    res.json(carts);
}