getYear()
createDatatableSearchMedic()

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


