
var params = [] 
var params2 = [] 
var dniResp = 71853201
var log = ""
var rclog = ""
var c = 0
var c2 = 0
var atencion = ``
var diagnostico = ``
var medicamentos = ``
var insumos = ``
var procedimientos = ``
var smi = ``
var ser = ``
var rn = ``
var res = ``
var duplexAccount = []
var catalog = []
var notFound = []
let ctxG = 1
let errors = []
var resultadoArray = [];
var rcData = []
var insNotRegister = ["10249","10244","10248","27854","20842"]
var typeMedicUser = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","25","26"]
let onlySMI = ['050','054','055','017', '019', '020', '911', '021', '022', '024', '053', '056', '057', '058', '059', '060', '061', '062', '063', '064', '069', '070', '071', '074', '075', '200', '900', '901', 'S01', '904', '906', '065', '066', '067', '068', '111', '065', '067', '068'];
var jsonAPISMI = []
var jsonArfsisObs = []
var pacientesAtendidos = {}

yearLater()
createDatatable()
createDatatable2()
createDatatable3()
createDatatable5()
createDatatable6()
createDatatable4()
createDatatable7()
createDatatable8()
arrayParams()

var inputWeight = document.getElementById('i-weight');
var inputHeight = document.getElementById('i-tail');
var imcResult = document.getElementById('i-imc');

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

// Agregar eventos de entrada a los inputs para que se actualice el IMC en tiempo real
inputWeight.addEventListener('input', actualizarIMC);
inputHeight.addEventListener('input', actualizarIMC);

function arrayParams(){
    for(let i = 1 ; i<= 88 ; i++){
        if(i == 1){
            params.push("x")
        }
        let x = 'A'+i.toString()
        params.push(x)
    }

    for(let i = 1 ; i<= 5 ; i++){
        if(i == 1){
            params2.push("x")
        }
        let x = 'A'+i.toString()
        params2.push(x)
    }

}

function yearLater(){

  var select2 = document.getElementById("inputGroupSelectYearSend2");
  
  // Obtener el año actual
  var currentYear = new Date().getFullYear();

  for (var i = currentYear - 3; i <= currentYear; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    
    // Establecer el año actual como seleccionado por defecto
    if (i === currentYear) {
      option.selected = true;
    }
    
    select2.appendChild(option);
  }

}

