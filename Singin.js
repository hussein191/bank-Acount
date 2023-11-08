let Singi_user = document.querySelector('.Singi_user')
let min_singin = document.querySelector('.min_singin')
let Cloes_Singin = document.querySelector('#Cloes_Singin')
let EnterInfo = document.querySelector('.EnterInfo')
let min_MessageS = document.querySelector('.min_MessageS')
let btu_singin = document.querySelector('.btu_singin')
let Mesg = document.querySelector('.Mesg')
//Input fields
let Name = document.querySelector('.Name')
let NumberCard = document.querySelector('.NumberCard')
let email = document.querySelector('.email')
let Password = document.querySelector('.Password')

//Open the Singin page
Singi_user.addEventListener("click",function(){
    min_singin.style.display = "flex"
})
//Cloes the Singin page
Cloes_Singin.addEventListener("click",function(){
    min_singin.style.display = "none"
})

// body class for Account user 
class Account {
    constructor(condition,name,numbercard,Email,Photo,password,Transfers,balance){
        this.condition = condition,
        this.name = name,
        this.numbercard = numbercard,
        this.Email = Email,
        this.Photo = Photo ,
        this.password = password,
        this.Transfers = Transfers,
        this.balance = balance
    }
}

//sign in
EnterInfo.addEventListener("click",function(e){
    if(!Name.value || !NumberCard.value || !email.value || !Password.value){
        e.preventDefault()
        min_MessageS.style.display = "flex"
    }else{
        if(NumberCard.value.length !== 11){
            e.preventDefault()
            Mesg.style.display = "flex"
            Mesg.textContent = "The card number you entered is incorrect"
        }
        else if(/[0-9]/g.test(Name.value)){
            e.preventDefault()
            Mesg.style.display = "flex"
            Mesg.textContent = "Your name must not contain numbers"
        }else if (Password.value.length < 9){
            e.preventDefault()
            Mesg.style.display = "flex"
            Mesg.textContent = "The password must consist of 9 letters and numbers"
        }else{
            let UserAccount = new Account(
                "No Active",
                Name.value,
                NumberCard.value,
                email.value,
                "blank-profile-picture-973460_1280.webp",
                Password.value,
                [],
                5600
                )
            SavedAccount(UserAccount)
        }
    }
})

// for Saved Account user in localStorage
function SavedAccount(UserAccount){
    let UserAccounts ;
    if(localStorage.getItem("UserAccounts") === null){
        UserAccounts = []
    }else{
        UserAccounts = JSON.parse(localStorage.getItem("UserAccounts"))
    }
    UserAccounts.push(UserAccount)
    localStorage.setItem("UserAccounts",JSON.stringify(UserAccounts))
}
// Cloes Message for User 
btu_singin.addEventListener("click",function(){
    min_MessageS.style.display = "none"
})