
var controller 
var signal 
var allData = []
getTypeFinance()

function search(){

    let d_init = document.getElementById("d-init").value
    let d_final = document.getElementById("d-final").value
    let font = document.getElementById("inputGroupSelectFinance").value

    if(d_init != "" && d_final != ""){

        document.getElementById("btn-search").disabled = true
        document.getElementById("btn-cancel").style = "display:block;"
        loader.style = "display:block;"

        controller = new AbortController();
        signal = controller.signal;

        fetch(`${url}/production/${d_init}/${d_final}/${font}`,{
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
            document.getElementById("btn-search").disabled = false
            document.getElementById("btn-cancel").disabled = false
            document.getElementById("btn-cancel").style = "display:none;"
            console.log(err)
            loader.style = "display:none;"
          });  

    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'warning'
          )
    }

}


function insertData(data){

    let ctx = 0
    allData = []

    document.getElementById("tbody").innerHTML = ""
    $('#tb-data').DataTable().destroy()

    $("#tbody").html(data.map((d) => {

        allData.push({

            'N° cuenta':d.cuenta,
            'N° Formato':d.nro_formato,
            'Fecha de ingreso':'',
            'Fecha de atención':d.f_atencion,
            'Fecha de egreso.Adm':'',
            'Beneficiario':d.beneficiario,
            'Hist.Clinica':d.hist_clinica,
            'FF':'',
            'Servicio':d.servicio,
            'Medico':d.medico,
            'Digitador':d.digitador,
            'Usuario':d.usuario,
            'Nombre de usuario':d.nombre_digitador,
            'Nombre de servicio':typeService(d.servicio_egreso),
            'Valorizado':d.TotalValorizado,
            'Mes':d.mes,
            'Periodo':d.periodo

        })

        
        ctx++

              return `

              <tr style="cursor: pointer;">
              <td class="minText2">${ctx}</td>
              <td class="minText2">${d.cuenta}</td>
              <td class="minText2">${d.nro_formato}</td>
              <td class="minText2">${d.f_atencion}</td>
              <td class="minText2">${d.beneficiario}</td>
              <td class="minText2">${d.servicio}</td>
              <td class="minText2">${d.medico}</td>
              <td class="minText2">${d.hist_clinica}</td>
              <td class="minText2">${d.digitador}</td>
              <td class="minText2">${d.mes}</td>
              <td class="minText2">${d.periodo}</td>
              <td class="minText2">${typeService(d.servicio_egreso)}</td>
              <td class="minText2">${d.usuario}</td>
              <td class="minText2">${d.nombre_digitador}</td>
              <td class="minText2"><b style="color:green;">S/${d.TotalValorizado}</b></td>
              </tr>`;
          })
          .join("")
      );

      
      loader.style = "display:none;"
      document.getElementById("btn-search").disabled = false
      document.getElementById("btn-cancel").style = "display:none;"
      document.getElementById("btn-xls").style = "display:block;"
      createDatatable()

}


function isNulledDate(val){

    let x = val

    if(x == null || x == ""){
        x = "<b>Sin datos</b>"
    }else{
        x = date(x)
    }

    return x

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
    xls.exportToXLS('produccion.xls')
  }

  function cancel(){
  
    controller.abort();
    signal.addEventListener('abort', () => {
        console.log(signal.aborted);
    });
  
    document.getElementById("btn-cancel").style = "display:none;"
  
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