function createDatatable(){

    $('#tb-data').DataTable({
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
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();

}

function createDatatable2(){
    $('#tb-data-2').DataTable({
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
  
      var table = $('#tb-data-2').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

function createDatatable3(){
    $('#tb-data-3').DataTable({
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
  
      var table = $('#tb-data-3').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

function createDatatable4(){
    $('#tb-data-4').DataTable({
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
  
      var table = $('#tb-data-4').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

function createDatatable5(){
    $('#tb-data-5').DataTable({
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
  
      var table = $('#tb-data-5').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

function createDatatable6(){
    $('#tb-data-6').DataTable({
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
  
      var table = $('#tb-data-6').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}
function createDatatable7(){
    $('#tb-data-7').DataTable({
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
  
      var table = $('#tb-data-7').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}
function createDatatable8(){
    $('#tb-data-8').DataTable({
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
  
      var table = $('#tb-data-8').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}


function query(){

    c = 0
    log = ""
    errors = []
    duplexAccount = []
    pacientesAtendidos = {}
    document.getElementById("errors").style = "display:none;"
    document.getElementById("duplex").style = "display:none;"
    document.getElementById("accountDuplex").style = "display:none;"
    let FECHAINI = document.getElementById("fechaini").value
    let FECHAFIN = document.getElementById("fechafin").value
    let mes_SEND= document.getElementById("inputGroupSelectProductionMonth2").value
    let anio_SEND = document.getElementById("inputGroupSelectYearSend2").value
   

    if(FECHAINI != "" && FECHAFIN != ""){
      if(FECHAINI < FECHAFIN){

        let r1 = document.getElementById("rd1")
        let r2 =document.getElementById("rd2")
        let div1 = document.getElementById("div-file-arfsis");
        let div2 = document.getElementById("div-table-fua-especific");
        let tbodyEspecific = document.getElementById("tbodyEspecific")
        r1.checked = false
        r2.checked = false
        div1.style = "display:none;"
        div2.style = "display:none;"
        tbodyEspecific.innerHTML = ""

        fetchTramaAtencion(FECHAINI,FECHAFIN,mes_SEND,anio_SEND)
        fetchTramaDiagnostico(FECHAINI,FECHAFIN)
        fetchTramaInsumos(FECHAINI,FECHAFIN)
        fetchTramaMedicamentos(FECHAINI,FECHAFIN)
        fetchTramaProcedimientos(FECHAINI,FECHAFIN)
        fetchTramaSMI(FECHAINI,FECHAFIN)
        fetchTramaSER(FECHAINI,FECHAFIN)
        fetchTramaRN(FECHAINI,FECHAFIN)
      }else{
        Swal.fire(
          'Oops',
          'La fecha inicial debe ser menor que la final!',
          'info'
        )
      }
    }else{
      Swal.fire(
        'Oops',
        'Complete los campos!',
        'info'
      )
    }

}

function queryEspecific(){
  c = 0
  log = ""
  errors = []
  duplexAccount = []
  pacientesAtendidos = {}
  document.getElementById("errors").style = "display:none;"
  document.getElementById("duplex").style = "display:none;"
  document.getElementById("accountDuplex").style = "display:none;"
  let mes_SEND= document.getElementById("inputGroupSelectProductionMonth2").value
  let anio_SEND = document.getElementById("inputGroupSelectYearSend2").value

  fetchTramaAtencionEspecificos(mes_SEND,anio_SEND)
  fetchTramaDiagnosticosEspecificos()
  fetchTramaInsumosEspecificos()
  fetchTramaMedicamentosEspecificos()
  fetchTramaProcedimientosEspecificos()
  fetchTramaSMIEspecificos()
  fetchTramaRNEspecificos()
 
}

function fetchTramaAtencion(FECHAINI,FECHAFIN,mes_SEND,anio_SEND){

        document.getElementById("body").style = "display:none;"
        disabledButtons()
        
        fetch(`${url}/trama-atencion/${FECHAINI}/${FECHAFIN}/${mes_SEND}/${anio_SEND}`,{
            method: 'get',
            headers: {
              'Accept': 'application/json'
            }
        })
          .then(response => response.json())
          .then(data => {

            insertDataAtencion(data)

          }).catch(err => {
            
            console.log(err)
            enableButtons()
          }); 

}

function fetchTramaAtencionEspecificos(mes_SEND,anio_SEND){

  document.getElementById("body").style = "display:none;"
  disabledButtons()
  
  fetch(`${url}/trama-atencion-especificos/${mes_SEND}/${anio_SEND}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataAtencion(data)
      }else{
        $('#tb-data').DataTable().clear().draw();
      }
     
    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}


function fetchTramaDiagnostico(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-diagnostico/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataDiagnostico(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaDiagnosticosEspecificos(){


  fetch(`${url}/trama-diagnostico-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataDiagnostico(data)
      }else{
        $('#tb-data-2').DataTable().clear().draw();
      }

    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function fetchTramaMedicamentos(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-medicamentos/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataMedicamentos(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaMedicamentosEspecificos(){

  fetch(`${url}/trama-medicamentos-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataMedicamentos(data)
      }else{
        $('#tb-data-5').DataTable().clear().draw();
      }
      
    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function fetchTramaInsumos(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-insumos/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataInsumos(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaInsumosEspecificos(){


  fetch(`${url}/trama-insumos-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataInsumos(data)
      }else{
        $('#tb-data-3').DataTable().clear().draw();
      }
      
    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function fetchTramaProcedimientos(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-procedimientos/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataProcedimientos(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaProcedimientosEspecificos(){


  fetch(`${url}/trama-procedimientos-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataProcedimientos(data)
      }else{
        $('#tb-data-6').DataTable().clear().draw();
      }

    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function fetchTramaSMI(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-smi/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataSMI(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaSMIEspecificos(){


  fetch(`${url}/trama-smi-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataSMI(data)
      }else{
        $('#tb-data-4').DataTable().clear().draw();
      }
      
    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function fetchTramaSER(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-ser/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataSER(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaSEREspecificos(){


  fetch(`${url}/trama-ser-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
    
      if(data.error != "sin datos"){
        insertDataSER(data)
      }else{
        $('#tb-data-7').DataTable().clear().draw();
      }
 
    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function fetchTramaRN(FECHAINI,FECHAFIN){


    fetch(`${url}/trama-rn/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        insertDataRN(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 

}

function fetchTramaRNEspecificos(){


  fetch(`${url}/trama-rn-especificos`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      if(data.error != "sin datos"){
        insertDataRN(data)
      }else{
        $('#tb-data-8').DataTable().clear().draw();
      }

    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 

}

function insertDataAtencion(data){
  
    
    document.getElementById("tbody").innerHTML = ""
    $('#tb-data').DataTable().destroy()

    $("#tbody").html(data.map((d) => {
        const cells = params.map(param => {
            if (param == 'x') {

                return validateDataATE(d)

                
            } else {
                return `<td class="minText4">${d[param]}</td>`;
            }
        }).join("");
    return `<tr style="cursor: pointer;">${cells}</tr>`;
    }).join(""));

    setTimeout(function() {
        document.getElementById("logATE").click();
        document.getElementById("logDIA").click();
        document.getElementById("logINS").click();
        document.getElementById("logMED").click();
        document.getElementById("logPRO").click();
        document.getElementById("logSMI").click();
        document.getElementById("logRN").click();
      }, 500);

      createDatatable()
      document.getElementById("body").style = "display:block;"
    
      setTimeout(function() {
        enableButtons()
        buscarDuplicados(duplexAccount)

        if(c>0){
          document.getElementById("errors").style = "font-weight:bold;color:red;display: inline-block;margin-right: 20px;"
          document.getElementById("errors").innerHTML = "Errores encontrados : &nbsp;"+c.toString()
        }else{
          document.getElementById("errors").style = "display: inline-block;margin-right: 10px;font-weight:bold;color:green;"
          document.getElementById("errors").innerHTML = "Ningún error encontrado!"
        }

      }, 5000);

     

}

function insertDataDiagnostico(data){
  
    
    document.getElementById("tbody2").innerHTML = ""
    $('#tb-data-2').DataTable().destroy()

    $("#tbody2").html(data.map((d) => {
        const cells = params2.map(param => {

            if (param == 'x') {

                return `<td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>`

                
            } else {
                return `<td class="minText4">${d[param]}</td>`;
            }
        }).join("");
    return `<tr style="cursor: pointer;">${cells}</tr>`;
    }).join(""));

      createDatatable2()

}

function insertDataMedicamentos(data){

    document.getElementById("tbody5").innerHTML = ""
    $('#tb-data-5').DataTable().destroy()

    $("#tbody5").html(data.map((d) => {
        const cells = params2.map(param => {

            if (param == 'x') {

                return `<td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>`

                
            } else {
                return `<td class="minText4">${d[param]}</td>`;
            }
        }).join("");
    return `<tr style="cursor: pointer;">${cells}</tr>`;
    }).join(""));
   createDatatable5()
    
}

function insertDataInsumos(data){
  
    
    document.getElementById("tbody3").innerHTML = ""
    $('#tb-data-3').DataTable().destroy()

    $("#tbody3").html(data.map((d) => {
        
              return `
              <tr style="cursor: pointer;">
              <td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>
              <td class="minText4">${d.A1}</td>
              <td class="minText4">${d.A2}</td>
              <td class="minText4">${d.A3}</td>
              <td class="minText4">${d.A4}</td>
              <td class="minText4">${d.A5}</td>
              </tr>`;

    }).join(""));

      createDatatable3()

}

function insertDataProcedimientos(data){
  

    document.getElementById("tbody6").innerHTML = ""
    $('#tb-data-6').DataTable().destroy()

    $("#tbody6").html(data.map((d) => {
        
        let it = (d.Items).split("|")
  
              return `
              <tr style="cursor: pointer;">
              <td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>
              <td class="minText4">${it[0]}</td>
              <td class="minText4">${it[1]}</td>
              <td class="minText4">${it[2]}</td>
              <td class="minText4">${it[3]}</td>
              <td class="minText4">${it[4]}</td>
              <td class="minText4">${it[5]}</td>
              <td class="minText4">${it[6]}</td>
              </tr>`;
          })
          .join("")
      );

      createDatatable6()

}


function insertDataSMI(data){
  
   
    document.getElementById("tbody4").innerHTML = ""
    $('#tb-data-4').DataTable().destroy()
    jsonAPISMI = []

    $("#tbody4").html(data.map((d) => {
        
        let it = (d.items).split("|") //XDDD

        jsonAPISMI.push({
          cuenta:it[0],
          actividad : it[1],
          valor: it[2]
        })

              return `
              <tr style="cursor: pointer;">
              <td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>
              <td class="minText4">${it[0]}</td>
              <td class="minText4">${it[1]}</td>
              <td class="minText4">${it[2]}</td>
              </tr>`;
          })
          .join("")
      );

      createDatatable4()

}

function insertDataSER(data){
  

    document.getElementById("tbody7").innerHTML = ""
    $('#tb-data-7').DataTable().destroy()

    if(data.length >0){
        $("#tbody7").html(data.map((d) => {

            let it = (d.items).split("|")

              return `
              <tr style="cursor: pointer;">
              <td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>
              <td class="minText4">${it[0]}</td>
              <td class="minText4">${it[1]}</td>
              </tr>`;
        
          })
          .join("")
      ); 
      createDatatable7()

    }else{
        createDatatable7()
    }
     
}


function insertDataRN(data){
  
  if(data[0].error != "sin datos"){
    document.getElementById("tbody8").innerHTML = ""
    $('#tb-data-8').DataTable().destroy()

    $("#tbody8").html(data.map((d) => {
        
        let it = (d.values).split("|")

              return `
              <tr style="cursor: pointer;">
              <td class="minText4"><button class="btn btn-success" onclick="alert('0 Errores')"><i class="bi bi-file-check"></i></button></td>
              <td class="minText4">${it[0]}</td>
              <td class="minText4">${it[1]}</td>
              <td class="minText4">${it[2]}</td>
              <td class="minText4">${it[3]}</td>
              <td class="minText4">${it[4]}</td>
              <td class="minText4">${it[5]}</td>
              <td class="minText4">${it[6]}</td>
              <td class="minText4">${it[7]}</td>
              <td class="minText4">${it[8]}</td>
              <td class="minText4">${it[9]}</td>
              <td class="minText4">${it[10]}</td>
              <td class="minText4">${it[11]}</td>
              <td class="minText4">${it[12]}</td>
              <td class="minText4">${it[13]}</td>
              </tr>`;
          })
          .join("")
      );
      createDatatable8()
  }
   
}



function disabledButtons(){
loader.style = "display:block;"
document.getElementById("btn-logs").disabled = true
document.getElementById("btn-logsx").disabled = true
document.getElementById("btn-trama-report").disabled = true
document.getElementById("btn-rc").disabled = true
document.getElementById("btn-rcx").disabled = true
document.getElementById("btn-query").disabled = true
document.getElementById("btn-send-debug").disabled = true
document.getElementById("btn-especific").disabled = true
}

function enableButtons(){
loader.style = "display:none;"
document.getElementById("btn-logs").disabled = false
document.getElementById("btn-logsx").disabled = false
document.getElementById("btn-trama-report").disabled = false
document.getElementById("btn-rc").disabled = false
document.getElementById("btn-rc").style = "display:block;"
document.getElementById("btn-rcx").disabled = false
document.getElementById("btn-query").disabled = false
document.getElementById("btn-send-debug").disabled = false
document.getElementById("btn-logs").style = "display:block;"
document.getElementById("btn-trama-report").style = "display:block;"
document.getElementById("btn-especific").disabled = false
}

function enableButtonsError(){
  loader.style = "display:none;"
  document.getElementById("btn-rc").style = "display:none;"
  document.getElementById("btn-rc").disabled = false
  document.getElementById("btn-rcx").disabled = false
  document.getElementById("btn-logs").style = "display:none;"
  document.getElementById("btn-logs").disabled = false
  document.getElementById("btn-logsx").disabled = false
  document.getElementById("btn-trama-report").style = "display:none;"
  document.getElementById("btn-trama-report").disabled = false
  document.getElementById("btn-query").disabled = false
  document.getElementById("btn-send-debug").disabled = false
  document.getElementById("btn-especific").disabled = false
  }

function validateData(d){

    let ctx = 0
  
    if(d["A1"].length > 6){
        ctx++
    }


   return counter(ctx)

}

function validateDataATE(d){

  duplexAccount.push(d["A1"])

  var fechaNacimientoString = d["A30"];
  var partesFechaNacimiento = fechaNacimientoString.split('/');
  var fechaNacimiento = new Date(partesFechaNacimiento[2], partesFechaNacimiento[1] - 1, partesFechaNacimiento[0]);

  // Fecha y hora de atención en formato DD/MM/YYYY HH:mm
  var fechaAtencionString = d["A39"];
  var partesFechaAtencion = fechaAtencionString.split(' ');
  var partesFecha = partesFechaAtencion[0].split('/');
  var partesHora = partesFechaAtencion[1].split(':');
  var fechaAtencion = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0], partesHora[0], partesHora[1]);


    let ctx = 0
  
    if(d["A17"] == "" && d["A42"] == '056'){
        ctx++
        c++
        let warning = `SIN REGISTRO EN LOS CAMPOS DE AFILIACIÓN`
        errors.push({
          '#':c,
          'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
          ' CUENTA ' : `${d["A1"]}`,
          ' DIGITADOR ': `${d["A87"]}`,
          ' SERVICIO ': `${d["A88"]} `
        })
        //searchAndUpdateAtentionFromAfiliate(d["A26"],d["A27"],d["A28"])
    }

    if(d["A20"] == ""){
      ctx++
      c++
      let warning = `EL CAMPO ATE#20 (CONTRATO DEL ASEGURADO) NO DEBE SER VACÍO`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }
    if (d["A81"].trim() === "1" && (d["A82"].trim() === "" || d["A82"].trim().length !== 8)) {
      ctx++;
      c++;
      let warning = `EL CAMPO ATE#82 (N° DOC DEL DIGITADOR) DEBE TENER 8 DIGITOS DE ACUERDO AL CAMPO ATE#81 (TIPO DE DOCUMENTO DIGITADOR)`;
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
  }
    if(d["A24"] == ""){
      ctx++
      c++
      let warning = `EL CAMPO ATE#24 TIPO DE DOCUMENTO DEL ASEGURADO TIENE UN VALOR NO PERMITIDO`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }
    if(d["A42"].length != 3){
      ctx++
      c++
      let warning = `EL CAMPO ATE#42 DEBE SER UN CAMPO ALFANUMÉRICO DE 3 DIGITOS`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }
    if(d["A42"] == '054' && d["A47"] == ''){
      ctx++
      c++
      let warning = `SE REQUIERE UNA FECHA DE ALTA DE HOSPITALIZACIÓN`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A34"] == '2' && d["A43"] != '3' && d["A40"] == ''){
      ctx++
      c++
      let warning = `EL CAMPO ATE#40 (IPRESS DE REFERENCIA) ES REQUERIDO`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }
    if(d["A18"] == ""){
      ctx++
      c++
      let warning = `EL CAMPO ATE#18 (NUMERO DEL CODIGO DE ASEGURADO) DEBE DE SER UN CAMPO ALFANUMERICO DE 8 O 9 DIGITOS`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A21"] == ""){
      ctx++
      c++
      let warning = `EL CAMPO ATE#21 (REGISTRO DEL ASEGURADO) DEBE SER UN CAMPO HASTA 10 DIGITOS`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A40"] != "" && d["A34"] == "1" && d["A43"] == "1"){
      ctx++
      c++
      let warning = `EL CAMPO ATE#40 (IPRESS DE REFERENCIA) DEBE SER VACIO SEGUN EL CAMPO ATE#34 (TIPO DE ATENCION) Y AL CAMPO ATE43 (ORIGEN DE PERSONAL)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A24"] == "8" && d["A25"].length < 10){
      ctx++
      c++
      let warning = `EL CAMPO ATE#25 (NRO DE DOCUMENTO DEL ASEGURADO) DEBE SER DE 10 DIGITOS DE ACUERDO AL CAMPO #ATE24 (TIPO DE DOCUMENTO DEL ASEGURADO)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A24"] == "2" && d["A25"] != ""){
      ctx++
      c++
      let warning = `EL CAMPO #ATE25 DEBE SER VACIO SEGUN EL TIPO DE DOCUMENTO (2)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A17"] == "E" && d["A25"] != ""){
      ctx++
      c++
      let warning = `NO DEBE EXISTIR UN NUMERO DE DOCUMENTO SEGUN EL TIPO DE AFILIACIÓN (E)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    /*
    if (d["A41"] != "" && containCharactersNotPermition(d["A41"])) {
      ctx++
      c++
      let warning = `${c}.- EL CAMPO ATE#41 (HOJA DE REFERENCIA) DEBE DE SER UN CAMPO ALFANUMERICO DE HASTA 20 DIGITOS -> N° DE CUENTA : ${d["A1"]} ; DIGITADOR : ${d["A87"]} ; SERVICIO : ${d["A88"]}`
      log = log+warning+"\r\n\r\n"
    }*/

      if(d["A72"] == "1" && d["A73"].length > 8){
      ctx++
      c++
      let warning = `EL CAMPO ATE#73 (NUMERO DE DOCUMENTO DEL PERSONAL) DEBE CONSIGNAR 8 DIGITOS DE ACUERDO AL CAMPO ATE#72 (TIPO DE DOCUMENTO DEL PERSONAL)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

  if (d["A35"] == "2" && d["A50"] == "") {
      ctx++
      c++
      let warning = `EL CAMPO ATE#50 (FECHA DE PARTO) DEBE DE CUMPLIR EL FORMATO DD/MM/AAAA Y SER UNA FECHA VALIDA`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if (d["A35"] == "1" && d["A50"] == "") {
      ctx++
      c++
      let warning = `EL CAMPO ATE#50 (FECHA DE PARTO) DEBE DE CUMPLIR EL FORMATO DD/MM/AAAA Y SER UNA FECHA VALIDA`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if (d["A35"] == "0"  && d["A50"].length > 0) {
      ctx++
      c++
      let warning = `EL CAMPO ATE#50 (FECHA DE PARTO) DEBE SER VACIO SEGÚN AL CAMPO ATE#35`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A24"] == "3" && d["A25"].length < 9){
      ctx++
      c++
      let warning = `EL CAMPO ATE#25 (NUMERO DE DOCUMENTO DEL ASEGURADO) DEBE CONSIGNAR 9 DIGITOS DE ACUERDO AL CAMPO ATE#24 (TIPO DE DOCUMENTO DEL ASEGURADO)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A24"] == "1" && d["A25"].length > 8){
      ctx++
      c++
      let warning = `EL CAMPO ATE#25 (NUMERO DE DOCUMENTO DEL ASEGURADO) DEBE CONSIGNAR 8 DIGITOS DE ACUERDO AL CAMPO ATE#24 (TIPO DE DOCUMENTO DEL ASEGURADO)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(d["A34"] == "2" && d["A41"] == ""){
      ctx++
      c++
      let warning = `EL CAMPO ATE#41 (HOJA DE REFERENCIA) ES REQUERIDO DE ACUERDO AL CAMPO ATE#34 (TIPO DE ATENCION) Y AL CAMPO ATE#43 (TIPO DE PERSONAL)`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
    }

    if(!containNumbersDni(d["A24"])){
      ctx++
      c++
      let warning = `EL CAMPO ATE#25 (NUMERO DE DOCUMENTO DEL ASEGURADO) DEBE TENER SOLO NÚMEROS`
      errors.push({
        '#':c,
        'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
        ' CUENTA ' : `${d["A1"]}`,
        ' DIGITADOR ': `${d["A87"]}`,
        ' SERVICIO ': `${d["A88"]} `
      })
   }

   if(d["A21"] == d["A25"]){
    ctx++
    c++
    let warning = `ERROR DE AFILIACION (ID_SIASIS = DNI)`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

  if(d["A42"] == "065" && d["A47"] == "" || d["A42"] == "067" && d["A47"] == ""){
    ctx++
    c++
    let warning = `EL CAMPO ATE#47 (FECHA DE ALTA DE HOSPITALIZACION) ES REQUERIDO DE ACUERDO AL CAMPO ATE#42 (SERVICIO DE LA ATENCION)`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

  if(d["A42"] == "056" && d["A46"] != ""){
    ctx++
    c++
    let warning = `EL CAMPO ATE#46 (FECHA DE INGRESO A HOSPITALIZACION) DEBE SER VACIO DE ACUERDO AL CAMPO ATE#42 (SERVICIO DE LA ATENCION)`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

  if(d["A25"].length > 9 && d["A24"] == "3"){
    ctx++
    c++
    let warning = `EL CAMPO ATE#25 (NUMERO DE DOCUMENTO DEL ASEGURADO) DEBE CONSIGNAR 9 DIGITOS DE ACUERDO AL CAMPO ATE#24 (TIPO DE DOCUMENTO DEL ASEGURADO)`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

  if (fechaAtencion < fechaNacimiento) {
    ctx++
    c++
    let warning = `EL CAMPO ATE#39 (FECHA Y HORA DE ATENCION) NO DEBE DE SER ANTERIOR A LA FECHA DE NACIMIENTO DEL ASEGURADO`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

  if(d["A42"] ===  ""){
    ctx++
    c++
    let warning = `EL CAMPO ATE#42 CODIGO DE PRESTACION SE ENCUENTRA VACÍO`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

  if(!buscarCodPrestacion(d["A42"])){
    ctx++
    c++
    let warning = `EL CAMPO ATE#42 CODIGO DE PRESTACION INCORRECTO`
    errors.push({
      '#':c,
      'ERRORES DE INCONSISTENCIA DE DATOS/DIGITACIÓN DETECTADOS':warning,
      ' CUENTA ' : `${d["A1"]}`,
      ' DIGITADOR ': `${d["A87"]}`,
      ' SERVICIO ': `${d["A88"]} `
    })
  }

   return counter(ctx,d)

}

function buscarCodPrestacion(cod) {
  // Definir el array de datos
  const datos = [
      "001", "002", "005", "007", "008", "009", "010", "011", "013", "015",
      "016", "017", "018", "019", "020", "021", "022", "023", "024", "025",
      "026", "027", "028", "029", "050", "051", "052", "053", "054", "055",
      "056", "057", "058", "059", "060", "061", "062", "063", "064", "065",
      "066", "067", "068", "069", "070", "071", "074", "075", "117", "118",
      "119", "200", "900", "901", "902", "903", "904", "906", "907", "908",
      "909", "910", "911", "S01", "S02"
  ];

  return datos.includes(cod);
}

function containCharactersNotPermition(value) {
  // Usamos una expresión regular para verificar si el dato contiene caracteres no permitidos.
  // La expresión regular /^[0-9.]+$/ coincidirá con cadenas que contengan solo números y un punto decimal.
  // Si el dato contiene algún otro carácter, la función retornará true; de lo contrario, retornará false.
  return !/^[0-9.]+$/.test(value);
}

function containNumbersDni(data){
 return /^\d+$/.test(data);
}

function validateDataOnlyValue(v){
    let ctx = 0
  
    if(v == "1012567"){
        ctx++
    }


   return counter(ctx)
}

function counter(ctx,d){

    let value = ""

    if(ctx > 0){
        d.A29 = containComilla(d.A29)
        value = `<td class="minText2"><button class="btn btn-danger" onclick="showDetailModal('${encodeURIComponent(JSON.stringify(d))}')"><i class="bi bi-eye-fill"></i></button></td>`
    }else{
        d.A29 = containComilla(d.A29)
        value = `<td class="minText2"><button class="btn btn-success" onclick="showDetailModal('${encodeURIComponent(JSON.stringify(d))}')"><i class="bi bi-file-check"></i></button></td>`
    }

    return value

}

function containComilla(val){
  if(val.includes("'")){
    val = val.split("'")[0]+val.split("'")[1]
  }
  return val
}

function donwloadLog(){

// Crear un enlace de descarga dinámico
/*const link = document.createElement('a');
link.href = URL.createObjectURL(new Blob([log], { type: 'text/plain' }));
link.download = 'logs.txt';
link.click();*/
let selectElement = document.getElementById("inputGroupSelectProductionMonth2")
 // Obtener la opción seleccionada
 var opcionSeleccionada = selectElement.options[selectElement.selectedIndex];
 // Obtener el contenido de la opción seleccionada
 var m = (opcionSeleccionada.textContent).toUpperCase();

 if(errors.length == 0){
  Swal.fire(
    'Oops!',
    'No se encontraron errores',
    'success'
  )
 }else{
  let xls = new XlsExport(errors, 'errores');
  xls.exportToXLS(`REPORTE_ERRORES_TRAMA_${m}.xls`)
 }

}

function sendTrama(ATENCION,ATENCIONDIA,ATENCIONMED,ATENCIONINS,ATENCIONPRO,ATENCIONSMI,ATENCIONSER,ATENCIONRN,RESUMEN,NAMEZIP,n){

    let data = {
        ATENCION:ATENCION,
        ATENCIONDIA:ATENCIONDIA,
        ATENCIONMED:ATENCIONMED,
        ATENCIONINS:ATENCIONINS,
        ATENCIONPRO:ATENCIONPRO,
        ATENCIONSMI:ATENCIONSMI,
        ATENCIONSER:ATENCIONSER,
        ATENCIONRN:ATENCIONRN,
        RESUMEN : RESUMEN,
        nameTrama : NAMEZIP
    }

    if(n != 0){
      fetch(`${url}/send-trama/`, {
        method: 'POST', // o 'PUT', 'DELETE', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // data es un objeto con los datos a enviar
      })
      .then(response => response.json())
      .then(data => {
         if(data.length > 0){
            Swal.fire(
                'Muy bien',
                'Trama enviada!',
                'success'
              )
              enableButtons()
         }
      })
      .catch(error => {
          Swal.fire(
            'Muy bien',
            'Paquete generado!',
            'success'
          )
          enableButtons()
        console.error(error)
        
    });
  }else{
    fetch(`${url}/send-trama-debug/`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
    
      console.log(data)
      //AQUIIII

      /*
       if(data.length > 0){
            showDataResponse(data[0].server_response)
            enableButtons()
       }*/

       $('#modalDownload').modal('show');
       document.getElementById("nameZip").innerHTML = data[0].server_response

      enableButtons()

    })
    .catch(error => {
      Swal.fire(
        'Muy bien',
        'Paquete generado!',
        'success'
      )
      enableButtons()
      console.error(error)
  });
  }
}


function postTrama(n){

  let FECHAINI = document.getElementById("fechaini").value
  let FECHAFIN = document.getElementById("fechafin").value
  let mes_SEND= document.getElementById("inputGroupSelectProductionMonth2").value
  let anio_SEND = document.getElementById("inputGroupSelectYearSend2").value

    atencion = ``
    diagnostico = ``
    medicamentos = ``
    insumos = ``
    procedimientos = ``
    smi = ``
    ser = ``
    rn = ``
    res = ``

    var tablaATE = $('#tb-data-3').DataTable();
    var filaATE = tablaATE.rows().count();

    if(filaATE > 0){

      let r1 = document.getElementById("rd1")
      let r2 =document.getElementById("rd2")

      if(r1.checked || r2.checked){
        Swal.fire(
          'Oops!',
          'Debe volver a consultar la trama antes de generar!',
          'info'
        )
      }else{
        disabledButtons()
        sendAllTramas(FECHAINI,FECHAFIN,mes_SEND,anio_SEND,n)
      }

     
    }else{
      Swal.fire(
        'Oops!',
        'Consulte la trama antes de generar',
        'warning'
      )
    }

  

}

function sendAllTramas(FECHAINI,FECHAFIN,mes_send,anio_send,n){
    
    fetch(`${url}/get-trama-atencion/${FECHAINI}/${FECHAFIN}/${mes_send}/${anio_send}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
        let ctx = 0
   
        data.forEach(e => {
            let value = e.items
            ctx++
            if(data.length != ctx){
                atencion += value+"\n"
            }else{
                atencion += value
            }
        });

        getTramaDiagnostico(FECHAINI,FECHAFIN,n)

      }).catch(err => {
        
        console.log(err)
        enableButtonsError()
      }); 

}

function getTramaDiagnostico(FECHAINI,FECHAFIN,n){

    
    fetch(`${url}/get-trama-diagnostico/${FECHAINI}/${FECHAFIN}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        let ctx = 0
   
        data.forEach(e => {
            let value = e.items
            ctx++
            if(data.length != ctx){
                diagnostico += value+"\n"
            }else{
                diagnostico += value
            }
        });
        getTramaMedicamentos(FECHAINI,FECHAFIN,n)

      }).catch(err => {
        
        console.log(err)
        enableButtonsError()
      }); 

}

function getTramaMedicamentos(FECHAINI,FECHAFIN,n){

    
  fetch(`${url}/get-trama-medicamentos/${FECHAINI}/${FECHAFIN}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let ctx = 0
 
      data.forEach(e => {
          let value = e.Items
          ctx++
          if(data.length != ctx){
              medicamentos += value+"\n"
          }else{
              medicamentos += value
          }
      });
      
      getTramaInsumos(FECHAINI,FECHAFIN,n)

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function getTramaInsumos(FECHAINI,FECHAFIN,n){

    
  fetch(`${url}/get-trama-insumos/${FECHAINI}/${FECHAFIN}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let ctx = 0
 
      data.forEach(e => {
          let value = e.Items
          ctx++
          if(data.length != ctx){
              insumos += value+"\n"
          }else{
              insumos += value
          }
      });
      getTramaProcedimientos(FECHAINI,FECHAFIN,n)

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function getTramaProcedimientos(FECHAINI,FECHAFIN,n){

    
  fetch(`${url}/get-trama-procedimientos/${FECHAINI}/${FECHAFIN}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let ctx = 0
 
      data.forEach(e => {
          let value = e.Items
          ctx++
          if(data.length != ctx){
              procedimientos += value+"\n"
          }else{
            procedimientos += value
          }
      });
      getTramaSmi(FECHAINI,FECHAFIN,n)

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function getTramaSmi(FECHAINI,FECHAFIN,n){

    
  fetch(`${url}/get-trama-smi/${FECHAINI}/${FECHAFIN}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          if(data.length != ctx){
              smi += value+"\n"
          }else{
            smi += value
          }
      });
      getTramaSer(FECHAINI,FECHAFIN,n)

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function getTramaSer(FECHAINI,FECHAFIN,n){

    
  fetch(`${url}/get-trama-ser/${FECHAINI}/${FECHAFIN}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let ctx = 0
 
      if(data.length>0){
        data.forEach(e => {
          let value = e.items
          ctx++
          if(data.length != ctx){
              ser += value+"\n"
          }else{
            ser += value
          }
      });
      getTramaRn(FECHAINI,FECHAFIN,n)
      }else{
        getTramaRn(FECHAINI,FECHAFIN,n)
      }
      
    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function getTramaRn(FECHAINI,FECHAFIN,n){

    
  fetch(`${url}/get-trama-rn/${FECHAINI}/${FECHAFIN}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let ctx = 0

      if(data[0].error != "sin datos"){
        data.forEach(e => {
          let value = e.items
          ctx++
          if(data.length != ctx){
              rn += value+"\n"
          }else{
            rn += value
          }
      });
      
      }

    let anio = document.getElementById("inputGroupSelectYearSend2").value
    let mes = document.getElementById("inputGroupSelectProductionMonth2").value  

    getLastCorrelative(anio,mes,n)
      
    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function getLastCorrelative(anio,mes,n){

  var correlative = '00000'
    
  fetch(`${url}/get-last-correlative/${anio}/${mes}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
  
      let x = data[0].correlativo
      let monthOfSend = document.getElementById("inputGroupSelectProductionMonth2").value
  
      if(x != null){
        correlative = x
        setResum(correlative,anio,monthOfSend,n)
      }else{
        setResum(correlative,anio,monthOfSend,n)
      }
      
      
    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function setResum(correlative,anio,mes,n){

  let codReanes = '00002698'
  let nZip = codReanes+anio+padNumber(mes)+nSend(correlative)+'.zip'
  let month = document.getElementById("inputGroupSelectProductionMonth2").value 

  let data = {
    anio: anio,
    mes : month,
    nroEnvio: nSend(correlative),
    nZip : nZip,
    dni: dniResp,
    mesP: mes
  }

  console.log(data)

    fetch(`${url}/send-resum-debug/`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
       if(data.length > 0){
        
        //GET RESUMEN
        getAtencionResumenDebug(anio,month,nSend(correlative),n)
  
       }
    })
    .catch(error => {
      enableButtonsError()
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
      console.error(error)
  });


}


function getAtencionResumenDebug(anio,mes,nEnvio,n){

  let month = document.getElementById("inputGroupSelectProductionMonth2").value 

  fetch(`${url}/get-trama-res-debug/${anio}/${mes}/${nEnvio}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {

    console.log(data)

    var tablaATE = $('#tb-data').DataTable();
    var filaATE = tablaATE.rows().count();

    var tablaDIA = $('#tb-data-2').DataTable();
    var filaDIA = tablaDIA.rows().count();

    var tablaSMI = $('#tb-data-4').DataTable();
    var filaSMI = tablaSMI.rows().count();

    var tablaMED = $('#tb-data-5').DataTable();
    var filaMED = tablaMED.rows().count();

    var tablaINS = $('#tb-data-3').DataTable();
    var filaINS = tablaINS.rows().count();

    var tablaPRO = $('#tb-data-6').DataTable();
    var filaPRO = tablaPRO.rows().count();

    var tablaSER = $('#tb-data-7').DataTable();
    var filaSER = tablaSER.rows().count();

    var tablaRN = $('#tb-data-8').DataTable();
    var filaRN = tablaRN.rows().count();

    let actualYear = new Date().getFullYear()
    let nomPack = (data[0].NomPaquete).replace(/2023/g, "2024");

    res += actualYear.toString()+"\n"
    res += padNumber(month)+"\n"
    res += data[0].NroEnvio+"\n"
    res += nomPack+"\n"
    res += data[0].VersionGTI+"\n"
    res += filaATE.toString()+"\n"
    res += filaSMI.toString()+"\n"
    res += filaDIA.toString()+"\n"
    res += filaMED.toString()+"\n"
    res += filaINS.toString()+"\n"
    res += filaPRO.toString()+"\n"
    res += filaSER.toString()+"\n"
    res += filaRN.toString()+"\n"
    res += data[0].NomApp+"\n"
    res += data[0].VersApp+"\n"
    res += data[0].VersEnvio+"\n"
    res += data[0].IdResp+"\n"
    res += data[0].NroDoc+"\n"
 
    sendTrama(atencion,diagnostico,medicamentos,insumos,procedimientos,smi,ser,rn,res,data[0].NomPaquete,n)

    
  }).catch(err => {
    enableButtonsError()
    console.log(err)
    enableButtons()
  }); 

}

function nSend(n){

  let c = parseInt(n,10)
  c += 1
  let x = ""

  if(c.toString().length == 1){
    x = "0000"+c.toString()
  }else if(c.toString().length == 2){
    x = "000"+c.toString()
  }else if(c.toString().length == 3){
    x = "00"+c.toString()
  }

  return x

}

function padNumber(n){
  let x = n.toString();

  if (x.length === 1) {
    x = x.padStart(2, '0');
  }

  return x

}


function showDataPackage(data){
  var xmlString = data;

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  // Obtener la respuesta SOAP
  var response = xmlDoc.getElementsByTagName("consultarPaqueteResponse")[0];
  
  // Obtener los elementos de la respuesta
  var paqueteEstado = response.getElementsByTagName("paqueteEstado")[0].textContent;
  var pasoDescripcion = response.getElementsByTagName("pasoDescripcion")[0].textContent;
  var pasoEstado = response.getElementsByTagName("pasoEstado")[0].textContent;
  var ateCargadas = response.getElementsByTagName("ateCargadas")[0].textContent;
  var ateDuplicadas = response.getElementsByTagName("ateDuplicadas")[0].textContent;
  var ateConsolidadas = response.getElementsByTagName("ateConsolidadas")[0].textContent;
  var ateObservadas = response.getElementsByTagName("ateObservadas")[0].textContent;
  var ateProduccion = response.getElementsByTagName("ateProduccion")[0].textContent;
  
  document.getElementById("statusP").innerHTML = paqueteEstado
  document.getElementById("descriptionP").innerHTML = pasoDescripcion.replaceAll("�",'ó')
  document.getElementById("statusP2").innerHTML = pasoEstado
  document.getElementById("ateCar").innerHTML = ateCargadas
  document.getElementById("ateDu").innerHTML = ateDuplicadas
  document.getElementById("ateCon").innerHTML = ateConsolidadas
  document.getElementById("ateObs").innerHTML = ateObservadas
  document.getElementById("ateProd").innerHTML = ateProduccion

}

function showDataResponse(data) {
  
  var xmlString = data;

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // Obtener la respuesta SOAP
  var response = xmlDoc.getElementsByTagName("registrarFuaResponse")[0];

  // Obtener el código y el paqueteNombre
  var cod = response.getElementsByTagName("codigo")[0].textContent;
  var status = response.getElementsByTagName("paqueteNombre")[0].textContent;

  if(cod == "0"){
    document.getElementById("cod-resp").innerHTML = cod;
    document.getElementById("mes-resp").innerHTML = "TRAMA ENVIADA CORRECTAMENTE!";
    document.getElementById("pack-resp").innerHTML = status + '.zip';

    $('#modalTramaResponse').modal('show');
  }else{
// Verificar si el elemento "respuesta" existe en la respuesta SOAP
resultadoArray = [];
var resElement = response.getElementsByTagName("respuesta")[0];
var res = resElement ? resElement.textContent : "";
let responseSeparate = res.split("|");

for (let i = 0; i < responseSeparate.length; i++) {
    // Extraer ateId usando una expresión regular
    let ateId = responseSeparate[i].match(/\[ateId: (\d+)\]/);

    // Extraer el mensaje
    let mensajeTexto = responseSeparate[i].replace(/\[ateId: \d+\]/, '').trim();

    // Verificar si se encontró el ateId
    if (ateId && ateId[1]) {
        resultadoArray.push({ Cuenta: ateId[1], Observación: mensajeTexto });
    } else {
        // Manejar el caso en el que la respuesta no sigue el formato esperado
        resultadoArray.push({ Observación: responseSeparate[i].trim() });
    }
}

      document.getElementById("cod-resp").innerHTML = cod;
      document.getElementById("mes-resp").innerHTML = `<b style="color:white">DATOS DE TRAMA CON OBSERVACIONES</b>&nbsp;<button onclick="downloadObserve()" class="btn btn-danger"><i class="bi bi-search"></i>&nbsp;Descargar</button>`;
      document.getElementById("pack-resp").innerHTML = status + '.zip';

      $('#modalTramaResponse').modal('show');
  }

  
}


function downloadObserve(){
  let xls = new XlsExport(resultadoArray, 'observaciones');
  xls.exportToXLS(`TRAMA_OBSERVACIONES.xls`)
}

function openModalPackage(){
  $('#packageModal').modal('show')
}

function validateCatalog(){
  $('#validateCatalogModal').modal('show')
}

function numSend(num){

  let x = ""
  
  if(num.length == 1){
    x = '0000'+num
  }else if(num.length == 2){
    x = '000'+num
  }else{
    x = '00'+num
  }

  return x

}

function showModalFuaEspecific(){
  $('#modalFuaEspecific').modal('show')
}

function addToTableFua(){

  let fuaNum = document.getElementById("fua-num-add").value;
  let loteNum = document.getElementById("inputGroupSelectLote").value;

  if (fuaNum != "" && loteNum != "") {

    let table = document.getElementById('tb-data-especific');
    let tbody = table.getElementsByTagName('tbody')[0];
    let rowS = tbody.getElementsByTagName('tr');

    
    // Verificar si el valor ya existe en alguna fila
    let exist = false;
    for (let i = 0; i < rowS.length; i++) {
      let cell = rowS[i].getElementsByTagName('td')[0];
      let valueCell = cell.innerText || cell.textContent;
      if (valueCell.trim() === fuaNum.trim()) {
        exist = true;
        break;
      }
    }

    if (exist) {
      Swal.fire(
        'Oops!',
        'El número de fua ya existe en la tabla!',
        'info'
      );
    } else {
      let td =
        `<tr>
          <td><center>${loteNum}</center></td>
          <td><center>${fuaNum.padStart(8, "0")}</center></td>
          <td><center>
          <button onclick="deleteItem(this)" class="btn btn-outline-danger minText5">Eliminar</button>
          </center></td>
        </tr>`;
      $(td).appendTo('#tbodyEspecific');
      document.getElementById("fua-num-add").value = "";
    }
  } else {
    Swal.fire(
      'Oops!',
      'Ingrese el FUA!',
      'info'
    );
  }
}

function deleteItem(button){
  var row = button.parentNode.parentNode.parentNode; // Obtener la fila que contiene el botón
  row.parentNode.removeChild(row);
}

function fetchEspecificFua(){

  let r1 = document.getElementById("rd1")
  let r2 =document.getElementById("rd2")

  if(r1.checked){

    var jsonFuas = {
      "values": jsonArfsisObs
    };

     fetch(`${url}/especifics/`, {
        method: 'POST', // o 'PUT', 'DELETE', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonFuas) // data es un objeto con los datos a enviar
      })
      .then(response => response.json())
      .then(data => {
         if(data.success == "insertado"){
          
          queryEspecific()
  
          $('#modalFuaEspecific').modal('hide')
    
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
      }) 


    //excel
  }else if(r2.checked){
    var table = document.getElementById('tb-data-especific');
    var tbody = table.getElementsByTagName('tbody')[0];
    var qBody = tbody.rows.length
  
    if(qBody > 0){
  
      var values = [];
    
      // Recorrer las filas de la tabla
      for (var i = 0; i < tbody.rows.length; i++) {
        var row = tbody.rows[i];
        var cell = row.cells[0]; // Primera celda de la fila
        var cell2 = row.cells[1];
        
        // Obtener el valor y agregarlo al arreglo
        var val = cell.innerText || cell.textContent;
        var val2 = cell2.innerText || cell2.textContent;
        values.push(val.trim()+'|'+val2);
        
      }
      
      // Generar el objeto JSON de ejemplo
      let jsonFuas = {
        "values": values
      };
  
  
      fetch(`${url}/especifics/`, {
        method: 'POST', // o 'PUT', 'DELETE', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonFuas) // data es un objeto con los datos a enviar
      })
      .then(response => response.json())
      .then(data => {
         if(data.success == "insertado"){
          
          queryEspecific()
  
          $('#modalFuaEspecific').modal('hide')
    
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
      }) 
  
    }else{
      Swal.fire(
        'Oops!',
        'Agrege datos a la tabla',
        'info'
      );
    }
  }else{
    Swal.fire(
      'Oops',
      'Seleccione una opción!',
      'info'
    )
  }
  
}

function showDetailModal(d){
  d = JSON.parse(decodeURIComponent(d))
  $('#modalDetail').modal('show')

  document.getElementById("loaderAfi").style = "display:block;"
  document.getElementById("checkbox1").checked = false
  document.getElementById("checkbox2").checked = false
  document.getElementById("fua-date-pregnancy").value = ""

  document.getElementById("d-smi-age").style = "display:none;"
  document.getElementById("d-smi-weight-tail").style = "display:none;"
  document.getElementById("d-smi-apgar").style = "display:none;"
  document.getElementById("d-smi-bcg-hb").style = "display:none;"
  document.getElementById("d-smi-pa").style = "display:none;"

  document.getElementById("afi-disa").value = ''
  document.getElementById("afi-type").value = ''
  document.getElementById("afi-num").value = ''
  document.getElementById("afi-siasis").value = ''
  document.getElementById("web-service-fullname").innerHTML = ''

  document.getElementById("web-formato").value = d.A25
  document.getElementById("d-ape-p").value = d.A26
  document.getElementById("d-ape-m").value = d.A27
  document.getElementById("d-name-1").value = d.A28
  document.getElementById("d-name-2").value = isUndefined((d.A29))
  document.getElementById("d-name-3").value = isUndefined2((d.A29))

  document.getElementById("tbodyD").innerHTML = ""
  document.getElementById("d-lote").innerHTML = d.A3
  document.getElementById("d-account").innerHTML = (d.A1).trimEnd()
  document.getElementById("d-name").innerHTML = d.A26+" "+d.A27+" "+d.A28
  document.getElementById("d-idpatient").innerHTML = d.A89

  document.getElementById("fua-id-ate").value = d.A42
  document.getElementById("inputGroupSelectTypeAte").value = d.A34

  document.getElementById("inputGroupSelectTypeDni").value = d.A24
  document.getElementById("fua-patient-dni").value = d.A25
  document.getElementById("fua-date-birth").value = (d.A30).split("/")[2]+'-'+(d.A30).split("/")[1]+'-'+(d.A30).split("/")[0]
  
  document.getElementById("fua-num-ipress").value = ""
  document.getElementById("fua-num-ipress").value = d.A40

  document.getElementById("fua-num-paper-reference").value = ""
  document.getElementById("fua-num-paper-reference").value = d.A41

  foundDataSmi((d.A1).trimEnd())

  if(d.A50 != ""){
    document.getElementById("fua-date-pregnancy").value = (d.A50).split("/")[2]+'-'+(d.A50).split("/")[1]+'-'+(d.A50).split("/")[0]
  }

  if(d.A31 == "1"){
    document.getElementById("inputGroupSelectSex").value = 1
  }else{
    document.getElementById("inputGroupSelectSex").value = 2
  }

  if(d.A35 == "1"){
    document.getElementById("checkbox1").checked = true
  }else if(d.A35 == "2"){
    document.getElementById("checkbox2").checked = true
  }


  if(d.A29 != "" && d.A29 != "FALLECIDO"){

    let ctxy = 0
    
    fetch(`${url}/affiliate-by-name-v2/${d.A26}/${d.A27}/${d.A28}/${d.A29}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
  
      let size = (data.length)-1
  
    if(size >= 0){
      document.getElementById("afi-disa").value = data[size].AfiliacionDisa
      document.getElementById("afi-type").value = data[size].AfiliacionTipoFormato
      document.getElementById("afi-num").value = data[size].AfiliacionNroFormato
      document.getElementById("afi-siasis").value = data[size].idSiasis
      document.getElementById("afi-code").value = data[size].Codigo
      document.getElementById("afi-nacimiento").value = date(data[size].Fnacimiento).split("/")[2]+"-"+date(data[size].Fnacimiento).split("/")[1]+"-"+date(data[size].Fnacimiento).split("/")[0]
      document.getElementById("afi-num-doc").value = data[size].DocumentoNumero
      document.getElementById("afi-type-doc").value = data[size].DocumentoTipo
    }
  
      
      $("#tbodyD").html(data.map((V) => {
        
        ctxy++
        
        return `
        <tr>
        <td class="minText5"><center><button onclick="deleteAfiliate('${V.idSiasis}',${ctxy})" class="btn btn-danger minText5">X</button></center></td>
        <td class="minText5">${V.AfiliacionDisa}</td>
        <td class="minText5">${V.AfiliacionTipoFormato}</td>
        <td class="minText5">${V.AfiliacionNroFormato}</td>
        <td class="minText5">${V.idSiasis}</td>
        <td class="minText5">${date(V.AfiliacionFecha)}</td>
        <td class="minText5">${date(V.Fnacimiento)}</td>
        <td class="minText5">${V.DocumentoNumero}</td>
        <td class="minText5">${(V.nombres).toUpperCase()}</td>
        <td class="minText5">${V.Codigo}</td>
        </tr>`;
  
    })
    .join("")
  );

  document.getElementById("loaderAfi").style = "display:none;"
  
    }).catch(err => {
      document.getElementById("loaderAfi").style = "display:none;"
      console.log(err)
    }); 

  }else{

    let ctxy = 0

    fetch(`${url}/affiliate-by-name/${d.A26}/${d.A27}/${d.A28}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
  
      let size = (data.length)-1
  
    if(size >= 0){
      document.getElementById("afi-disa").value = data[size].AfiliacionDisa
      document.getElementById("afi-type").value = data[size].AfiliacionTipoFormato
      document.getElementById("afi-num").value = data[size].AfiliacionNroFormato
      document.getElementById("afi-siasis").value = data[size].idSiasis
      document.getElementById("afi-code").value = data[size].Codigo
      document.getElementById("afi-nacimiento").value = date(data[size].Fnacimiento).split("/")[2]+"-"+date(data[size].Fnacimiento).split("/")[1]+"-"+date(data[size].Fnacimiento).split("/")[0]
      document.getElementById("afi-num-doc").value = data[size].DocumentoNumero
      document.getElementById("afi-type-doc").value = data[size].DocumentoTipo
    }
  
      $("#tbodyD").html(data.map((V) => {
      
        ctxy++

        return `
        <tr>
        <td class="minText5"><center><button onclick="deleteAfiliate('${V.idSiasis}',${ctxy})" class="btn btn-danger minText5">X</button></center></td>
        <td class="minText5">${V.AfiliacionDisa}</td>
        <td class="minText5">${V.AfiliacionTipoFormato}</td>
        <td class="minText5">${V.AfiliacionNroFormato}</td>
        <td class="minText5">${V.idSiasis}</td>
        <td class="minText5">${date(V.AfiliacionFecha)}</td>
        <td class="minText5">${date(V.Fnacimiento)}</td>
        <td class="minText5">${V.DocumentoNumero}</td>
        <td class="minText5">${(V.nombres).toUpperCase()}</td>
        <td class="minText5">${V.Codigo}</td>
        </tr>`;
  
    })
    .join("")
  );

  document.getElementById("loaderAfi").style = "display:none;"
  
    }).catch(err => {
      document.getElementById("loaderAfi").style = "display:none;"
      console.log(err)
    }); 
  }


  fetch(`${url}/get-data-medic/${d.A1}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {

   let value = data[0]

   document.getElementById("afi-type-dig").value = d.A81

   if(d.A82 == ""){
    document.getElementById("afi-num-dig").value = (value.dni_medico).trim()
   }else{
    document.getElementById("afi-num-dig").value = d.A82
   }

  }).catch(err => {
    console.log(err)
  }); 

}

function updateAfiliation(){

  let lote = document.getElementById("d-lote").innerHTML 
  let account =  document.getElementById("d-account").innerHTML 
  let disa =  document.getElementById("afi-disa").value 
  let type =  document.getElementById("afi-type").value
  let num =  document.getElementById("afi-num").value
  let siasis =  document.getElementById("afi-siasis").value
  let code =  document.getElementById("afi-code").value
  let FechaNacimiento =  document.getElementById("afi-nacimiento").value
  let idPaciente = document.getElementById("d-idpatient").innerHTML

  if(disa != "" && type != "" && num != "" && siasis != "" && code != ""){

    let data = {
      AfiliacionDisa:disa,
      AfiliacionTipoFormato:type,
      AfiliacionNroFormato:num,
      idSiasis:siasis,
      FuaLote:lote,
      idCuentaAtencion:account,
      Codigo:code,
      FechaNacimiento:FechaNacimiento,
      IdPaciente:idPaciente
    }


    fetch(`${url}/update-sis-afiliation/`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
       if(data.success == "insertado"){
        
        Swal.fire(
          'Muy bien!',
          'Cuenta actualizada',
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


  }else{
    Swal.fire(
      'Oops!',
      'Complete los campos',
      'info'
    )
  }

}

function updateDNIDigitador(){

  let dni = document.getElementById("afi-num-dig").value 
  let account = document.getElementById("d-account").innerHTML

  if(dni != ""){

    let data = {
      dni:dni,
      account:account,
    }


    fetch(`${url}/update-dni-digitador`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {

       if(data[0].success == "actualizado"){
        
        Swal.fire(
          'Muy bien!',
          'Cuenta actualizada',
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


  }else{
    Swal.fire(
      'Oops!',
      'Complete los campos',
      'info'
    )
  }

}

$(document).ready(function() {
  $('#excelFile').on('change', function(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

      var table = $('#tableValidateCatalog').DataTable();
      table.clear();

      for (var i = 1; i < jsonData.length; i++) { // Ignorar la primera fila (encabezados)
        fetchValidateCatalog(jsonData[i],jsonData.length)
      }

      table.draw();
      table.columns.adjust().draw();

    };
    reader.readAsArrayBuffer(file);
  });
});

function fetchValidateCatalog(jsonData,l){

  const [usuario, fecha, descripcion] = jsonData

  var table = $('#tableValidateCatalog').DataTable();
  
  var fuaData = descripcion.split("FUA: ")[1]
  var lote = fuaData.split("-")[1]
  var fua = fuaData.split("-")[2]

  fetch(`${url}/get-data-validate-catalog/${lote}/${fua}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {

    ctxG++

    var cuenta = data[0].idCuentaAtencion
    var f_ate = data[0].FuaAtencionFecha
    var digitador = (data[0].nombres).toUpperCase()
    var servicio = (data[0].Nombre).toUpperCase()

    catalog.push({Cuenta :cuenta,Descripcion:descripcion,Fecha_de_atencion : f_ate,Servicio : servicio,Digitador : digitador})
   
    table.row.add([usuario, fecha, descripcion,cuenta,fuaData,f_ate,digitador,servicio]);
    table.draw();
    table.columns.adjust().draw();
   
    document.getElementById("loadCatalog").style = "display:block;"
    
    if(l == ctxG){
      document.getElementById("btn-catalog").style = "display:block;"
      document.getElementById("loadCatalog").style = "display:none;"
      ctxG = 1
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

function updateAtePrincipal(){

  let account = document.getElementById("d-account").innerHTML
  let cod = document.getElementById("fua-id-ate").value

  if(cod != "" && cod != "0"){

    fetch(`${url}/update-cod-ate-fua/${account}/${cod}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      let x = data[0]
      if(x.success == "actualizado"){
        Swal.fire(
          'Muy bien!',
          'Codigo actualizado!',
          'success'
        )
      }else{
        Swal.fire(
          'Oops!',
          'Se produjo un error, intentelo nuevamente',
          'info'
        )
      }
   
  
    }).catch(error => {
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
  });

  }
}


function updateTypeAte(){

  let type = document.getElementById("inputGroupSelectTypeAte").value
  let account = document.getElementById("d-account").innerHTML

  fetch(`${url}/update-type-atention-fua/${type}/${account}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {
    let x = data[0]
    if(x.success == "actualizado"){
      Swal.fire(
        'Muy bien!',
        'Tipo de atención actualizado!',
        'success'
      )
    }else{
      Swal.fire(
        'Oops!',
        'Se produjo un error, intentelo nuevamente',
        'info'
      )
    }
 

  }).catch(error => {
    Swal.fire(
        'Oops!',
        'Se produjo un error',
        'warning'
      )
});
}


function updateDniPatient(){

  let type = document.getElementById("inputGroupSelectTypeDni").value
  let dni = document.getElementById("fua-patient-dni").value
  let account = document.getElementById("d-account").innerHTML
  let idpaciente = document.getElementById("d-idpatient").innerHTML

  if(dni != ""){

 
  fetch(`${url}/update-dni-patient-fua/${type}/${dni}/${account}/${idpaciente}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {
    let x = data[0]
    if(x.success == "actualizado"){
      Swal.fire(
        'Muy bien!',
        'Documento actualizado!',
        'success'
      )
    }else{
      Swal.fire(
        'Oops!',
        'Se produjo un error, intentelo nuevamente',
        'info'
      )
    }
 

  }).catch(error => {
    Swal.fire(
        'Oops!',
        'Se produjo un error',
        'warning'
      )
});

  }else{
    Swal.fire(
      'Oops!',
      'Ingrese el número de documento!',
      'info'
    )
  }
}

function buscarDuplicados(arr) {
  const duplicados = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicados.includes(arr[i])) {
        duplicados.push(arr[i]);
      }
    }
  }

  console.log('duplicados :'+duplicados)
  
  if(duplicados.length > 0){
    document.getElementById("duplex").style = "display: inline-block;font-weight:700;color:red;"
    document.getElementById("duplex").innerHTML = `Fuas duplicados : ${duplicados.length}`
    document .getElementById("accountDuplex").style = "font-size:12px;;display:block;font-weight:700;color:red;"
    document .getElementById("accountDuplex").textContent = `Cuentas duplicadas : ${duplicados.join(', ')}`
  }else{
    document.getElementById("duplex").style = "display: inline-block;font-weight:700;color:green;"
  document.getElementById("duplex").innerHTML = `Fuas duplicados : ${duplicados.length}`
  }
  return duplicados;
}

function exportToExcelCatalog(){

  Swal.fire({
      title: 'En breves se descargará el archivo!',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })

var fechaActual = new Date();

var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0 (enero es 0)
var anio = fechaActual.getFullYear();

// Agrega un cero inicial si el día o el mes son menores a 10
if (dia < 10) {
    dia = '0' + dia;
}

if (mes < 10) {
    mes = '0' + mes;
}

var actual = +dia + '/' + mes + '/' + anio;

  let xls = new XlsExport(catalog, 'catalogo');
  xls.exportToXLS(`reporte_catalogo_de_errores_sis_${actual}.xls`)
}


function updateSexPatient(){

  let sex = document.getElementById("inputGroupSelectSex").value
  let id = document.getElementById("d-idpatient").innerHTML

  fetch(`${url}/update-gender-patient/${sex}/${id}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {
    let x = data[0]
    if(x.success == "actualizado"){
      Swal.fire(
        'Muy bien!',
        'Genero actualizado!',
        'success'
      )
    }
  }).catch(error => {
    console.log(error)
    Swal.fire(
        'Oops!',
        'Se produjo un error',
        'warning'
      )
});

}

function updateDateBirthday(){

  let birth = document.getElementById("fua-date-birth").value
  let id = document.getElementById("d-idpatient").innerHTML

  if(birth != ""){

    let data = {
      date : birth+' 00:00:00.000',
      idPatient : id
    }
  
    fetch(`${url}/update-date-birth-patient`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
      let x = data[0]
      console.log(data)
      if(x.success == "actualizado"){
        Swal.fire(
          'Muy bien!',
          'Fecha de nacimiento actualizado!',
          'success'
        )
      }
    }).catch(error => {
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
  });
  }else{
    Swal.fire(
      'Oops!',
      'Ingrese una fecha',
      'warning'
    )
  }

}

function uncheckOther(checkbox) {
  // Obtener el otro checkbox
  var otherCheckboxId = checkbox.id === 'checkbox1' ? 'checkbox2' : 'checkbox1';
  var otherCheckbox = document.getElementById(otherCheckboxId);

  // Desmarcar el otro checkbox si el checkbox actual está marcado
  if (checkbox.checked) {
      otherCheckbox.checked = false;
  }
}

function updateDatePregnancy(){

  let preg = document.getElementById("fua-date-pregnancy").value
  let id = document.getElementById("d-account").innerHTML
  let chk1 = document.getElementById("checkbox1")
  let chk2 = document.getElementById("checkbox2")
  let sMaterna  = ""

  if(chk1.checked){
    sMaterna = "1"
  }else if(chk2.checked){
    sMaterna = "2"
  }

  if(preg != "" && sMaterna != ""){

    let data = {
      date : date(preg),
      idCuentaAtencion: id,
      sm : sMaterna
    }
   
    fetch(`${url}/update-date-pregnancy`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
      let x = data[0]
      console.log(data)
      if(x.success == "actualizado"){
        Swal.fire(
          'Muy bien!',
          'Fecha de parto actualizada!',
          'success'
        )
      }
    }).catch(error => {
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
  });
  }else{
    Swal.fire(
      'Oops!',
      'Ingrese una fecha y seleccione una opción',
      'warning'
    )
  }

}


function updateNumIpress(){

  let ipress = document.getElementById("fua-num-ipress").value
  let id = document.getElementById("d-account").innerHTML

  if(ipress != ""){

    let data = {
      ipress : ipress,
      idCuentaAtencion: id
    }
   
    fetch(`${url}/update-num-ipress`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
      let x = data[0]
      console.log(data)
      if(x.success == "actualizado"){
        Swal.fire(
          'Muy bien!',
          'Código de IPRESS actualizada!',
          'success'
        )
      }
    }).catch(error => {
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
  });
  }else{
    Swal.fire(
      'Oops!',
      'Ingrese una IPRESS válida',
      'warning'
    )
  }

}

function updateNumPaperReference(){

  let paper = document.getElementById("fua-num-paper-reference").value
  let id = document.getElementById("d-account").innerHTML

  if(paper != ""){

    fetch(`${url}/update-num-paper-reference/${id}/${paper}`, {
      method: 'GET', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      }// data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
      let x = data[0]
      if(x.success == "actualizado"){
        Swal.fire(
          'Muy bien!',
          'Número de hoja de referencia actualizada!',
          'success'
        )
      }
    }).catch(error => {
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
  });
  }else{
    Swal.fire(
      'Oops!',
      'Ingrese el numero de referencia',
      'warning'
    )
  }

}


function updateNullDatePregnancy() {
  let account = document.getElementById("d-account").innerHTML
  fetch(`${url}/update-date-null-pregnancy/${account}`)
    .then(response => response.json())
    .then(data => {
      if(data[0].success == "actualizado"){
        Swal.fire(
          'Muy bien!',
          'Sin fecha de parto!',
          'success'
        )
      }else{
        Swal.fire(
          'Oops!',
          'Ocurrió un error',
          'warning'
        )
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//--------------------------------------------------------------RC-------------------------

function openModalValidation(){
  $('#compareModal').modal('show')
}

function compareSigeps() {
  const excelFile = document.getElementById('excelFileX').files[0];
  const txtFile = document.getElementById('txtFileX').files[0];
  document.getElementById("btn-down").style = "display:none;"
  let ctxFound = 0;
  let ctxNoFound = 0;

  if (!excelFile || !txtFile) {
    alert('Por favor, seleccione ambos archivos.');
    return;
  }

  const excelReader = new FileReader();
  const txtReader = new FileReader();

  excelReader.onload = function () {
    document.getElementById("loader2").style = "display:block"
    const excelData = excelReader.result;

    const excelDocuments = {};
    const workbook = XLSX.read(excelData, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelJSON = XLSX.utils.sheet_to_json(worksheet);

    excelJSON.forEach(row => {
      const documentoExcel = row['NRO FORMATO']; // Reemplaza 'DOCUMENTO' con el nombre correcto de la columna del documento en tu archivo Excel
      if (documentoExcel) {
        excelDocuments[documentoExcel.split("-")[2]] = true;
      }
    });

    txtReader.onload = function () {
      const txtData = txtReader.result;

      const results = [];

      const txtLines = txtData.split('\n');
      txtLines.forEach(line => {
        const parts = line.split('|');
        if (parts.length >= 4) {
          const documentoTXT = parts[3];
          if (documentoTXT in excelDocuments) {
            ctxFound++;
            results.push(`FUA ENCONTRADA -> ${documentoTXT}`);
          } else {
            ctxNoFound++;
            results.push(`FUA NO ENCONTRADA -> ${documentoTXT}`);
            fetchNoFound(documentoTXT)
          }
        }
      });

      if (results.length === 0) {
        console.log('No se encontraron coincidencias.');
      } else {
        //console.log('N° DE FUAS EN SIGEPS -> ' + ctxFound);
        //console.log('N° NO ENCONTRADAS -> ' + ctxNoFound);
        results.forEach(result => {
          //console.log(result);
        });
      }
    };

    txtReader.readAsText(txtFile); // Lee el archivo de texto como texto
  };
  excelReader.readAsBinaryString(excelFile); // Lee el archivo Excel como binario

}

$('#compareModal').on('hidden.bs.modal', function (e) {
  document.getElementById('txtFileX').value = ""
  document.getElementById('excelFileX').value = ""
})

async function fetchNoFound(fua){

  const fechaActual = new Date();
  const lote = (fechaActual.getFullYear().toString()).substring(2);
  document.getElementById("loader2").style = "display:block"

try {
  // Realiza la solicitud fetch con el ID actual
  const response = await fetch(`${url}/get-data-validate-catalog/${lote}/${fua}`); // Reemplaza "URL_BASE" con la URL base de tu API

  if (response.ok) {
    // Procesa la respuesta como desees
    const data = await response.json();
    var cuenta = data[0].idCuentaAtencion
    var f_ate = data[0].FuaAtencionFecha
    var digitador = (data[0].nombres).toUpperCase()
    var servicio = (data[0].Nombre).toUpperCase()

    notFound.push({Cuenta :cuenta,fua:'00002698-'+lote+'-'+fua,Fecha_de_atencion : f_ate,Servicio : servicio,Digitador : digitador})
    document.getElementById("loader2").style = "display:none;"
    document.getElementById("btn-down").style = "display:block;"


  } else {
    console.error(`Error al hacer la solicitud para ID ${fua}:`, response.status);
  }
} catch (error) {
  console.error(`Error al hacer la solicitud para ID ${fua}:`, error);
}
}

function exportNotFound(){
  Swal.fire({
    title: 'En breves se descargará el archivo!',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
  })

var fechaActual = new Date();

var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0 (enero es 0)
var anio = fechaActual.getFullYear();

// Agrega un cero inicial si el día o el mes son menores a 10
if (dia < 10) {
  dia = '0' + dia;
}

if (mes < 10) {
  mes = '0' + mes;
}

var actual = +dia + '/' + mes + '/' + anio;

setTimeout(() => {
  let xls = new XlsExport(notFound, 'catalogo');
  xls.exportToXLS(`fuas_no_encontrados_en_sigeps_${actual}.xls`);
}, 5000); 

}



  function isUndefined(name){
    let secondaName = name.split(" ")[0]
    if(secondaName == undefined){
      secondaName = ""
    }else if(secondaName == "DE"){
      secondaName = name.split(" ")[0]+" "+name.split(" ")[1]
    } 
    return secondaName
  }

  function isUndefined2(name){
    let thirdName = ""
    if(name.split(" ")[0] == undefined){
      thirdName = ""
    }else if(name.split(" ")[0] == "DE"){
      if(name.split(" ")[2] == undefined){
        thirdName = ""
      }else{
        thirdName = name.split(" ")[2]
      }
    }else if(name.split(" ")[1] == undefined){
      thirdName = ""
    }else{
      thirdName = name.split(" ")[1]
    } 
    return thirdName
  }

  function updateFullNamePatient(){
    let idPaciente = document.getElementById("d-idpatient").innerHTML
    let paterno = document.getElementById("d-ape-p").value
    let materno = document.getElementById("d-ape-m").value
    let nombre1 = document.getElementById("d-name-1").value
    let nombre2 = document.getElementById("d-name-2").value
    let nombre3 = document.getElementById("d-name-3").value

    if(paterno != "" && materno != "" && nombre1 != ""){

      let parameters = {
        idPaciente : idPaciente,
        paterno : paterno,
        materno : materno,
        primerNombre : nombre1,
        segundoNombre : nombre2,
        tercerNombre : nombre3
      }
      
    fetch(`${url}/update-fullname-patient`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify(parameters)
  })
    .then(response => response.json())
    .then(data => {
  
        if(data[0].success == "actualizado"){

            Swal.fire(
              'Muy bien!',
              'Datos de paciente actualizado!',
              'success'
            )
            
        }else{
          Swal.fire(
            'Oops!',
            'Ocurrió un error',
            'error'
          )
        }
    }).catch(err => {
        Swal.fire(
          'Oops!',
          'Ocurrió un error 404',
          'error'
        )
    }); 

    }else{
      Swal.fire(
        'Oops!',
        'Complete los campos!',
        'info'
      )
    }

  }

  function deleteAfiliate(idSiasis,row) {

    Swal.fire({
      title: 'Estas seguro de eliminar la afiliación?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        fetch(`${url}/delete-afiliate/${idSiasis}`)
        .then(response => response.json())
        .then(data => {
    
          if(data[0].success == "eliminado"){
              document.getElementById("tb-data-d").deleteRow(row);
              Swal.fire('Eliminado!', '', 'success')
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
        } );

      }})

  }


  function searchWebService() {

    let disa = "250"
    let tipo = document.getElementById("s-type-formated").value
    let num = document.getElementById("web-formato").value

    if(disa != "" && tipo != "" && num !=""){

      if(tipo == "2" && num.length == 8){
        document.getElementById("web-loader").style = "display:flex;"
        document.getElementById("btn-serach-w-service").disabled = true
        ft(disa,tipo,num.trim())
      }else if(tipo == "3" && num.length == 9){
        document.getElementById("web-loader").style = "display:flex;"
        document.getElementById("btn-serach-w-service").disabled = true
        ft(disa,tipo,num.trim())
      }else{
        Swal.fire(
          'Oops',
          'Error formato de afiliación!',
          'info'
        )
      }
    }else{
      Swal.fire(
        'Oops',
        'Complete los campos!',
        'info'
      )
    }
  }

  function ft(disa,tipo,num){
    fetch(`${url}/get-afiliate-web-service`)
      .then(response => response.json())
      .then(data => {
        showDataAuth(data[0].server_response,disa,tipo,num)
        // Accede a la información organizada
        //console.log('Success:', data[0].success); // 'autorizado'
        //console.log('Session ID:', data[0].server_response); // El ID de sesión obtenido del XML
      })
      .catch(error => {
        document.getElementById("web-loader").style = "display:none;"
        document.getElementById("btn-serach-w-service").disabled = false
        console.error('Error:', error);
      });
  }

  function showDataAuth(data,disa,tipo,num){
    var xmlString = data;
  
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    // Obtener la respuesta SOAP
    var response = xmlDoc.getElementsByTagName("GetSessionResponse")[0];    
    // Obtener los elementos de la respuesta
    var auth = response.getElementsByTagName("GetSessionResult")[0].textContent;
    searchWebServiceData(auth,disa,tipo,num)
    console.log(auth)
  }

  function searchWebServiceData(auth,disa,tipo,num) {
    console.log(auth+" "+disa+" "+tipo+" "+num)
    fetch(`${url}/get-afiliate-web-service-data/${auth}/${disa}/${tipo}/${num}`)
      .then(response => response.json())
      .then(data => {
        showDataAfiliate(data[0].server_response)
        // Accede a la información organizada
      })
      .catch(error => {
        document.getElementById("web-loader").style = "display:none;"
        document.getElementById("btn-serach-w-service").disabled = false
        console.error('Error:', error);
      });
  }


  function showDataAfiliate(data) {
    var xmlString = data;
  
    // Parsear el XML
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
    // Obtener la respuesta SOAP
    var response = xmlDoc.getElementsByTagName("ConsultarAfiliadoFuaEResult")[0];
    // Obtener los elementos de la respuesta
    var idError = response.getElementsByTagName("IdError")[0].textContent;
    var disa = response.getElementsByTagName("Disa")[0].textContent;
    var tabla = response.getElementsByTagName("Tabla")[0].textContent;
    var idNumReg = response.getElementsByTagName("IdNumReg")[0].textContent;
    var fecNacimiento = response.getElementsByTagName("FecNacimiento")[0].textContent;
    var apePaterno = response.getElementsByTagName("ApePaterno")[0].textContent;
    var apeMaterno = response.getElementsByTagName("ApeMaterno")[0].textContent;
    var nombres = response.getElementsByTagName("Nombres")[0].textContent;

    var tipoFormato = response.getElementsByTagName("TipoFormato")[0].textContent;
    var nroContrato = response.getElementsByTagName("NroContrato")[0].textContent;
 
    if(idError == "0"){
      document.getElementById("web-loader").style = "display:none;"
      document.getElementById("btn-serach-w-service").disabled = false
      
     
      toast('success','Afiliación encontrada!',4)

      var yearN = fecNacimiento.substring(0, 4);
      var monthN = fecNacimiento.substring(4, 6);
      var dayN = fecNacimiento.substring(6, 8);

      var newdateBirth = yearN + "-" + monthN + "-" + dayN;
  
      document.getElementById("web-service-fullname").innerHTML = apePaterno+' '+apeMaterno+' '+nombres
      document.getElementById("afi-disa").value = disa
      document.getElementById("afi-siasis").value = idNumReg
      document.getElementById("afi-code").value = tabla
      document.getElementById("afi-type").value = tipoFormato
      document.getElementById("afi-num").value = nroContrato
      document.getElementById("afi-nacimiento").value = newdateBirth
  
    }else{
      document.getElementById("web-loader").style = "display:none;"
      document.getElementById("btn-serach-w-service").disabled = false
      Swal.fire(
        'Oops',
        'Sin resultados!',
        'info'
      )
    }

  }

  function toast(type,message,time){
    time = time*1000
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: type,
      title: message
    })
  }

  function showDiagnosys(){
    $('#modalDiagnosys').modal('show');
    document.getElementById("diag-loader").style = "display:flex;"
    fetchDiagnosys()
  }

  function showProcedure(){
    $('#modalProcedure').modal('show');
  }

  function fetchDiagnosys(){

    document.getElementById("tbodyDiag").innerHTML = ""
    let account = document.getElementById("d-account").innerHTML

    fetch(`${url}/get-fua-diagnosys/${account}`)
    .then(response => response.json())
    .then(data => {

      $("#tbodyDiag").html(data[0].map((d) => {
       
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
        <td class="minText5"><center><button style="background-color:red;border-color:red;" onclick="showModalDeleteDiagnosys('${d.id}','${d.idCuentaAtencion}')" class="btn btn-dark">X</button></center></td>
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
          Swal.fire('Eliminado!', '', 'success')
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
    } 
  })
}

function jsonATE(){

  rcData = []

  Swal.fire({
    title: 'Ejecutando reglas de consistencia y validación!',
    timer: 8000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
  })
  setTimeout(jsonBuild, 2000);
}

  function jsonBuild() {

    var table = $('#tb-data').DataTable(); // Obtén la instancia de la tabla DataTables
  
    // Define un array para almacenar los objetos JSON
    var jsonData = [];
  
    // Itera a través de los datos de la tabla
    table.rows().data().each(function (rowData) {
      // Crea un objeto JSON para cada fila
      var data = {
        cuenta_1: rowData[1],
        disa_2: rowData[2],
        lote_3 : rowData[3],
        fua_4 : rowData[4],
        udr_5 : rowData[5],
        renaesIpress_6 : rowData[6],
        categoriaIpress_7 : rowData[7],
        nivelIpress_8 : rowData[8],
        puntoDigitacion_9 : rowData[9],
        fuaReconsideracion_10 : rowData[10],
        codigoDisa_11 : rowData[11],
        loteFuaReconsideracion_12 : rowData[12],
        nFuaReconsideracion_13 : rowData[13],
        idConvenio_14 : rowData[14],
        componenteAsegurado_15 : rowData[15],
        codigoAfiliado_16 : rowData[16],
        loteFormatoAfiliado_17 : rowData[17],
        numFormatoAfiliado_18 : rowData[18],
        correlativoAfiliado_19 : rowData[19],
        tipoTabla_20 : rowData[20],
        idContratoAfiliado_21 : rowData[21],
        cobertura_22 : rowData[22],
        grupoPoblacional_23 : rowData[23],
        tipoDocumento_24 : rowData[24],
        numDocumento_25 : rowData[25],
        apellidoPaterno_26 : rowData[26],
        apellidoMaterno_27 : rowData[27],
        primerNombre_28 : rowData[28],
        otrosNombres_29 : rowData[29],
        fechaNacimiento_30 : rowData[30],
        sexo_31 : rowData[31],
        codigoDistrito_32 : rowData[32],
        historia_33 : rowData[33],
        tipoAtencion_34 : rowData[34],
        condicionMaterna_35 : rowData[35],
        modalidadAtencion_36 : rowData[36],
        numAutorizacion_37 : rowData[37],
        montoAutorizado_38 : rowData[38],
        fechaAtencion_39 : rowData[39],
        renaes_40 : rowData[40],
        numHojaReferencia_41 : rowData[41],
        servicio_42 : rowData[42],
        origenPersonal_43 : rowData[43],
        lugarAtencion_44 : rowData[44],
        destinoAsegurado_45 : rowData[45],
        fechaIngresoHospitalizacion_46 : rowData[46],
        fechaAltaHospitalizacion_47 : rowData[47],
        susaludRenaes_48 : rowData[48],
        numHojaReferenciaOContra_49 : rowData[49],
        fechaParto_50 : rowData[50],
        grupoRiesgo_51 : rowData[51],
        catalogoIe_52 : rowData[52],
        nivelEducativo_53 : rowData[53],
        gradoEducativo_54 : rowData[54],
        seccionEducativo_55 : rowData[55],
        turnoEducativo_56 : rowData[56],
        educacionEspecial_57 : rowData[57],
        anexoEducacion_58 : rowData[58],
        fallecimientoAsegurado_59 : rowData[59],
        ofertaFlexible_60 : rowData[60],
        etnia_61 : rowData[61],
        institucionSeguro_62 : rowData[62],
        seguroIAFAS_63 : rowData[63],
        ups_64 : rowData[64],
        fechaCorteAdministrativo_65 : rowData[65],
        codigoUdr_66 : rowData[66],
        loteCodigoAutorizacion_67 : rowData[67],
        correlativoCodigoAutorizacion_68 : rowData[68],
        codigoDisaORenaes_69 : rowData[69],
        loteFuaVinculado_70 : rowData[70],
        fuaVinculado_71 : rowData[71],
        tipoDocResponsableAtencion_72 : rowData[72],
        documentoResponsableAtencion_73 : rowData[73],
        tipoPersonalSalud_74 : rowData[74],
        especialidadResponsable_75 : rowData[75],
        egresado_76 : rowData[76],
        colegiatura_77 : rowData[77],
        rne_78 : rowData[78],
        periodoProduccion_79 : rowData[79],
        mesProduccion_80 : rowData[80],
        tipoDocDigitador_81 : rowData[81],
        documentoDigitador_82 : rowData[82],
        fechaHoraRegistroAtencion_83 : rowData[83],
        observacion_84 : rowData[84],
        versionApp_85 : rowData[85],
        codigoSiteds_86 : rowData[86],
        usuarioDigitador_87 : rowData[87],
        tipoServicio_88 : rowData[88],
      };
      // Agrega el objeto JSON al array
      jsonData.push(data);
    });
    // El objeto JSON resultante se encuentra en jsonStr
    
    jsonMatch(jsonData)
  }

  function jsonMatch(jsonAte) {

    var tableProcedures = $('#tb-data-6').DataTable(); // Obtén la instancia de la tabla DataTables para los procedimientos
    var jsonProcedures = [];
  
    tableProcedures.rows().data().each(function (rowData) {
        var data = {
            cuenta_1: rowData[1],
            codigoCpt_2: rowData[2],
            codigoCpms_3: rowData[3],
            correlativoDxPertenece_4: rowData[4],
            cantidadPrescrita_5: rowData[5],
            cantidadEntregada_6: rowData[6]
        };
        jsonProcedures.push(data);
    });

    var tableDiagnoses = $('#tb-data-2').DataTable(); // Obtén la instancia de la tabla DataTables para los diagnósticos
    var jsonDiagnoses = [];

    tableDiagnoses.rows().data().each(function (rowData) {
        var data = {
            cuenta_1: rowData[1],
            codigoDiagnostico_2: rowData[2],
            correlativo_3: rowData[3],
            tipoMovimiento_4: rowData[4],
            tipoDiagnostico_5: rowData[5]
        };
        jsonDiagnoses.push(data);
    });

    var tableSupplies = $('#tb-data-3').DataTable(); // Obtén la instancia de la tabla DataTables para los insumos
    var jsonSupplies = [];

    tableSupplies.rows().data().each(function (rowData) {
        var data = {
            cuenta_1: rowData[1],
            codigoInsumo_2: rowData[2],
            correlativo_3: rowData[3],
            cantidadPrescrita_4: rowData[4],
            cantidadEntregada_5: rowData[5]
        };
        jsonSupplies.push(data);
    });

    var tableMedications = $('#tb-data-5').DataTable(); // Obtén la instancia de la tabla DataTables para los medicamentos
    var jsonMedications = [];

    tableMedications.rows().data().each(function (rowData) {
        var data = {
            cuenta_1: rowData[1],
            codigoMedicamento_2: rowData[2],
            correlativo_3: rowData[3],
            cantidadPrescrita_4: rowData[4],
            cantidadEntregada_5: rowData[5]
        };
        jsonMedications.push(data);
    });

    var tableSmi = $('#tb-data-4').DataTable(); // Obtén la instancia de la tabla DataTables para los datos smi
    var jsonSmi = [];

    tableSmi.rows().data().each(function (rowData) {
        var data = {
            cuenta_1: rowData[1],
            cantidadActividadPreventiva_2: rowData[2],
            resultadoSmi_3: rowData[3]
        };
        jsonSmi.push(data);
    });

    var tableNewborn = $('#tb-data-8').DataTable(); // Obtén la instancia de la tabla DataTables para los datos de recién nacido
    var jsonNewborn = [];

    tableNewborn.rows().data().each(function (rowData) {
        var data = {
            cuenta_1: rowData[1],
            correlativoRn_2: rowData[2],
            tipoIdentifiacion_3: rowData[3],
            numeroDocumentoRn_4: rowData[4],
            paternoRn_5: rowData[9],
            maternoRn_6: rowData[10],
            primerNombreRn_7: rowData[11],
            segundoNombreRn_8: rowData[12]
        };
        jsonNewborn.push(data);
    });

    var combinedData = {};

    // Iterar a través del primer JSON (jsonAte)
    jsonAte.forEach(function (item) {
        // Clonar el objeto para no modificar el original
        var combinedItem = { ...item };

        // Filtrar los elementos del segundo JSON (jsonProcedures) que coinciden con la "cuenta_1" del primer JSON
        var matchingProcedures = jsonProcedures.filter(function (subItem) {
            return subItem.cuenta_1 === item.cuenta_1;
        }).map(function (subItem) {
            // Clonar el objeto de procedimientos y excluir el campo "cuenta_1"
            var procedures = { ...subItem };
            delete procedures.cuenta_1;
            return procedures;
        });

        // Filtrar los elementos del tercer JSON (jsonDiagnoses) que coinciden con la "cuenta_1" del primer JSON
        var matchingDiagnoses = jsonDiagnoses.filter(function (subItem) {
            return subItem.cuenta_1 === item.cuenta_1;
        }).map(function (subItem) {
            // Clonar el objeto de diagnósticos y excluir el campo "cuenta_1"
            var diagnoses = { ...subItem };
            delete diagnoses.cuenta_1;
            return diagnoses;
        });

        // Filtrar los elementos del cuarto JSON (jsonSupplies) que coinciden con la "cuenta_1" del primer JSON
        var matchingSupplies = jsonSupplies.filter(function (subItem) {
            return subItem.cuenta_1 === item.cuenta_1;
        }).map(function (subItem) {
            // Clonar el objeto de insumos y excluir el campo "cuenta_1"
            var supplies = { ...subItem };
            delete supplies.cuenta_1;
            return supplies;
        });

        // Filtrar los elementos del quinto JSON (jsonMedications) que coinciden con la "cuenta_1" del primer JSON
        var matchingMedications = jsonMedications.filter(function (subItem) {
            return subItem.cuenta_1 === item.cuenta_1;
        }).map(function (subItem) {
            // Clonar el objeto de medicamentos y excluir el campo "cuenta_1"
            var medications = { ...subItem };
            delete medications.cuenta_1;
            return medications;
        });

        // Filtrar los elementos del sexto JSON (jsonSmi) que coinciden con la "cuenta_1" del primer JSON
        var matchingSmi = jsonSmi.filter(function (subItem) {
            return subItem.cuenta_1 === item.cuenta_1;
        }).map(function (subItem) {
            // Clonar el objeto de smi y excluir el campo "cuenta_1"
            var smi = { ...subItem };
            delete smi.cuenta_1;
            return smi;
        });

        // Filtrar los elementos del séptimo JSON (jsonNewborn) que coinciden con la "cuenta_1" del primer JSON
        var matchingNewborn = jsonNewborn.filter(function (subItem) {
            return subItem.cuenta_1 === item.cuenta_1;
        }).map(function (subItem) {
            // Clonar el objeto de recién nacido y excluir el campo "cuenta_1"
            var newborn = { ...subItem };
            delete newborn.cuenta_1;
            return newborn;
        });

        // Agregar los elementos coincidentes al campo "procedimientos" del objeto combinado
        combinedItem.procedimientos = matchingProcedures;

        // Agregar los elementos coincidentes al campo "diagnosticos" del objeto combinado
        combinedItem.diagnosticos = matchingDiagnoses;

        // Agregar los elementos coincidentes al campo "insumos" del objeto combinado
        combinedItem.insumos = matchingSupplies;

        // Agregar los elementos coincidentes al campo "medicamentos" del objeto combinado
        combinedItem.medicamentos = matchingMedications;

        // Agregar los elementos coincidentes al campo "smi" del objeto combinado
        combinedItem.smi = matchingSmi;

        // Agregar los elementos coincidentes al campo "recienNacido" del objeto combinado
        combinedItem.recienNacido = matchingNewborn;

        // Almacenar el objeto combinado en el objeto de resultados usando "cuenta_1" como clave
        combinedData[item.cuenta_1] = combinedItem;
    });

    // Obtener un arreglo de los objetos combinados
    var combinedArray = Object.values(combinedData);
    
    c2 = 0
    rcData = []
    recorded(combinedArray)
  }

  function downloadRC(){

    let selectElement = document.getElementById("inputGroupSelectProductionMonth2")
    var opcionSeleccionada = selectElement.options[selectElement.selectedIndex];

    let selectElement2 = document.getElementById("inputGroupSelectYearSend2")
    var opcionSeleccionada2 = selectElement2.options[selectElement2.selectedIndex];

    var mes = (opcionSeleccionada.textContent).toUpperCase();
    var year = (opcionSeleccionada2.textContent).toUpperCase();
    
    let xls = new XlsExport(rcData, 'Detalle');
    xls.exportToXLS(`REGLAS DE CONSISTENCIA Y VALIDACION ${mes} - ${year}.xls`)
    }
    
  function recorded(arrayDeDatos) {
   
      arrayDeDatos.forEach((datos) => {
          const cuenta = datos.cuenta_1;
          const fua = datos.disa_2+"-"+datos.lote_3+'-'+datos.fua_4
          const servicio = datos.tipoServicio_88
          const digitador = datos.usuarioDigitador_87
          // Verificar regla 12
          if (!verificarRegla12(datos)) {
              rcData.push({
                  'Cuenta': cuenta,
                  'Servicio':servicio,
                  'Tipo':'RC',
                  'Número':'12',
                  'FUA':fua,
                  'Digitador':digitador,
                  'Descripcion': `No cumple con la regla de consistencia 12 , debe contener al menos un procedimiento ó medicamento/insumo`
              });
          }
  
          // Verificar regla 80
          verificarRegla80(datos)
          verificarValidacion19(datos)
          verificarRegla59(datos) 
          verificarRegla79(datos)
          verificarRegla47(datos)
          verificarRegla14(datos)
          verificarRegla53(datos)
          verificarReglaDeValidacionInterna1(datos)
          verificarRegla57(datos)
      });
  
      if(rcData.length == 0){
        Swal.fire(
          '',
          'Sin reglas de consistencia y validación!',
          'success'
        )
      }else{
        downloadRC()
      }

      
  }
  
  function verificarRegla12(data) {
      // Verificar si hay al menos un diagnóstico
      if (!data.diagnosticos || data.diagnosticos.length < 1) {
          return false;
      }
      // Verificar si hay al menos un procedimiento, medicamento o insumo
      if ((!data.procedimientos || data.procedimientos.length < 1) &&
          (!data.medicamentos || data.medicamentos.length < 1) &&
          (!data.insumos || data.insumos.length < 1)) {
          return false;
      }
      return true;
  }
  
  function verificarRegla80(data) {
        const cuenta = data.cuenta_1;
        const fua = data.disa_2+"-"+data.lote_3+'-'+data.fua_4
        const insumos = data.insumos;
        const servicio = data.tipoServicio_88
        const digitador = data.usuarioDigitador_87

        if (!insumos || insumos.length === 0) {
            //console.log(`Cuenta ${cuenta}: No hay insumos registrados.`);
        } else {
            const codigosInsumos = insumos.map(ins => ins.codigoInsumo_2);
            const insumosNoPermitidos = codigosInsumos.filter(ins => insNotRegister.includes(ins));
            
            if (insumosNoPermitidos.length > 0) {
              rcData.push({
                'Cuenta': cuenta,
                'Servicio':servicio,
                'Tipo':'RC',
                'Número':'80',
                'FUA':fua,
                'Digitador':digitador,
                'Descripcion': `No cumple con la regla de consistencia 80. Los siguientes insumos no están permitidos: ${insumosNoPermitidos.join(', ')}`
            });
               
            } 
        }
}

function verificarValidacion19(data) {
  const cuenta = data.cuenta_1;
  const servicio = data.servicio_42;
  const procedimientos = data.procedimientos;
  const medicamentos = data.medicamentos;
  const fua = data.disa_2 + "-" + data.lote_3 + "-" + data.fua_4;
  const tipoSservicio = data.tipoServicio_88
  const digitador = data.usuarioDigitador_87
  let rv19 = 0;
  let descripcion = `No cumple con la regla de validación 19. `;

  if (servicio == "050") {
      const proc86901= procedimientos.find(proc => proc.codigoCpt_2 === "86901");
      const proc86900 = procedimientos.find(proc => proc.codigoCpt_2 === "86900");
      const proc99403 = procedimientos.find(proc => proc.codigoCpt_2 === "99403");
      const med03576 = medicamentos.find(med => med.codigoMedicamento_2 === "03576");

      if (proc86901) {
        rv19++
      } else {
        descripcion += "Procedimiento 86901 no encontrado. ";
      }

      if (proc86900) {
        rv19++
      } else {
        descripcion += "Procedimiento 86900 no encontrado. ";
      }

      if (proc99403) {
          rv19++;
      } else {
          descripcion += "Procedimiento 99403 no encontrado. ";
      }
      if (med03576) {
          rv19++;
      } else {
          descripcion += "Medicamento 03576 no encontrado. ";
      }

      // Verifica si alguna condición no se cumple
      if (rv19 < 4) {
          rcData.push({
              'Cuenta': cuenta,
              'Servicio':tipoSservicio,
              'Tipo': 'RV',
              'Número': '19',
              'FUA':fua,
              'Digitador':digitador,
              'Descripcion': descripcion
          });
      }
  }
}

function verificarRegla59(data) {
  const cuenta = data.cuenta_1;
  const procedimientos = data.procedimientos;
  const fua = data.disa_2+"-"+data.lote_3+"-"+data.fua_4
  const tipoSservicio = data.tipoServicio_88
  const digitador = data.usuarioDigitador_87

  const fechaIngresoParts = (data.fechaIngresoHospitalizacion_46).split("/");
  const fechaAltaParts = (data.fechaAltaHospitalizacion_47).split("/");

  // El constructor Date espera los argumentos en el orden Year, Month, Day
  // Restamos 1 del mes porque en JavaScript los meses van de 0 a 11
  const fechaIngreso = new Date(fechaIngresoParts[2], fechaIngresoParts[1] - 1, fechaIngresoParts[0]);
  const fechaAlta = new Date(fechaAltaParts[2], fechaAltaParts[1] - 1, fechaAltaParts[0]);

// Ajustar la fecha de alta para incluir el día completo
  fechaAlta.setDate(fechaAlta.getDate() + 1);

  // Calcular el número de días de hospitalización
  const tiempoHospitalizacion = Math.ceil((fechaAlta - fechaIngreso) / (1000 * 60 * 60 * 24));

  // Buscar el procedimiento con el código 99206
  const proc99206 = procedimientos.find(proc => proc.codigoCpt_2 === "99206");
  const proc99231 = procedimientos.find(proc => proc.codigoCpt_2 === "99231");
  const proc94640  = procedimientos.find(proc => proc.codigoCpt_2 === "94640");
  const proc94760  = procedimientos.find(proc => proc.codigoCpt_2 === "94760");

  if (proc99206) {
    const cantidadEntregada99206 = parseInt(proc99206.cantidadEntregada_6);
      if (cantidadEntregada99206 > tiempoHospitalizacion) {
          rcData.push({
              'Cuenta': cuenta,
              'Servicio':tipoSservicio,
              'Tipo': 'RC',
              'Número': '59',
              'FUA':fua,
              'Digitador':digitador,
              'Descripcion': `No cumple con la regla de consistencia 59. La cantidad entregada (${cantidadEntregada99206}) es mayor que el número de días de hospitalización (${tiempoHospitalizacion}). CPT 99206`
          });
      }
  }if(proc99231){
    const cantidadEntregada99231 = parseInt(proc99231.cantidadEntregada_6);
    if (cantidadEntregada99231 > tiempoHospitalizacion) {
      rcData.push({
          'Cuenta': cuenta,
          'Servicio':tipoSservicio,
          'Tipo': 'RC',
          'Número': '59',
          'FUA':fua,
          'Digitador':digitador,
          'Descripcion': `No cumple con la regla de consistencia 59. La cantidad entregada (${cantidadEntregada99231}) es mayor que el número de días de hospitalización (${tiempoHospitalizacion}). CPT 99231`
      });
  }
  }if(proc94640){
    const cantidadEntregada94640 = parseInt(proc94640.cantidadEntregada_6);
    let tiempoHospitalizacionDividida = Math.ceil(parseInt(tiempoHospitalizacion) / 3);
    if (cantidadEntregada94640 > tiempoHospitalizacionDividida) {
      rcData.push({
          'Cuenta': cuenta,
          'Servicio':tipoSservicio,
          'Tipo': 'RC',
          'Número': '59',
          'FUA':fua,
          'Digitador':digitador,
          'Descripcion': `No cumple con la regla de consistencia 59. La cantidad entregada (${cantidadEntregada94640}) es mayor que el número de días de hospitalización (${tiempoHospitalizacionDividida}). CPT 94640`
      });
  }
  }if(proc94760){
    const cantidadEntregada94760 = parseInt(proc94760.cantidadEntregada_6);
    let tiempoHospitalizacionDividida = Math.ceil(parseInt(tiempoHospitalizacion) / 2);
    if (cantidadEntregada94760 > tiempoHospitalizacionDividida) {
      rcData.push({
          'Cuenta': cuenta,
          'Servicio':tipoSservicio,
          'Tipo': 'RC',
          'Número': '59',
          'FUA':fua,
          'Digitador':digitador,
          'Descripcion': `No cumple con la regla de consistencia 59. La cantidad entregada (${cantidadEntregada94760}) es mayor que el número de días de hospitalización (${tiempoHospitalizacionDividida}). CPT 94760`
      });
  }
  }
}

function verificarRegla79(data) {
  const cuenta = data.cuenta_1;
  const servicio = data.servicio_42;
  const tipoPersonalSalud = data.tipoPersonalSalud_74;
  const fua = data.disa_2+"-"+data.lote_3+"-"+data.fua_4
  const tipoSservicio = data.tipoServicio_88
  const digitador = data.usuarioDigitador_87

  // Verificar el servicio y el tipo de personal de salud según las condiciones de la regla
  switch (servicio) {
      case "056":
          if (tipoPersonalSalud !== "01" && tipoPersonalSalud !== "03") {
              rcData.push({
                  'Cuenta': cuenta,
                  'Servicio':tipoSservicio,
                  'Tipo': 'RC',
                  'Número': '79',
                  'FUA':fua,
                  'Digitador':digitador,
                  'Descripcion': `No cumple con la regla de consistencia 79. El codigo del tipo de personal es ${tipoPersonalSalud}`
              });
          }
          break;
      case "061":
          if (tipoPersonalSalud !== "01" && tipoPersonalSalud !== "03" && tipoPersonalSalud !== "05" && tipoPersonalSalud !== "06") {
              rcData.push({
                  'Cuenta': cuenta,
                  'Servicio':tipoSservicio,
                  'Tipo': 'RC',
                  'Número': '79',
                  'FUA':fua,
                  'Digitador':digitador,
                  'Descripcion': `No cumple con la regla de consistencia 79. El codigo del tipo de personal es ${tipoPersonalSalud}`
              });
          }
          break;
      case "062":
      case "063":
      case "064":
      case "065":
      case "066":
      case "067":
          if (tipoPersonalSalud !== "01" && tipoPersonalSalud !== "03") {
              rcData.push({
                  'Cuenta': cuenta,
                  'Servicio':tipoSservicio,
                  'Tipo': 'RC',
                  'Número': '79',
                  'FUA':fua,
                  'Digitador':digitador,
                  'Descripcion': `No cumple con la regla de consistencia 79. El codigo del tipo de personal es ${tipoPersonalSalud}`
              });
          }
          break;
      case "068":
          if (tipoPersonalSalud !== "01") {
              rcData.push({
                  'Cuenta': cuenta,
                  'Servicio':tipoSservicio,
                  'Tipo': 'RC',
                  'Número': '79',
                  'FUA':fua,
                  'Digitador':digitador,
                  'Descripcion': `No cumple con la regla de consistencia 79. El codigo del tipo de personal es ${tipoPersonalSalud}`
              });
          }
          break;
      default:
          break;
  }
}

function verificarRegla47(data) {
  const cuenta = data.cuenta_1;
  const servicio = data.servicio_42;
  const procedimientos = data.procedimientos;
  const fua = data.disa_2 + "-" + data.lote_3 + "-" + data.fua_4;
  const tipoSservicio = data.tipoServicio_88
  const digitador = data.usuarioDigitador_87

  if (servicio === "055") {
    const tiene5914 = procedimientos.some(proc => proc.codigoCpt_2 === "59514");
    const tiene58600 = procedimientos.some(proc => proc.codigoCpt_2 === "58600");

    if (!tiene5914) {
      rcData.push({
        'Cuenta': cuenta,
        'Servicio':tipoSservicio,
        'Tipo': 'RC',
        'Número': '47',
        'FUA':fua,
        'Digitador':digitador,
        'Descripcion': `No cumple con la regla de consistencia 47. El codigo del procedimiento 59514 no está presente.`
      });
    }

    if (tiene58600) {
      rcData.push({
        'Cuenta': cuenta,
        'Servicio':tipoSservicio,
        'Tipo': 'RC',
        'Número': '47',
        'FUA':fua,
        'Digitador':digitador,
        'Descripcion': `No cumple con la regla de consistencia 47. El codigo procedimiento 58600 no debe ser registrado.`
      });
    }
  }

  /*

  if(servicio === "050"){
    const tiene99460 = procedimientos.some(proc => proc.codigoCpms_3 === "99460");
    const condMaterno = data.condicionMaterna_35
    if(tiene99460 && condMaterno == "0"){
      rcData.push({
        'Cuenta': cuenta,
        'Servicio':tipoSservicio,
        'Tipo': 'RC',
        'Número': '47',
        'FUA':fua,
        'Digitador':digitador,
        'Descripcion': `No cumple con la regla de consistencia 47. Procedimientos no acordes al tipo de profesional, edad, género y condición materna [COD.PREST:050, CPMS:99460 , COND-MATERNA : Ninguno].`
      });
    }
  }
  */

}

function verificarRegla14(data) {
  const cuenta = data.cuenta_1;
  const servicio = data.servicio_42;
  const smi = data.smi;
  const tipoSservicio = data.tipoServicio_88
  const fua = data.disa_2 + "-" + data.lote_3 + "-" + data.fua_4;
  const digitador = data.usuarioDigitador_87


  if (servicio === "050" && smi.length === 0) {
      rcData.push({
        'Cuenta': cuenta,
        'Servicio':tipoSservicio,
        'Tipo': 'RC',
        'Número': '14',
        'FUA':fua,
        'Digitador':digitador,
        'Descripcion': `No cumple con la regla de consistencia 14. Falta Consignar algun SMI obligatorio, para 050 : 003,004,102,304,305,306,315"`
      });
  }
}

function verificarRegla53(data) {
  const cuenta = data.cuenta_1;
  const diagnosticos = data.diagnosticos;
  const fechaNacimientoParts = data.fechaNacimiento_30.split("/");
  const tipoSservicio = data.tipoServicio_88
  const fua = data.disa_2 + "-" + data.lote_3 + "-" + data.fua_4;
  const digitador = data.usuarioDigitador_87;
  const servicio = data.servicio_42;

  // Crear objeto Date con la fecha de nacimiento
  const fechaNacimiento = new Date(fechaNacimientoParts[2], fechaNacimientoParts[1] - 1, fechaNacimientoParts[0]);

  // Calcular la edad en meses
  const fechaActual = new Date();
  const edadEnMeses = (fechaActual.getFullYear() - fechaNacimiento.getFullYear()) * 12 +
      (fechaActual.getMonth() - fechaNacimiento.getMonth());

  if (servicio === "050") {
      // Verificar si hay diagnósticos con código Z380
      const diagnosticoZ380 = diagnosticos.find(diag => diag.codigoDiagnostico_2 === "Z380");
      const diagnosticoO60X = diagnosticos.find(diag => diag.codigoDiagnostico_2 === "O60X");

      // Verificar si la edad es mayor o igual a 5 meses si existe al menos un diagnóstico con código Z380
      if (diagnosticoZ380 && edadEnMeses >= 5) {
          rcData.push({
              'Cuenta': cuenta,
              'Servicio':tipoSservicio,
              'Tipo': 'RC',
              'Número': '53',
              'FUA':fua,
              'Digitador':digitador,
              'Descripcion': `No cumple con la regla de consistencia 53. El diagnostico Z380 no se aplica para el rango de edad del Asegurado`
          });
      }

      if(diagnosticoO60X){
        rcData.push({
          'Cuenta': cuenta,
          'Servicio':tipoSservicio,
          'Tipo': 'RC',
          'Número': '53',
          'FUA':fua,
          'Digitador':digitador,
          'Descripcion': `No cumple con la regla de consistencia 53. El diagnostico O60X no se aplica para el Sexo del Asegurado`
      });
      }

  }
}

function verificarRegla57(data) {
  const cuenta = data.cuenta_1;
  const numFormatoAfiliado = data.numFormatoAfiliado_18;
  const tipoSservicio = data.tipoServicio_88
  const fua = data.disa_2 + "-" + data.lote_3 + "-" + data.fua_4;
  const fuav2 = data.fua_4;
  const fechaAtencion = data.fechaAtencion_39.split(" ")[0]; // Tomar solo la fecha, sin la hora
  const digitador = data.usuarioDigitador_87;
  const affi = data.numFormatoAfiliado_18

  // Verificar si el número de formato de afiliado no está vacío
  if (numFormatoAfiliado) {
      const key = numFormatoAfiliado + "-" + fechaAtencion;
      // Si ya existe el paciente en la lista, agregar el FUA a su lista correspondiente
      if (pacientesAtendidos[key]) {
          pacientesAtendidos[key].push(fuav2);
          // Verificar si tiene más de una atención en el mismo día
          if (pacientesAtendidos[key].length > 1) {
              rcData.push({
                'Cuenta': cuenta,
                'Servicio':tipoSservicio,
                'Tipo': 'RC',
                'Número': '57',
                'FUA':fua,
                'Digitador': digitador,
                'Descripcion': `No cumple con la regla de consistencia 57. El paciente tiene más de una atención en un mismo día. -> Fuas afectados : ${pacientesAtendidos[key].join(', ')}`
            });
          }
      } else {
          // Si es la primera vez que se encuentra este paciente, agregarlo a la lista
          pacientesAtendidos[key] = [fuav2];
      }
  }
}

function verificarReglaDeValidacionInterna1(data){

  const cuenta = data.cuenta_1;
  const tipoSservicio = data.tipoServicio_88
  const fua = data.disa_2 + "-" + data.lote_3 + "-" + data.fua_4;
  const digitador = data.usuarioDigitador_87;
  const servicio = data.servicio_42;
  const procedimientos = data.procedimientos;

  if (servicio === "056" && tipoSservicio === "Hemodialisis") {

    const tiene90937 = procedimientos.some(proc => proc.codigoCpt_2 === "90937");
    const tiene99203 = procedimientos.some(proc => proc.codigoCpt_2 === "99203");

    if(!tiene90937 && !tiene99203){
      rcData.push({
        'Cuenta': cuenta,
        'Servicio':tipoSservicio,
        'Tipo': 'RVI',
        'Número': '01',
        'FUA':fua,
        'Digitador':digitador,
        'Descripcion': `No cumple con la regla de validacion interna 01. Falta procedimiento 90937 y 99203`
    });
    }
  }
}




function validateAfiliateTrama(){
  Swal.fire({
    title: 'Validando Afiliados, espere...!',
    timer: 8000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
  })
  setTimeout(validateAfiliateTramaFetch, 2000);
}



function validateAfiliateTramaFetch() {
  var table = $('#tb-data').DataTable();
  var jsonData = [];
  var responseAfiliate = [];

  table.rows().data().each(function(rowData) {
    var data = {
      cuenta: rowData[1],
      lote: rowData[3],
      fua: rowData[4],
      tipo: rowData[17],
      formato: rowData[18],
      tabla: rowData[20],
      siasis: rowData[21],
      fechaNacimiento: rowData[30]
    };
    jsonData.push(data);
  });

  var maxConcurrentRequests = 1;
  var currentRequests = 0;
  var queue = [];

  function processNextRequest() {
    if (queue.length === 0 || currentRequests >= maxConcurrentRequests) {
      return;
    }

    currentRequests++;

    var requestData = queue.shift();
    var data = requestData.data;
    var index = requestData.index;

    var myFetch = `${url}/get-afiliate-arfsis/${data.tipo}/${data.formato}`;
    fetch(myFetch)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(serverData => {
        let message = '';
        let d = serverData[0]

        if(d == []){
          message = 'No encontrado';
          responseAfiliate.push({
            'Cuenta': data.cuenta,
            'Lote': data.lote,
            'FUA': data.fua,
            'Mensaje': message
          });
        }
        
        else{

        if ((data.tipo) != (d.afi_TipoFormato)) {
          message += 'Diferencia detectada en el atributo tipo |';
        }if ((data.formato) != (d.afi_NroFormato)) {
          message += `Diferencia detectada en el atributo formato ${data.formato} - ${d.afi_NroFormato} |`;
        }if ((data.tabla) != (d.afi_TipoTabla)) {
          message += 'Diferencia detectada en el atributo tabla |';
        }if ((data.siasis) != (d.afi_IdSiasis)) {
          message += 'Diferencia detectada en el atributo IdSiasis |';
        }if ((data.fecNacimiento) != (d.afi_FecNac)) {
          message += 'Diferencia detectada en el atributo Fecha de nacimiento |';
        }
        // Continuar con las comparaciones...

        if (message === '') {
          message = 'Datos correctos';
          responseAfiliate.push({
            'Cuenta': data.cuenta,
            'Lote': data.lote,
            'FUA': data.fua,
            'Mensaje': message
          });
          console.log("no Obs");
        } else {
          responseAfiliate.push({
            'Cuenta': data.cuenta,
            'Lote': data.lote,
            'FUA': data.fua,
            'Mensaje': message
          });
          console.log("Obs");
        }

        currentRequests--;
        setTimeout(processNextRequest, 4000); // Retrasar el procesamiento de la siguiente solicitud en 2 segundos
        }
      })
      .catch(error => {
        responseAfiliate.push({
          'Cuenta': data.cuenta,
          'Lote': data.lote,
          'FUA': data.fua,
          'Mensaje': 'Error en la solicitud HTTP'
        });
        console.error('Hubo un problema con la petición HTTP:', error);

        currentRequests--;
        setTimeout(processNextRequest, 4000); // Retrasar el procesamiento de la siguiente solicitud en 2 segundos
      });
  }

  jsonData.forEach(function(data, index) {
    queue.push({ data: data, index: index });
  });

  for (var i = 0; i < maxConcurrentRequests; i++) {
    processNextRequest();
  }

  console.log(responseAfiliate);
  if (responseAfiliate.length > 0) {
    downloadAfiliatesObs(responseAfiliate);
  }
}

function downloadAfiliatesObs(responseAfiliate){
  let xls = new XlsExport(responseAfiliate, 'Afiliaciones');
  xls.exportToXLS(`AFILIACIONES OBSERVACIONES.xls`)
}


function verificarCodEnArraySMI(str) {
  if (onlySMI.includes(str)) {
      return true;
  } else {
      return false;
  }
}

function showModalSMI(){
  $('#modalSMI').modal('show')
  let smiAccount = document.getElementById("d-account").innerHTML
  document.getElementById("smi-account").innerHTML = smiAccount
}

function foundDataSmi(cuenta){
 
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

  edadGest.value = ""
  peso.value = ""
  talla.value = ""
  imc.value = ""
  apgar305.value = ""
  apgar306.value = ""
  vacunaBcg.value = ""
  vacunaHb.value = ""
  psa1.value = ""
  psa2.value = ""
  edadRn.value = ""

  document.getElementById("d-smi-age").style = "display:flex;"
  document.getElementById("d-smi-weight-tail").style = "display:flex;"
  document.getElementById("d-smi-apgar").style = "display:flex;"
  document.getElementById("d-smi-bcg-hb").style = "display:flex;"
  document.getElementById("d-smi-pa").style = "display:flex;"

  for (var i = 0; i < jsonAPISMI.length; i++) {
      if (jsonAPISMI[i].cuenta === cuenta) {

        if(jsonAPISMI[i].actividad === "005"){
          edadGest.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "003"){
          peso.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "004"){
          talla.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "014"){
          imc.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "305"){
          apgar305.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "306"){
          apgar306.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "102"){
          vacunaBcg.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "315"){
          vacunaHb.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "301"){
          psa1.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "901"){
          psa2.value = jsonAPISMI[i].valor 
        }else if(jsonAPISMI[i].actividad === "304"){
          edadRn.value = jsonAPISMI[i].valor 
        }
          //registrosEncontrados.push(jsonAPISMI[i]);
      }
  }
  //console.log(registrosEncontrados);
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

  }else if(type == 2){
    fetchDeleteEspecificSmi(account,'301')
    fetchDeleteEspecificSmi(account,'901')

    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )


  }else if(type == 3){
    fetchDeleteEspecificSmi(account,'005')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )

  }else if(type == 6){
    fetchDeleteEspecificSmi(account,'304')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )

  }else if(type == 4){
    fetchDeleteEspecificSmi(account,'305')
    fetchDeleteEspecificSmi(account,'306')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )

  }else if(type == 5){
    fetchDeleteEspecificSmi(account,'102')
    fetchDeleteEspecificSmi(account,'315')
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
      'success'
    )

  }else if(type == 0){
    fetchDeleteAllSmi(account)
    Swal.fire(
      'Muy bien!',
      'Datos eliminados',
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
  let accountSmi = document.getElementById("d-account").innerHTML

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

function calcularIMC(peso, altura) {
  // Convertir altura de cm a metros
  var alturaMetros = altura / 100;

  // Calcular IMC
  var imc = peso / (alturaMetros * alturaMetros);

  return imc.toFixed(2);
}
