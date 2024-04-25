getAllUsers()
let allData = []
let allData2 = []
let loader = document.getElementById("loader")
let load = document.getElementById("loader2")
createDatatable()
createDatatable2()

let checkbox = document.getElementById("chk-user");
let checkboxAccount = document.getElementById("chk-account");
checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
        checkboxAccount.checked = false
        document.getElementById("s-users").style = "display: flex;width: 60%;"
        document.getElementById("s-dates").style = "display: flex;width: 60%;"
        document.getElementById("s-account").style = "display: none;"
    } else {
        document.getElementById("s-users").style = "display:none;"
        document.getElementById("s-account").style = "display:none;"
        document.getElementById("s-dates").style = "display: flex;width: 60%;"
    }
});
checkboxAccount.addEventListener("change", function() {
    if (checkboxAccount.checked) {
        checkbox.checked = false
        document.getElementById("s-account").style = "display: flex;width: 30%;"
        document.getElementById("s-users").style = "display: none;"
        document.getElementById("s-dates").style = "display: none"
    } else {
        document.getElementById("s-dates").style = "display: flex;width: 60%;"
        document.getElementById("s-account").style = "display: none;"
    }
});

let searchInput = document.getElementById("search-users");
let selectUsers = document.getElementById("select-users");
let options = selectUsers.getElementsByTagName("option");

searchInput.addEventListener("input", function() {
    let searchValue = searchInput.value.toLowerCase(); 
    for (let option of options) {
        let text = option.text.toLowerCase(); 
        if (text.includes(searchValue)) {
            option.style.display = ""; 
        } else {
            option.style.display = "none"; 
        }
    }
});

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

function createDatatable2(){

    $('#tb-data2').DataTable({
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
  
      var table = $('#tb-data2').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
}


function getAuditByDate(){

    let date1 = document.getElementById("date-ini").value   
    let date2 = document.getElementById("date-fin").value

    let dateObj1 = new Date(date1);
    let dateObj2 = new Date(date2);

    if(date1 != "" && date2 != ""){
        if(dateObj1 <= dateObj2) {
            if (checkbox.checked) {
                let empleadoID = document.getElementById("select-users").value
                fetchByDateAndUser(date1,date2,empleadoID)
            }else{
                fetchByDate(date1,date2)
            }
        }else{
            Swal.fire(
                'Oops!',
                'La fecha de inicio debe ser menor que la fecha final!',
                'info'
              )
        }
    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'info'
          )
    }

}

function getAuditByAccount(){

    let account = document.getElementById("in-account").value   

    if(account != ""){
        fetchByAccount(account)
    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'info'
          )
    }

}

function fetchByDate(d1,d2){
    loader.style = "display:block;"

    let values = {
        date1 : d1,
        date2 : d2
    }

    fetch(`${url}/get-audit-by-date`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        if(data.length > 0){
            if(data.length > 25000){
                loader.style = "display:none;"
                Swal.fire(
                    'Oops!',
                    'Memoria insuficiente!, Debe eligir un rango de fecha menor',
                    'info'
                  )
            }else{
                insertData(data)
            }
            
        }else{
            loader.style = "display:none;"
            Swal.fire(
                'Oops!',
                'No se encontraron datos!',
                'info'
              )
        }
      }).catch(err => {
          console.log(err)
          loader.style = "display:none;"
      }); 
}

function fetchByDateAndUser(d1,d2,id){
    loader.style = "display:block;"

    let values = {
        date1 : d1,
        date2 : d2,
        empleado:id
    }

    fetch(`${url}/get-audit-by-date-and-user`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        if(data.length > 0){
            insertData(data)
        }else{
            loader.style = "display:none;"
            Swal.fire(
                'Oops!',
                'No se encontraron datos!',
                'info'
              )
        }
      }).catch(err => {
          console.log(err)
          loader.style = "display:none;"
      }); 
}

function fetchByAccount(account){
    loader.style = "display:block;"

    fetch(`${url}/audit-by-acccount/${account}`)
      .then(response => response.json())
      .then(data => {
        if(data.length > 0){
            insertData(data)
        }else{
            loader.style = "display:none;"
            Swal.fire(
                'Oops!',
                'No se encontraron datos!',
                'info'
              )
        }
      }).catch(err => {
          console.log(err)
          loader.style = "display:none;"
      }); 
}

