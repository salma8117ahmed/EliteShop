let currentUser = localStorage.getItem("currentuser");
let logoutBtn = document.querySelector(".logout-link");
let login = document.querySelector(".login-link");
if (currentUser) {
  logoutBtn.classList.remove("hide");
  logoutBtn.classList.add("show");
  login.classList.remove("show");
  login.classList.add("hide");
}
var cart = [];
cart = JSON.parse(localStorage.getItem("cart")) || [];
var productsContainer = document.getElementById("products-container");
let counter = document.querySelector("#counter");
counter.innerHTML = cart.length;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products");
xhr.onload = function () {
  if (xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    var apiProducts = response.products;

    apiProducts.forEach(function (item) {
      if (!item.thumbnail) return;
      var itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML =
        "<a href='productDetails.html?id=" +
        item.id +
        "'><img class='thumbnail' src='" +
        item.images[0] +
        "'></a>" +
        "<h3 class='title'>" +
        item.title +
        "</h3>" +
        "<p class='description'>" +
        item.description +
        "</p>" +
        "<span class='rating'>" +
        "<i class='fa-solid fa-star'></i>" +
        item.rating +
        "<p class='reviews'>(" +
        item.reviews.length +
        " reviews)</p>" +
        "</span>" +
        "<p class='price'>$" +
        item.price +
        "</p>" +
        "<button id='btn'><i class='fa-solid fa-cart-plus'></i> Add to cart</button>";
      var button = itemDiv.querySelector("button");
      button.onclick = function () {
        if (currentUser) {
          console.log(cart);
          console.log(cart.length);
          cart.push(item.id);
          localStorage.setItem("cart", JSON.stringify(cart));
          counter.innerHTML = cart.length;
        } else {
          alert("Please login first");
        }
      };
      productsContainer.appendChild(itemDiv);

      console.log(item.id);
    });
  } else {
    console.log("error");
  }
};
xhr.send();

function logout() {
  localStorage.removeItem("currentuser");
}
logoutBtn.addEventListener("click", logout);
