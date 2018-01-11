/* Let's  make the contact form to work ! */
var urlContact = "http://localhost:3000/contact";
var htmlFileName = window.location.pathname.split("/").pop();

if (htmlFileName == 'index.html' || htmlFileName == '') {
    document.getElementById('commentSendButton').addEventListener('click', sendMessage);
}
else if (htmlFileName === 'admin_page.html') {
    document.getElementById('getMessagesButton').addEventListener('click', getJSON);
    document.getElementById('select').addEventListener('click', selectElement);
    document.getElementById('edit').addEventListener('click', editAMessage);
    document.getElementById('delete').addEventListener('click', deleteMessage);
}

/*Now, create a sendMessage function (Method: POST) */
function sendMessage() {
    event.preventDefault();
    var formData = new FormData(), result = {};
        formData.append('firstName', document.getElementById('fname').value);
        formData.append('lastName', document.getElementById('lname').value);
        formData.append('email', document.getElementById('iemail').value);
        formData.append('text', document.getElementById('textArea').value);
        formData.append('read', false);
    result = {};
    for(var entry of formData.entries()) {
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result);
    fetch(urlContact, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body:result
    }).then((res) => res.json())
      .then((data) => {
        alert('Mesajul a fost trimis cu success. ')
        document.getElementById('fname').value = "";
        document.getElementById('lname').value = "";
        document.getElementById('iemail').value = "";
        document.getElementById('textArea').value = "";
      })
      .catch((error) => console.log(error))
}


/*Only an admin can view messages admin_page must be hidden.*/
if (htmlFileName === "admin_page.html") {
    var ulDOM = document.createElement('ul');
        document.querySelector('body').appendChild(ulDOM);
}

function clearListAdmin() {
    document.querySelectorAll('li').forEach(function(elemenet) {
        ulDOM.removeChild(elemenet);
    })
}

/*Get messages in admin_page*/
function getJSON() {
    if(htmlFileName === 'admin_page.html') {
    fetch(urlContact).then((res) => res.json())
              .then((data) => {
                    clearListAdmin();
                 for(var i = 0; i < data.length; i++) {
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Id: " + data[i].id;
                         ulDOM.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "First Name: " + data[i].firstName + " Last Name: " + data[i].lastName;
                         ulDOM.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Email: \n" + data[i].email;
                         ulDOM.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Message: \n" + data[i].text;
                         ulDOM.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Status: " + data[i].read;
                         ulDOM.appendChild(liDOM);
                 } 
        })
    }
}

/**
 * Select a message method, GET
 */
function selectElement() {
    var id = document.getElementById('id').value;
    if(htmlFileName === 'admin_page.html') {
        fetch(urlContact).then((res) => res.json())
                        .then((data) => {
                            for(var i = 0; i < data.length; i++) {
                                var idJSON = parseInt(data[i].id);
                                if(idJSON == id) {
                                    document.getElementById('fname').value = data[i].firstName;
                                    document.getElementById('lname').value = data[i].lastName;
                                    document.getElementById('email').value = data[i].email;
                                    document.getElementById('textArea').value = data[i].text;
                                    document.getElementById('read').value = data[i].read;
                                }
                            }
                        })
    }
}

/**
 * Put method for edit a message.
 */
function editAMessage() {
    var formData = new FormData(), result = {};
        formData.append('firstName', document.getElementById('fname').value);
        formData.append('lastName', document.getElementById('lname').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('text', document.getElementById('textArea').value);
        formData.append('read', document.getElementById('read').value);
    result = {};
    for(var entry of formData.entries()) {
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result);
    fetch(urlContact + '/' + document.getElementById('id').value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:result
    }).then((res) => res.json())
      .then((data) => {
        clearListAdmin();
        getJSON();
      })
      .catch((error) => console.log(error))
}

/**
 * Delete method
 */
function deleteMessage() {
    fetch(urlContact + '/' + document.getElementById('id').value, {
       method: 'DELETE',
       headers: {
           'Content-Type': 'application/json'
       },
    }).then((res) => res.json())
      .then((data) => {
          clearListAdmin();
          getJSON();
      })
      .catch((error) => console.log(error))
}