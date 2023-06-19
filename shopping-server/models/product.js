const data = require("../data/data");

const products = data.productDB;

module.exports = class Product{
    constructor(id, name, price, image, stock, cartImage){
        this.id = id;
        this.name = name;
        this.price = price; 
        this.image = image;
        this.stock = stock;
        this.cartImage = cartImage;
    }

    static getAllProducts(){
        return products;
    }
}