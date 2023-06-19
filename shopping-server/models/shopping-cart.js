const uuid = require('uuid');

const data = require("../data/data");

const shoppingCarts = data.shoppingCartDB;
const products = data.productDB;
const users = data.userDB;

module.exports = class ShoppingCart{
    constructor(id, userId, productId, name, price, quantity){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
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
                price: product.price,
                quantity: 1
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

    static updateShoppingcart(shoppingCardArr){
        shoppingCardArr.forEach(
            scProd => {
                let index = users.findIndex(user => user.id == scProd.userId);
                if(index > -1){
                    shoppingCardArr.push(scProd);
                }
            }
        );
        return shoppingCardArr;
    }

    static placeOrder(shoppingCardRequestArr){
        shoppingCardRequestArr.forEach(
            scProd => {
                let index = products.findIndex(prod => prod.id === scProd.productId);
                if(index > -1) {
                    products[index].name = scProd.name;
                    products[index].price = scProd.price;
                    products[index].image = "";
                    products[index].stock = products[index].stock - scProd.quantity;
                }
            }
        )
        return products;
    }

}