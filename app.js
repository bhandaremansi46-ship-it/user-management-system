const userform = document.getElementById('userform')
const useridcontrol = document.getElementById("userid");
const usernamecontrol = document.getElementById('username')
const emailcontrol = document.getElementById('email')
const contactcontrol = document.getElementById('contact')
const adduser = document.getElementById('adduser')
const updateuser = document.getElementById('updateuser')
const usercontainer = document.getElementById('usercontainer')
const spinner = document.getElementById('spinner')
const cl = console.log
window.onedit = onedit;
window.onremove = onremove;
window.onupdate = onupdate;


const api_call ="https://mansiusers.duckdns.org/users";

function snackbar(msg,icon){
    Swal.fire({
        title:msg,
        icon:icon,
        timer:3000
    })
}

function makeapicall(methodname,api_call,body= null){
    spinner.classList.remove('d-none')
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.open(methodname,api_call)
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(body ? JSON.stringify(body) : null)
       xhr.onload = function () {

    if (xhr.status >= 200 && xhr.status <= 299) {

        let res;

        if (xhr.responseText) {

            try{
                res = JSON.parse(xhr.responseText);
            }
            catch{
                res = xhr.responseText;
            }

        }

        resolve(res);

    } else {

        reject(xhr);
         spinner.classList.add('d-none')

    }

}
        xhr.onerror= function(){
            reject(xhr)
            spinner.classList.add('d-none')
        }
    })
}

function loadUser(){
    makeapicall('GET',api_call)
    .then(res=>{
        create(res)
    })
    .catch(err=>{
        snackbar(err)
    })
    .finally(()=>{
        spinner.classList.add('d-none')
    })
}
loadUser()
function create(arr){
    let result=''
    arr.forEach((u,i)=>{
    result += `
     <tr id="${u.id}">
                                    <td>${i+1}</td>
                                    <td> ${u.username}</td>
                                    <td> ${u.email}</td>
                                    <td> ${u.contact}</td>
                                    <td><i class="fa-regular fa-pen-to-square" onclick="onedit('${u.id}')"></i></td>
                                    <td><i class="fa-solid fa-trash" onclick="onremove('${u.id}')"></i></td>
                                </tr>
    
    `
    })
    usercontainer.innerHTML=result
}


function onsubmit(eve){
    eve.preventDefault()
    let new_obj={
        username:usernamecontrol.value,
        email:emailcontrol.value,
        contact:contactcontrol.value,
    }
    makeapicall('POST',api_call,new_obj)
  
    .then(res=>{
        new_obj.id=res.id
      loadUser()
      userform.reset()
      
        snackbar('New user added succefully','success')
   
    })
    .catch(err=>{
        snackbar('SOmething went wrong ,the new user data is not added','error')
    })
    .finally(()=>{
        spinner.classList.add('d-none')
    })
}



function updateSrNo() {
    let rows = usercontainer.querySelectorAll("tr");

    rows.forEach((row, index) => {
        row.children[0].innerHTML = index + 1;
    });
}


function onremove(id){
    let remove_id = id
    let remove_url=`${api_call}/${remove_id}`
    makeapicall('DELETE',remove_url)
    .then(res=>{
        let card=document.getElementById(remove_id)
        if(card){
            card.remove()
        }
        updateSrNo()
        snackbar('The user data is removed successfully','success')
    })
    .catch(err=>{
        snackbar('Something went wrong ,the user data is not removed ','error')
    })
    .finally(()=>{
        spinner.classList.add('d-none')
    })
}

function onedit(id){
    let edit_id = id
    localStorage.setItem('edit_id',edit_id)
    let edit_url= `${api_call}/${edit_id}`
    makeapicall('GET',edit_url)
    .then(res=>{
        usernamecontrol.value=  res.username
        emailcontrol.value = res.email
        contactcontrol.value = res.contact
      
        adduser.classList.add('d-none')
        updateuser.classList.remove('d-none')
    })
    .catch(err=>{
        snackbar('Unable to fetch users','error')
    })
    .finally(()=>{
        spinner.classList.add('d-none')
    })
}

function onupdate(){
    let update_id = localStorage.getItem('edit_id')
    let update_obj={
         username:usernamecontrol.value,
        email:emailcontrol.value,
        contact:contactcontrol.value,
        id:update_id
    }
    let update_url = `${api_call}/${update_id}`
    makeapicall('PUT',update_url,update_obj)
    .then(res=>{
       let tr = document.getElementById(update_obj.id).children
       tr[1].innerHTML = update_obj.username;
       tr[2].innerHTML = update_obj.email;
       tr[3].innerHTML = update_obj.contact;
       userform.reset()
       
       adduser.classList.remove('d-none')
       updateuser.classList.add('d-none')
        snackbar('the user data is Updated successfully','success')
    })
    .catch(err=>{
        snackbar('Something went wrong, the user data is not updated','error')
    })
    .finally(()=>{
        spinner.classList.add('d-none')
    })
}
userform.addEventListener("submit",onsubmit)
updateuser.addEventListener("click",onupdate)