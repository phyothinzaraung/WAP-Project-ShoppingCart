const uuid = require('uuid');

const data = require("../data/data");

const shoppingCarts = data.shoppingCartDB;
const products = data.productDB;

module.exports = class ShoppingCart{
    constructor(id, userId, productId, name, price){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.name = name;
        this.price = price;
    }

    static getShoppingCardByUserId(userId){
        const carts = shoppingCarts.filter(cart => cart.userId == userId);
        return carts;
    }

    static addShoppingCart(userId, productId){
        let result = shoppingCarts.filter(cart => cart.userId == userId);
        const index = shoppingCarts.findIndex(cart => cart.userId === userId && cart.productId === productId);
        if(index === -1){
            const product = products.find(product => product.id == productId);
            console.log(product);
            const newShoppingCartData = {
                id: uuid.v4(),
                userId: userId,
                productId: productId,
                name: product.name,
                price: product.price
            };
            shoppingCarts.push(newShoppingCartData);
            result.push(newShoppingCartData);
        }
        return result;
    }

    static removeShoppingCart(userId, productId){
        const index = shoppingCarts.findIndex(cart => cart.userId == userId && cart.productId==productId);
        if(index > -1){
            shoppingCarts.splice(index, 1);
        }else{
            throw new Error(`Couldn't find the product`);
        }
    }
}