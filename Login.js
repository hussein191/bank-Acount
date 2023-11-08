let Logon_user = document.querySelector('.Logon_user')
let min_login = document.querySelector('.min_login')
let login_cloes = document.querySelector('#login_cloes')
let EnterLogin = document.querySelector('.EnterLogin')
let MesgLogin = document.querySelector('.MesgLogin')
// info Login
let nameLogin = document.querySelector('.NameLogin')
let PasswordLogin = document.querySelector('.PasswordLogin')

//open Login page
Logon_user.addEventListener("click",function(){
    min_login.style.display = "flex"
})
//cloes login page
login_cloes.addEventListener("click",function(){
    min_login.style.display = "none"
})
//Login
EnterLogin.addEventListener("click",function(e){
    if(!nameLogin.value || !PasswordLogin.value){
        e.preventDefault()
    }else{
        let Date = JSON.parse(localStorage.getItem("UserAccounts"))
        for(let i =0; i<Date.length;i++){
            if(Date[i].name === nameLogin.value && Date[i].password === PasswordLogin.value){
                Date[i].condition = "Active"
                localStorage.setItem("UserAccounts",JSON.stringify(Date))
            }
        }
    }
})




