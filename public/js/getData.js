
var loader = document.getElementById("loader")
var body = document.getElementById("body")
var search = document.getElementById("dropdown_type_query")
var dropdown_status = document.getElementById("select_status")
var value = 1
var valueStatus = 0
var statusValue = []

        search.addEventListener('change', function handleChange(event) {
            value = event.target.value
            if(value == 1){
                document.getElementById("type_input").innerHTML = ""
                document.getElementById("type_input").innerHTML = `<input type="tel" 
                onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" class="form-control" id="i_advanced-search">`
            }else{
                document.getElementById("type_input").innerHTML = ""
                document.getElementById("type_input").innerHTML = `<input type="text" class="form-control" id="i_advanced-search">`
            }
            
        })

        dropdown_status.addEventListener('change', function handleChange(event) {
            valueStatus = event.target.value
        })

start()
getStatus()

    function start(){
        loader.style = "display:block;"
        fetch(`${url}/getdata_invoice_charge/100`)
            .then(response => response.json())
            .then(data => {
                insertData(data)
                console.log(data)
            }).catch(err =>{
                console.log(err)
                loader.style = "display:block;"
            } );
    }
    function getStatus(){
        fetch(`${url}/getdata_status_invoice`)
            .then(response => response.json())
            .then(data => {
                statusValue = data
                console.log(data)
                let select = document.querySelector("#select_status");
                for (let v of data) {
                    let options = document.createElement("option");
                    options.value = v.IdEstadoComprobante;
                    options.text = (v.Descripcion).toUpperCase()
                    select.appendChild(options)
                  }

            }).catch(err =>{
                console.log(err)
            } );
    }
  

    function insertData(data){

        document.getElementById("tbody").innerHTML = ""
        loader.style = "display:block;"
    
        let ctx = 0
        $('#tb-data').DataTable().destroy()

        $("#tbody").html(data.map((d) => {
            ctx++

            let fecha_atencion = d.FechaCobranza 
            let s = ""
            let tr = ""

            if(d.IdEstadoComprobante == 4 ){
                s = "PAGADO"
                tr = `<tr style="background-color:#00831c18;cursor: pointer;" id="i-${d.IdComprobantePago}" onclick="openDetails('${encodeURIComponent(JSON.stringify(d))}',this)"><a/>`
            }else if(d.IdEstadoComprobante == 6){
                s = "DEVUELTO"
                tr = `<tr style="background-color:#ffd90018;cursor: pointer;" id="i-${d.IdComprobantePago}" onclick="openDetails('${encodeURIComponent(JSON.stringify(d))}',this)"><a/>`
            }
            else if (d.IdEstadoComprobante == 9){
                s = "ANULADO"
                tr = `<tr style="background-color:#ff000018;cursor: pointer;" id="i-${d.IdComprobantePago}" onclick="openDetails('${encodeURIComponent(JSON.stringify(d))}',this)"><a/>`
            }
            else{
                s = "SIN DATOS"
                tr = `<tr style="background-color:#00000018;cursor: pointer;" id="i-${d.IdComprobantePago}" onclick="openDetails('${encodeURIComponent(JSON.stringify(d))}',this)"><a/>`
            }

                  return `

                  ${tr}
                  <td>${ctx}</td>
                  <td>${d.NroSerie}</td>
                  <td>${d.NroDocumento}</td>
                  <td>${d.RazonSocial}</td>
                  <td id="s-${d.IdComprobantePago}">${s}</td>
                  <td>${(d.SubTotal).toFixed(2)}</td>
                  <td>${(d.Total).toFixed(2)}</td>
                  <td>${fecha_atencion.split("T")[0]}</td>
                  <td>${fecha_atencion.split("T")[1].split(".000Z")[0]}</td>
                  </tr>`;

              })
              .join("")
          );
          $('#tb-data').DataTable().destroy()
          createScriptDatatable()
          loader.style = "display:none;"
          body.style = ""
    }


