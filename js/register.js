function register() {
  var fullName = document.getElementById("fullName").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  var nameReg = /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/;
  var emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/;
  var passReg = /^.{6,}$/;

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (!nameReg.test(fullName)) {
    alert("Enter valid full name");
    return;
  }

  if (!emailReg.test(email)) {
    alert("Invalid email format");
    return;
  }

  if (!passReg.test(password)) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    alert("Email already exists");
    return;
  }

  users.push({ fullName, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully ");
  window.location.href = "login.html";
}
