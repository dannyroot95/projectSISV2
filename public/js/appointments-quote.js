getMedics()
getSpecialties()
createDatatable()

var allMedics 
var allSpecialities
var typeValue = 1
var allData = []

document.getElementById("inputGroupSelectType").addEventListener("change", function () {
    const type = this.value;
    const divSelected = document.getElementById("divSelected");
    const divSelected2 = document.getElementById("divSelected2");
    const divSelected3 = document.getElementById("divSelected3");

    // Limpia los contenedores antes de agregar nuevo contenido
    divSelected.innerHTML = "";
    divSelected2.innerHTML = "";
    divSelected3.innerHTML = "";

    switch (type) {
        case "1":
            createMonthSelect(divSelected);
            typeValue = 1
            break;
        case "2":
            createSingleDateInput(divSelected, "Fecha", "Onlyday");
            typeValue = 2
            break;
        case "3":
            createDateRange(divSelected);
            typeValue = 3
            break;
        case "4":
            createMedicSelect(divSelected, divSelected2, divSelected3);
            typeValue = 4
            break;
        case "5":
            createServiceSelect(divSelected, divSelected2, divSelected3);
            typeValue = 5
            break;
        default:
            break;
    }


    const subType = document.getElementById("SubType");
    if (subType) {
        subType.addEventListener("change", function () {
            handleMedicTypeSelection(this.value);
        });
    }

});


function handleMedicTypeSelection(value) {
    const divSelected3 = document.getElementById("divSelected3");
    changeContainer3(value,divSelected3)
}

function createMonthSelect(container) {
    container.innerHTML = `
        <select class="form-select minText5" id="inputGroupSelectMonth">
            <option value="1">ENERO</option>
            <option value="2">FEBRERO</option>
            <option value="3">MARZO</option>
            <option value="4">ABRIL</option>
            <option value="5">MAYO</option>
            <option value="6">JUNIO</option>
            <option value="7">JULIO</option>
            <option value="8">AGOSTO</option>
            <option value="9">SEPTIEMBRE</option>
            <option value="10">OCTUBRE</option>
            <option value="11">NOVIEMBRE</option>
            <option value="12">DICIEMBRE</option>
        </select>
    `;
}

function createSingleDateInput(container, label, id) {
    container.innerHTML = `
        <div class="input-group minText5">
            <span class="input-group-text minText5">${label}</span>
            <input id="${id}" type="date" class="form-control minText5">
        </div>
    `;
}

function createDateRange(container) {
    container.innerHTML = `
        <div class="input-group minText5">
            <span class="input-group-text minText5">Fecha de inicio</span>
            <input id="t3-day-i" type="date" class="form-control minText5">
            <span class="input-group-text minText5">Fecha de final</span>
            <input id="t3-day-f" type="date" class="form-control minText5">
        </div>
    `;
}

function createMedicSelect(container1, container2, container3) {
    container1.innerHTML = `
        <select class="form-select minText5" id="inputGroupSelectMedic">
        </select>
    `;

    insertData(allMedics,1)
    $('#inputGroupSelectMedic').select2({
        placeholder: "Seleccione un médico",
        allowClear: true,
        language: {
            noResults: function() {
                return "Sin resultados"; 
            }}
    });


    container2.innerHTML = `
        <div class="input-group minText5">
            <span class="input-group-text minText5">Filtrar por</span>
            <select class="form-select minText5" id="SubType">
                <option value="1">DIA</option>
                <option value="2">RANGO DE FECHAS</option>
            </select>
        </div>
    `;

    container3.innerHTML = `
        <div class="input-group minText5">
            <input id="t3-day-i" type="date" class="form-control minText5">
        </div>
    `;
    
}

function createServiceSelect(container1, container2, container3) {
    container1.innerHTML = `
        <select class="form-select minText5" id="inputGroupSelectSpecialities">
        </select>
    `;

    insertData(allSpecialities,2)
    $('#inputGroupSelectSpecialities').select2({
        placeholder: "Seleccione una especialidad",
        allowClear: true,
        language: {
            noResults: function() {
                return "Sin resultados"; 
            }}
    });

    container2.innerHTML = `
        <div class="input-group minText5">
            <span class="input-group-text minText5">Filtrar por</span>
            <select class="form-select minText5" id="SubType">
                <option value="1">DIA</option>
                <option value="2">RANGO DE FECHAS</option>
            </select>
        </div>
    `;

    container3.innerHTML = `
        <div class="input-group minText5">
            <input id="t3-day-i" type="date" class="form-control minText5">
        </div>
    `;

}

