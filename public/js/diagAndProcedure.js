var type = document.getElementById("modalidad")

type.addEventListener('change', function handleChange(event) {
  let value = event.target.value
  
  if(value == 1){
    document.getElementById("code").style = "display:none;"
    document.getElementById("name").style = "display:none;"
  }else if(value == 2){
    document.getElementById("code").style = "display:block;"
    document.getElementById("name").style = "display:none;"
  }else{
    document.getElementById("code").style = "display:none;"
    document.getElementById("name").style = "display:block;"
  }

})
var allData=[]
createDatatable()

function clearJSON(input){

  let output = [];
  let output2 = [];
  const result = [];

  input.forEach(item => {
    let patient = output.find(p => p.nrocuenta === item.nrocuenta);
    if (!patient) {
      patient = { 
        NroHistoriaClinica:item.NroHistoriaClinica,
        nrocuenta: item.nrocuenta,
        ApellidoPaterno:item.ApellidoPaterno,
        ApellidoMaterno:item.ApellidoMaterno,
        PrimerNombre:item.PrimerNombre,
        SegundoNombre:item.SegundoNombre,
        sexo:item.sexo,
        Edad:item.Edad,
        tipoedad:item.tipoedad,
        departamento:item.departamento,
        provincia:item.provincia,
        distrito:'-'+item.distrito,
        codigoseguro:item.codigoseguro,
        seguro:item.seguro,
        FechaSolicitud:'s-'+item.FechaSolicitud,
        HoraInicio:'hi-'+item.HoraInicio,
        FechaApertura:'a-'+item.FechaApertura,
        HoraIngreso:item.HoraIngreso,
        FechaEgreso:'e-'+item.FechaEgreso,
        HoraEgreso:'he-'+item.HoraEgreso,
        Codigo:item.Codigo,
        Nombre:item.Nombre,
        Telefono:item.Telefono,
        DireccionDomicilio:item.DireccionDomicilio,
        MedicoAtiende:item.MedicoAtiende,
        Establecimieto_Origen:item.Establecimieto_Origen,
        NroReferenciaOrigen:item.NroReferenciaOrigen,
        diaggnostico_referencia:item.diaggnostico_referencia,
        Referencia_Destino:item.Referencia_Destino,
        NroReferenciaDestino:item.NroReferenciaDestino,
        Usuariodigitaros:item.Usuariodigitaros,
        Fecha_Digitador:item.Fecha_Digitador,
        horaInicioAtencion:item.horaInicioAtencion,
        dnipaciente:item.dnipaciente,
        formacita:item.formacita,
        IdAtencion:item.IdAtencion,
        IdCita:item.IdCita
    }  
      output.push(patient);
    }
    let diagNum = 1;
    let procNum = 1;
    for (let i = 1; i <= 4; i++) {
      if (patient[`diagnostico${i}`] === undefined) {
        diagNum = i;
        break;
      }
    }
    for (let i = 1; i <= 5; i++) {
      if (patient[`procedimiento${i}`] === undefined) {
        procNum = i;
        break;
      }
    }
    patient[`diagnostico${diagNum}`] = item.diagnostico;
    patient[`procedimiento${procNum}`] = item.procedimiento;
  });
  

for (let i = 0; i < output.length; i++) {
  const obj = {};
  const uniqueKeys = {};
  for (let key in output[i]) {
    if (!uniqueKeys.hasOwnProperty(output[i][key])) {
      uniqueKeys[output[i][key]] = true;
      obj[key] = output[i][key];
    }
  }
  result.push(obj);
}

result.forEach(function(element) {
  let diagnostico = [];
  let procedimiento = [];
  let max_diagnostico = 6;
  let max_procedimiento = 7;

  for (let i = 1; i <= max_diagnostico; i++) {
    let diag_key = "diagnostico" + i;
    if (element.hasOwnProperty(diag_key)) {
      diagnostico.push(element[diag_key]);
    } else {
      diagnostico.push(null);
    }
  }

  for (let i = 1; i <= max_procedimiento; i++) {
    let proc_key = "procedimiento" + i;
    if (element.hasOwnProperty(proc_key)) {
      procedimiento.push(element[proc_key]);
    } else {
      procedimiento.push(null);
    }
  }

  let obj = {
    "NroHistoriaClinica":element.NroHistoriaClinica,
    "nrocuenta": element.nrocuenta,
    "ApellidoPaterno":element.ApellidoPaterno,
    "ApellidoMaterno":element.ApellidoMaterno,
    "PrimerNombre":element.PrimerNombre,
    "SegundoNombre":element.SegundoNombre,
    "sexo":element.sexo,
    "Edad":element.Edad,
    "tipoedad":element.tipoedad,
    "departamento":element.departamento,
    "provincia":element.provincia,
    "distrito":(element.distrito).split("-")[1],
    "codigoseguro":element.codigoseguro,
    "seguro":element.seguro,
    "FechaSolicitud":element.FechaSolicitud.split("s-")[1],
    "HoraInicio":element.HoraInicio.split("hi-")[1],
    "FechaApertura":(element.FechaApertura).split("a-")[1],
    "HoraIngreso":element.HoraIngreso,
    "FechaEgreso":element.FechaEgreso.split("e-")[1],
    "HoraEgreso":element.HoraEgreso.split("he-")[1],
    "Codigo":element.Codigo,
    "Nombre":element.Nombre,
    "Telefono":nulled(element.Telefono),
    "DireccionDomicilio":element.DireccionDomicilio,
    "MedicoAtiende":element.MedicoAtiende,
    "Establecimieto_Origen":nulled(element.Establecimieto_Origen),
    "NroReferenciaOrigen":nulled(element.NroReferenciaOrigen),
    "diaggnostico_referencia":nulled(element.diaggnostico_referencia),
    "Referencia_Destino":nulled(element.Referencia_Destino),
    "NroReferenciaDestino":nulled(element.NroReferenciaDestino),
    "Usuariodigitaros":element.Usuariodigitaros,
    "Fecha_Digitador":element.Fecha_Digitador,
    "horaInicioAtencion":element.horaInicioAtencion,
    "dnipaciente":element.dnipaciente,
    "formacita":element.formacita,
    "IdAtencion":element.IdAtencion,
    "IdCita":element.IdCita,
    "diagnostico1": nulled(diagnostico[0]),
    "diagnostico2": nulled(diagnostico[1]),
    "diagnostico3": nulled(diagnostico[2]),
    "diagnostico4": nulled(diagnostico[3]),
    "diagnostico5": nulled(diagnostico[4]),
    "diagnostico6": nulled(diagnostico[5]),
    "procedimiento1": nulled(procedimiento[0]),
    "procedimiento2": nulled(procedimiento[1]),
    "procedimiento3": nulled(procedimiento[2]),
    "procedimiento4": nulled(procedimiento[3]),
    "procedimiento5": nulled(procedimiento[4]),
    "procedimiento6": nulled(procedimiento[5]),
    "procedimiento7": nulled(procedimiento[6])
  };

  output2.push(obj);
});
   
insertData(output2)

}

