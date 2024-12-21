let usersArray = JSON.parse(localStorage.getItem("usersArray")) || []; 
function verifyLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin";

    if (email === adminEmail && password === adminPassword) {
        message.style.color = "green";
        message.textContent = "Admin login successful!";
        window.location.replace("adminDashboard.html");
    } else {
        const user = usersArray.find(user => user.email.toLowerCase() === email && user.password === password); 
        if (user) {
            message.style.color = "green";
            message.textContent = "User login successful!";
            window.location.replace("redirect.html");
        } else {
            message.style.color = "red";
            message.textContent = "Invalid username or password.";
        }
    }
}

function logout() {
    var logout = confirm("Are you sure to logout?");
    if (logout) {
        location.href = "index.html";
    }
}
function signup(event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase(); 
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    const userDetails = { fname, lname, email, password };
    usersArray.push(userDetails);
    localStorage.setItem("usersArray", JSON.stringify(usersArray));

    message.style.color = "green";
    message.textContent = "SignUp Success!";
    window.location.replace("index.html");
}
