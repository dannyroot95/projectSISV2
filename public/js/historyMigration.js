
function addHistory(num) {
    const value = document.getElementById("valueHistory").value;
    
    if (value !== "") {

        document.getElementById("loader").style.display = "block";
        
        const data = { type: 1, value: value };
        disable()
        
        fetch(`${url}/get-history-patient`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.error !='sin datos'){
                insertData(data[0],num)
                document.getElementById("valueHistory").value = ""
                document.getElementById("loader").style.display = "none";
            }else{
                enable()
                Swal.fire(
                    'Oops!',
                    'Historia no encontrada!',
                    'info'
                );
                document.getElementById("valueHistory").value = ""
                document.getElementById("loader").style.display = "none";
            }
           
        })
        .catch(err => {
            enable()
            console.log(err);
            document.getElementById("loader").style.display = "none";
        });
    } else {
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'info'
        );
    }
}

function insertData(data,n){
    enable()

    document.getElementById("history"+n).value = data.historia

    let history1 = document.getElementById("history1").value
    let history2 = document.getElementById("history2").value
    let dni1 = document.getElementById("dni1").value
    let dni2 = document.getElementById("dni2").value

    if(history1 != history2){
        document.getElementById("name"+n).innerHTML = data.ApellidoPaterno+" "+data.ApellidoMaterno+" "+data.PrimerNombre
        document.getElementById("dni"+n).value = data.NroDocumento
        document.getElementById("fNacimiento"+n).value = data.FechaNacimiento
        document.getElementById("fCreacion"+n).value = data.FechaCreacionHistoria
        document.getElementById("id"+n).innerHTML = data.IdPaciente

        if(data.sexo == "MASCULINO" ){
            document.getElementById("genero"+n).style = "color: white;background-color: #005185;"
            document.getElementById("genero"+n).value = data.sexo
        }else{
            document.getElementById("genero"+n).style = "color: white;background-color: #C70039;"
            document.getElementById("genero"+n).value = data.sexo
        }

        if(dni1 || dni2 != ""){
            if(dni1 != dni2){
                document.getElementById("dni1").style = "color:red;background-color:white"
                document.getElementById("dni2").style = "color:red;background-color:white"
            }
        }else{
            document.getElementById("dni1").style = "color:black;background-color:white"
            document.getElementById("dni2").style = "color:black;background-color:white"
        }

    }else{
        document.getElementById("history"+n).value = ""
        document.getElementById("dni"+n).value = ""
        document.getElementById("fNacimiento"+n).value = ""
        document.getElementById("fCreacion"+n).value = ""
        document.getElementById("genero"+n).style = "background-color: white;"
        document.getElementById("genero"+n).value = ""
        document.getElementById("id"+n).innerHTML = ""
        Swal.fire(
            'Oops!',
            'La historia debe ser diferente!',
            'error'
          );
    }
}

function cleanAll() {
    for (let n = 0; n <= 2; n++) {
        let history = document.getElementById("history" + n);
        let dni = document.getElementById("dni" + n);
        let fNacimiento = document.getElementById("fNacimiento" + n);
        let fCreacion = document.getElementById("fCreacion" + n);
        let genero = document.getElementById("genero" + n);
        let id = document.getElementById("id" + n);

        if (history) history.value = "";
        if (dni) dni.value = "";
        if (fNacimiento) fNacimiento.value = "";
        if (fCreacion) fCreacion.value = "";
        if (genero) {
            genero.style.backgroundColor = "white";
            genero.value = "";
        }
        if (id) id.innerHTML = "";
    }
}

function migrate(){

    let history1 = document.getElementById("history1").value
    let history2 = document.getElementById("history2").value

    if(history1 != "" && history2 != ""){
        modalConfirm()
    }else{
        Swal.fire(
            'Oops!',
            'Complete los datos!',
            'error'
          );
    }
}

function modalConfirm(){

    let history1 = document.getElementById("history1").value
    let history2 = document.getElementById("history2").value

    Swal.fire({
      title: 'Estas seguro de migrar la historia <b style="color:red;">'+history1+'</b> a la historia <b style="color:yellow;">'+history2+'</b>',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        document.getElementById("loader2").style = "display:block;"
        document.getElementById("btn4").style = "display:none;"
        disable()

        setTimeout(function() {

            document.getElementById("loader2").style = "display:none;"
            document.getElementById("btn4").style = "display:block;font-size: 30px;"
            enable()
            cleanAll()
            
            Swal.fire(
                'Muy bien!',
                'Historia migrada satisfactoriamente!',
                'success'
              );

          }, 5000);

      }
    })
  }
  

  function enable(){
    document.getElementById("btn1").disabled = false
    document.getElementById("btn2").disabled = false
    document.getElementById("btn3").disabled = false
    document.getElementById("btn4").disabled = false
    document.getElementById("valueHistory").disabled = false
  }

  function disable(){
    document.getElementById("btn1").disabled = true
    document.getElementById("btn2").disabled = true
    document.getElementById("btn3").disabled = true
    document.getElementById("btn4").disabled = true
    document.getElementById("valueHistory").disabled = true
  }