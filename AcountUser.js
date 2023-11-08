let monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
let time = new Date


let profelUser = document.querySelector('.profelUser')
let Singiuser = document.querySelector('.Singi_user')
let Logonuser = document.querySelector('.Logon_user')
// info for Profil
let nameProfil = document.querySelector('.nameProfil')
let emailProfil = document.querySelector('.emailProfil')
let NumberProfil = document.querySelector('.numberCard')
let PhotoUser = document.querySelector('.PhotoUser')

let DateTime = document.querySelector('.DateTime')
let timeAcount = document.querySelector('.timeUser')
let MoneyUser = document.querySelector('.MoneyUser')
let box_left = document.querySelector('.box_left')


let AcountUSer = document.querySelector('.AcountUSer')
document.addEventListener("DOMContentLoaded",function(){
    let DateUser =JSON.parse(localStorage.getItem("UserAccounts"))
    for(let i =0;i<DateUser.length;i++){
        if(DateUser[i].condition === "Active"){

            profelUser.style.display = "block"
            Singiuser.style.display = "none"
            Logonuser.style.display = "none"
            AcountUSer.style.display = "flex"
            nameProfil.textContent = DateUser[i].name
            emailProfil.textContent = DateUser[i].Email
            NumberProfil.textContent = DateUser[i].numbercard
            PhotoUser.src = DateUser[i].Photo
            
            DateTime.textContent = ` As of  ${ time.getDate()}/${monthNames[time.getMonth()] }/${time.getFullYear()}, `;
            timeAcount.textContent = time.getHours()>12 ? time.getHours() + ":"+ time.getMinutes() + " PM " : time.getHours() + ":"+ time.getMinutes() + " AM "
            MoneyUser.textContent = `$ ${DateUser[i].balance}`

            for(let j=0; j<DateUser[i].Transfers.length;j++){
                let elment =
                `<div class="titel_Condition">
                        <div class="titelUser">
                            <div class="Condition"><span>${DateUser[i].Transfers.length - j}</span>${DateUser[i].Transfers[j]>0? " Deposit " : " Withdreal "}</div>
                            <p class="time">25/10/2023</p>
                    </div>
                    <h2 class="blanc">$ ${DateUser[i].Transfers[j]}</h2>
                `
                let div = document.createElement("div")
                div.setAttribute("class","bodyElment")
                div.innerHTML = elment;
                box_left.appendChild(div)

                let getCondition = document.querySelectorAll('.Condition')
                DateUser[i].Transfers[j]>0 ? getCondition[j].style.backgroundColor="rgba(0, 128, 0,0.7)" : getCondition[j].style.backgroundColor="rgba(223, 67, 67,0.7)"
            }
        }
    }
})

// for Transfer moeny
let InputTransfer = document.querySelector('.InputTransfer')
let nameSender = document.querySelector('.nameSender')
let Amount_transfer = document.querySelector('.Amount_transfer')
let Number_transfer = document.querySelector('.name_transfer') 
let minSend = document.querySelector('.minSend')
let EnterSent = document.querySelector('.EnterSent')
let CustomerCard = document.querySelector('.CustomerCard')
let AmountTransferred = document.querySelector('.AmountTransferred')
let minIncorrect = document.querySelector('.minIncorrect')

InputTransfer.addEventListener("click",function(e){
    if(!Amount_transfer.value || !Number_transfer.value){
        e.preventDefault()
    }else{
        let Date = JSON.parse(localStorage.getItem("UserAccounts"))
        for(let i =0; i<Date.length;i++){
            if(Date[i].numbercard === Number_transfer.value){
                minSend.style.display = "flex"
                nameSender.textContent = Date[i].name
                CustomerCard.textContent = Date[i].numbercard
                AmountTransferred.textContent = Amount_transfer.value
                minIncorrect.style.display = "none"
            }
            else{
                minIncorrect.style.display = "flex"
            }
        }
        
    }
})
// To send the amount to the other person to whom it is intended
EnterSent.addEventListener("click",function(){
    let Date = JSON.parse(localStorage.getItem("UserAccounts"))
    for(let i=0; i<Date.length;i++){
        if( Date[i].numbercard === CustomerCard.textContent){
            Date[i].Transfers.unshift(+AmountTransferred.textContent)
            Date[i].balance += Number(AmountTransferred.textContent)
        }
        if(Date[i].condition === "Active"){
            Date[i].Transfers.unshift(-+AmountTransferred.textContent)
            Date[i].balance -= Number(AmountTransferred.textContent)
        }
        localStorage.setItem("UserAccounts",JSON.stringify(Date))
    }
})

