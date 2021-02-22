let toggleBtn = document.getElementById('password-toggle')
let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let tableInfo = document.getElementById('the-table')

toggleBtn.addEventListener('click', () => {
    let thePass = document.getElementById('the-password')
    if (thePass.type === "password") {
        thePass.type = "text";
    } else {
        thePass.type = "password";
    }
})