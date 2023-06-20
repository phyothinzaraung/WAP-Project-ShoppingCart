window.onload = function () {
    document.getElementById("loginBtn").onclick = checkloign;
    document.getElementById("placeOrderBtn").onclick = updatedOrderList;
    document.getElementById("logoutBtn").onclick = logout;
}

let shoppingCart = [];
let stockList = [];
let productId = "";

async function logout() {
    const response = await fetch('http://localhost:3000/api/shopping-carts/update', {
        method: 'PUT',
        body: JSON.stringify(shoppingCart),
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if (response.status == 500) {
        alert("Cannot logout");
    }
    else {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('my-token');
        showAfterLogout();
    }
}

function showAfterLogout() {
    shoppingCart = [];
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('welcome-logout-content').style.display = 'none';
    document.getElementById('welcome-content-div').style.display = 'block';
}

async function checkloign() {
    const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const result = await response.json();
    if (result.message) {
        document.getElementById('err').innerText = result.message;
    }
    else {
        sessionStorage.setItem('userId', result.id);
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('my-token', result.accessToken);
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
    const response = await fetch("http://localhost:3000/api/products",
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    const stocklists = await response.json();
    stockList = stocklists;
    stocklists.forEach(stock =>
        html += `<tr>
        <td>${stock.name}</td>
        <td>${stock.price}</td>
        <td><img src="http://localhost:3000/${stock.image}" width="35" height="35" ></td>
        <td>${stock.stock}</td>
        <td>
            <button onclick="addStock('${stock.id}')" class="borderless-button">
                <img src="http://localhost:3000/images/cart.png" width="35" height="35"/>
            </button>
        </td>
        </tr>`);

    document.getElementById("stock-list").innerHTML = html;
}

function compareQuantity(productId, stockId, isFromAddStock) {
    if (isFromAddStock) {
        let index = stockList.findIndex(prod => prod.id == stockId);
        let scIndex = shoppingCart.findIndex(scProd => scProd.productId == stockId);
        if(scIndex > -1) {
            if(stockList[index].stock == 0 || (shoppingCart[scIndex].quantity >= stockList[index].stock)) {
                alert(`${stockList[index].name} is already at the limit!`);
                return false;
            } else {
                return true;
            }
        } else {
            if(stockList[index].stock == 0) {
                alert(`${stockList[index].name} is already at the limit!`);
                return false;
            } else {
                return true;
            }
        }  
    } else {
        let index = shoppingCart.findIndex(scProd => scProd.productId == productId);
        let stockIndex = stockList.findIndex(prod => prod.id == shoppingCart[index].productId);
        if (stockIndex > -1) {
            if (shoppingCart[index].quantity >= stockList[stockIndex].stock) {
                alert(`${shoppingCart[index].name} is already at the limit!`);
                return false;
            } else {
                return true;
            }
        }
    }
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
    shoppingcartlists.forEach(prod => {
        let index = shoppingCart.findIndex(scProd => scProd.productId == prod.productId);
        if (index > -1) {
            if (shoppingCart[index].productId == id) {
                shoppingCart[index].quantity++;
            }
        } else {
            shoppingCart.push(prod);
        }
    });
    renderShoppingCartList();
}

function renderShoppingCartList() {
    if (shoppingCart.length == 0) {
        let html = `
            <caption>Your Shopping Cart</caption>
            <p>There is no item in your shopping cart!</p>`;
        document.getElementById("shoppingcart-list").innerHTML = html;
        document.getElementById("placeOrderBtn").style.display = 'none';
    } else {
        let html = `
    <caption>Your Shopping Cart</caption>
    <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Total</th>
    <th>Quantity</th>
    </tr>`;
        let totalPrice = 0;
        shoppingCart.forEach(item => {
            totalPrice += item.price * item.quantity;
            html += `<tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><p id="total${item.price}">${item.price * item.quantity}</p></td>
        <td><button onclick='increase_by_one("${item.productId}", "total${item.price}");' class="increase-decrease-style">+</button>
        <input id="${item.productId}" type="text" value="${item.quantity}" name="qty" class="myInput" readonly/>
        <button onclick='decrease_by_one("${item.productId}", "total${item.price}");' class="increase-decrease-style">-</button></td>
        </tr>`;
        });
        html += `<tr>
        <td id="totalPrice" class="right-align" colspan="4">Total: ${totalPrice.toFixed(2)}</td>
    </tr>`;
        document.getElementById("shoppingcart-list").innerHTML = html;
        document.getElementById("placeOrderBtn").style.display = 'block';
    }

}

function calculatePrice() {
    let total = 0;
    shoppingCart.forEach(prod => {
        total += prod.price * prod.quantity;
    });
    document.getElementById("totalPrice").innerHTML = `Total: ${total.toFixed(2)}`;
}

function increase_by_one(productId, price) {
    if (compareQuantity(productId, null, false)) {
        let index = shoppingCart.findIndex(prod => prod.productId == productId);
        shoppingCart[index].quantity = shoppingCart[index].quantity + 1;
        document.getElementById(price).innerHTML = (shoppingCart[index].quantity * shoppingCart[index].price).toFixed(2);
        document.getElementById(productId).value = shoppingCart[index].quantity;
        calculatePrice();
    }

}

function decrease_by_one(productId, price) {
    let index = shoppingCart.findIndex(prod => prod.productId == productId);
    if ((parseInt(document.getElementById(productId).value) - 1) > 0) {
        shoppingCart[index].quantity = shoppingCart[index].quantity - 1;
        document.getElementById(price).innerHTML = (shoppingCart[index].quantity * shoppingCart[index].price).toFixed(2);
        document.getElementById(productId).value = shoppingCart[index].quantity;
        calculatePrice();
    }
    if ((parseInt(document.getElementById(productId).value) - 1) == 0) {
        if (index > -1) {
            shoppingCart.splice(index, 1);
            delete_order(productId);
            renderShoppingCartList();
        }
    }
}



async function updatedOrderList() {
    const response = await fetch("http://localhost:3000/api/shopping-carts/placeOrder", {
        method: 'PUT',
        body: JSON.stringify(shoppingCart),
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if (response.status == 500) {
        console.log("Error 500");
    }
    else {
        fetchStock();
        shoppingCart = [];
        renderShoppingCartList();
    }


}


async function addStock(stockId) {
    if(compareQuantity(null, stockId, true)) {
        await fetch("http://localhost:3000/api/shopping-carts/add", {
                method: 'POST',
                body: JSON.stringify({
                    productId: stockId,
                    userId: sessionStorage.userId
                }),
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
            fetchShoppingCartData(sessionStorage.userId, stockId);
    }
}

async function delete_order(productId) {
    const obj = {
        "userId": sessionStorage.userId,
        "productId": productId
    }
    console.log(obj);
    console.log(JSON.stringify(obj));
    const response = await fetch("http://localhost:3000/api/shopping-carts/remove", {
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if (response.status == 500) {
        console.log("Internal Server Error");
    }
    else {
        console.log("Success");
    }
}