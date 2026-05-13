let id = 0;
let userForm;

function getUserKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (/^\d+$/.test(key)) {
            keys.push(key);
        }
    }
    return keys.sort((a, b) => Number(a) - Number(b));
}

function getNextId() {
    const keys = getUserKeys();
    if (keys.length === 0) {
        return 1;
    }
    return Number(keys[keys.length - 1]) + 1;
}

function delete_user(obj) {
    const row = obj.parentElement.parentElement;
    const key = row.firstElementChild.innerHTML;
    localStorage.removeItem(key);
    row.remove();
    id = getNextId();
    if (userForm) {
        userForm.id.value = id;
    }
}

function edit_user(obj) {
    const row = obj.parentElement.parentElement.children;
    userForm.id.value = row[0].innerHTML;
    userForm.username.value = row[1].innerHTML;
    userForm.email.value = row[2].innerHTML;
    userForm.password.value = row[3].innerHTML;
}

function update_user() {
    const key = userForm.id.value;
    const user = {
        id: key,
        username: userForm.username.value,
        email: userForm.email.value,
        password: userForm.password.value
    };
    localStorage.setItem(key, JSON.stringify(user));
    read_data();
}

function delete_all() {
    const keys = getUserKeys();
    keys.forEach((key) => localStorage.removeItem(key));
    read_data();
    id = getNextId();
    if (userForm) {
        userForm.id.value = id;
    }
}

function create_user(event) {
    if (event) {
        event.preventDefault();
    }
    const user = {
        id: id,
        username: userForm.username.value,
        email: userForm.email.value,
        password: userForm.password.value
    };

    localStorage.setItem(String(id), JSON.stringify(user));
    id = getNextId();
    userForm.id.value = id;

    userForm.username.value = "";
    userForm.email.value = "";
    userForm.password.value = "";
    read_data();
}

function read_data() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";

    const keys = getUserKeys();
    for (let i = 0; i < keys.length; i++) {
        const row = tbody.insertRow(-1);
        const cell0 = row.insertCell(0);
        const cell1 = row.insertCell(1);
        const cell2 = row.insertCell(2);
        const cell3 = row.insertCell(3);
        const cell4 = row.insertCell(4);
        const cell5 = row.insertCell(5);
        const user_data = JSON.parse(localStorage.getItem(keys[i]));

        cell0.innerHTML = user_data.id;
        cell1.innerHTML = user_data.username;
        cell2.innerHTML = user_data.email;
        cell3.innerHTML = user_data.password;
        cell4.innerHTML = `<span onclick="edit_user(this)"><i class="fas fa-edit"></i></span>`;
        cell5.innerHTML = `<span onclick="delete_user(this)"><i class="fas fa-trash"></i></span>`;
    }
}

function init_crud() {
    userForm = document.forms.userForm;
    if (!userForm) {
        return;
    }
    id = getNextId();
    userForm.id.value = id;
    read_data();
}

window.addEventListener("load", init_crud);