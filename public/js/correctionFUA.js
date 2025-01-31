getYear()
createDatatableSearchMedic()
createDatatableSearchDiagnosys()

var inputWeight = document.getElementById('i-weight');
var inputHeight = document.getElementById('i-tail');
var imcResult = document.getElementById('i-imc');

inputWeight.addEventListener('input', actualizarIMC);
inputHeight.addEventListener('input', actualizarIMC);

document.getElementById('dia-search-value').addEventListener('input', (event) => {
  const value = event.target.value; // Obtiene el valor ingresado
  const type = document.getElementById("inputGroupSelectTypeDiagnosys").value; // Puedes establecer un valor fijo o dinámico según tu lógica
  if (value.trim() !== '') { // Solo llama la función si el valor no está vacío
    fetchAndLoadData(type, value);
  }else{
    document.getElementById("tbodyDxQuery").innerHTML = ""
  }
});

function getYear(){
    const year = new Date().getFullYear();
    const lastTwoDigits = year.toString().slice(-2);
    document.getElementById("lote").value = lastTwoDigits
}

function createDatatableSearchMedic(){
  $('#tb-data-search-medic').DataTable({
    language: {
          "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
          "infoEmpty": "Mostrando 0 to 0 of 0 datos",
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
   },scrollY: '35vh',scrollX: true, sScrollXInner: "100%",
   scrollCollapse: true,
  });

  var table = $('#tb-data-search-medic').DataTable();
  $('#container').css( 'display', 'block' );
  table.columns.adjust().draw();
}


function createDatatableSearchDiagnosys(){
  $('#tbDataDia').DataTable({
    language: {
          "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
          "infoEmpty": "Mostrando 0 to 0 of 0 datos",
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
   },scrollY: '35vh',scrollX: true, sScrollXInner: "100%",
   scrollCollapse: true,
  });

  var table = $('#tbDataDia').DataTable();
  table.columns.adjust().draw();
}

