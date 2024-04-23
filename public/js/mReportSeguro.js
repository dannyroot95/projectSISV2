
var loader = document.getElementById("loader")
var body = document.getElementById("body")
var controller 
var signal 
var allData

var arrayInc = []
createScriptDatatable()
myChart()

function createScriptDatatable(){

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
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
     },scrollY: '50vh',scrollX: true,
     scrollCollapse: true,
    });
  }


  function search(){

    let d_init = document.getElementById("d-init").value
    let d_final = document.getElementById("d-final").value
    let filter = document.getElementById("selectFilters")
    var value_selected = filter.value

    if(d_init != "" && d_final != "" && value_selected != 0){
        d_init = d_init + " 00:00:01.000"
        d_final = d_final + " 23:59:59.000"
        fetchSearch(value_selected,d_init,d_final)
    }else{
      Swal.fire(
        'Oops!',
        'Complete los campos!',
        'warning'
      )
    }

  }

  function fetchSearch(v,init,final){

    controller = new AbortController();
    signal = controller.signal;

    body.style = 'Background-color: rgba(231, 231, 231, 0.062);filter:alpha(opacity=30);-moz-opacity:.30;opacity:.30;'
    loader.style = "display:block;"

    document.getElementById("btn-query").disabled = true
    document.getElementById("btn-cancel").style = "display:block;font-weight:bold;"

    fetch(`${url}/insurance_report/${parseInt(v)}/${init}/${final}`,{
      method: 'get',
      signal: signal,
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
        allData = data
        document.getElementById("btn-query").disabled = false
        insertData(data)
        console.log(data)
    }).catch(err => {
        document.getElementById("btn-query").disabled = false
        console.log(err)
        loader.style = "display:none;"
        body.style = ""
    });  
  }

  function insertData(data){
    document.getElementById("tbody").innerHTML = ""
    loader.style = "display:block;"

    let ctx = 0
    let total = 0.0
    let nullFuas = 0
    let payNotFua = 0.0
    $('#tb-data').DataTable().destroy()
  
    $("#tbody").html(data.map((d) => {
        ctx++
        total += d.TotalPorPagar

        if(d.FUA == ""){
            nullFuas++
            payNotFua = payNotFua+d.TotalPorPagar
        }
        
        let name = `${d.ApellidoPaterno} ${d.ApellidoMaterno} ${d.Nombres}`

        arrayInc.push([ctx,name,d.Departamento,d.Provincia,d.Distrito,d.FUA,d.NCuenta,d.HC,d.FIngreso.split("T")[0],d.FEgreso.split("T")[0]])

              return `

              <tr style="cursor: pointer;" onclick="openDetails('${encodeURIComponent(JSON.stringify(d))}')">
              <td>${ctx}</td>
              <td>${name}</td>
              <td>${d.Departamento}</td>
              <td>${d.Provincia}</td>
              <td>${d.Distrito}</td>
              <td>${d.FUA}</td>
              <td>${d.NCuenta}</td>
              <td>${d.HC}</td>
              <td>${d.FIngreso.split("T")[0]}</td>
              <td>${d.FEgreso.split("T")[0]}</td>
              </tr>`;
          })
          .join("")
      );
     
      createScriptDatatable()
      loader.style = "display:none;"
      body.style = ""
      total = Number(total.toFixed(2))
      document.getElementById("total-atention").innerHTML = ctx
      document.getElementById("total-atention").style = "font-size: 22px;color: #002E85;font-weight: bold;"
      document.getElementById("net-pay").innerHTML = `<h4 style="color: rgb(0, 107, 27);font-weight: bold;">S/${total}</h4>`
      document.getElementById("no-fua").innerHTML = nullFuas
      document.getElementById("no-fua").style = "font-size: 22px;font-weight: bold;color: red;"
      document.getElementById("no-fua-pay").innerHTML = "S/"+Number(payNotFua.toFixed(2))
      document.getElementById("no-fua-pay").style = "font-size: 22px;font-weight: bold;color: red;"
      document.getElementById("yes-fua").innerHTML = ctx-nullFuas
      document.getElementById("yes-fua").style = "font-size: 22px;font-weight: bold;color: green;"
      document.getElementById("yes-fua-pay").innerHTML = "S/"+Number((total-payNotFua).toFixed(2))
      document.getElementById("yes-fua-pay").style = "font-size: 22px;font-weight: bold;color: green;"
      document.getElementById("g-body").style = "overflow-y: scroll;"
      document.getElementById("btn-print").style = "display:block;font-weight: bold;"
      document.getElementById("btn-export").style = "display:block;font-weight: bold;"
      document.getElementById("btn-cancel").style = "display:none;"
      myChart((ctx-nullFuas),nullFuas)

      var table = $('#tb-data').DataTable();
 
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();

}