function query(){


    let d1 = document.getElementById("anio").value
    let d2 = document.getElementById("mes").value
    let modalidad = document.getElementById("modalidad").value

    if(modalidad == 1){
      fetchQuery(d1,d2)
    }else if(modalidad == 2){
      let code = document.getElementById("code").value

      if(code != ""){
        fetchQueryByCode(d1,d2,code)
      }else{
        Swal.fire(
          "Oops!",
          "Ingrese el código del servicio!",
          "info"
        )
      }

    }else{
      let name = document.getElementById("name").value

      if(name != ""){
        fetchQueryByName(d1,d2,name)
      }else{
        Swal.fire(
          "Oops!",
          "Ingrese el nombre del servicio!",
          "info"
        )
      }
      
    }

}

function fetchQuery(d1,d2){
    disabledButtons()
    allData = []
    fetch(`${url}/diagnosticos_procedimientos/${d1}/${d2}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {

        clearJSON(data)

      }).catch(err => {
        
        console.log(err)
        enableButtons()
      }); 
}

function fetchQueryByCode(d1,d2,code){
  disabledButtons()
  allData = []
  fetch(`${url}/diagnosticos_procedimientos_codigo/${d1}/${d2}/${code}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      clearJSON(data)

    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 
}

function fetchQueryByName(d1,d2,name){
  disabledButtons()
  allData = []
  fetch(`${url}/diagnosticos_procedimientos_nom/${d1}/${d2}/${name}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {

      clearJSON(data)

    }).catch(err => {
      
      console.log(err)
      enableButtons()
    }); 
}

function insertData(data){
    document.getElementById("tbody").innerHTML = ""
    allData = data

    $('#tb-data').DataTable().destroy()

    $("#tbody").html(data.map((d) => {


              return `
              <tr style="cursor: pointer;">
              <td class="minText2">${d.NroHistoriaClinica}</td>
              <td class="minText2">${d.nrocuenta}</td>
              <td class="minText2">${d.ApellidoPaterno+" "+d.ApellidoMaterno+" "+d.PrimerNombre}</td>
              <td class="minText2">${d.sexo}</td>
              <td class="minText2">${d.Edad+' '+d.tipoedad}</td>
              <td class="minText2">${d.departamento}</td>
              <td class="minText2">${d.provincia}</td>
              <td class="minText2">${d.distrito}</td>
              <td class="minText2">${d.codigoseguro}</td>
              <td class="minText2">${d.seguro}</td>
              <td class="minText2">${d.FechaSolicitud}</td>
              <td class="minText2">${d.HoraInicio}</td>
              <td class="minText2">${d.FechaApertura}</td>
              <td class="minText2">${d.HoraIngreso}</td>
              <td class="minText2">${d.FechaEgreso}</td>
              <td class="minText2">${d.HoraEgreso}</td>
              <td class="minText2">${d.Telefono}</td>
              <td class="minText2">${d.DireccionDomicilio}</td>
              <td class="minText2">${d.MedicoAtiende}</td>
              <td class="minText2">${d.Establecimieto_Origen}</td>
              <td class="minText2">${d.NroReferenciaOrigen}</td>
              <td class="minText2">${d.diaggnostico_referencia}</td>
              <td class="minText2">${d.Usuariodigitaros}</td>
              <td class="minText2">${d.Fecha_Digitador}</td>
              <td class="minText2">${d.IdAtencion}</td>
              <td class="minText2">${d.IdCita}</td>
              <td class="minText2">${d.Nombre}</td>
              <td class="minText2">${d.Codigo}</td>
              <td class="minText2">${d.diagnostico1}</td>
              <td class="minText2">${d.diagnostico2}</td>
              <td class="minText2">${d.diagnostico3}</td>
              <td class="minText2">${d.diagnostico4}</td>
              <td class="minText2">${d.diagnostico5}</td>
              <td class="minText2">${d.diagnostico6}</td>
              <td class="minText2">${d.procedimiento1}</td>
              <td class="minText2">${d.procedimiento2}</td>
              <td class="minText2">${d.procedimiento3}</td>
              <td class="minText2">${d.procedimiento4}</td>
              <td class="minText2">${d.procedimiento5}</td>
              <td class="minText2">${d.procedimiento6}</td>
              <td class="minText2">${d.procedimiento7}</td>
              </tr>`;
          })
          .join("")
      );

      createDatatable()

      setTimeout(function() {
        document.getElementById("tr-table").click();
      }, 500);

      enableButtonsFetch()

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
       },scrollY: '50vh',scrollX: true, sScrollXInner: "100%",
       scrollCollapse: true,
      });
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();

}

function exportToExcel(){
    let xls = new XlsExport(allData, 'reporte');
    let d1 = document.getElementById("anio").value
    let d2 = document.getElementById("mes").value
    xls.exportToXLS('reporte-'+d2+'-'+d1+'-diag-proc-.xls')
  }

  function disabledButtons(){
    loader.style = "display:block;"
    document.getElementById("btn-xls").disabled = true
    document.getElementById("btn-search").disabled = true
    }
    
    function enableButtons(){
    loader.style = "display:none;"
    document.getElementById("btn-xls").disabled = false
    document.getElementById("btn-xls").style = "display:none"
    document.getElementById("btn-search").disabled = false
    }

    function enableButtonsFetch(){
      loader.style = "display:none;"
      document.getElementById("btn-xls").disabled = false
      document.getElementById("btn-xls").style = "display:block"
      document.getElementById("btn-search").disabled = false
      }


    function nulled(data){

      let x = ""

      if(data == "T-NULL" || data == "EO-NULL" || data == "NRO-NULL" || data == "DR-NULL" || data == "RF-NULL" || data == "NRD-NULL" || data == null){
        x = "-"
      }else{
        x = data
      }

      return x

    }