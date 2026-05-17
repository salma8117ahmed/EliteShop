function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email == "" || password == "") {
    alert("Please fill all fields");
    return;
  }
  var users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);
  console.log(users.length);

  var found = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      console.log(i, users[i]);

      found = true;
      break;
    }
  }
  if (found) {
    localStorage.setItem("currentuser", email);
    window.location.href = "products.html";
  } else {
    alert("Wrong email or password");
  }
}

// logout;
// function checkcurrentuser() {
//   var currentuser = localStorage.getItem("currentuser");
//   var logout = document.getElementById("logoutBtn");

//   if (logout) {
//     logout.style.display = currentuser ? "inline-block" : "none";
//   }
// }

// function logout() {
//   localStorage.removeItem("currentuser");
//   window.location.href = "login.html";
// }
// window.onload = function () {
//   checkcurrentuser();
// };
