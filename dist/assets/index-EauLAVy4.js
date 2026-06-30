(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`userform`);document.getElementById(`userid`);var t=document.getElementById(`username`),n=document.getElementById(`email`),r=document.getElementById(`contact`),i=document.getElementById(`adduser`),a=document.getElementById(`updateuser`),o=document.getElementById(`usercontainer`),s=document.getElementById(`spinner`),c=`http://3.107.236.211:8080/users`;function l(e,t){Swal.fire({title:e,icon:t,timer:3e3})}function u(e,t,n=null){return s.classList.remove(`d-none`),new Promise((r,i)=>{let a=new XMLHttpRequest;a.open(e,t),a.setRequestHeader(`Content-Type`,`application/json`),a.send(n?JSON.stringify(n):null),a.onload=function(){if(a.status>=200&&a.status<=299){let e;if(a.responseText)try{e=JSON.parse(a.responseText)}catch{e=a.responseText}r(e)}else i(a)},a.onerror=function(){i(a),s.classList.add(`d-none`)}})}function d(){u(`GET`,c).then(e=>{f(e)}).catch(e=>{l(e)}).finally(()=>{s.classList.add(`d-none`)})}d();function f(e){let t=``;e.forEach((e,n)=>{t+=`
     <tr id="${e.id}">
                                    <td>${n+1}</td>
                                    <td> ${e.username}</td>
                                    <td> ${e.email}</td>
                                    <td> ${e.contact}</td>
                                    <td><i class="fa-regular fa-pen-to-square" onclick="onedit('${e.id}')"></i></td>
                                    <td><i class="fa-solid fa-trash" onclick="onremove('${e.id}')"></i></td>
                                </tr>
    
    `}),o.innerHTML=t}function p(e){e.preventDefault();let i={username:t.value,email:n.value,contact:r.value};u(`POST`,c,i).then(e=>{i.id=e.id,m(i),l(`New user added succefully`,`success`)}).catch(e=>{l(`SOmething went wrong ,the new user data is not added`,`error`)}).finally(()=>{s.classList.add(`d-none`)})}function m(t){let n=o.children.length+1,r=document.createElement(`tr`);r.id=t.id,r.innerHTML=`

                              <td>${n}</td>
                              <td>${t.username}</td>
                              <td>${t.email}</td>
                              <td>${t.contact}</td>
                              <td>
                              <i class="fa-regular fa-pen-to-square"
                              onclick="onedit('${t.id}')"></i>
                              </td>
                              <td>
                                  <i class="fa-solid fa-trash"
                               onclick="onremove('${t.id}')"></i>
                                 </td>
                                 
    
    `,o.append(r),e.reset()}function h(){let o=localStorage.getItem(`edit_id`),d={username:t.value,email:n.value,contact:r.value,id:o};u(`PUT`,`${c}/${o}`,d).then(t=>{let n=document.getElementById(d.id).children;n[1].innerHTML=d.username,n[2].innerHTML=d.email,n[3].innerHTML=d.contact,e.reset(),i.classList.remove(`d-none`),a.classList.add(`d-none`),l(`the user data is Updated successfully`,`success`)}).catch(e=>{l(`Something went wrong, the user data is not updated`,`error`)}).finally(()=>{s.classList.add(`d-none`)})}e.addEventListener(`submit`,p),a.addEventListener(`click`,h);