// To close the error message when the card number was entered incorrectly when sending
let incorrectBtu = document.querySelector('.incorrectBtu')
incorrectBtu.addEventListener("click",function(){
    minIncorrect.style.display = "none"
})


// for Request loan
let iconInput = document.querySelector('.iconInput')
let Amount_Request = document.querySelector('.Amount_Request')
let minRequest = document.querySelector('.minRequest')
let RequestLoan = document.querySelector('.RequestLoan')
let EnterRequest = document.querySelector('.EnterRequest')

iconInput.addEventListener("click",function(){
    if(Amount_Request.value){
        minRequest.style.display = "flex"
        RequestLoan.textContent = Amount_Request.value
    }
})
EnterRequest.addEventListener("click",function(){
    let Date = JSON.parse(localStorage.getItem("UserAccounts"))
    for(let i=0; i<Date.length;i++){
        if(Date[i].numbercard === NumberProfil.textContent){
            Date[i].balance = Number(RequestLoan.textContent) + Date[i].balance
        }
    }
    localStorage.setItem("UserAccounts",JSON.stringify(Date))
})

// for Close Acount
let Cloesacount = document.querySelector('.Cloesacount')
let minDelet = document.querySelector('.minDelet')
let User_cloes = document.querySelector('.User_cloes')
let Password_cloes = document.querySelector('.Password_cloes')
let EnterDelete = document.querySelector('.EnterDelete')

Cloesacount.addEventListener("click",function(){
    if(User_cloes.value && Password_cloes.value){
        let Date = JSON.parse(localStorage.getItem("UserAccounts"))
        for(let i=0; i<Date.length;i++){
            if( Date[i].numbercard === User_cloes.value && Date[i].password  === Password_cloes.value){
                    minDelet.style.display = "flex"
                    EnterDelete.addEventListener("click",function(){
                        let NewDate = Date.filter(e => e.numbercard !== User_cloes.value && e.password !== Password_cloes.value)
                        localStorage.setItem("UserAccounts",JSON.stringify(NewDate))
                        profelUser.style.display = "none"
                        Singiuser.style.display = "block"
                        Logonuser.style.display = "block"
                        AcountUSer.style.display = "none"
                    })
            }
        }
    }
})


// for Cheng Photo User
let imgeUser = document.querySelector('#imgeUser')
let AddImge = document.querySelector('.AddImge')
let minPhoto = document.querySelector('.minPhoto')
let EnterPhoto = document.querySelector('.EnterPhoto')

imgeUser.addEventListener("change",function(){
    minPhoto.style.display = "flex"
    const [file] = imgeUser.files
    AddImge.src = URL.createObjectURL(file)
})
EnterPhoto.addEventListener("click",function(){
    let Date = JSON.parse(localStorage.getItem("UserAccounts"))
    for(let i=0; i<Date.length;i++){
        if(Date[i].numbercard === NumberProfil.textContent){
            Date[i].Photo = AddImge.src
        }
    }
    localStorage.setItem("UserAccounts",JSON.stringify(Date))
})

// for Cheng Password User
let ChengPassword = document.querySelector('.ChengPassword')
let minPassword = document.querySelector('.minPassword')
let EnterPassword = document.querySelector('.EnterPassword')
let alertUser = document.querySelector('.alertUser')
let OldPassword = document.querySelector('.OldPassword')
let NewPassword = document.querySelector('.NewPassword')

ChengPassword.addEventListener("click",function(){
    minPassword.style.display = "flex"
})
EnterPassword.addEventListener("click",function(e){
    let Date = JSON.parse(localStorage.getItem("UserAccounts"))
    for(let i=0; i<Date.length;i++){
        if(!OldPassword.value || !NewPassword.value){
            e.preventDefault()
        }else{
            if(OldPassword.value === Date[i].password){
                if(Date[i].numbercard !== NumberProfil.textContent){
                    e.preventDefault()
                    alertUser.style.display = "flex"
                    alertUser.textContent = "Old password does not match"
                }else{
                    if(NewPassword.value.length < 9){
                        e.preventDefault()
                        alertUser.style.display = "flex"
                        alertUser.textContent = "The password size must be greater than 9"
                    }else{
                        Date[i].password = NewPassword.value
                    }
                }
            }
        }
    }
    localStorage.setItem("UserAccounts",JSON.stringify(Date))
})

// for cloes Acount user
let Logout = document.querySelector('.Logout')
let numberCard = document.querySelector('.NumberCard')
Logout.addEventListener("click",function(){
    let Date = JSON.parse(localStorage.getItem("UserAccounts"))
    for(let i=0; i<Date.length;i++){
        if(Date[i].condition === "Active" ){
            Date[i].condition = "No Active"
            localStorage.setItem("UserAccounts",JSON.stringify(Date))
        }
    }
})