function insertData(data){
    let ctx = 0
    document.getElementById("tbody").innerHTML = ""
    $('#tb-data').DataTable().destroy()
    allData = []
    $("#tbody").html(data.map((d) => {

        let accion = ""
        let tabla = d.Tabla
        let fua = d.fua
        let cuenta = d.cuenta 
        let servicio = d.servicio
        let pc = d.nombrePc
        let usuario = d.usuario
        let nombres = d.nombres
        let observaciones = (d.observaciones)

        if(d.accion == "MODIFICÓ"){
            accion = `<b style="color:#D49400;">MODIFICÓ</b>`
        }else if(d.accion == "EJECUTÓ"){
            accion = `<b style="color:#0457B0;">EJECUTÓ</b>`
        }else if(d.accion == "AGREGÓ"){
            accion = `<b style="color:#149400;">AGREGÓ</b>`
        }else{
            accion = `<b style="color:#D40000;">ANULÓ</b>`
        }

        
        if (tabla.includes("/")) {
            // Dividir la cadena en partes basadas en el carácter "/"
            let partes = tabla.split("/");
            
            // Si hay más de una parte después de dividir la cadena
            if (partes.length > 1) {
                // Obtener el texto a partir del primer "/"
                let textoDespuesDelPrimerSlash = partes.slice(1).join("/");
                tabla = partes[0]
                observaciones = textoDespuesDelPrimerSlash
            }
        }

        if(observaciones == "<>")
        {observaciones = `<b style="color:#D40000;">SIN OBSERVACIONES<b>`}

        if(fua == "SIN FUA"){
            fua = `<b style="color:#D40000;">SIN FUA</b>`
        }if(cuenta == "SIN CUENTA"){
            cuenta = `<b style="color:#D40000;">SIN CUENTA</b>`
        }if(servicio == "SIN DATOS"){
            servicio = `<b style="color:#D40000;">SIN DATOS</b>`
        }if(pc == "SIN DATOS"){
            pc = `<b style="color:#D40000;">SIN DATOS</b>`
        }if(usuario == "SIN DATOS"){
            usuario = `<b style="color:#D40000;">SIN DATOS</b>`
        }if(nombres == "SIN DATOS"){
            nombres = `<b style="color:#D40000;">SIN DATOS</b>`
        }

        ctx++
        allData.push({
            '#':ctx,
            'Fecha':d.fecha,
            'Hora':d.hora,
            'Acción':accion,
            'PC':pc,
            'Tabla':tabla,
            'Usuario':usuario,
            'Nombres':nombres,
            'Cuenta':cuenta,
            'FUA':fua,
            'Servicio':servicio,
            'Observación':observaciones,
        })

              return `
              <tr style="cursor: pointer;">
              <td class="minText5">${ctx}</td>
              <td class="minText5"><button onclick="showDetailsModal('${d.cuenta}','${d.usuario}');" style="width:30px;height:30px;" class="btn btn-outline-primary"><i style="margin-left:-6px;" class="bi bi-eye-fill"></i></button></td>
              <td class="minText5">${d.fecha}</td>
              <td class="minText5">${d.hora}</td>
              <td class="minText5">${accion}</td>
              <td class="minText5">${pc}</td>
              <td class="minText5">${tabla}</td>
              <td class="minText5">${usuario}</td>
              <td class="minText5">${nombres}</td>
              <td class="minText5">${cuenta}</td>
              <td class="minText5">${fua}</td>
              <td class="minText5">${servicio}</td>
              <td class="minText5">${observaciones}</td>
              </tr>`;
          })
          .join("")
      );
      loader.style = "display:none;"
      createDatatable()
      var len = document.getElementById("tb-data_length")
      len.innerHTML = len.innerHTML+`&nbsp;&nbsp;<button onclick="downloadExcel();" class="btn btn-success minText5"><i class="bi bi-file-earmark-spreadsheet-fill"></i>&nbsp;Descargar</button>
      `

}

