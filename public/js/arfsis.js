
var jsonRC = []
var rc = []
let btnX = document.getElementById("download-button")
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
       scrollCollapse: true, charset: 'utf-8',
      });
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

function readFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        btnX.style = "display:none;"
        reader.onload = function(event) {
            const content = event.target.result;
            jsonRC = [];
            rc = []
            let ctxV = content.split("\n");
            let ctx = ctxV.length - 2;

            for (let x = 0; x <= ctx; x++) {
                let dataRC = content.split("\n")[x];
                let fua = dataRC.split("|")[0] + '-' + dataRC.split("|")[1] + '-' + dataRC.split("|")[2];
                let jsonData = JSON.parse(dataRC.split("|")[3]);

                if (jsonData.reglas) {
                    jsonData.reglas.forEach(function(rule) {
                        let numRule = (rule.match(/RC\d+/) || [])[0];
                        jsonRC.push({
                            'FUA': fua,
                            'RC': numRule,
                            'DESCRIPCION': rule
                        });
                    });
                }
            }

            let uniqueJsonRC = Array.from(new Set(jsonRC.map(JSON.stringify))).map(JSON.parse);
            rc = uniqueJsonRC
            insertDataIntoTable(uniqueJsonRC);
        };
        reader.readAsText(file, 'UTF-8');
    } else {
        console.error('No file selected');
    }
}
function insertDataIntoTable(uniqueJsonRC) {
    const tbody = document.getElementById('tbody');
    $('#tb-data').DataTable().destroy()
    
    // Limpiar el contenido existente de la tabla
    tbody.innerHTML = '';

    // Iterar sobre cada objeto en el array uniqueJsonRC
    uniqueJsonRC.forEach(function(item) {
        // Crear una nueva fila de tabla <tr>
        const newRow = document.createElement('tr');

        // Crear celdas de tabla <td> para cada propiedad del objeto
        const fuaCell = document.createElement('td');
        fuaCell.textContent = item.FUA;

        const rcCell = document.createElement('td');
        rcCell.textContent = item.RC;

        const descripcionCell = document.createElement('td');
        descripcionCell.textContent = item.DESCRIPCION;

        // Agregar las celdas a la fila
        newRow.appendChild(fuaCell);
        newRow.appendChild(rcCell);
        newRow.appendChild(descripcionCell);

        // Agregar la fila a la tabla
        tbody.appendChild(newRow);
    });
    createDatatable()
    btnX.style = "display:block;"
}

function downloadFile(){
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0].name.split(".zip")[0];
    let xls = new XlsExport(rc, 'Arfsis');
    xls.exportToXLS(`RC ARFSIS - ${file}.xls`)
  }
  