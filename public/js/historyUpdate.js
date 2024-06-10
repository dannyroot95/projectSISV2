
function search() {
    const value = document.getElementById("valueType").value;
    const type = document.getElementById("inputGroupSelectType").value;
    
    if (value !== "" && type !== "") {

        document.getElementById("div-data").style = "display:none;"
        document.getElementById("loader").style.display = "block";
        
        const data = { type: type, value: value };
        
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
            console.log(data.length);
            insertValues(data[0],data.length)
            document.getElementById("loader").style.display = "none";
        })
        .catch(err => {
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

function insertValues(data,length){

    let gender = ''

    if(data.sexo === "MASCULINO"){gender = '/image/male.jpg'} else {gender = '/image/female.jpg'}

    document.getElementById("fullname").innerHTML = `${data.PrimerNombre} ${data.SegundoNombre} ${data.TercerNombre}`
    document.getElementById("lastname").innerHTML = `${data.ApellidoPaterno} ${data.ApellidoMaterno}`
    document.getElementById("i-document").innerHTML = data.IdDocIdentidad 
    document.getElementById("i-dni").value = data.NroDocumento
    document.getElementById("i-birth").value = data.FechaNacimiento
    document.getElementById("i-history").value = data.historia
    document.getElementById("i-history-status").value = data.estadoHistoria
    document.getElementById("i-history-type").value = data.tipoHistoria
    document.getElementById("i-history-create").value = data.FechaCreacionHistoria
    document.getElementById("i-phone").value = data.Telefono
    document.getElementById("i-address-generate").innerHTML = `Dirección : ${data.DireccionDomicilio}      -      Cod.Autogenerado : ${data.Autogenerado}`
    document.getElementById("gender").src = gender
    document.getElementById("i-id").innerHTML = data.IdPaciente
    document.getElementById("div-data").style = "display:block;"

}

function updateHistory(){
    let id = document.getElementById("i-id").innerHTML
    let history = document.getElementById("i-history").value

    if(history != ""){
        document.getElementById("loader").style.display = "block";
        fetch(`${url}/update-history-patient`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({history:history,idPatient:id})
        })
        .then(response => response.json())
        .then(data => {
            let response = data[0].IdPaciente.toString()
            if(response === "ACTUALIZADO"){
                Swal.fire(
                    'Muy bien!',
                    'La historia actualizada!',
                    'success'
                );
            }else{
                Swal.fire(
                    'Oops!',
                    'La historia ya existe!',
                    'info'
                );
            }
           
            document.getElementById("loader").style.display = "none";
        })
        .catch(err => {
            console.log(err);
            document.getElementById("loader").style.display = "none";
        });
    }else{
        Swal.fire(
            'Oops!',
            'Ingrese el número de historia!',
            'info'
        );
    }
   
   

}
