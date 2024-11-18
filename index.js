const username = document.getElementById("userName");
const addUser = document.getElementById("addUser");
const recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;
let ObjStr = localStorage.getItem("users"); // Object and string data

if (ObjStr != null) {
  userArray = JSON.parse(ObjStr);
}
displayInfo();

addUser.addEventListener("click", function () {
    const name = username.value;
  if (edit_id !== null) {
    userArray.splice(edit_id,1,{ 'name': name });
    edit_id !== null;
    // edit
  } else {
    // insert
   
    userArray.push({ name: name });
  }

  infoSave(userArray);
  username.value = " ";
  displayInfo();
  addUser.innerText = "Add User";
});

function infoSave(userArray) {
  let string = JSON.stringify(userArray);
  localStorage.setItem("users", string);
}

function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += ` <tr>
                  <th scope="row">${i + 1}</th>
                  <td>${user.name}</td>
                
               <td><i class="fa fa-trash mx-2" aria-hidden="true" onclick='deleteInfo(${i})'></i>
                <i class="far fa-edit mx-2" onclick ='editInfo(${i})'></i>
               </td>
                </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function editInfo(id) {
  edit_id = id;
  username.value = userArray[id].name;
  addUser.innerText = "Save Changes";
}

function deleteInfo(id) {
  userArray.splice(id, 2);
  infoSave(userArray);
  displayInfo();
}
