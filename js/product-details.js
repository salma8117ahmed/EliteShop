let currentUser = localStorage.getItem("currentuser");
let logoutBtn = document.querySelector(".logout-link");
let login = document.querySelector(".login-link");
if (currentUser) {
  logoutBtn.classList.remove("hide");
  logoutBtn.classList.add("show");
  login.classList.remove("show");
  login.classList.add("hide");
}
//1- take id product from URL
var id = new URLSearchParams(location.search);
var productId = id.get("id");
var cart = JSON.parse(localStorage.getItem("cart")) || [];
let counter = document.querySelector("#counter");
counter.innerHTML = cart.length;
// 2-  make request
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products/" + productId);
xhr.send();

// 3-response
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var product = JSON.parse(xhr.responseText);
    document.getElementById("productImg").src = product.images[0];
    document.getElementById("title").innerText = product.title;
    document.getElementById("category").innerText = product.category;
    document.getElementById("rating").innerText = product.rating;
    document.getElementById("price").innerText = "$" + product.price;
    document.getElementById("description").innerText = product.description;
    document.querySelector(".reviews").innerText = product.reviews.length;
  }
};

// back to products page
function goBackToProducts() {
  window.location.href = "products.html";
}
//quantity button +-
let decreaseBtn = document.querySelector(".decrease");
let increaseBtn = document.querySelector(".increase");
let quantitySpan = document.querySelector(".quan");

let quantity = 1;

// 3- button (+)
increaseBtn.addEventListener("click", () => {
  quantity++;
  quantitySpan.textContent = quantity;
});

// 4- button (-)
decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantitySpan.textContent = quantity;
  }
});
//
///////////////////////////////////////////////////////////
// add to cart button
var addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", function () {
  if (currentUser) {
    for (var i = 0; i < quantity; i++) {
      cart.push(Number(productId));
    }
    counter.innerHTML = cart.length;

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart");
  } else {
    alert("Please login first");
  }
});

function logout() {
  localStorage.removeItem("currentuser");
  localStorage.removeItem("cart");
}
logoutBtn.addEventListener("click", logout);
