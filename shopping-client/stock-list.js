window.onload = function () {
    document.getElementById("login").onclick = checkloign;
    document.getElementById("orderlist").onclick = updatedOrderList;
}

let shoppingCart = [];

async function checkloign() {
    const response = await fetch("http://localhost:3000/api/login",{
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if(response.status == 500){
        console.log("user is not match");
    }
    else{
        const result = await response.json();
        sessionStorage.setItem('userId',result.id);
        fetchStock();
        fetchShoppingCartData(result.id);

    }

   
}
async function fetchStock() {
    let html = `
    <caption>Product List</caption>
    <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Image</th>
    <th>Stock</th>
    <th>Actions</th>
    </tr>`;
    const response = await fetch("http://localhost:3000/api/products");
    const stocklists = await response.json();
    console.log(stocklists);
    stocklists.forEach(stock =>
        html += `<tr>
        <td>${stock.name}</td>
        <td>${stock.price}</td>
        <td>${stock.image}</td>
        <td>${stock.stock}</td>
        <td>
        <a href='#' onclick="addStock('${stock.id}')">Add</a>
        </td>
        </tr>`);

    document.getElementById("stock-list").innerHTML = html;
}

async function fetchShoppingCartData(userId) {
    console.log(userId);
    let html = `
    <caption>Your Shopping Cart</caption>
    <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Total</th>
    <th>Quantity</th>
    </tr>`;
    const response = await fetch(`http://localhost:3000/api/shopping-carts/${userId}`);
    const shoppingcartlists = await response.json();
    console.log(shoppingcartlists);
    shoppingCart = shoppingcartlists;
    shoppingcartlists.forEach(list =>
        html += `<tr>
        <td>${list.name}</td>
        <td>${list.price}</td>
        <td>${list.price}</td>
        <td>${list.quantity}</td>
        </tr>`
       );
    document.getElementById("shoppingcart-list").innerHTML = html;
}


async function updatedOrderList(){
    console.log("orderlist",shoppingCart);
    console.log(JSON.stringify(shoppingCart));
    const response = await fetch("http://localhost:3000/api/shopping-carts/placeOrder", {
        method: 'PUT',
        body: JSON.stringify(shoppingCart),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if(response.status == 500){
        console.log("Error 500");
    }
    else{
        console.log("Success");
    }

}


async function addStock(stockId){
    console.log(`stockID ${stockId}`);
    console.log(sessionStorage.userId);
    await fetch("http://localhost:3000/api/shopping-carts/add", {
        method: 'POST',
        body: JSON.stringify({
            productId:stockId,
            userId:sessionStorage.userId
            
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    fetchStock();
    fetchShoppingCartData(sessionStorage.userId);
}