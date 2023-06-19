const ShoppingCart = require("../models/shopping-cart");

exports.getShoppingCart = (req, res, next)=>{
    const carts = ShoppingCart.getShoppingCardByUserId(req.params.userId);
    res.json(carts);
}

exports.addToCart = (req, res, next) => {
    const cart = ShoppingCart.addShoppingCart(req.body.userId, req.body.productId);
    res.status(201).json(cart);
}

exports.removeFromCart = (req, res, next) => {
    ShoppingCart.removeShoppingCart(req.body.userId, req.body.productId);
    res.status(204).end();
}

exports.updateShoppingCart = (req, res, next) => {
    ShoppingCart.updateShoppingcart(req.body);
    res.status(204).end();
}

exports.placeOrder = (req, res, next) => {
    const products = ShoppingCart.placeOrder(req.body);
    res.json(products);
}