function changeContainer3(value,container){
    if(value == 1){
        container.innerHTML = `
        <div class="input-group minText5">
            <input id="t3-day-i" type="date" class="form-control minText5">
        </div>
    `;
    }else{
        container.innerHTML = `
        <div class="input-group minText5">
            <input id="t3-day-i" type="date" class="form-control minText5">
            <input id="t3-day-f" type="date" class="form-control minText5">
        </div>
    `;
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


function getMedics(){
    fetch(`${url}/get-all-medics`)
        .then(response => response.json())
        .then(data => {
            allMedics = data
        }).catch(err =>{
            console.log(err)
        } );
}

function getSpecialties(){
    fetch(`${url}/get-all-specialities`)
        .then(response => response.json())
        .then(data => {
            allSpecialities = data
            console.log(allSpecialities)
        }).catch(err =>{
            console.log(err)
        } );
}

function insertData(data,type){

    if(type == 1){
        document.getElementById("inputGroupSelectMedic").innerHTML = ""
        $("#inputGroupSelectMedic").html(data.map((d) => {
                  return `
                  <option value="${d.IdMedico}">${d.nombres}</option>
                  `;
              })
              .join("")
          );
    }else{
        document.getElementById("inputGroupSelectSpecialities").innerHTML = ""
        $("#inputGroupSelectSpecialities").html(data.map((d) => {
                  return `
                  <option value="${d.IdEspecialidad}">${d.nombre}</option>
                  `;
              })
              .join("")
          );
    }

   

}

function query(){

    let json = {}

    if(typeValue == 1){

        let year = new Date().getFullYear()
        let month = document.getElementById("inputGroupSelectMonth").value

        json = {
            type:1,
            year:year,
            month:month,
            idMedico:0,
            idEspecialidad:0,
            f1:'',
            f2:''
        }
        typeQuery(json)

    }else if(typeValue == 2){

        let f1 = document.getElementById("Onlyday").value
        if(f1 != ""){
            json = {
                type:2,
                year:0,
                month:0,
                idMedico:0,
                idEspecialidad:0,
                f1:f1,
                f2:''
            }
            typeQuery(json)
        }else{
            Swal.fire(
                'Oops!',
                'Ingrese las fecha!',
                'info'
              )
        }
        
    }else if(typeValue == 3){

        let f1 = document.getElementById("t3-day-i").value
        let f2 = document.getElementById("t3-day-f").value
        if(f1 != "" && f2 != "" ){
            json = {
                type:3,
                year:0,
                month:0,
                idMedico:0,
                idEspecialidad:0,
                f1:f1,
                f2:f2
            }
            typeQuery(json)
        }else{
            Swal.fire(
                'Oops!',
                'Ingrese las fechas!',
                'info'
              )
        }
        
        
    }else if(typeValue == 4){

        let idMedico = document.getElementById("inputGroupSelectMedic").value
        let type = document.getElementById("SubType").value
        let f1 = document.getElementById("t3-day-i").value

        if(type == 1){
            
            if(f1 != ""){
                json = {
                    type:4,
                    year:0,
                    month:0,
                    idMedico:idMedico,
                    idEspecialidad:0,
                    f1:f1,
                    f2:''
                }
                typeQuery(json)  
            }else{
                Swal.fire(
                    'Oops!',
                    'Ingrese la fecha!',
                    'info'
                  )
            }

        }else{
            let f2 = document.getElementById("t3-day-f").value
            if(f2 != "" && f1 != ""){
                json = {
                    type:5,
                    year:0,
                    month:0,
                    idMedico:idMedico,
                    idEspecialidad:0,
                    f1:f1,
                    f2:f2
                }
                typeQuery(json)  
            }else{
                Swal.fire(
                    'Oops!',
                    'Ingrese las fechas!',
                    'info'
                  )
            }
          
        }


    }else{
        let idEspecialidad= document.getElementById("inputGroupSelectSpecialities").value
        let type = document.getElementById("SubType").value
        let f1 = document.getElementById("t3-day-i").value

        if(type == 1){
            
            if(f1 != ""){
                json = {
                    type:6,
                    year:0,
                    month:0,
                    idMedico:0,
                    idEspecialidad:idEspecialidad,
                    f1:f1,
                    f2:''
                }
                typeQuery(json)  
            }else{
                Swal.fire(
                    'Oops!',
                    'Ingrese la fecha!',
                    'info'
                  )
            }

        }else{
            let f2 = document.getElementById("t3-day-f").value
            if(f2 != "" && f1 != ""){
                json = {
                    type:7,
                    year:0,
                    month:0,
                    idMedico:0,
                    idEspecialidad:idEspecialidad,
                    f1:f1,
                    f2:f2
                }
                typeQuery(json)  
            }else{
                Swal.fire(
                    'Oops!',
                    'Ingrese las fechas!',
                    'info'
                  )
            }
            
        }
    }

}

function typeQuery(json){

    let btnExport = document.getElementById("btnExport")
    btnExport.style = "display:none;"

    document.getElementById("tbody").innerHTML = ""
    $('#tb-data').DataTable().destroy()
    createDatatable() 


    let loader = document.getElementById("loader")
    loader.style = "display:block;"

    fetch(`${url}/get-quotes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
    .then(response => response.json())
    .then(data => {
        
        insertDataTable(data)
        loader.style = "display:none;"
        btnExport.style = "display:block;"

    }).catch(err =>{
        loader.style = "display:none;"
        btnExport.style = "display:none;"
        console.log(err)

        document.getElementById("tbody").innerHTML = ""
        $('#tb-data').DataTable().destroy()
        createDatatable() 

        Swal.fire(
            'Oops!',
            'Sin registros!',
            'info'
          )

    } );

}

function insertDataTable(data){

    document.getElementById("tbody").innerHTML = ""
    $('#tb-data').DataTable().destroy()

    allData = []

    $("#tbody").html(data.map((d) => {

        let emitidos = d.emitidos
        let libres = d.libres
        let turno = d.turno

        if(emitidos > d.cupos){
            emitidos = d.cupos
        }

        if(libres < 0 || libres == 0){
            libres = '0'
        }

        if(turno == 'M'){
            turno = '<img src="/image/turnoMañana.png" width="42px;">&nbsp;M'
        }else if(turno == 'T'){
            turno = '<img src="/image/turnoTarde.png" width="42px;">&nbsp;T'
        }else if(turno == 'MT'){
            turno = '<img src="/image/turnoMT.png" width="42px;">&nbsp;MT'
        }else if(turno == 'MEM'){
            turno = '<img src="/image/turnoMEM.png" width="42px;">&nbsp;MEM'
        }else if(turno == 'MET'){
            turno = '<img src="/image/turnoMET.png" width="42px;">&nbsp;MET'
        }else if(turno == 'GD'){
            turno = '<img src="/image/turnoGD.png" width="42px;">&nbsp;GD'
        }else if(turno == 'MVC'){
            turno = '<img src="/image/turnoMVC.png" width="42px;">&nbsp;MVC'
        }
        

        allData.push({

            'MÉDICO':d.nombres,
            'FECHA':d.fecha,
            'HORA DE INICIO':d.HoraInicio,
            'HORA DE FINALIZACIÓN':d.HoraFin,
            'TURNO':d.turno,
            'ESPECIALIDAD':d.especialidad,
            'SERVICIO':d.servicio,
            'CUPOS':d.cupos,
            'EMITIDOS':emitidos,
            'LIBRES':libres,
        })

              return `
              <tr style="cursor: pointer;">
              <td class="minText5">${d.nombres}</td>
              <td class="minText5">${d.fecha}</td>
              <td class="minText5">${d.HoraInicio}</td>
              <td class="minText5">${d.HoraFin}</td>
              <td class="minText5"><center><b>${turno}<b/></center></td>
              <td class="minText5">${d.especialidad}</td>
              <td class="minText5">${d.servicio}</td>
              <td style="background-color: #003c81;color: white;font-weight: bold"><center>${d.cupos}</center></td>
              <td style="background-color: #d10000;color: white;font-weight: bold"><center>${emitidos}</center></td>
              <td style="background-color: green;color: white;font-weight: bold"><center>${libres}</center></td>
              </tr>`;
          })
          .join("")
      );
      createDatatable() 
}

function exportToExcel(){

    Swal.fire({
        title: 'En breves se descargará el archivo!',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      })
  

    let xls = new XlsExport(allData, 'programación');
    xls.exportToXLS('programación-citas.xls')
  }
