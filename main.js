window.addEventListener('beforeunload',save)



let accountTableBody = document.querySelector('#accounts-table-body')
let aLLlinks = document.querySelectorAll('.nav-link')
let allViews = document.querySelectorAll('.view')
 let AccountView= document.querySelector('#accounts-view')
let AddAccountView = document.querySelector('#add-accounts-view')

let idInput = document.querySelector('[placeholder="id"]');
let nameInput = document.querySelector('[placeholder="name"]')
let lastnameInput = document.querySelector('[placeholder="lastName"]')

let emailInput = document.querySelector('[placeholder="email"]')

let phoneInput = document.querySelector('[placeholder="phone"]')

let saveBtn = document.querySelector('#save');
let eId = document.querySelector('.eId')
let eName = document.querySelector('.eName')
let eLastName = document.querySelector('.eLastName')
let eEmail = document.querySelector('.eEmail')
let ePhone = document.querySelector('.ePhone')
let editBtn = document.querySelector('#edit')
let id;

saveBtn.addEventListener('click', saveAccount)

function saveAccount() {
  const saveUser = {
    id: idInput.value,
    name:nameInput.value,
    lastname: lastnameInput.value,
    email:emailInput.value,
    phone:phoneInput.value

  }
  db.push(saveUser)

  idInput.value ="";
  nameInput.value ="";
  lastnameInput.value ="";
  emailInput.value ="";
  phoneInput.value ="";

  createAccountTable()
  showView("#accounts-view")

}


 for(let i =0 ;i< aLLlinks.length; i++){
   aLLlinks[i].addEventListener('click',showView)

 }
 function showView(e) {
  for(let i = 0 ; i< allViews.length ; i++ ){
    allViews[i].style.display= 'none'
  }
  if(e instanceof Event) {
    e.preventDefault()
    let id = `#${this.getAttribute("href")}`
    document.querySelector(id).style.display = "block";

  }else {
    document.querySelector(e).style.display = "block";
  }

}
// AddaccountBtnView.addEventListener('click',function (e) {
//   e.preventDefault()
//   AddAccountView.style.display = "block"
//   AccountView.style.display = "none"

// })

// accountBtnView.addEventListener('click', function (e) {
//   e.preventDefault()
//   AddAccountView.style.display = "none"
//   AccountView.style.display = "block"

// })

 function createAccountTable() {

   let htmlAccount = ` `;
for(let i = 0; i< db .length ; i++){
  let account= db [i]
  htmlAccount += `

   <tr>
                  <td>${account.id}</td>
                  <td>${account.name}</td>
                  <td>${account.lastname}</td>
                  <td>${account.email}</td>
                  <td>${account.phone}</td>
                  <td> <button data-id="${i}" class="edit-btn btn btn-sm btn-warning form control">Edit</button> </td>
                  <td> <button  data-id="${i}" class="delete-btn btn btn-sm btn-danger form control">Delete</button> </td>

                </tr>


  `
}

accountTableBody.innerHTML = htmlAccount
   let allDeleteBtns = document.querySelectorAll('.delete-btn')
   let allEditBtns = document.querySelectorAll('.edit-btn')


for(let i =0; i<allDeleteBtns.length; i++){
  allDeleteBtns[i].addEventListener('click', deleteAccount)
   allEditBtns[i].addEventListener('click', editAccount)
}

 }
  function deleteAccount(){
    let id = this.getAttribute('data-id')
db.splice(id,1);
createAccountTable()
showView("#accounts-view")
  }


  function editAccount() {
     id = this.getAttribute('data-id');
    let selectedAccount = db[id];
    console.log(selectedAccount)

    eId.value = selectedAccount.id;
    eName.value= selectedAccount.name;
    eLastName.value =selectedAccount.lastname;
    eEmail.value = selectedAccount.email;
    ePhone.value = selectedAccount.phone;

    showView("#edit-account-view")

  }

editBtn.addEventListener('click',SaveEditedAccount)



function SaveEditedAccount() {

  const editedAccount = {
    id: eId.value,
    name:eName.value,
    lastname:eLastName.value,
    email:eEmail.value,
    phone:ePhone.value
  }
  db[id] = editedAccount;
createAccountTable()
showView("#accounts-view")
}

createAccountTable()

function save() {
  localStorage.db=JSON.stringify(db)

}