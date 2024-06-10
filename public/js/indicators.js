getTypeFinance()

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
              return  `<option value="${d.IdFuenteFinanciamiento}">${(d.Descripcion).toUpperCase()}</option>`;
          })
          .join("")
      );
}

function search(){

    let date1 = document.getElementById("d-init").value
    let date2 = document.getElementById("d-final").value
    let font = document.getElementById("inputGroupSelectFinance").value

    if(date1 != "" && date2 != ""){
        document.getElementById("allData").style.display = "none";
        fetchIndicator(date1,date2,font)
    }else{
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'info'
          )
    }

}

function fetchIndicator(date1,date2,font){
    document.getElementById("loader").style = "display:block;"
    fetch(`${url}/indicator-ate-ages/${date1}/${date2}/${font}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
        insertDataAteAge(data)
      }).catch(err => {
          console.log(err)
          document.getElementById("loader").style = "display:none;"
      }); 
}

function insertDataAteAge(data) {
    // Limpiar el contenido del tbody y configurar la visibilidad de los elementos
    Appointment('total',data[2])
    Appointment('font',data[3])
    document.getElementById("tbodyAteAge").innerHTML = "";
    document.getElementById("image").style.display = "none";
    document.getElementById("allData").style.display = "block";

    let fechaInicio = document.getElementById("d-init").value.split('-');
    let fechaFin = document.getElementById("d-final").value.split('-');

        // Crear los objetos Date correctamente
    let fechaInicioDate = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
    let fechaFinDate = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);

        // Obtener el nombre del mes ajustando el valor del mes
    let m1 = obtenerNombreMes(fechaInicioDate.getMonth() + 1);
    let m2 = obtenerNombreMes(fechaFinDate.getMonth() + 1);
    
    let year = new Date(document.getElementById("d-init").value).getFullYear()

    let stringMonth = ``

    if(m1 != m2){
        stringMonth = `Cuadro N° 1-1. Estadísticas globales
        por grupos de edad ${m1} - ${m2} ${year}`
    }else{
        stringMonth = `Cuadro N° 1-1. Estadísticas globales
        por grupos de edad ${m2} - ${year}`
    }

    document.getElementById("months").innerHTML = stringMonth

    let font =  document.getElementById("inputGroupSelectFinance").options[document.getElementById("inputGroupSelectFinance").selectedIndex].textContent;

    // Crear las filas para el primer conjunto de datos y agregarlas al tbody
    let rows = data[0].map((v) => {
        return `
        <tr>
            <td class="td1">ATENCIONES TOTALES</td>
            <td class="td1">${v.atenciones}</td>
            <td class="td1">${v.ninos}</td>
            <td class="td1">${v.ninos2}</td>
            <td class="td1">${v.adolescentes}</td>
            <td class="td1">${v.adultos}</td>
            <td class="td1">${v.adultos2}</td>
            <td class="td1">${v.adultoMayor}</td>
        </tr>`;
    }).join("");

    // Crear las filas para el segundo conjunto de datos y agregarlas al tbody
    rows += data[1].map((v) => {
        return `
        <tr>
            <td class="td1">ATENDIDOS - ${font}</td>
            <td class="td1">${v.atenciones}</td>
            <td class="td1">${v.ninos}</td>
            <td class="td1">${v.ninos2}</td>
            <td class="td1">${v.adolescentes}</td>
            <td class="td1">${v.adultos}</td>
            <td class="td1">${v.adultos2}</td>
            <td class="td1">${v.adultoMayor}</td>
        </tr>`;
    }).join("");

    // Actualizar el contenido del tbody con las nuevas filas
    document.getElementById("tbodyAteAge").innerHTML = rows;

    // Ocultar el loader
    document.getElementById("loader").style.display = "none";
}


function Appointment(type,x){

    let fechaInicio = document.getElementById("d-init").value.split('-');
    let fechaFin = document.getElementById("d-final").value.split('-');

        // Crear los objetos Date correctamente
    let fechaInicioDate = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
    let fechaFinDate = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);

        // Obtener el nombre del mes ajustando el valor del mes
    let m1 = obtenerNombreMes(fechaInicioDate.getMonth() + 1);
    let m2 = obtenerNombreMes(fechaFinDate.getMonth() + 1);
    
    let year = new Date(document.getElementById("d-init").value).getFullYear()

    let stringMonth = ``

    if(type === "total"){
        if(m1 != m2){
            stringMonth = `Gráfico N°1-1 produccion <b style="color:green;">TOTAL</b> de citas (${x[0].realizadasHosp}) ${m1} - ${m2} ${year}`
        }else{
            stringMonth = `Gráfico N°1-1 produccion <b style="color:green;">TOTAL</b> de citas (${x[0].realizadasHosp}) ${m2} - ${year}`
        }
        drawChart(type,x,stringMonth,'Chart1')
    }else{
        let font =  document.getElementById("inputGroupSelectFinance").options[document.getElementById("inputGroupSelectFinance").selectedIndex].textContent;
        if(m1 != m2){
            stringMonth = `Gráfico N°1-2 produccion de citas <b style="color:#900C3F;">${font}</b> (${x[0].realizadasFuente}) ${m1} - ${m2} ${year}`
        }else{
            stringMonth = `Gráfico N°1-2 produccion de citas <b style="color:#900C3F;">${font}</b> (${x[0].realizadasFuente}) ${m2} - ${year}`
        }
        drawChart(type,x,stringMonth,'Chart2')
    }

}

function drawChart(type,x,stringMonth,id){

    let value1
    let value2 
    let colors = []

    if(type === "total"){
        value1 = x[0].efectuadasHosp
        value2 = x[0].diferenciaHosp
        colors = ['#0065C2','#D40000']
    }else{
        value1 = x[0].efectuadasFuente
        value2 = x[0].diferenciaFuente
        colors = ['#009902','#C70039']
    }

    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    var myConfig = {
      type: "pie",
      plot: {
        borderColor: "#2B313B",
        borderWidth: 3,
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
          delay: 1000
        }
      },
      source: {
        text: 'Hospital Santa Rosa',
        fontColor: "#8e99a9",
        fontFamily: "Open Sans"
      },
      title: {
        fontColor: "#393939",
        text: stringMonth,
        align: "center",
        offsetX: 0,
        fontFamily: "Poppins",
        fontWeight:500,
        fontSize: 16
      },
      plotarea: {
        margin: "20 0 0 0"
      },
      series: [{
          values: [value1],
          text: "Citas realizadas :"+" "+value1,
          backgroundColor: colors[0],
        },
        {
          values: [value2],
          text: "Citas no efectuadas :"+" "+value2,
          backgroundColor: colors[1],
          detached: true
        }
      ]
    };
 
    zingchart.render({
      id: id,
      data: myConfig,
      height: '100%',
      width: '100%'
    });

}