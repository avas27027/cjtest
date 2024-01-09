const loginBut = document.querySelector('#but-login');
const registerBut = document.querySelector('#but-register');
const email = document.querySelector('#in-email');
const password = document.querySelector('#in-password');


loginBut.addEventListener("click", (e)=>{
    var data = {
        "email": email.value,
        "password": password.value
    }
    Http.post('/api/user/login', data).then((e)=> window.location.replace("/prod"));
});

registerBut.addEventListener("click", (e)=>{
    var data = {
        "email": email.value,
        "password": password.value
    }
    Http.post('/api/user/register', data);
});