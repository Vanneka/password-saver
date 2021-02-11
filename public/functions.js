let toggleBtn = document.getElementById('password-toggle')

toggleBtn.addEventListener('click', () => {
    let thePass = document.getElementById('the-password')
    if (thePass.type === "password") {
        thePass.type = "text";
    } else {
        thePass.type = "password";
    }
})