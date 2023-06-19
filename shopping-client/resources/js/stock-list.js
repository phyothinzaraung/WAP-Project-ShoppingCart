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
        sessionStorage.setItem('my-token',result.accessToken);
        showAfterLogin();
        fetchStock();
        fetchShoppingCartData(result.id);
    }
    console.log('access ')
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
    const response = await fetch("http://localhost:3000/api/products",
    {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    const stocklists = await response.json();
    console.log(stocklists);
    stocklists.forEach(stock =>
        html += `<tr>
        <td>${stock.name}</td>
        <td>${stock.price}</td>
        <td><img src="http://localhost:3000/${stock.image}" width="30" height="30" ></td>
        <td>${stock.stock}</td>
        <td>
            <button onclick="addStock('${stock.id}')">
                <img src="ttp://localhost:3000/images/cart.png" />
            </button>
        </td>
        </tr>`);

    document.getElementById("stock-list").innerHTML = html;
}

async function fetchShoppingCartData(userId, id) {
    console.log(userId);
    const response = await fetch(`http://localhost:3000/api/shopping-carts/${userId}`,
    {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    const shoppingcartlists = await response.json();
    console.log(shoppingcartlists);
    shoppingcartlists.forEach(prod => {
        let index = shoppingCart.findIndex(scProd => scProd.productId == prod.productId);
        if(index > -1) {
            console.log("shopping cart id", shoppingCart[index].id)
            console.log("request id", id);
           if(shoppingCart[index].productId == id) {
                shoppingCart[index].quantity++;
           }
        } else {
            shoppingCart.push(prod);
        }
    });
    // shoppingCart = shoppingcartlists;
    renderShoppingCartList();
}

function renderShoppingCartList() {
    let html = `
    <caption>Your Shopping Cart</caption>
    <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Total</th>
    <th>Quantity</th>
    </tr>`;
    shoppingCart.forEach(list =>
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
    // const update_qty = nr+1;
    // sessionStorage.setItem('update_qty',update_qty);
    let index = shoppingCart.findIndex(prod => prod.productId == field);
    shoppingCart[index].quantity = shoppingCart[index].quantity + 1; 
    document.getElementById(field).value = shoppingCart[index].quantity;
   }
    
function decrease_by_one(field) {
    // const nr = parseInt(document.getElementById(field).value);
    let index = shoppingCart.findIndex(prod => prod.productId == field);
    if ((parseInt(document.getElementById(field).value) - 1) > 0) {
        // const update_qty = nr-1;
        // sessionStorage.setItem('update_qty',update_qty);
        shoppingCart[index].quantity = shoppingCart[index].quantity - 1; 
        document.getElementById(field).value = shoppingCart[index].quantity;
        
    }
    if((parseInt(document.getElementById(field).value) - 1) == 0){
        if(index > -1) {
            shoppingCart.splice(index, 1);
            delete_order(field);
            renderShoppingCartList();
        }

        // delete_order(field);
    }
} 



async function updatedOrderList(){
    console.log("orderlist",shoppingCart);
    console.log(JSON.stringify(shoppingCart));
    const response = await fetch("http://localhost:3000/api/shopping-carts/placeOrder", {
        method: 'PUT',
        body: JSON.stringify(shoppingCart),
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
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
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    // fetchStock();
    fetchShoppingCartData(sessionStorage.userId, stockId);
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
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if(response.status == 500){
        console.log("Internal Server Error");
    }
    else{
        console.log("Success");
    }

    // fetchShoppingCartData(sessionStorage.userId);
    // console.log("update qty",sessionStorage.update_qty);
    
}