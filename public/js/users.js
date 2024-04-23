
var currentUser = {}

createDatatable()

function createDatatable(){

    $('#tb-data').DataTable({
        language: {
              "decimal": "",
              "emptyTable": "No hay información",
              "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
              "infoEmpty": "<b>Mostrando 0 to 0 of 0 datos</b>",
              "infoFiltered": "(Filtrado de _MAX_ total datos)",
              "infoPostFix": "",
              "thousands": ",",
              "lengthMenu": "Mostrar _MENU_ datos",
              "loadingRecords": "Cargando...",
              "processing": "Procesando...",
              "search": "Buscar en la lista:",
              "zeroRecords": "Sin resultados encontrados",
              "paginate": {
                  "first": "Primero",
                  "last": "Ultimo",
                  "next": "Siguiente",
                  "previous": "Anterior"
              }
       },scrollY: '50vh',scrollX: true, sScrollXInner: "100%",
       scrollCollapse: true,
      });
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

function openModal(){
    $('#detailModal').modal('show')
}

function search(){

    let dni = document.getElementById("dni").value

    if(dni != ""){

        fetch(`${url}/get-employee/${dni}`,{
            method: 'get',
            headers: {
              'Accept': 'application/json'
            }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data[0])
            if(data[0] == undefined){
                Swal.fire(
                    'Oops!',
                    'Usuario no encontrado!',
                    'warning'
                  )
            }else{
                let x = data[0]

                let gender = x.idTipoSexo
                let sex = ""

                if(gender == 2){
                    sex = "Femenino"
                }else{
                    sex = "Masculino"
                }

                currentUser = data[0]
                document.getElementById("ap").value = x.ApellidoPaterno
                document.getElementById("am").value = x.ApellidoMaterno
                document.getElementById("fullname").value = x.Nombres
                document.getElementById("f_nacimiento").value = x.FechaNacimiento
                document.getElementById("f_ingreso").value = x.FechaIngreso
                document.getElementById("id_tipo_usuario").value = x.IdTipoEmpleado
                document.getElementById("tipo_descripcion").value = x.Descripcion
                document.getElementById("c_planilla").value = x.CodigoPlanilla
                document.getElementById("usuario").value = x.Usuario
                document.getElementById("sex").value = sex
            }

          }).catch(err => {
            console.log(err)
          });  

    }else{
        Swal.fire(
            'Oops!',
            'Ingrese un DNI!',
            'info'
          )
    }

    
}

function createUser(){

    let v = currentUser

    if (Object.keys(v).length === 0) {
        console.log("El objeto está vacío.")
      } else {
        let x = {
                IdEmpleado: v.IdEmpleado,
                ApellidoPaterno: v.ApellidoPaterno,
                ApellidoMaterno: v.ApellidoMaterno,
                Nombres: v.Nombres,
                IdCondicionTrabajo: v.IdCondicionTrabajo,
                IdTipoEmpleado: v.IdTipoEmpleado,
                DNI: (v.DNI).trim(),
                CodigoPlanilla: v.CodigoPlanilla,
                FechaIngreso: v.FechaIngreso,
                FechaRegistroHerramienta: 1684523234,
                Usuario: v.Usuario,
                ClaveSisHerramientas:"12345678",
                ReniecAutorizado : v.ReniecAutorizado,
                idTipoDocumento: v.idTipoDocumento,
                idTipoSexo: v.idTipoSexo,
                Descripcion: v.Descripcion
        }
        postData(x)
      }

}

function postData(x){

    fetch(`${url}/create-user/`, {
        method: 'POST', // o 'PUT', 'DELETE', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(x) // data es un objeto con los datos a enviar
      })
      .then(response => response.json())
      .then(data => {
         if(data[0].success == "creado"){
            Swal.fire(
                'Muy bien!',
                'Usuario creado!',
                'success'
              )
         }
      })
      .catch(error => {
        Swal.fire(
            'Oops!',
            'Se produjo un error',
            'warning'
          )
        console.error(error)
    });

}