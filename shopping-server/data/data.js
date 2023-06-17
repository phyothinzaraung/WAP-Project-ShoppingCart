const userDB = [
    { id:'bcc0251e-0d2e-11ee-be56-0242ac120002', username: 'user1', password: 'pass1' },
    { id: 'd209fa3a-0d2e-11ee-be56-0242ac120002', username: 'user2', password: 'pass2' }
];

const productDB = [
    {id:'e33c9038-0d1f-11ee-be56-0242ac120002', name:'Node', price:'9.99', image:'', stock:'10'},
    {id:'ef84f6e6-0d1f-11ee-be56-0242ac120002', name:'Angular', price:'19.99', image:'', stock:'26'},
    {id:'f8a7f002-0d1f-11ee-be56-0242ac120002', name:'React', price:'12.99', image:'', stock:'30'},
    {id:'fddb3b7e-0d1f-11ee-be56-0242ac120002', name:'Python', price:'20.99', image:'', stock:'18'},
    {id:'0a9cc080-0d20-11ee-be56-0242ac120002', name:'Java', price:'99.99', image:'', stock:'27'},
    {id:'10c14b20-0d20-11ee-be56-0242ac120002', name:'C#', price:'29.99', image:'', stock:'16'},
    {id:'15940778-0d20-11ee-be56-0242ac120002', name:'PHP', price:'30.99', image:'', stock:'21'},
    {id:'1ac9f75c-0d20-11ee-be56-0242ac120002', name:'Golang', price:'22.99', image:'', stock:'19'},
    {id:'1ed78ef4-0d20-11ee-be56-0242ac120002', name:'Javascipt', price:'30.99', image:'', stock:'23'},
    {id:'22edfe74-0d20-11ee-be56-0242ac120002', name:'Kotlin', price:'28.99', image:'', stock:'12'},
];

const shoppingCartDB = [
    {id:'5fff25b8-0d2f-11ee-be56-0242ac120002', userId: 'bcc0251e-0d2e-11ee-be56-0242ac120002', productId: 'ef84f6e6-0d1f-11ee-be56-0242ac120002', name: 'Angular', price: '19.99'},
    {id:'67148eec-0d2f-11ee-be56-0242ac120002', userId: 'bcc0251e-0d2e-11ee-be56-0242ac120002', productId: '1ed78ef4-0d20-11ee-be56-0242ac120002', name: 'Javascipt', price: '30.99'},
    {id:'6ec0fde2-0d2f-11ee-be56-0242ac120002', userId: 'd209fa3a-0d2e-11ee-be56-0242ac120002', productId: '0a9cc080-0d20-11ee-be56-0242ac120002', name: 'Java', price: '99.99'},
    {id:'766ff2c8-0d2f-11ee-be56-0242ac120002', userId: 'd209fa3a-0d2e-11ee-be56-0242ac120002', productId: 'fddb3b7e-0d1f-11ee-be56-0242ac120002', name: 'Python', price: '20.99'}
];

module.exports = {productDB, userDB, shoppingCartDB};