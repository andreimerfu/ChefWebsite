/* Let's  make the contact form to work ! */
var urlContact = "http://localhost:3000/contact";
var htmlFileName = window.location.pathname.split("/").pop();

if (htmlFileName == 'index.html' || htmlFileName == '') {
    document.getElementById('commentSendButton').addEventListener('click', sendMessage);
    window.onload = function(){
        fetch(urlContact).then((res) => res.json())
        .then((data) => {
            var arrayId = [];
            for(var i = 0; i < data.length; i++) {
                if(data[i].read === 'true') {
                    arrayId.push(data[i].id);
                }
            }
            if(arrayId.length < 3)
            {
                var elem = document.getElementById('ratings');
                elem.parentNode.removeChild(elem);
            }
            else {
                Array.prototype.shuffle = function() {
                    var j, x, i;
                    for(i = this.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        x = this[i];
                        this[i] = this[j];
                        this[j] = x;
                    }
                }
    
            arrayId.shuffle();
            var item1 = arrayId[0] - 1;
            var item2 = arrayId[1] - 1;
            var item3 = arrayId[2] - 1;

            document.getElementById("reply1_name").innerHTML = data[item1].firstName + " " + data[item1].lastName;
            document.getElementById("reply1_text").innerHTML = data[item1].text;
            document.getElementById("reply2_name").innerHTML = data[item2].firstName + " " + data[item2].lastName;
            document.getElementById("reply2_text").innerHTML = data[item2].text;
            document.getElementById("reply3_name").innerHTML = data[item3].firstName + " " + data[item3].lastName;
            document.getElementById("reply3_text").innerHTML = data[item3].text;
            }
        
        })
    }
}
else if (htmlFileName === 'admin_page.html') {
    document.getElementById('getMessagesButton').addEventListener('click', getJSON);
    document.getElementById('select').addEventListener('click', selectElement);
    document.getElementById('edit').addEventListener('click', editAMessage);
    document.getElementById('delete').addEventListener('click', deleteMessage);
    document.getElementById('getUnreadMessages').addEventListener('click', function() { getMessageList('false'); } );
    document.getElementById('getReadMessages').addEventListener('click', function() { getMessageList('true'); } );
}


/*Now, create a sendMessage function (Method: POST) */
function sendMessage() {
    event.preventDefault();
    var formData = new FormData(), result = {};
        formData.append('firstName', document.getElementById('fname').value);
        formData.append('lastName', document.getElementById('lname').value);
        formData.append('email', document.getElementById('iemail').value);
        formData.append('text', document.getElementById('textArea').value);
        formData.append('read', 'false');
        formData.append('rating', 0);
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
    var el = document.querySelector('ul');
        while(el.firstChild)
            el.removeChild(el.firstChild);
}

/*Get messages in admin_page*/
function getJSON() {
    if(htmlFileName === 'admin_page.html') {
    fetch(urlContact).then((res) => res.json())
              .then((data) => {
                    clearListAdmin();
                    
                 for(var i = 0; i < data.length; i++) {
                    var divMess = document.createElement("div");
                        divMess.setAttribute('id', 'comment');
                        ulDOM.appendChild(divMess);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Id: " + data[i].id;
                         divMess.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "First Name: " + data[i].firstName + " Last Name: " + data[i].lastName;
                         divMess.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Email: \n" + data[i].email;
                         divMess.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Message: \n" + data[i].text;
                         divMess.appendChild(liDOM);
                     var liDOM = document.createElement('li');
                         liDOM.innerHTML = "Status: " + data[i].read;
                         divMess.appendChild(liDOM);
                 } 
        })
    }
}

function getMessageList(stat) {
    fetch(urlContact).then((res) => res.json())
                     .then((data) => {
                         clearListAdmin();

                         for(var i = 0; i < data.length; i++) {
                             if(data[i].read == stat) {
                                var divMess = document.createElement("div");
                                ulDOM.appendChild(divMess);
                             var liDOM = document.createElement('li');
                                 liDOM.innerHTML = "Id: " + data[i].id;
                                 divMess.appendChild(liDOM);
                             var liDOM = document.createElement('li');
                                 liDOM.innerHTML = "First Name: " + data[i].firstName + " Last Name: " + data[i].lastName;
                                 divMess.appendChild(liDOM);
                             var liDOM = document.createElement('li');
                                 liDOM.innerHTML = "Email: \n" + data[i].email;
                                 divMess.appendChild(liDOM);
                             var liDOM = document.createElement('li');
                                 liDOM.innerHTML = "Message: \n" + data[i].text;
                                 divMess.appendChild(liDOM);
                             var liDOM = document.createElement('li');
                                 liDOM.innerHTML = "Status: " + data[i].read;
                                 divMess.appendChild(liDOM);
                             }
                         }
                     })
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
                                    document.getElementById('rating').value = data[i].rating;
                                }
                            }
                            if (document.getElementById('email').value == ''){
                                alert('Nu exista acest id in JSON');
                                return;
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
        formData.append('rating', document.getElementById('rating').value);
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