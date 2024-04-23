var controller 
var signal 
var allData = []

var arrayInc = []
createDatatable()
getTypeFinance()

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

function search(){

    let f1 = document.getElementById("d-init").value
    let f2 = document.getElementById("d-final").value
    let font = document.getElementById("inputGroupSelectFinance").value

    if(f1 != "" && f2 != ""){

        getData(f1,f2,font)

    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'warning'
          )
    }

}

function getData(f1,f2,font){

    controller = new AbortController();
    signal = controller.signal;

    document.getElementById("btn-search").disabled = true
    document.getElementById("btn-cancel").style = "display:block;"
    loader.style = "display:block;"

    fetch(`${url}/discharge_control/${f1}/${f2}/${font}`,{
        method: 'get',
        signal: signal,
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
          insertData(data)
          console.log(data)
      }).catch(err => {
          document.getElementById("btn-search").disabled = false
          console.log(err)
          loader.style = "display:none;"
      }); 


}

function insertData(data){

    document.getElementById("tbody").innerHTML = ""
    $('#tb-data').DataTable().destroy()
    let vTotal = 0
    allData = []

    $("#tbody").html(data.map((d) => {

        arrayInc.push([d.Ncuenta,d.Asegurado,d.HC,d.FF,d.F_ingreso,d.F_egreso,d.F_E_Administrativo,d.Origen,d.Servicio_egreso,d.E_cuenta,d.medico,d.Nombre_usuario,d.F_ultima_receta,d.TotalValorizado])

        vTotal += parseFloat(d.TotalValorizado)
     
        allData.push({

            'Cuenta':d.Ncuenta,
            'FF':d.FF,
            'Fecha de ingreso':isNulledDate(d.F_ingreso),
            'Fecha de egreso':isNulledDate(d.F_egreso),
            'Fecha de egreso administrativo':isNulledDate(d.F_E_Administrativo),
            'Asegurado':isNulledString(d.Asegurado),
            'FUA':isNulledString(d.FUA),
            'HC':isNulledString(d.HC),
            'Codigo prestacional':isNulledString(d.prestacion),
            'Medico':d.medico,
            'DNI-Digitador':isNulledString(d.dni_digitador),
            'U.Digitador':isNulledString(d.Usuario),
            'Digitador':isNulledString(d.Nombre_usuario),
            'Origen':d.Origen,
            'UPS':(d.Servicio_egreso),
            'Estado':d.E_cuenta,
            'Fecha de ultima receta':isNulledDateWithHour(d.F_ultima_receta),
            'Valorizado':d.TotalValorizado

        })

        
              return `

              <tr style="cursor: pointer;">
              <td class="minText4"><button style="width:30px;height:30px;" class="btn btn-dark"><i style="margin-left:-6px;" class="bi bi-eye-fill"></i></button></td>
              <td class="minText4">${d.Ncuenta}</td>
              <td class="minText4">${d.FF}</td>
              <td class="minText4">${isNulledDate(d.F_ingreso)}</td>
              <td class="minText4">${isNulledDate(d.F_egreso)}</td>
              <td class="minText4">${isNulledDate(d.F_E_Administrativo)}</td>
              <td class="minText4">${d.Asegurado}</td>
              <td class="minText4">${isNulledString(d.FUA)}</td>
              <td class="minText4">${d.HC}</td>
              <td class="minText4">${isNulledString(d.prestacion)}</td>
              <td class="minText4">${isNulledString(d.medico)}</td>
              <td class="minText4">${isNulledString(d.dni_digitador)}</td>
              <td class="minText4">${isNulledString(d.Usuario)}</td>
              <td class="minText4">${isNulledString(d.Nombre_usuario)}</td>
              <td class="minText4">${isNulledString(d.Origen)}</td>
              <td class="minText4">${(d.Servicio_egreso)}</td>
              <td class="minText4">${statusAccount(d.E_cuenta)}</td>
              <td class="minText4">${isNulledDateWithHour(d.F_ultima_receta)}</td>
              <td class="minText4"><b style="color:green;">S/${d.TotalValorizado}</b></td>
              </tr>`;
          })
          .join("")
      );

      loader.style = "display:none;"
      document.getElementById("btn-search").disabled = false
      document.getElementById("btn-cancel").style = "display:none;"
      document.getElementById("btn-xls").style = "display:block;"
      document.getElementById("v-total").innerHTML = 'S/'+(vTotal.toFixed(2)).toString()
      createDatatable()

}


function cancel(){
  
    controller.abort();
    signal.addEventListener('abort', () => {
        console.log(signal.aborted);
    });
  
    document.getElementById("btn-cancel").style = "display:none;"
  
  }


  function isNulledDate(val){

    let x = val

    if(x == null || x == ""){
        x = `<b style="color:red;">Sin datos</b>`
    }else{
        x = date(x)
    }

    return x

  }

  function isNulledDateWithHour(val){

    let x = val

    if(x == null || x == ""){
        x = `<b style="color:red;">Sin datos</b>`
    }else{
        x = dateWithHour(x)
    }

    return x

  }

  function isNulledString(val){

    let x = val

    if(x == null || x == ""){
        x = `<b style="color:red;">Sin datos</b>`
    }

    return x

  }

  function exportToExcel(){

    Swal.fire({
        title: 'En breves se descargará el archivo!',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      })
  

    let xls = new XlsExport(allData, 'reporte');
    xls.exportToXLS('control_de_altas.xls')
  }

 
  function statusAccount(status){

    let x = ""

    if(status == "REGISTRADO"){

        x = '<b style="color:green;">REGISTRADO</b>'

    }else if(status == "CERRADO"){
        x = '<b style="color:#00163F;">CERRADO</b>'
    }else if(status == "ANULADO"){
        x = '<b style="color:red;">ANULADO</b>'
    }else{
        x = '<b>'+status+'</b>'
    }

    return x

  }

function getTypeFinance(){

    fetch(`${url}/get-type-finance`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
        insertTypeFinance(data)
      }).catch(err => {
          console.log(err)
      }); 
}

function insertTypeFinance(data){
    $("#inputGroupSelectFinance").html(data.map((d) => {
              return  `<option value="${d.IdFuenteFinanciamiento}">${d.Descripcion}</option>`;
          })
          .join("")
      );
}