function downloadExcel(){
    let xls = new XlsExport(allData, 'auditoria');
    xls.exportToXLS(`REPORTE_DE_AUDITORIA.xls`)

}

function getAllUsers(){
    
    fetch(`${url}/get-all-users`)
      .then(response => response.json())
      .then(data => {
        if(data.length > 0){
             insertDataSelector(data)
        }else{
            console.log(data)
        }
      }).catch(err => {
          console.log(err)
      }); 
}

function insertDataSelector(data){
    $("#select-users").html(data.map((d) => {
        return `
          <option value="${d.IdEmpleado}">${d.cod}</option>
        `;
    })
    .join("")
    );

}

function showDetailsModal(account,usuario){
    $('#modalDetails').modal('show')

    console.log(account)
    if(account == "SIN CUENTA"){
        document.getElementById("detail-account").innerHTML = ""
        document.getElementById("img").style = "display:block;"
        document.getElementById("div-table-detail").style = "display:none;"
    }else{
        document.getElementById("detail-account").innerHTML = "- "+account
        load.style = "display:block;"
        document.getElementById("img").style = "display:none;"
        document.getElementById("tbody2").innerHTML = ""
        document.getElementById("div-table-detail").style = "display:block;"
        fetchDetailAudit(account,usuario)
    }
}

function fetchDetailAudit(account,user){

    load.style = "display:block;"

    let values = {
        account : account,
        user : user
    }

    fetch(`${url}/get-detail-audit`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
      if(data.length > 0){
           insertDataDetailAudit(data)
      }else{
          load.style = "display:none;"
          document.getElementById("tbody2").innerHTML = ""
          console.log(data)
      }
    }).catch(err => {
        load.style = "display:none;"
        console.log(err)
    }); 

}

function insertDataDetailAudit(data){
    let ctx = 0
    document.getElementById("tbody2").innerHTML = ""
    $('#tb-data2').DataTable().destroy()
    allData2 = []
    $("#tbody2").html(data.map((d) => {

        ctx++

        let estado = d.estado_facturacion

        if(estado == "ANULADO"){
            estado = `<b style="#FC0000">ANULADO</b>`
        }else if(estado == "ATENDIDO"){
            estado = `<b style="#149400">ATENDIDO</b>`
        }else{
            estado = `<b style="#005394">${d.estado_facturacion}</b>`
        }

     
        allData2.push({
            '#':ctx,
            'Codigo':d.Codigo,
            'Descripcion CPT':d.Nombre,
            'Cantidad':d.Cantidad,
            'Precio unitario':d.PrecioUnitario,
            'Precio total':d.Precio,
            'Fecha de creación':d.FechaCreacion,
            'Fecha de despacho':d.FechaDespacho,
            'Fecha de digitacion CPT':d.FechaHoraRealizaCpt,
            'Usuario':d.usuario_despacho,
            'Estado':estado,
        })

              return `
              <tr style="cursor: pointer;">
              <td class="minText5">${ctx}</td>
              <td class="minText5">${d.Codigo}</td>
              <td class="minText5">${d.Nombre}</td>
              <td class="minText5">${d.Cantidad}</td>
              <td class="minText5">${d.PrecioUnitario}</td>
              <td class="minText5">${d.Precio}</td>
              <td class="minText5">${d.FechaCreacion}</td>
              <td class="minText5">${d.FechaDespacho}</td>
              <td class="minText5">${d.FechaHoraRealizaCpt}</td>
              <td class="minText5">${d.usuario_despacho}</td>
              <td class="minText5">${estado}</td>
              </tr>`;
          })
          .join("")
      );
      load.style = "display:none;"
      createDatatable2()
      var len = document.getElementById("tb-data2_length")
      len.innerHTML = len.innerHTML+`&nbsp;&nbsp;<button onclick="downloadExcel2();" class="btn btn-dark minText5"><i class="bi bi-file-earmark-spreadsheet-fill"></i>&nbsp;Descargar</button>
      `

      setTimeout(function() {
        document.getElementById("detailX").click();
      }, 500);

}

function downloadExcel2(){
    let xls = new XlsExport(allData2, 'auditoriaDetalle');
    xls.exportToXLS(`DETALLE_DE_AUDITORIA.xls`)
}