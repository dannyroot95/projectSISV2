
var controller 
var signal 
var allData = []

function search(){

    let d_init = document.getElementById("d-init").value
    let d_final = document.getElementById("d-final").value

    if(d_init != "" && d_final != ""){

      let date1 = new Date(d_init)
      let date2 = new Date(d_final)
      var diferenciaMilisegundos = Math.abs(date2 - date1)
      var dias = (Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24)))+1

      if(dias <= 15){
        document.getElementById("btn-search").disabled = true
        document.getElementById("btn-cancel").style = "display:block;"
        loader.style = "display:block;"

        controller = new AbortController();
        signal = controller.signal;

        fetch(`${url}/production_ins_med/${d_init}/${d_final}`,{
            method: 'get',
            signal: signal,
            headers: {
              'Accept': 'application/json'
            }
        })
          .then(response => response.json())
          .then(data => {

              console.log(data)
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
            'El rango de fechas solo puede ser menor o igual a 15 dias!',
            'warning'
          )
    }

        

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

      const insNotDuplex = [...new Set(d.insumos.split('|'))].join('|')
      const medNotDuplex = [...new Set(d.medicamentos.split('|'))].join('|')

        allData.push({

            'N° cuenta':d.cuenta,
            'N° Formato':d.nro_formato,
            'Fecha de atención':d.f_atencion,
            'Beneficiario':d.beneficiario,
            'Servicio':d.servicio,
            'Medico':d.medico,
            'Hist.Clinica':d.hist_clinica,
            'Digitador':d.digitador,
            'Mes':d.mes,
            'Periodo':d.periodo,
            'Usuario':d.usuario,
            'Nombre de usuario':d.nombre_digitador,
            'Nombre de servicio':typeService(d.servicio_egreso),
            'medicamentos':medNotDuplex,
            'insumos':insNotDuplex
        })

        ctx++

              return `

              <tr style="cursor: pointer;">
              <td class="minText2">${d.nro_formato}</td>
              <td class="minText2">${d.f_atencion}</td>
              <td class="minText2">${d.beneficiario}</td>
              <td class="minText2">${d.medico}</td>
              <td class="minText2">${d.hist_clinica}</td>
              <td class="minText2">${d.digitador}</td>
              <td class="minText2">${typeService(d.servicio_egreso)}</td>
              <td class="minText3">${insNotDuplex.replace(/\|/g, '<p></p>')}</td>
              <td class="minText3">${medNotDuplex.replace(/\|/g, '<p></p>')}</td>
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
  
    let d_init = document.getElementById("d-init").value
    let d_final = document.getElementById("d-final").value

    let xls = new XlsExport(allData, 'reporte');
    xls.exportToXLS('produccion_ins_med_del_'+d_init+'_al_'+d_final+'.xls')
  }

  function cancel(){
  
    controller.abort();
    signal.addEventListener('abort', () => {
        console.log(signal.aborted);
    });
  
    document.getElementById("btn-cancel").style = "display:none;"
  
  }