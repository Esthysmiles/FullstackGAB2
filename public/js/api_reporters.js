const { response, application } = require("express");

const API_URL='http://localhost:4000/api/';

function createReporter(e){
    e.peventDefault();
    const form= document.getElementById('signupform');
    const FormData=new FormData(form);
    const data=Object.fromEntries(FormData.entries());

    fetch(API_URL+'reporters/signup',
        {method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
    .then(res=>response.json())
    .then(res=>{
        window.alert('Records Created')
    })
    .catch(e=>{
        console.log(e)
    })
}

async function loginReporter(event, form){
    event.preventDefault();
    const formData = new FormData(form);
    const button = form.querySelector("button");
    const message = document.getElementById("message");

try{
    button.disabled = true;
    button.textContent = "Logging in...";

    const response = await fetch(API_URL ='reporters/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(Object.fromEntries(formData.entries()))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    message.innerHTML = `<p class="text-success">${result.message}</p>`;
    localStorage.setItem("reporter", JSON.stringify(result.reporter))
    window.location.href= "dashboard.html";

}catch(error){
    message.innerHTML =`<p class="text-danger">${error.message}</p>`
}finally{
    button.disabled =false;
    button.textContent = "Login";
    }

}

function updateReporter(id){
    fetch(API_URL+'reporters'/+id,
        {method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:{}
        })
    .then(res=>response.json())
    .then(res=>{
        window.alert('Records Created')
    })
    .catch(e=>{
        console.log(e)
    })
}

function getReporter(){
    fetch(API_URL+'reporters',)
    .then(res=>response.json())
    .then(res=>{
        console.log(response)
        const tblist=document.getElementById('tblist')
        tblist.innerHTML ='';
        let newlist  ='';
        response.forEach((item, idx)=>{
            newlist +=`<tr>
            <td>${idx+1}</td>
            <td>${item.name}</td>
            <td>${item.code}</td>
            <td>${item.phone}</td>
            <td>${item.community}</td>
            <td><button class="btn btn-danger" 
            onClick="deleteReporter(${item.id})">Delete</button></td>
            </tr>`
        })
    })
    .catch(e=>{
        console.log(e)
    })
}

function deleteReporter(id){
    fetch(API_URL+'reporters'/+id,
        {method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body:{}
        })
    .then(res=>response.json())
    .then(res=>{
        window.alert('Records Created')
    })
    .catch(e=>{
        console.log(e)
    })
}