function actualizarNumero() {
  let inputElement = document.getElementById("fua");
  let numero = inputElement.value.trim();
  let lote = document.getElementById("lote").value.trim();

  // Verificar si el input está vacío o contiene solo ceros
  if (numero === "" || /^0+$/.test(numero)) {
    inputElement.value = "";
  } else {
    // Convertir a número entero para eliminar ceros no significativos
    numero = parseInt(numero, 10).toString();

    // Agregar ceros a la izquierda hasta alcanzar una longitud de 8 caracteres
    let cantidadCeros = 8 - numero.length;
    if (cantidadCeros > 0) {
      numero = '0'.repeat(cantidadCeros) + numero;
    }


    inputElement.value = numero;

    if(lote != ""){
        cleanForm()
        fetchFua(lote,numero)
    }else{
        Swal.fire(
            'Oops!',
            'Ingrese un lote!',
            'info'
          )
    }

    // Mostrar el alert con el número generado
    // mandar fetch -> numero
  }
  }


  function fetchFua(lote,fua){

    fetch(`${url}/search-fua-by-num-size/${lote}/${fua}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        let v = data[0]
       
        if(v.success != "error"){
            cleanForm()
            setData(v)
        }else{
            cleanForm()
        }
       
    
      }).catch(error => {
        Swal.fire(
            'Oops!',
            'Se produjo un error',
            'warning'
          )
        console.error(error)
    });


  }

  function cleanForm() {
    
    document.getElementById("checkbox-fua-formato").checked = false
    document.getElementById("cod-pres").value = ""
    document.getElementById("btn-up-1").disabled = true

    document.getElementById("checkbox-fua-identificacion").checked = false
    document.getElementById("type-doc-patient").value = ""
    document.getElementById("num-doc-patient").value = ""
    document.getElementById("btn-up-dni").disabled = true

    document.getElementById("checkbox-fua-afi").checked = false
    document.getElementById("disa-afi").value = ""
    document.getElementById("type-afi").value = ""
    document.getElementById("num-afi").value = ""
    document.getElementById("btn-up-afi").disabled = true

    document.getElementById("checkbox-fua-history").checked = false
    document.getElementById("hist-fua").value = ""
    document.getElementById("btn-up-hist").disabled = true

    document.getElementById("checkbox-fua-datos-paciente").checked = false
    document.getElementById("ap-paterno").value = ""
    document.getElementById("ap-materno").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("ot-nombre").value = ""
    document.getElementById("sex").selectedIndex = 0
    document.getElementById("date-nac").value = ""
    document.getElementById("date-death").value = ""
    document.getElementById("btn-up-paciente").disabled = true

    document.getElementById("checkbox-fua-medic").checked = false
    document.getElementById("medic").value = ""
    document.getElementById("dni-medic").value = ""
    document.getElementById("type-dni-medic").value = ""
    document.getElementById("type-medic").value = ""
    document.getElementById("btn-search-medic").disabled = true

    document.getElementById("checkbox-fua-dig").checked = false
    document.getElementById("name-dig").value = ""
    document.getElementById("num-doc-dig").value = ""
    document.getElementById("btn-up-dig").disabled = true
    document.getElementById("btn-search-dig").disabled = true

    document.getElementById("checkbox-fua-ate").checked = false
    document.getElementById("ate-f-in").value = ""
    document.getElementById("ate-f-out").value = ""
    document.getElementById("btn-up-ate").disabled = true

    document.getElementById("buttons").innerHTML = ``

  }

  function setData(data){

    document.getElementById("cod-pres").value = data.FuaCodigoPrestacion
    document.getElementById("type-doc-patient").value = isNull(data.DocumentoTipo)
    document.getElementById("num-doc-patient").value = isNull(data.DocumentoNumero)
    document.getElementById("hist-fua").value = data.FuaNrohistoria

    document.getElementById("disa-afi").value = data.AfiliacionDisa
    document.getElementById("type-afi").value = data.AfiliacionTipoFormato
    document.getElementById("num-afi").value = data.AfiliacionNroFormato

    document.getElementById("ap-paterno").value = data.Apaterno
    document.getElementById("ap-paterno").value = data.Apaterno
    document.getElementById("ap-materno").value = data.Amaterno
    document.getElementById("nombre").value = data.Pnombre
    document.getElementById("ot-nombre").value = data.Onombre
    document.getElementById("date-nac").value = (data.FechaNacimiento).split("T")[0]
  
    if(data.FuafechaFallecimiento != '1900-01-01T00:00:00.000Z'){
      document.getElementById("date-death").value = (data.FuafechaFallecimiento).split("T")[0]
    }

    if(data.Genero == '1'){
        document.getElementById("sex").selectedIndex = 1
    }else{
        document.getElementById("sex").selectedIndex = 2
    }

    document.getElementById("medic").value = data.FuaMedico
    document.getElementById("type-medic").value = data.FuaMedicoTipo
    document.getElementById("type-dni-medic").value = data.MedicoDocumentoTipo
    document.getElementById("dni-medic").value = (data.FuaMedicoDNI).trim()

    document.getElementById("name-dig").value = data.nombre_digitador
    document.getElementById("num-doc-dig").value = (data.CabDniUsuarioRegistra).trim()

    document.getElementById("ate-f-in").value = (data.FechaIngreso).split("T")[0]
    document.getElementById("ate-f-out").value = (data.FechaEgreso).split("T")[0]

    document.getElementById("buttons").innerHTML = `
    
    <center>
    <button onclick="showDiagnosys(${data.IdCuentaAtencion})" class="btn btn-outline-primary"><i class="bi bi-prescription"></i>&nbsp;Diagnosticos</button>
    &nbsp;&nbsp;&nbsp;
    <button class="btn btn-outline-dark"><i class="bi bi-prescription2"></i>&nbsp;Procedimientos</button>
    &nbsp;&nbsp;&nbsp;
    <button class="btn btn-outline-danger"><i class="bi bi-capsule"></i>&nbsp;Medicamentos</button>
    &nbsp;&nbsp;&nbsp;
    <button onclick="showModalInsumos()" class="btn btn-outline-success"><i class="bi bi-bandaid-fill"></i>&nbsp;Insumos</button>
    &nbsp;&nbsp;&nbsp;
    <button id="btn-smi" onclick="showModalSMI(${data.IdCuentaAtencion})" class="btn btn-outline-warning"><i class="bi bi-bandaid-fill" style="color: #1c1842;"></i>&nbsp;<label style="color: #1c1842;">SMI</label></button>
  </center> 

    `

  }

  function isNull(value){

    let x = ""

    if(value != 'null'){
        x = value
    }

    return x

  }


  document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox-fua-formato');

    checkbox.addEventListener('change', function() {

      let fua = document.getElementById("fua").value

      if(fua != ""){
        if (this.checked) {
          
          document.getElementById("cod-pres").disabled = false
          document.getElementById("btn-up-1").disabled = false
            
        } else {
        
          document.getElementById("cod-pres").disabled = true
          document.getElementById("btn-up-1").disabled = true
            
        }
      }else{
        checkbox.checked = false
      }
        
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('checkbox-fua-medic');

  checkbox.addEventListener('change', function() {

    let fua = document.getElementById("fua").value

    if(fua != ""){
      if (this.checked) {
        document.getElementById("btn-search-medic").disabled = false
          
      } else {
        document.getElementById("btn-search-medic").disabled = true
          
      }
    }else{
      checkbox.checked = false
    }
      
  });
});


function openModalAddMedic(){
  $('#modalAddMedic').modal('show')
}

function searchMedic(){
  var input1 = document.getElementById("s-ap").value

  if (input1 != "" ) {
  
    fetchSearchMedic(input1)
  }else{
  document.getElementById("tbodySeachMedic").innerHTML = ''
 
  }

}

function fetchSearchMedic(ap){

  fetch(`${url}/search-medic-fua/${ap}`)
    .then(response => response.json())
    .then(data => {

      if(data[0].success != "error"){
        document.getElementById("tbodySeachMedic").innerHTML = ''
      $('#tb-data-search-medic').DataTable().destroy()
      
      $("#tbodySeachMedic").html(data.map((d) => {
                
              return `
              <tr>
              <td><button onclick="getDetailsMedic('${encodeURIComponent(JSON.stringify(d))}')" class="btn btn-primary"><i class="bi bi-plus-circle"></i><label style="font-size:14px;margin-left:4px;">Seleccionar</label></button></td>
              <td>${d.nombres}</td>
              <td>${d.TipoEmpleadoSIS}</td>
              <td>${d.idTipoDocumento}</td>
              <td>${d.DNI}</td>
              </tr>`;

          })
          .join("")
      );
      createDatatableSearchMedic()
      }else{
        document.getElementById("tbodySeachMedic").innerHTML = ''
        $('#tb-data-search-medic').DataTable().destroy()
        createDatatableSearchMedic()
      }
    
    }).catch(err =>{
        console.log(err)
        Swal.fire(
          'Oops!',
          'Ocurrió un error!',
          'error'
        )
    } );

}

function getDetailsMedic(v){

  v = JSON.parse(decodeURIComponent(v))

  let dni = (v.DNI).trim()
  let nameMedic = v.nombres
  let typeDocMedic = v.idTipoDocumento
  let typeMedic = v.TipoEmpleadoSIS
  let fua = document.getElementById("fua").value
  let lote = document.getElementById("lote").value


  if(fua != "" && lote != ""){

    Swal.fire({
      title: 'Estas seguro de actualizar el médico de este FUA?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
  
        let json = {
          dni : dni,
          medic:nameMedic,
          type_doc:typeDocMedic,
          type_medic:typeMedic,
          fua:fua,lote:lote
        }
    
        fetch(`${url}/update-medic-fua/`, {
          method: 'POST', // o 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(json) // data es un objeto con los datos a enviar
        })
        .then(response => response.json())
        .then(data => {

    
           if(data[0].success == "actualizado"){
           
            document.getElementById("medic").value = nameMedic
            document.getElementById("type-medic").value = typeMedic
            document.getElementById("type-dni-medic").value = typeDocMedic
            document.getElementById("dni-medic").value = dni


            Swal.fire(
              'Muy bien!',
              'FUA actualizado!',
              'success'
            )
            
           }else{
            Swal.fire(
              'Oops!',
              'Se produjo un error',
              'warning'
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
    })

  }else{
    Swal.fire(
      'Oops!',
      'Ingrese el número de FUA!',
      'info'
    )
  }


  /*
  $('#modalAddMedic').modal('hide')

  document.getElementById("tbodySeachMedic").innerHTML = ''
  $('#tb-data-search-medic').DataTable().destroy()
  createDatatableSearchMedic()
  document.getElementById("s-ap").value = ""
  */

}

$('#modalAddMedic').on('hidden.bs.modal', function (e) {

  document.getElementById("tbodySeachMedic").innerHTML = ''
  document.getElementById("s-ap").value = ""

})


// Función para calcular el IMC
function calcularIMC(peso, altura) {
  var alturaMetros = altura / 100;
  var imc = peso / (alturaMetros * alturaMetros);
  return imc.toFixed(2); // Redondear el resultado a dos decimales
}

// Función para actualizar el resultado del IMC cuando se cambian los valores de los inputs
function actualizarIMC() {
  var peso = parseFloat(inputWeight.value);
  var altura = parseFloat(inputHeight.value);

  if (!isNaN(peso) && !isNaN(altura)) { // Verificar que se ingresaron números válidos
      var imc = calcularIMC(peso, altura);
      imcResult.value = imc; // Mostrar el resultado del IMC
  } else {
      imcResult.value = ''; // Si no se ingresaron números válidos, borrar el resultado
  }
}



function showModalSMI(account){

    document.getElementById("i-weight").value = ""
    document.getElementById("i-tail").value = ""
    document.getElementById("i-imc").value = ""
    document.getElementById("i-p-1").value = ""
    document.getElementById("i-p-2").value = ""
    document.getElementById("i-age-gest").value = ""
    document.getElementById("i-age-rn").value = ""
    document.getElementById("i-apgar305").value = ""
    document.getElementById("i-apgar306").value = ""
    document.getElementById("i-v-bcg").value = ""
    document.getElementById("i-v-hb").value = ""

  $('#modalSMI').modal('show')
  document.getElementById("smi-account").innerHTML = account

  // Define la URL de la API
  const apiUrl = `${url}/get-smi/${account}`;

  // Realiza la solicitud con fetch
  fetch(apiUrl, {
      method: 'GET', // Método HTTP
      headers: {
          'Content-Type': 'application/json', // Encabezados necesarios
          // Agrega otros encabezados aquí si son necesarios, por ejemplo: 'Authorization': 'Bearer token'
      },
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
          return response.json(); // Convierte la respuesta a JSON
      })
      .then(data => {
          console.log('Datos obtenidos:', data); 

          data.forEach((dato) => {
            if(dato.codigo == "003"){
              document.getElementById("i-weight").value = dato.Valor
            }else if(dato.codigo == "004"){
              document.getElementById("i-tail").value = dato.Valor
            }else if(dato.codigo == "014"){
              document.getElementById("i-imc").value = dato.Valor
            }else if(dato.codigo == "301"){
              document.getElementById("i-p-1").value = (dato.Valor).split("_")[0]
            }else if(dato.codigo == "901"){
              document.getElementById("i-p-2").value = dato.Valor
            }else if(dato.codigo == "005"){
              document.getElementById("i-age-gest").value = dato.Valor
            }else if(dato.codigo == "304"){
              document.getElementById("i-age-rn").value = dato.Valor
            }else if(dato.codigo == "305"){
              document.getElementById("i-apgar305").value = dato.Valor
            }else if(dato.codigo == "306"){
              document.getElementById("i-apgar306").value = dato.Valor
            }else if(dato.codigo == "102"){
              document.getElementById("i-v-bcg").value = dato.Valor
            }else if(dato.codigo == "315"){
              document.getElementById("i-v-hb").value = dato.Valor
            }
        });

      })
      .catch(error => {
          console.error('Error al obtener los datos:', error); // Maneja errores
      });


}

function deleteSMI(type){

  let account = document.getElementById("smi-account").innerHTML 

  if(type == 1){
    fetchDeleteEspecificSmi(account,'003')
    fetchDeleteEspecificSmi(account,'004')
    fetchDeleteEspecificSmi(account,'014')

    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )

    document.getElementById("i-weight").value = "" //003
    document.getElementById("i-tail").value = "" // 004
    document.getElementById("i-imc").value = "" // 014

  }else if(type == 2){
    fetchDeleteEspecificSmi(account,'301')
    fetchDeleteEspecificSmi(account,'901')

    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )

    document.getElementById("i-p-1").value = "" // 301  
    document.getElementById("i-p-2").value = "" // 901


  }else if(type == 3){
    fetchDeleteEspecificSmi(account,'005')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )
    document.getElementById("i-age-gest").value = "" // 005

  }else if(type == 6){
    fetchDeleteEspecificSmi(account,'304')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )
    document.getElementById("i-age-rn").value = "" // 304


  }else if(type == 4){
    fetchDeleteEspecificSmi(account,'305')
    fetchDeleteEspecificSmi(account,'306')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )
    document.getElementById("i-apgar305").value = "" // 305
    document.getElementById("i-apgar306").value = "" // 306

  }else if(type == 5){
    fetchDeleteEspecificSmi(account,'102')
    fetchDeleteEspecificSmi(account,'315')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )
    document.getElementById("i-v-bcg").value = "" // 102
    document.getElementById("i-v-hb").value = "" // 315

  }else if(type == 0){
    fetchDeleteAllSmi(account)
    Swal.fire(
      'Muy bien!',
      'Datos eliminados!, cierre la ventana para ver los cambios',
      'success'
    )

  }

}

function fetchDeleteEspecificSmi(account,activity){

  const U = `${url}/delete-especific-smi`

  let datos = {
    account : account,
    activity : activity
  }

  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos) // Convertimos los datos a formato JSON para enviarlos
  };
  
  // Realizamos la solicitud fetch
  fetch(U, opciones)
    .then(response => {
      if (!response.ok) {
        console.error('Error de servidor')
        throw new Error('Ocurrió un error al realizar la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      // Manejamos la respuesta del servidor
      console.log(data)
      if(data[0].success == "eliminado"){
        console.log("ELIMINADO")
       }
    })
    .catch(error => {
      // Capturamos cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    });
}

function fetchDeleteAllSmi(account){
  const U = `${url}/delete-all-smi`

  let datos = {
    account : account
  }

  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos) // Convertimos los datos a formato JSON para enviarlos
  };
  
  // Realizamos la solicitud fetch
  fetch(U, opciones)
    .then(response => {
      if (!response.ok) {
        console.error('Error de servidor')
        throw new Error('Ocurrió un error al realizar la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      // Manejamos la respuesta del servidor
      console.log(data)
      if(data.success == "eliminado"){
        console.log("ELIMINADO")
       }
    })
    .catch(error => {
      // Capturamos cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    });
}


function updateInsertSMI(){

  const U = `${url}/update-insert-smi`
  let accountSmi = document.getElementById("smi-account").innerHTML

  let edadGest = document.getElementById("i-age-gest") // 005
  let edadRn = document.getElementById("i-age-rn") // 304
  let peso = document.getElementById("i-weight") //003
  let talla = document.getElementById("i-tail") // 004
  let imc = document.getElementById("i-imc") // 014
  let apgar305 = document.getElementById("i-apgar305") // 305
  let apgar306 = document.getElementById("i-apgar306") // 306
  let vacunaBcg = document.getElementById("i-v-bcg") // 102
  let vacunaHb = document.getElementById("i-v-hb") // 315
  let psa1 = document.getElementById("i-p-1") // 301  
  let psa2 = document.getElementById("i-p-2") // 901

  let values = {
    cuenta : accountSmi,
    peso : peso.value , 
    talla : talla.value,
    imc : imc.value,
    presion1 : psa1.value,
    presion2 : psa2.value,
    edadGest : edadGest.value,
    edadRn : edadRn.value,
    apgar305 : apgar305.value,
    apgar306 : apgar306.value,
    vacunaBcg : vacunaBcg.value,
    vacunaHb : vacunaHb.value
  }

  console.log(values)

  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values) // Convertimos los datos a formato JSON para enviarlos
  };
  
  // Realizamos la solicitud fetch
  fetch(U, opciones)
    .then(response => {
      if (!response.ok) {
        console.error('Error de servidor')
        throw new Error('Ocurrió un error al realizar la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      // Manejamos la respuesta del servidor
      if(data[0].success == "insertado"){
        console.log("INSERTADO")
        Swal.fire(
          'Muy bien!',
          'Datos integrados',
          'success'
        )
       }
    })
    .catch(error => {
      // Capturamos cualquier error que ocurra durante la solicitud
      console.error('Error:', error);
    });

}

function showDiagnosys(account){
  $('#modalDiagnosys').modal('show');
  document.getElementById("diag-loader").style = "display:flex;"
  fetchDiagnosys(account)
}

function fetchDiagnosys(account){

  document.getElementById("tbodyDiag").innerHTML = ""
  fetch(`${url}/get-fua-diagnosys/${account}`)
  .then(response => response.json())
  .then(data => {

    $("#tbodyDiag").html(data[0].map((d) => {

      let isFirst = d.DxNumero
      let editButton = `<button class="btn btn-warning" onclick="showModalEditDiagnosys('${d.id}','${d.idCuentaAtencion}','${d.DxNumero}','${d.DxTipoIE}','${d.DxCodigo}','${d.Descripcion}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
        </button>`
      let deleteButton = `<center>${editButton}</center>`

      if(isFirst != "1"){
        deleteButton = `
        <center>
        <button style="background-color:red;border-color:red;" 
        onclick="showModalDeleteDiagnosys('${d.id}','${d.idCuentaAtencion}')" 
        class="btn btn-dark">X</button>
        &nbsp;
        ${editButton}
        </center>`
      }
     
      let dx1 = `
      <div class="form-check" style = "display: flex; justify-content: center;">
      <input style = "opacity: 1;" class="form-check-input" type="checkbox" disabled>
      </div>`

      let dx2 = `
      <div class="form-check" style = "display: flex; justify-content: center;">
      <input style = "opacity: 1;" class="form-check-input" type="checkbox" checked disabled>
      </div>`

      if(d.DxTipoIE == "I"){
              dx1 = `
              <div class="form-check" style = "display: flex; justify-content: center;">
              <input style = "opacity: 1;" class="form-check-input" type="checkbox" checked disabled> 
              </div>`
              dx2 = `
              <div class="form-check" style = "display: flex; justify-content: center;">
              <input style = "opacity: 1;" class="form-check-input" type="checkbox" disabled>
              </div>`      
      }

      return `
      <tr>
      <td class="minText5" style="font-weight:200;">${d.DxNumero}</td>
      <td class="minText5" style="font-weight:200;">${dx1}</td> 
      <td class="minText5" style="font-weight:200;">${dx2}</td> 
      <td class="minText5" style="font-weight:200;">${d.DxCodigo}</td>
      <td class="minText5" style="font-weight:100;">${d.Descripcion}</td>
      <td class="minText5">${deleteButton}
      </td>
      </tr>`;

  })
  .join("")
);

 document.getElementById("diag-loader").style = "display:none;"

  }).catch(err =>{
    document.getElementById("diag-loader").style = "display:none;"
    console.log(err)
} );
}

function showModalEditDiagnosys(id, account, orden, tipoMov, codigo, descripcion) {

  const elements = {
    order: document.getElementById("dia-order"),
    mov: document.getElementById("dia-mov"),
    dx: document.getElementById("dia-dx"),
    descripcion: document.getElementById("dia-description"),
    footer: document.getElementById("footer-diagnosys"),
  };

  // Clear previous values
  elements.order.value = "";
  elements.mov.value = "";
  elements.dx.value = "";
  elements.descripcion.value = "";
  // Set new values
  elements.order.value = orden;
  elements.mov.value = tipoMov;
  elements.dx.value = codigo;
  elements.descripcion.value = descripcion;

  document.getElementById("id1").innerHTML = id
  document.getElementById("id2").innerHTML = account
  
  // Show modal
  $('#modalDiagnosysDetail').modal('show');
  document.getElementById("tbodyDxQuery").innerHTML = '';
  document.getElementById("dia-search-value").value = '';
}



function showModalDeleteDiagnosys(id,account){

Swal.fire({
  title: 'Estas seguro de eliminar este diagnostico?',
  showCancelButton: true,
  confirmButtonText: 'Si',
  cancelButtonText : 'Cancelar'
}).then((result) => {

  if (result.isConfirmed) {

    fetch(`${url}/delete-diagnosys-fua/${id}/${account}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data[0].success == "eliminado"){
            fetchDiagnosys()
            Swal.fire('Diagnostico eliminado!', '', 'success')
        }else{
          Swal.fire(
            'Oops!',
            'Ocurrió un error!',
            'error'
          )
        }
      }).catch(err =>{
          console.log(err)
          Swal.fire(
            'Oops!',
            'Ocurrió un error!',
            'error'
          )
      });
  } })
}

