
let timeout
var controller 
var signal 
var allData

createDatatable()

function search(){

    controller = new AbortController();
    signal = controller.signal;

    let d_init = document.getElementById("d-init").value
    let d_final = document.getElementById("d-final").value

    if(d_init != "" && d_final != ""){
        document.getElementById("btn-search").disabled = true
        document.getElementById("btn-cancel").style = "display:block;"
    
        loader.style = "display:block;"
        fetch(`${url}/status_atention/${d_init}/${d_final}`,{
          method: 'get',
          signal: signal,
          headers: {
            'Accept': 'application/json'
          }
      })
        .then(response => response.json())
        .then(data => {
    
            insertData(data)
    
        }).catch(err => {
            console.log(err)
        });  
    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'warning'
          )
    }

}

function cancel(){
  
    controller.abort();
    signal.addEventListener('abort', () => {
        console.log(signal.aborted);
    });
  
    loader.style = "display:none;"
    document.getElementById("btn-cancel").style = "display:none;"
    document.getElementById("btn-search").disabled = false
  
  }

function insertData(data){

    document.getElementById("tbody").innerHTML = ""
    let ctx = 0
    let date1 = ""
    let date2 = ""
    let date3 = ""
    let fua
  
    $('#tb-data').DataTable().destroy()
/*
    let pro = `<center><i style="color:red;font-size:30px;" class='bx bxs-no-entry'></i></center>`
    `<center><i style="color:green;font-size:30px;" class='bx bxs-check-square'></i></center>`*/

    $("#tbody").html(data.map((d) => {
        
        ctx++

        if(d.FechaIngreso != null){
            date1 = date(d.FechaIngreso.split("T")[0])+" "+d.HoraIngreso
        }else{date1 = "<b>Sin registro</b>"}
        if(d.FechaEgreso != null){date2 = date(d.FechaEgreso.split("T")[0])+" "+d.HoraEgreso
        }else{date2 = "<b>Sin registro</b>"}
        if(d.FechaUltimaReceta != null){date3 = date(d.FechaUltimaReceta.split("T")[0])
        }else{date3 = "<b>Sin registro</b>"}

        if(d.FUA != null){
            fua = d.FUA
        }else{ fua = "<b>Sin registro</b>"}

              return `

              <tr style="cursor: pointer;">
              <td class="minText2">${ctx}</td>
              <td class="minText2">${d.IdCuentaAtencion}</td>
              <td class="minText2">${fua}</td>
              <td class="minText2">${d.Nombres}</td>
              <td class="minText2">${d.NroHistoriaClinica}</td>
              <td class="minText2">${date1}</td>
              <td class="minText2">${date2}</td>
              <td class="minText2">${getStatus(d.estado)}</td>
              <td>${getValue(d.diagnosticos)}</td>
              <td>${getValue(d.procedimientos)}</td>
              <td>${getValue(d.laboratorio)}</td>
              <td>${getValue(d.imagenes)}</td>
              <td>${getValue(d.medicamentos)}</td>
              <td class="minText2">${date3}</td>
              <td><button onclick="openDetails('${encodeURIComponent(JSON.stringify(d))}')" class="btn btn-primary"><i class="bi bi-eye-fill"></i></td>
              </tr>`;
          })
          .join("")
      );

      loader.style = "display:none;"
      document.getElementById("btn-search").disabled = false
      document.getElementById("btn-cancel").style = "display:none;"
      createDatatable()
      time()
    
}


function time() {
  timeout = setTimeout(alertFunc, 1)
}

function alertFunc() {
  document.getElementById("bt").click()
}

function openDetails(d){
    $('#detailModal').modal('show')
    d = JSON.parse(decodeURIComponent(d))

    document.getElementById("content-modal").innerHTML = ''

    let inputs = `<div class="input-group mb-3" style="width:50%;">
    <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1"><b>N°Cuenta</b></span>
    </div>
    <input disabled id="d-account" value="${d.IdCuentaAtencion}" type="text" class="form-control" aria-describedby="basic-addon1">
    </div>
    
    <div class="input-group mb-3" style="width:50%;">
    <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1"><b>Tipo de atención</b></span>
    </div>
    <input disabled id="d-attention" value="${d.TipoAtencion}" type="text" class="form-control" aria-describedby="basic-addon1">
    </div>
    
    `
    $(inputs).appendTo('#content-modal');



}

  function getValue(value){

    let txt = ""

    if(value > 0){
        txt = `<center><i style="color:green;font-size:30px;" class='bi bi-clipboard2-check'></i></center>`
    }else{
        txt = `<center><i style="color:red;font-size:30px;" class='bi bi-clipboard2-x'></i></center>`
    }

    return txt

  }


  function getStatus(status){

    if(status == "Registrado"){
        status = `<label style="color:green;">${status}</label>`
    }else if(status == "Anulado"){
        status= `<label style="color:red;">${status}</label>`
    }else{
        status= `<label style="color:black;">${status}</label>`
    }

    return status

  }

  
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