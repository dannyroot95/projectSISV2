const { use } = require("../routes")

function auth(){

    let user = document.getElementById("input-user").value
    let password = document.getElementById("input-password").value

    if(user != "" && password != ""){

        let params = {
            "user" : user,
            "password" : password
        }

            //update and hide
            fetch('http://localhost:3000/auth',{method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({user: user, password: password})})
            .then(response => response.json()) 
            .then(json => {
            
                isEmptyObject(json)
                console.log(json)
            })
            .catch(err => {
                console.log(err)
            })

    }else{
        alert("complete los campos")
    }


}

function isEmptyObject(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            return false;
        }
    }
    return true;
}