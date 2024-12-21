window.onload = function () {
    google.accounts.id.initialize({
        client_id:
            "275174990254-gdavmpqk71stf1ieb89l3jbsmfqnkmv1.apps.googleusercontent.com", // Your Google OAuth Client ID
        callback: handleGoogleSignIn,
    });

    // Render Google Sign-In Button
    google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
    );
};

// Handle Google Sign-In response
function handleGoogleSignIn(response) {
    const credential = response.credential;
    const user = parseJwt(credential);
    //alert(Welcome, ${ user.name }!);
    window.location.replace(
        "http://127.0.0.1:5500/redirect.html"
    );
}

// Parse JWT token to get user details
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

// Verify Login - for manual login
function verifyLogin(event) {
    event.preventDefault();
    const email = document
        .getElementById("email")
        .value.trim()
        .toLowerCase();
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