function openDetails(d,x){
    d = JSON.parse(decodeURIComponent(d))
    document.getElementById("t_update").innerHTML = ""
    document.getElementById("t_update").innerHTML = `
    <button type="button" class="btn btn-success" onclick="updateStatus('${encodeURIComponent(JSON.stringify(d))}')">Actualizar</button>`
    document.getElementById("detail_num_doc").innerHTML = "Número de documento : "+d.NroDocumento
    document.getElementById("detail_serie").value = d.NroSerie
    document.getElementById("detail_rs").value = d.RazonSocial
    document.getElementById("detail_sub_total").value = "S/"+d.SubTotal
    document.getElementById("detail_total").value = "S/"+d.Total

    statusValue.forEach(e => {
        if(e.IdEstadoComprobante == d.IdEstadoComprobante){
            document.getElementById("detail_status").value = (e.Descripcion).toUpperCase()
        }
    });

    $('#details').modal('show')

    //alert(x.rowIndex)

}

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
         },scrollY: '50vh', scrollX: true, sScrollXInner: "100%",
         scrollCollapse: true,
         searching: false,
        });
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}

        /*
        let values = (document.getElementById("tb-data_info").innerHTML).split(" ")
        document.getElementById("tb-data_info").innerHTML = values[0]+" "+values[1]+" "+values[2]+" "+values[3]+" "+values[4]+" "+"<b style='font-size:22px;'>"+values[5]+"</b>"+" "+"<b style='font-size:22px;'>"+values[6]+"</b>"
        
        $('#tb-data_length').append(`&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
        Consultar registros&nbsp;
        <input type="tel" id="custom_reg" placeholder="N° de registros"
        onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" maxlength="5" style="width:130px;">
        &nbsp;
        <button onclick="customSizeQuery()" style="font-weight: bold;" class="btn btn-outline-success">Consultar</button>`)*/
        
      


      function advancedSearch(){

        let valueInputAV = document.getElementById("i_advanced-search").value

        if(value != 0){
            
           if(value == 1){

            if(valueInputAV != ""){

                fetchAdvancedSearch("getdata_by_num_doc",valueInputAV)

            }else{
                Swal.fire(
                    'Oops',
                    'Ingrese el número de documento!',
                    'warning'
                  ) 
            }

           }else{
            if(valueInputAV != ""){

                fetchAdvancedSearch("getdata_by_razon_social",valueInputAV)

            }else{
                Swal.fire(
                    'Oops',
                    'Ingrese la razon social!',
                    'warning'
                  ) 
            }
           }
            
        }else{
            Swal.fire(
                'Oops',
                'Seleccione una opción!',
                'warning'
              )
        }
  
      }

      function fetchAdvancedSearch(type,value){
        body.style = 'Background-color: rgba(231, 231, 231, 0.062);filter:alpha(opacity=30);-moz-opacity:.30;opacity:.30;'
        loader.style = "display:block;"
        fetch(url+'/'+type+'/'+value)
        .then(response => response.json())
        .then(data => {
            insertData(data)
            console.log(data)
        }).catch(err => {
            console.log(err)
            loader.style = "display:none;"
            body.style = ""
        });  
      }

      function closeModal(){

        $('#details').modal('hide')
        var mySelect = document.getElementById('select_status')
        mySelect.selectedIndex = 0;
        valueStatus = 0

      }

      function updateStatus(d){

        d = JSON.parse(decodeURIComponent(d))

        var status_select = document.getElementById("select_status")
        var status_input = document.getElementById("detail_status").value
        var selectedText = status_select.options[status_select.selectedIndex].text
        var value_selected = status_select.value
       
        if(selectedText != "Seleccione una opción..."){
            
            if(status_input != selectedText){

                //update and hide
                fetch(url+'/update_status_invoice/'+value_selected+'/'+d.IdComprobantePago,{method: "POST"})
                .then(response => response.json()) 
                .then(json => {
                    //start()
                    d.IdEstadoComprobante = value_selected
                    loader.style = "display:none;"
                    body.style = ""
                    document.getElementById('i-'+d.IdComprobantePago).setAttribute('onclick',`openDetails('${encodeURIComponent(JSON.stringify(d))}')`)
                    document.getElementById('s-'+d.IdComprobantePago).innerHTML = ""
                    document.getElementById('s-'+d.IdComprobantePago).innerHTML = selectedText
                    document.getElementById("detail_status").value = selectedText

                    if(value_selected == 4){document.getElementById('i-'+d.IdComprobantePago).setAttribute('style',`background-color:#00831c18;cursor: pointer;`)}
                    else if(value_selected == 6){document.getElementById('i-'+d.IdComprobantePago).setAttribute('style',`background-color:#ffd90018;cursor: pointer;`)}
                    else if(value_selected == 9){document.getElementById('i-'+d.IdComprobantePago).setAttribute('style',`background-color:#ff000018;cursor: pointer;`)}
                    else{document.getElementById('i-'+d.IdComprobantePago).setAttribute('style',`background-color:#00000018;cursor: pointer;`)}

                    Swal.fire({  title: 'Actualizado!',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false})
                    console.log(json)
                })
                .catch(err => console.log(err))
                    
            }else{
                Swal.fire(
                    'Oops',
                    'El estado debe ser diferente al registro',
                    'warning'
                  )

            }

        }else{
            Swal.fire(
                'Oops',
                'Debe seleccionar una opción',
                'warning'
              )
        }

      }

      