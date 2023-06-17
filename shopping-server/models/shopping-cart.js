const data = require("../data/data");

const shoppingCarts = data.shoppingCartDB;

module.exports = class ShoppingCart{
    constructor(id, userId, productId, name, price){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.name = name;
        this.price = price;
    }

    static getShoppingCardByUserId(userId){
        const carts = shoppingCarts.find(cart => cart.userId == userId);
        return carts;
    }
}