const $ = document.querySelector.bind(document);

const USERNAME = "john";
const PASSWORD = "1234";

const usernameInput = $("#username");
const passwordInput = $("#password");
const loginBtn = $(".btn button");

loginBtn.onclick = function() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === USERNAME && password === PASSWORD) {
        window.location.assign("dashboard.html");
    } else {
        alert("Incorrect username or password!");
    }
};