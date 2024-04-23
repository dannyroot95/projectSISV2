var inputDNI = document.getElementById('dni');
var inputUser = document.getElementById('user'); 

// Agregar un event listener al evento "keypress" en el elemento de entrada

if(inputDNI != null){
  inputDNI.addEventListener('keypress', function(event) {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.keyCode === 13) {
      // Llamar a tu función aquí
      login();
    }
  });

  inputUser.addEventListener('keypress', function(event) {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.keyCode === 13) {
      // Llamar a tu función aquí
      login();
    }
  });
}


  function login(){

    var user = document.getElementById("user").value
    var dni = document.getElementById("dni").value

    if(user != "" && dni != ""){
        getData(dni.trim(),user.trim())
    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'warning'
          )
    }

  }

  function getData(dni,user){

    document.getElementById("loader").style = "display:block;border-top: 4px solid #0f062b;"
    document.getElementById("btn-login").style = "display:none;"
    document.getElementById("user").disabled = true
    document.getElementById("dni").disabled = true

    fetch(`${url}/get-employee-by-user/${dni}/${user}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      if(data[0] == undefined){
          Swal.fire(
              'Oops!',
              'Usuario no encontrado!',
              'warning'
            )
            document.getElementById("btn-login").style = "display:block;"
            document.getElementById("loader").style = "display:none;"
            document.getElementById("user").disabled = false
            document.getElementById("dni").disabled = false
      }else{
        let dniF = (data[0][0].DNI).trim()
        let userF = (data[0][0].Usuario).trim().toLowerCase()

        if(dniF == dni && userF == user.toLowerCase()){
          let x = data[0][0]
          let content = data[1].content
          document.getElementById("btn-login").style = "display:block;"
          document.getElementById("loader").style = "display:none;"
          document.getElementById("user").disabled = false
          document.getElementById("dni").disabled = false

          setContent(content,x)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Sesion iniciada!'
          })
        }else{
          Swal.fire(
            'Oops!',
            'Error , verifique sus datos!',
            'info'
          )
          document.getElementById("btn-login").style = "display:block;"
          document.getElementById("loader").style = "display:none;"
          document.getElementById("user").disabled = false
          document.getElementById("dni").disabled = false
        }

      }

    }).catch(err => {
      console.log(err)
      document.getElementById("btn-login").style = "display:block;"
      document.getElementById("loader").style = "display:none;"
      document.getElementById("user").disabled = false
      document.getElementById("dni").disabled = false
    });  

  }


  function setContent(content,x){
 
    var scriptElement = document.createElement('script');
    scriptElement.src = '/js/script.js';
    scriptElement.type = 'text/javascript';

    var scriptElement2 = document.createElement('script');
    scriptElement2.src = '/js/modules.js';
    scriptElement2.type = 'text/javascript';

    document.getElementById("start").innerHTML = content

    document.head.appendChild(scriptElement);
    document.head.appendChild(scriptElement2);

    localStorage.setItem("content", content);
    localStorage.setItem("user", JSON.stringify(x));

    document.getElementById("nameuser").innerHTML = x.Usuario 
    document.getElementById("typeuser").innerHTML = x.Descripcion

  }