function cancelFetch(){
  
  controller.abort();
  signal.addEventListener('abort', () => {
      console.log(signal.aborted);
  });

  document.getElementById("btn-cancel").style = "display:none;"

}

  function myChart(v1,v2){

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let actual = day+"/"+month+"/"+year

    var myConfig = {
        type: "pie",
        plot: {
          borderColor: "#2B313B",
          borderWidth: 5,
          // slice: 90,
          valueBox: {
            placement: 'out',
            text: '%t\n%npv%',
            fontFamily: "Open Sans"
          },
          tooltip: {
            fontSize: '18',
            fontFamily: "Open Sans",
            padding: "5 10",
            text: "%npv%"
          },
          animation: {
            effect: 2,
            method: 5,
            speed: 900,
            sequence: 1,
            delay: 3000
          }
        },
        source: {
          text: 'Hospital Santa Rosa',
          fontColor: "#8e99a9",
          fontFamily: "Open Sans"
        },
        title: {
          fontColor: "#8e99a9",
          text: 'Análisis de FUAs',
          align: "left",
          offsetX: 10,
          fontFamily: "Open Sans",
          fontSize: 30
        },
        subtitle: {
          offsetX: 10,
          offsetY: 10,
          fontColor: "#8e99a9",
          fontFamily: "Open Sans",
          fontSize: "18",
          text: actual,
          align: "left"
        },
        plotarea: {
          margin: "0 0 0 0"
        },
        series: [{
            values: [v1],
            text: "Atenciones con FUA",
            fontSize: "18",
            backgroundColor: '#50ADF5',
          },
          {
            values: [v2],
            text: "Atenciones sin FUA",
            backgroundColor: '#FF7965',
            fontSize: "18",
            detached: true
          }
        ]
      };
       
      zingchart.render({
        id: 'myChart',
        data: myConfig,
        height: '100%',
        width: '100%'
      });
  }


  function printData(){

    Swal.fire({
      title: 'En breves se descargará el archivo!',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let actual = day+"/"+month+"/"+year

    var doc = new jspdf.jsPDF()
    doc.setFontSize(26)
    doc.text(30, 16, "Hospital Santa Rosa")
    doc.setFontSize(8)
    doc.text(30, 22, "Fecha de generacion del reporte : "+actual)
	  doc.setFontSize(8)
	  doc.addImage('/image/logo.png', 'JPEG', 7, 2, 20, 20)
      doc.autoTable({
      head: [['#','Nombres','Departamento','Provincia','Distrito','FUA','Número de cuenta','Historia clínica','Fecha de ingreso','Fecha de egreso']],
      body: arrayInc,
      theme: 'grid',
      styles : { halign : 'center'},
     headStyles :{fillColor : [239, 183, 0]}, 
     alternateRowStyles: {fillColor : [255, 247, 223]}, 
     tableLineColor: [239, 183, 0], 
     tableLineWidth: 0.1,
     margin: {top: 30},
      })
      doc.save('Reporte seguros_'+actual)
  
    }

    function exportToExcel(){
      let xls = new XlsExport(allData, 'reporte');
      xls.exportToXLS('reporte_de_seguros.xls')
    }