function fetchAndLoadData(type, value) {
  fetch(`${url}/get-diagnosys-fua`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // Si hay un error en los datos, limpia la tabla y no hagas nada más
        document.getElementById("tbodyDxQuery").innerHTML = '';
        $('#tbDataDia').DataTable().destroy();
        $('#tbDataDia').DataTable(); // Reinicia DataTable sin datos
        return;
      }
      // Limpia el contenido previo del tbody y destruye la tabla previa
      document.getElementById("tbodyDxQuery").innerHTML = '';
      $('#tbDataDia').DataTable().destroy();

      // Inserta los nuevos datos en el tbody
      document.getElementById("tbodyDxQuery").innerHTML = data
        .map((item, index) => {
          let id = document.getElementById("id1").innerHTML
          let account = document.getElementById("id2").innerHTML
          return `
            <tr>
              <td><button class="btn btn-success minText2" onclick="updateDiagnosys('${id}','${account}','${item.codigoCIEsinPto}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
              </svg>
              &nbsp;
              Actualizar
              </button></td>
              <td>${index + 1}</td>
              <td>${item.codigoCIEsinPto}</td>
              <td>${item.Descripcion}</td>
            </tr>
          `;
        })
        .join("");
      // Reinicia DataTable con los nuevos datos
      $('#tbDataDia').DataTable();
    })
    .catch((err) => {
      console.error("Error al obtener los datos:", err);
      Swal.fire("Oops!", "Ocurrió un error al obtener los datos.", "error");
    });
}

function updateDiagnosys(id,account,dx){

  let json = {
    id:id,
    account:account,
    dx:dx
  }
    
  Swal.fire({
    title: 'Estas seguro de remplazar este diagnostico?',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText : 'Cancelar'
  }).then((result) => {
  
    if (result.isConfirmed) {
      document.getElementById("tbodyDiag").innerHTML = ""
      fetch(`${url}/update-diagnosys-fua`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })
      .then(response => response.json())
      .then(data => {
        let response = data[0].message.toString()
        if(response === "ACTUALIZADO"){
          Swal.fire(
            'Muy bien!',
            'Diagnostico actualizado!',
            'success'
        );
          $('#modalDiagnosys').modal('hide');
          $('#modalDiagnosysDetail').modal('hide');
        }
      }).catch(err =>{
        console.log(err)
    });
  }})
}