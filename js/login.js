function Login(event) {

    event.preventDefault();
    var username = (document.getElementById("username") || { value: '' }).value.trim().toLowerCase();
    var password = (document.getElementById("password") || { value: '' }).value;

    // obtener usuarios guardados
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // ensure admin exists once
    var hasAdmin = users.some(u => u.username === 'admin');
    if (!hasAdmin) {
        users.push({ username: 'admin', password: '1234', permetion: 'teacher' });
        localStorage.setItem("users", JSON.stringify(users));
    }

    // recorrer usuarios
    for (let i = 0; i < users.length; i++) {
        var uName = (users[i].username || '').trim().toLowerCase();
        if (uName === username && users[i].password === password) {
            // Persistir el usuario actual para mostrar perfil en otras vistas
            try {
                localStorage.setItem('currentUser', JSON.stringify(users[i]));
            } catch (e) {}

            // redireccion
            if (users[i].permetion === "teacher") {
                window.location.href = "Teacher.html";
            } else {
                window.location.href = "Student.html";
            }
            return;
        }
    }

    alert("Credenciales incorrectas");
}