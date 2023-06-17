const data = require("../data/data");

const products = data.productDB;

module.exports = class Product{
    constructor(id, name, price, image, stock){
        this.id = id;
        this.name = name;
        this.price = price; 
        this.image = image;
        this.stock = stock;
    }

    static getAllProducts(){
        return products;
    }
}