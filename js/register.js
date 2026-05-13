function Register(event) {

    event.preventDefault();

    var fullName = (document.getElementById("full-name") || { value: '' }).value.trim();
    var username = (document.getElementById("username") || { value: '' }).value.trim().toLowerCase();
    var password = (document.getElementById("password") || { value: '' }).value;
    var role = (document.querySelector("select[name='Validity']") || { value: 'student' }).value || 'student';

    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Save normalized username to make login matching more reliable
    users.push({
        fullName: fullName,
        username: username,
        password: password,
        permetion: role
    });

    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "Login.html";
}