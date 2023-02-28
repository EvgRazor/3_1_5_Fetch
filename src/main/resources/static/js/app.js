async function getAllUser () {
    const getFetchAllUser =  await fetch('http://localhost:8080/api/admin')
    const getAllUser  = await getFetchAllUser.json(); //  Декодирование

    const jsonRole =  await fetch('http://localhost:8080/api/admin/role')
    window.jsRole  = await jsonRole.json(); //  Декодирование

    for (let x = 0; x < getAllUser.length; x++) {
        pointUsersHtml(getAllUser[x]);
        let exitIdModelEdit = document.getElementById(`moduleEdd${getAllUser[x].id}`);
        for (let y = 0; y < jsRole.length; y++) {
            exitIdModelEdit.innerHTML += "<option value="+`${jsRole[y].name}`+" id="+`${jsRole[y].id}`+">"+`${jsRole[y].name}`+"</option>";
        }
    }

    let addUserRole = document.getElementById(`roleSetAdd`);
    for (let y = 0; y < jsRole.length; y++) {
        addUserRole.innerHTML += "<option value="+`${jsRole[y].name}`+" id="+`${jsRole[y].id}`+">"+`${jsRole[y].name}`+"</option>";
    }
}

window.addEventListener('DOMContentLoaded', getAllUser); // Когда страница загружена, используем нашу функцию

// Функция для отрисовки всех наших юзеров (таблица + кнопки)
function pointUsersHtml ({age, email, id, lastName, name, pass, roleSet}) {
    const nameUserArr = roleSet.map(roleSet=> { return roleSet.name;})

    window.roleUser = "";
    window.roleUserDelete = "";
    window.superID = id;

    for (let x = 0; x < nameUserArr.length; x++) {
        if (nameUserArr[x] === "ROLE_ADMIN") {
            roleUser += " ADMIN";
        }else if (nameUserArr[x] === "ROLE_USER") {
            roleUser += " USER";
        }else if (nameUserArr[x] === "ROLE_SUPER_MEN") {
             roleUser += " SUPER_MEN";
        }
    }


    for (let x = 0; x < nameUserArr.length; x++) {
        if (nameUserArr[x] === "ROLE_ADMIN") {
            roleUserDelete += "<option>"+"ADMIN"+"</option>";
        }else if (nameUserArr[x] === "ROLE_USER") {
            roleUserDelete +="<option>"+"USER"+"</option>";
        }else if (nameUserArr[x] === "ROLE_SUPER_MEN") {
            roleUserDelete +="<option>"+"SUPER_MEN"+"</option>";
        }
    }

    const todolist = document.getElementById('listUsers');
    todolist.insertAdjacentHTML('beforeend', `<tr id="user${id}" xmlns="http://www.w3.org/1999/html">
                    <th scope="row" ><span style="font-weight: normal;" >${id}</span></th>
                    <td class="text-lowercase" id="name${id}"> ${name}</td>
                    <td class="text-lowercase" id="lastName${id}">${lastName}</td>
                    <td id="age${id}">${age}</td>
                    <td id="email${id}">${email}</td>
                    <td class="text-uppercase" id="roleUser${id}">${roleUser}</td>
                    <td>
                    
                    <form >
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${id}">
                          Edit
                        </button>
                    </form>
                    
                      <!-- Модальное окно  EDIT-->
                      <div class="modal fade"    id="editModal${id}"  tabindex="-1" role="dialog"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalCenterTitle">Edit user</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                            </div>
                            <div class="modal-body mx-auto" style="width: 100%">
                              <form class="row g-3" name="myForm" form="moduleEdd${id}"  style="margin-left: -15px; margin-right: -15px;"> 
                                <div class="  col-md-6 col-md-offset-3 mx-auto"  >
                                  <label for="validationServer000${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; ">ID</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer000${id}" type="text"  value="${id}"  readonly >

                                  <label for="validationServer001${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px;" >First name</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer001${id}" type="text"  value="${name}" name="name">

                                  <label for="validationServer002${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px ">Last name</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer002${id}" type="text"    value="${lastName}" name="lastName">

                                  <label for="validationServer003${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Age</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer003${id}" type="text" value="${age}" name="age">

                                  <label for="validationServer004${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Email</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer004${id}" type="text" value="${email}" name="email">

                                  <label for="validationServer005${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Password</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer005${id}" type="password"  value="${pass}" name="pass">

                                  <label for="validationServer006${id}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Role</label>
                                  <select value="roleSet${id}" name="role" id="moduleEdd${id}"  class="form-control bg-body-secondary form-control-sm  text-muted field left" multiple id="validationServer006${id}" style="height: 60px"  value="11" readonly/>
                              
                                  </select>   
                                </div>
                                <div class="modal-footer  ">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" onclick="updateJS(${id})" id="editB" class="btn btn-primary" data-bs-dismiss="modal" value="Edit">Edit</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      </td>
                      <!-- Модальное окно EDIT-->
                     <td>
                      <form>
                        <button type="button" class="btn btn-danger text-whit" data-bs-toggle="modal" data-bs-target="#editModall${id}">
                          Delete
                                                          
                        </button>
                      </form>
                      <!-- Модальное окно  Delete-->
                      <div class="modal fade"   id="editModall${id}" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel1">Delete user</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                            </div>
                            <div class="modal-body mx-auto" style="width: 100%">
                              <form class="row g-3" >
                                <div class="  col-md-6 col-md-offset-3 mx-auto"  >
                                  <label for="validationServer1" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; ">ID</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer1" type="text"  value="${id}" value="id" , readonly >

                                  <label for="validationServer2" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; ">First name</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer2" type="text" value="${name}" value="name" readonly   >

                                  <label for="validationServer3" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px ">Last name</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer3" type="text"    value="${lastName}"  value="lastname" readonly >

                                  <label for="validationServer4" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Age</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer4" type="text"   value="${age}" value="age" readonly >

                                  <label for="validationServer5" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Email</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer5" type="text"  value="${email}" value="email" readonly >

                                  <label for="validationServer6" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Password</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer6" type="password"   value="${pass}" value="pass" readonly >

                                  <label for="validationServer7" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Role</label>
                                  <select class="form-control bg-body-secondary form-control-sm  text-muted field left" multiple id="validationServer7${id}" style="height: 60px"  value="11" readonly>
                                           ${roleUserDelete}
                                  </select>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button onclick="deleteJS(${id})"   type="button"    class="btn btn-danger text-whit " data-bs-dismiss="modal">Delete</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Модальное окно Delete-->
                    </td>
                  </tr> 
                     `
    );
}

