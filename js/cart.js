let currentUser = localStorage.getItem("currentuser");
let logoutBtn = document.querySelector(".logout-link");
let login = document.querySelector(".login-link");
if (currentUser) {
  logoutBtn.classList.remove("hide");
  logoutBtn.classList.add("show");
  login.classList.remove("show");
  login.classList.add("hide");
}
let arr = JSON.parse(localStorage.getItem("cart")) || [];
let counter = document.querySelector("#counter");
counter.innerHTML = arr.length;

let count = arr.length;
let products = [];
let totalPrice = 0;
let card = document.querySelector(".card");
function viewCart(product) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `https://dummyjson.com/products/${product.id}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.response);
      let cartItem = document.createElement("div");
      cartItem.setAttribute("class", "cart-items");
      cartItem.innerHTML = ` <img
      src="${data.images[0]}"
      alt="#"
      class="prod-image"
      id="item-image"
    />
    <div class="cart-detail">
      <p class="name" id="item-name">${data.title}</p>
      <p class="tag" id="item-tag">${data.category}</p>
      <p class="price" id="item-price">$${data.price}</p>
    </div>
    <div class="cart-control">
    <i class="fa-regular fa-trash-can cart-delete"       
        id="item-delete"></i>
      <div class="add">
        <button class="minus">-</button>
        <span class="quantity" id="item-quantity">${product.count}</span>
        <button class="plus">+</button>
      </div>
    </div>
      `;
      card.appendChild(cartItem);
      let cartDelete = cartItem.querySelector(".cart-delete");
      let quantity = cartItem.querySelector(".quantity");
      let plus = cartItem.querySelector(".plus");
      let minus = cartItem.querySelector(".minus");
      totalPrice += data.price * product.count;
      TotalPrice(Math.round(totalPrice * 100) / 100);
      plusBtn(plus, quantity, data, product);
      minusBtn(minus, quantity, cartItem, card, data, product);
      deleteItem(cartDelete, data, product, card, cartItem, quantity);
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
function plusBtn(btn, quantity, data, product) {
  btn.addEventListener("click", () => {
    console.log("quantity", quantity.innerHTML);
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
    arr.push(product.id);
    localStorage.setItem("cart", JSON.stringify(arr));
    console.log("quantity", product.id);
    product.count++;
    count++;
    counter.innerHTML = count;
    totalPrice += data.price;
    TotalPrice(Math.round(totalPrice * 100) / 100);
  });
}
function minusBtn(btn, quantity, cartItem, card, data, product) {
  btn.addEventListener("click", () => {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    arr.splice(arr.indexOf(product.id), 1);
    localStorage.setItem("cart", JSON.stringify(arr));
    product.count--;
    count--;
    counter.innerHTML = count;
    totalPrice -= data.price;
    TotalPrice(Math.round(totalPrice * 100) / 100);
    if (quantity.innerHTML == 0) {
      products.splice(products.indexOf(product), 1);
      TotalPrice(Math.round(totalPrice * 100) / 100);
      card.removeChild(cartItem);
      if (products.length == 0) {
        empty();
      }
    }
  });
}
function deleteItem(cartDelete, data, product, card, cartItem, quantity) {
  cartDelete.addEventListener("click", () => {
    products.splice(products.indexOf(product), 1);
    for (let i = 0; i < Number(quantity.innerHTML); i++) {
      arr.splice(arr.indexOf(product.id), 1);
      localStorage.setItem("cart", JSON.stringify(arr));
    }
    totalPrice -= data.price * product.count;
    count -= product.count;
    counter.innerHTML = count;
    TotalPrice(Math.round(totalPrice * 100) / 100);
    card.removeChild(cartItem);
    if (products.length == 0) {
      empty();
    }
  });
}
function TotalPrice(totalPrice) {
  console.log("totalPrice 11", totalPrice);
  console.log("products.length", products.length);
  document.querySelector("#Subtotal-price").innerHTML =
    `$${Math.round(totalPrice * 100) / 100}`;

  products.length == 0
    ? (document.querySelector("#total-price").innerHTML = "$0")
    : (document.querySelector("#total-price").innerHTML =
        `$${Math.round(totalPrice * 100) / 100 + 10}`);
}
function empty() {
  let empty = document.querySelector(".cart-empty");
  empty.className = "cart-empty show";
  let cart = document.querySelector(".cart");
  cart.className = "cart hide";
  let back = document.querySelector(".cart-arrow");
  back.className = "cart-arrow hide";
}
function cart(arr) {
  for (const product of arr) {
    let prod = {};
    prod.id = product;
    if (products.find((p) => p.id === product)) {
      prod = products.find((p) => p.id === product);
      prod.count++;
    } else {
      prod.count = 1;
      products.push(prod);
    }
  }
  console.log("products", products);
  console.log("count", count);
  console.log("products", products.length);
  if (products.length == 0) {
    empty();
  } else {
    for (const product of products) {
      viewCart(product);
    }
  }
}

cart(arr);
function logout() {
  localStorage.removeItem("currentuser");
  window.location.href = "login.html";
}
logoutBtn.addEventListener("click", logout);
