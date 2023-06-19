const uuid = require('uuid');

const userDB = [
    { id:'bcc0251e-0d2e-11ee-be56-0242ac120002', username: 'phyo', password: 'phyo' },
    { id: 'd209fa3a-0d2e-11ee-be56-0242ac120002', username: 'tin', password: 'tin' },
    { id: '6a6b9956-0ed7-11ee-be56-0242ac120002', username: 'myo', password: 'myo' }
];

const productDB = [
    {id:'e33c9038-0d1f-11ee-be56-0242ac120002', name:'Node', price:'9.99', image: 'images/nodejs.png', stock: 10, cartImage: 'images/cart.png'},
    {id:'ef84f6e6-0d1f-11ee-be56-0242ac120002', name:'Angular', price:'19.99', image:'images/angular.png', stock: 26, cartImage: 'images/cart.png' },
    {id:'f8a7f002-0d1f-11ee-be56-0242ac120002', name:'React', price:'12.99', image:'images/react.png', stock: 30, cartImage: 'images/cart.png'},
    {id:'fddb3b7e-0d1f-11ee-be56-0242ac120002', name:'Python', price:'20.99', image:'images/python.png', stock: 18, cartImage: 'images/cart.png'},
    {id:'0a9cc080-0d20-11ee-be56-0242ac120002', name:'Java', price:'99.99', image:'images/java.png', stock: 27, cartImage: 'images/cart.png'},
    {id:'10c14b20-0d20-11ee-be56-0242ac120002', name:'C#', price:'29.99', image:'images/csharp.png', stock: 16, cartImage: 'images/cart.png' },
    {id:'15940778-0d20-11ee-be56-0242ac120002', name:'PHP', price:'30.99', image:'images/php.png', stock: 21, cartImage: 'images/cart.png'},
    {id:'1ac9f75c-0d20-11ee-be56-0242ac120002', name:'Golang', price:'22.99', image:'images/golang.png', stock: 19, cartImage: 'images/cart.png'},
    {id:'1ed78ef4-0d20-11ee-be56-0242ac120002', name:'Javascript', price:'30.99', image:'images/javascript.png', stock: 23, cartImage: 'images/cart.png'},
    {id:'22edfe74-0d20-11ee-be56-0242ac120002', name:'Kotlin', price:'28.99', image:'images/kotlin.jpg', stock: 12, cartImage: 'images/cart.png'},
];

const shoppingCartDB = [
    {id: uuid.v4(), userId: 'bcc0251e-0d2e-11ee-be56-0242ac120002', productId: 'ef84f6e6-0d1f-11ee-be56-0242ac120002', name: 'Angular', price: '19.99', quantity: 1},
    {id: uuid.v4(), userId: 'bcc0251e-0d2e-11ee-be56-0242ac120002', productId: '1ed78ef4-0d20-11ee-be56-0242ac120002', name: 'Javascipt', price: '30.99', quantity: 1},
    {id: uuid.v4(), userId: 'd209fa3a-0d2e-11ee-be56-0242ac120002', productId: '0a9cc080-0d20-11ee-be56-0242ac120002', name: 'Java', price: '99.99', quantity: 1},
    {id: uuid.v4(), userId: 'd209fa3a-0d2e-11ee-be56-0242ac120002', productId: 'fddb3b7e-0d1f-11ee-be56-0242ac120002', name: 'Python', price: '20.99', quantity: 1},
    {id: uuid.v4(), userId: '6a6b9956-0ed7-11ee-be56-0242ac120002', productId: 'fddb3b7e-0d1f-11ee-be56-0242ac120002', name: 'Python', price: '20.99', quantity: 1}
];

module.exports = {productDB, userDB, shoppingCartDB};