// Функция для удаления юзера
async function deleteJS (id) {
    const  res = await fetch(`http://localhost:8080/api/admin/${id}`, {method:'DELETE', headers:{'Content-Type': 'application/json'}});
    const date = await res.json(); // Возвращаемтся ответ
    if (date) {
        document.getElementById(`user${id}`).remove();
    }
}

// Функция для обновления юзера
async function updateJS (id) {
    let form = document.getElementById(`user${id}`);
    const idUser = document.getElementById(`validationServer000${id}`);
    const idStart = idUser.value;
    const nameUser = document.getElementById(`validationServer001${id}`);
    const name = nameUser.value;
    const lastNameNew = document.getElementById(`validationServer002${id}`);
    const lastName = lastNameNew.value;
    const ageUser = document.getElementById(`validationServer003${id}`);
    const age = ageUser.value;
    const emailUser = document.getElementById(`validationServer004${id}`);
    const email = emailUser.value;
    const passUser = document.getElementById(`validationServer005${id}`);
    const pass = passUser.value;
    let roleSets = document.getElementById(`moduleEdd${id}`);
    var roleS =  Array.from(roleSets.options).filter(option => option.selected).map(option => option.id);

    var rolesUserArr = new Map();
    var exitRoleUser = "";
    var optRolesDelete = "";

    if (roleS) {
        for (let x = 0; x < roleS.length; x++) {
            for (let y = 0; y < jsRole.length; y++) {
                if (roleS[x] == jsRole[y].id) {
                    rolesUserArr.set(jsRole[y].id, jsRole[y].name);
                }
            }
        }
        var roleSetString = "[";
        for (let pair of rolesUserArr) roleSetString +=`{"id":${pair[0]}, "name":"${pair[1]}"},`;
        roleSetString =  roleSetString.slice(0, -1);
        roleSetString += "]";
        var roleSet = JSON.parse(roleSetString);

        for (let x = 0; x < roleS.length; x++) {
            for (let p = 0; p < jsRole.length; p++) {
                if (jsRole[p].id == roleS[x]) {
                    optRolesDelete += "<option>"+jsRole[p].name+"</option>";
                    exitRoleUser += jsRole[p].name.substring(5) + " ";
                }
            }
        }
    } else {
        roleSet = null;
    }

    const res = await fetch('http://localhost:8080/api/admin', {
        method:'PATCH', headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id, name, lastName, age, email, pass, roleSet})
    })

    if (res) {
        var nameInner = document.getElementById(`name${id}`);
        nameInner.innerHTML = name;
        var lastNameInner = document.getElementById(`lastName${id}`);
        lastNameInner.innerHTML = lastName;
        var ageInner = document.getElementById(`age${id}`);
        ageInner.innerHTML = age;
        var emailInner = document.getElementById(`email${id}`);
        emailInner.innerHTML = email;
        var roleUserInner = document.getElementById(`roleUser${id}`);
        roleUserInner.innerHTML = exitRoleUser;
        var roleUserInnerDelete = document.getElementById(`validationServer7${id}`);
        roleUserInnerDelete.innerHTML = optRolesDelete;
    }
}

