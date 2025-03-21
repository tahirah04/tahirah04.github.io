// Default credentials 
const defaultUsername = "tahirah562";
const defaultEmail = "tahirah562@gmail.com";
const defaultPassword = "dcare123";

let loginAttempts = 0;
const maxAttempts = 3;

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("LoginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();

    const usernameOrEmailInput = document.getElementById("name-mail").value.trim();
    const passwordInput = document.getElementById("log-password").value.trim();
    const logOutput = document.getElementById("log-output");

    loginAttempts++;

    // Login Validation
    if ((usernameOrEmailInput === defaultUsername || usernameOrEmailInput === defaultEmail) && passwordInput === defaultPassword) {
        alert("Login Successful");
        window.location.href = "Products.html";
    } else {
        alert("Login Failed");
        updateAttemptCounter();
        
        if (loginAttempts >= maxAttempts) {
            alert("Too many failed attempts.");
            window.location.href = "Error.html";
        }
    }
}

function updateAttemptCounter() {
    let attemptDisplay = document.getElementById("attempt-counter");

    if (!attemptDisplay) {
        attemptDisplay = document.createElement("p");
        attemptDisplay.id = "attempt-counter";
        attemptDisplay.style.color = "white";
        document.getElementById("LoginForm").appendChild(attemptDisplay);
    }

    attemptDisplay.innerText = `Login Attempts: ${loginAttempts}/${maxAttempts}`;
}
