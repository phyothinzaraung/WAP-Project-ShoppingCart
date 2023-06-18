window.onload = function () {
    document.getElementById("loginBtn").onclick = checkloign;
    document.getElementById("orderlist").onclick = updatedOrderList;
}

let shoppingCart = [];
let productId="";

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
    
    const result = await response.json()
    if(result.status){
        console.log("user is not match");
    }
    else{
        sessionStorage.setItem('userId',result.id);
        sessionStorage.setItem('username', result.username);
        showAfterLogin();
        fetchStock();
        fetchShoppingCartData(result.id);
    }
}

function showAfterLogin() {

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('welcome-logout-content').style.display = 'block';
    document.getElementById('welcome').innerText = `Welcome, ${sessionStorage.getItem('username')}`;
    document.getElementById('welcome-content-div').style.display = 'none';
    document.getElementById('err').innerText = "";
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
        <td><img src="http://localhost:3000/${stock.image}" width="30" height="30" ></td>
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
    // const incrementButton = document.querySelector('.increment')
    // console.log("increasement",incrementButton);
    shoppingcartlists.forEach(list =>
        html += `<tr>
        <td>${list.name}</td>
        <td>${list.price}</td>
        <td>${list.price}</td>
        <td><button onclick='increase_by_one("${list.productId}");'>+</button>
        <input id="${list.productId}" type="text" value="${list.quantity}" name="qty" />
        <button onclick='decrease_by_one("${list.productId}");'>-</button></td>
        </tr>`
        
       );

    document.getElementById("shoppingcart-list").innerHTML = html;
}



function increase_by_one(field) {
    const nr = parseInt(document.getElementById(field).value);
    document.getElementById(field).value = nr + 1;
   }
    
function decrease_by_one(field) {
    const nr = parseInt(document.getElementById(field).value);
    if (nr > 0) {
        document.getElementById(field).value = nr - 1;
        
    }
    if(nr==0){
        delete_order(field);
    }
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
    fetchStock();

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

async function delete_order(productId) {
    const obj = {
        "userId":sessionStorage.userId,
        "productId":productId
    }
    console.log(obj);
    console.log(JSON.stringify(obj));
    const response = await fetch("http://localhost:3000/api/shopping-carts/remove",{
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if(response.status == 500){
        console.log("Internal Server Error");
    }
    else{
        console.log("Success");
    }

    fetchShoppingCartData(sessionStorage.userId);q
    
}