// Функция для добавления юзера
async function addUser (){

    let idAddUser = superID;
    idAddUser++;

    const forms = document.getElementById('userIdd');
    let roleSets = document.getElementById(`roleSetAdd`);
    var roleS =  Array.from(roleSets.options).filter(option => option.selected).map(option => option.id);

    var rolesUserArr = new Map();
    var exitRoleUser = "";
    var optRolesDelete = "";

    if (roleS) {
        for (let x = 0; x < roleS.length; x++) {
            for (let y = 0; y < jsRole.length; y++) {
                if (roleS[x] == jsRole[y].id) {
                    rolesUserArr.set(jsRole[y].id, jsRole[y].name);
                }
            }
        }
        var roleSetString = "[";
        for (let pair of rolesUserArr) roleSetString +=`{"id":${pair[0]}, "name":"${pair[1]}"},`;
        roleSetString =  roleSetString.slice(0, -1);
        roleSetString += "]";
        var roleSet = JSON.parse(roleSetString);

        for (let x = 0; x < roleS.length; x++) {
            for (let p = 0; p < jsRole.length; p++) {
                if (jsRole[p].id == roleS[x]) {
                    optRolesDelete += "<option>"+jsRole[p].name+"</option>";
                    exitRoleUser += jsRole[p].name.substring(5) + " ";
                }
            }
        }
    } else {
        roleSet = null;
    }

    const names = forms.querySelector('[name="name"]'),
        lastNames = forms.querySelector('[name="lastName"]'),
        ages = forms.querySelector('[name="age"]'),
        emails = forms.querySelector('[name="email"]'),
        passs = forms.querySelector('[name="pass"]');


    var roleUserInnerDelete = document.getElementById(`roleSetAdd`);
    const  name= names.value;
    const  lastName= lastNames.value;
    const  age= ages.value;
    const  email= emails.value;
    const  pass= passs.value;

    const res = await fetch('http://localhost:8080/api/admin', {
        method:'POST', headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, lastName, age, email, pass, roleSet})
    })

     document.getElementById(`listUsers`).innerHTML += `
                    <tr id="user${idAddUser}" xmlns="http://www.w3.org/1999/html">
                        <th scope="row" ><span style="font-weight: normal;" >${idAddUser}</span></th>
                        <td class="text-lowercase" id="name${idAddUser}"> ${name}</td>
                        <td class="text-lowercase" id="lastName${idAddUser}">${lastName}</td>
                        <td id="age${idAddUser}">${age}</td>
                        <td id="email${idAddUser}">${email}</td>
                        <td class="text-uppercase" id="roleUser${idAddUser}">${roleUser}</td>
                    <td>
                    
                    <form >
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${idAddUser}">
                          Edit
                        </button>
                    </form>
                    
                      <!-- Модальное окно  EDIT-->
                      <div class="modal fade"    id="editModal${idAddUser}"  tabindex="-1" role="dialog"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalCenterTitle">Edit user</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                            </div>
                            <div class="modal-body mx-auto" style="width: 100%">
                              <form class="row g-3" name="myForm"  style="margin-left: -15px; margin-right: -15px;" form="moduleEdd${idAddUser}"> 
                                <div class="  col-md-6 col-md-offset-3 mx-auto"  >
                                  <label for="validationServer000${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; ">ID</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer000${idAddUser}" type="text"  value="${idAddUser}"  readonly >

                                  <label for="validationServer001${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px;" >First name</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer001${idAddUser}" type="text"  value="${name}" name="name">

                                  <label for="validationServer002${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px ">Last name</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer002${idAddUser}" type="text"    value="${lastName}" name="lastName">

                                  <label for="validationServer003${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Age</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer003${idAddUser}" type="text" value="${age}" name="age">

                                  <label for="validationServer004${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Email</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer004${idAddUser}" type="text" value="${email}" name="email">

                                  <label for="validationServer005${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Password</label>
                                  <input class="form-control form-control-sm  text-muted" id="validationServer005${idAddUser}" type="password"  value="${pass}" name="pass">

                                  <label for="validationServer006${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Role</label>
                                  <select value="roleSet${idAddUser}" name="role" id="moduleEdd${idAddUser}"   class="form-control bg-body-secondary form-control-sm  text-muted field left" multiple id="validationServer006${idAddUser}" style="height: 60px"  value="11" readonly/>
                                                        
                                  </select>   
                                </div>
                                <div class="modal-footer  ">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" onclick="updateJS(${idAddUser})" id="editB" class="btn btn-primary" data-bs-dismiss="modal" value="Edit">Edit</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      </td>
                      <!-- Модальное окно EDIT-->
                     <td>
                      <form>
                        <button type="button" class="btn btn-danger text-whit" data-bs-toggle="modal" data-bs-target="#editModall${idAddUser}">
                          Delete                       
                        </button>
                      </form>
                      <!-- Модальное окно  Delete-->
                      <div class="modal fade"   id="editModall${idAddUser}" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel1">Delete user</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                            </div>
                            <div class="modal-body mx-auto" style="width: 100%">
                              <form class="row g-3" >
                                <div class="  col-md-6 col-md-offset-3 mx-auto"  >
                                  <label for="validationServer1" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; ">ID</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer1" type="text"  value="${idAddUser}" value="id" , readonly >

                                  <label for="validationServer2" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; ">First name</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer2" type="text" value="${name}" value="name" readonly   >

                                  <label for="validationServer3" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px ">Last name</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer3" type="text"    value="${lastName}"  value="lastname" readonly >

                                  <label for="validationServer4" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Age</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer4" type="text"   value="${age}" value="age" readonly >

                                  <label for="validationServer5" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Email</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer5" type="text"  value="${email}" value="email" readonly >

                                  <label for="validationServer6" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Password</label>
                                  <input class="form-control bg-body-secondary form-control-sm  text-muted field left" id="validationServer6" type="password"   value="${pass}" value="pass" readonly >

                                  <label for="validationServer7${idAddUser}" class="form-label fw-bold fs-6 text-center" style="width: 100%; display: block; margin-bottom: 3px; margin-top: 15px">Role</label>
                                  <select class="form-control bg-body-secondary form-control-sm  text-muted field left" multiple id="validationServer7${idAddUser}" style="height: 60px"  value="11" readonly>
                                    ${roleUserDelete} 
                                  </select>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button onclick="deleteJS(${idAddUser})"   type="button"    class="btn btn-danger text-whit " data-bs-dismiss="modal">Delete</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Модальное окно Delete-->
                    </td>
                  </tr> 
              
      `;
    var roleUserInner = document.getElementById(`roleUser${idAddUser}`);
    roleUserInner.innerHTML = exitRoleUser;
    var roleUserInnerDelete = document.getElementById(`validationServer7${idAddUser}`);
    roleUserInnerDelete.innerHTML = optRolesDelete;

    let exitIdModelEdit = document.getElementById(`moduleEdd${idAddUser}`);
    for (let y = 0; y < jsRole.length; y++) {
        exitIdModelEdit.innerHTML += "<option value="+`${jsRole[y].name}`+" id="+`${jsRole[y].id}`+">"+`${jsRole[y].name}`+"</option>";
    }
    superID++;

    name: names.value = "";
    lastName: lastNames.value  = "";
    age: ages.value  = "";
    email: emails.value  = "";
    pass: passs.value  = "";
}



