let counter = document.querySelector("#counter");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (counter === 0 || cart.length === 0) {
  counter.style.display = "none";
} else {
  counter.style.display = "inline-block";
}

counter.innerHTML = cart.length;
