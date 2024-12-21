window.onload = function () {
    google.accounts.id.initialize({
        client_id:
            "", // Your Google OAuth Client ID
        callback: handleGoogleSignIn,
    });

    google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
    );
};

function handleGoogleSignIn(response) {
    const credential = response.credential;
    const user = parseJwt(credential);

    const userDetails = {
        name: user.name,
        email: user.email,
        imageUrl: user.picture, 
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    alert(`Welcome, ${user.name}!`);
    window.location.replace("http://127.0.0.1:5500/front-end/redirect.html");
}

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

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
        message.style.color = "red";
        message.textContent = "Invalid username or password.";
    }
}

function logout() {
    var logout = confirm("Are you sure to logout?");
    if (logout) {
        localStorage.removeItem("userDetails"); 
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

    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || []; // Load existing users or create a new array

    const userDetails = { fname, lname, email, password };
    usersArray.push(userDetails);
    localStorage.setItem("usersArray", JSON.stringify(usersArray)); // Save usersArray to localStorage

    message.style.color = "green";
    message.textContent = "SignUp Success!";
    window.location.replace("index.html");
}
