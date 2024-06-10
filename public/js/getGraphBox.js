let loader = document.getElementById("loader")
let chart = document.getElementById("myChart")
let divFilter = document.getElementById("divFilter")


let arrayMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
var json = []


const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function getMonthName(month) {
  const months = [
   "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return months[month];
}


yearLater()
timeline()


function yearLater(){
    var select = document.getElementById("dp_graph");
    // Obtener el año actual
    var currentYear = new Date().getFullYear();
    // Agregar las opciones de los tres años anteriores y el actual
    for (var i = currentYear - 6; i <= currentYear; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = i;
      // Establecer el año actual como seleccionado por defecto
      if (i === currentYear) {
        option.selected = true;
      }
      select.appendChild(option);
    }

  }

  function timeline() {
    var div = document.getElementById("timeline");
    var currentYear = new Date().getFullYear();
    var html = "";
  
    // Agregar las opciones de los tres años anteriores y el actual
    for (var i = currentYear - 6; i <= currentYear; i++) {
      html += `<div class="input-group-text">
        <input class="form-check-input mt-0 timeline" id="chk-${i}" type="checkbox" value="${i}">
      </div>
      <span class="input-group-text">${i}</span>
      ${i === currentYear ? `<button class="btn btn-primary" onclick="filter();" id="btnFiltrar">
      <i class="bi bi-sort-numeric-up"></i>
      &nbsp;Filtrar
      </button>&nbsp;<a><div class="loaderSmall" id="loaderFilter"></div><a>` : ''}
      `;
    }
  
    // Establecer el contenido del elemento div
    div.innerHTML = html;
  }

  function filter(){
    var checkboxes = document.querySelectorAll('.timeline');

    var valoresCheckboxes = [];
 
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        valoresCheckboxes.push(checkbox.value);
      }
    });
    
    if (valoresCheckboxes.length >= 2) {
      
      document.getElementById("loaderFilter").style = "display:block;"

      json = {}
      const resultados = {};

// Recorrer los valores de los checkboxes
for (let i = 0; i < valoresCheckboxes.length; i++) {
  const year = valoresCheckboxes[i];

  // Realizar el fetch para obtener los datos del año
  fetch(`${url}/get-graph-box/${year}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
      // Verificar si ya existen datos para el año actual
      if (resultados[year]) {
        // Unir los datos nuevos con los datos existentes (sin duplicar)
        resultados[year] = unirDatos(resultados[year], data);
      } else {
        // Almacenar los datos nuevos si no existen datos previos
        resultados[year] = data;
      }

      // Verificar si se han obtenido datos para todos los años seleccionados
      if (Object.keys(resultados).length === valoresCheckboxes.length) {
        // Aquí tienes todos los datos en el objeto 'resultados'
        console.log(resultados);
        showGraphTimeLine(resultados)
        document.getElementById("loaderFilter").style = "display:none;"
      }
    })
    .catch(error => {
      Swal.fire(
        'Oops!',
        'Se produjo un error',
        'warning'
      );
      console.error(error);
    });
}

    } else {
      Swal.fire(
        'Oops',
        'Debe seleccionar al menos 2 años de producciones!',
        'info'
      ) 
    }
    
  }
  
  function unirDatos(datosViejos, datosNuevos) {
    // Función para unir los datos nuevos con los datos viejos sin duplicar
    // Puedes personalizar cómo deseas realizar la unión aquí
    // En este ejemplo, simplemente combinamos los datos en un nuevo objeto
    return { ...datosViejos, ...datosNuevos };
  } 
  
  function showGraphTimeLine(tuJSON){

    document.getElementById("myChart").style = "display:none;"
    document.getElementById("myChart3").style = "display:block;"

    const datos = {
      labels: [], // Almacena los años como etiquetas
      totales: [], // Almacena los totales como series de datos
      subtotal: [], // Almacena los subtotales como series de datos
      exoneracion: [], // Almacena las exoneraciones como series de datos
    };
    
    
    // Itera sobre los años en tu JSON
    for (const year in tuJSON) {
      if (tuJSON.hasOwnProperty(year)) {
        // Agrega el año como etiqueta
        datos.labels.push(year);
    
        // Calcula el total para el año actual
        const totalAnual = tuJSON[year].reduce((acc, item) => acc + item.Total, 0);
        const subtotalAnual = tuJSON[year].reduce((acc, item) => acc + item.subtotal, 0);
        const exoneracionAnual = tuJSON[year].reduce((acc, item) => acc + item.exoneraciones, 0);
    
        datos.totales.push(totalAnual);
        datos.subtotal.push(subtotalAnual);
        datos.exoneracion.push(exoneracionAnual);

      }
    }


    const chartConfig = {
      type: 'bar', // Tipo de gráfico (línea en este caso)
      title: {
        text: 'Totales por Año', // Título del gráfico
      },
      scaleX: {
        labels: datos.labels, 
        "item":{  
          "font-size":"18px",
          "font-color":"#000"  
      } // Etiquetas del eje X (años)
      },
      scaleY: {
        guide: {
          visible: false, // Oculta la guía vertical del eje Y
        },
      },
      tooltip: {
        text: 'Subtotal: S/%data-subtotal<br>Exoneración: S/%data-exoneracion<br>Total: S/%data-total<br>Año: %kl',
        textAlign: 'left',
        fontSize : '22px',
        fontColor : "#000",
        decimals: 2, // Mostrar dos decimales
        thousandsSeparator: ','
      },
      series: [
        {
          values: datos.totales, // Datos de las series (totales)
          "data-subtotal" : datos.subtotal,
          "data-exoneracion" : datos.exoneracion,
          "data-total" : datos.totales,
          text: 'Total',
          backgroundColor: "#00648C #93DDFB",
            alpha: 0.5,
            valueBox: {
              placement: 'top',
              'font-color': "#000",
              'font-size': "14px",
              decimals: 2, // Mostrar dos decimales
              thousandsSeparator: ',',
            } // Texto que se muestra en la leyenda
        },
      ],
    };
    
    zingchart.render({
      id: 'myChart3', // ID del elemento HTML donde se renderizará el gráfico
      data: chartConfig, // Configuración del gráfico
      height: '100%',
      width: '100%',
    });

  }

  function formatearNumeroConComa(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function showGraph(data) {
    // Procesar los datos para calcular los totales acumulados por mes

    document.getElementById("myChart3").style = "display:none;"
    document.getElementById("myChart").style = "display:block;"

    const monthlyTotals = {};
    let subtotal = [];
    let exoneracion = [];
  
    // Inicializa los arrays subtotal y exoneracion con ceros para cada mes
    for (let i = 0; i < arrayMonths.length; i++) {
      subtotal.push(0);
      exoneracion.push(0);
    }
  
    data.forEach(item => {
      const month = item.mes;
      const subtotalValue = parseFloat(item.subtotal.toFixed(2));
      const exoneracionValue = parseFloat(item.exoneraciones.toFixed(2));
      const total = parseFloat(item.Total.toFixed(2));
  
      // Suma los subtotales y exoneraciones por mes
      subtotal[month - 1] += subtotalValue;
      exoneracion[month - 1] += exoneracionValue;
  
      if (monthlyTotals[month]) {
        monthlyTotals[month].total += total;
      } else {
        monthlyTotals[month] = {
          total: total
        };
      }
    });
  
    // Crear un array de totales por mes en el orden correcto
    const monthlyTotalValues = Object.keys(monthlyTotals).map(month => monthlyTotals[month].total);

    // Formatear los valores de subtotal, exoneracion y total con dos decimales
    const formattedSubtotal = subtotal.map(value => value.toFixed(2));
    const formattedExoneracion = exoneracion.map(value => value.toFixed(2));
    const formattedTotalValues = monthlyTotalValues.map(value => value);
    const formattedTotalValuesTemp = monthlyTotalValues.map(value => value.toFixed(2));
  
    const totalGeneral = monthlyTotalValues.reduce((acc, value) => acc + value, 0);
    const year = document.getElementById("dp_graph").value

    let chartConfig = {
      type: 'area',
      plot: {
        connectNulls: true,
        aspect: "spline",
      },
      title: {
        text: `Total ${year} : S/${formatearNumeroConComa(totalGeneral.toFixed(2))}\n\n`,
        fontSize: "24px",
        fontColor: "#333",
      },
      scaleX: {
        labels: arrayMonths,
        item: {  
          "font-size": "18px",
          "font-color": "#000"  
        }  // Utiliza los nombres de los meses como etiquetas del eje x
      },
      scaleY: {
        item: {  
          "font-size": "12px",
          "font-color": "#000"  
        } 
      },
      tooltip: {
        text: 'Subtotal: S/%data-subtotal<br>Exoneración: S/%data-exoneracion<br>Total: S/%data-total<br>Mes: %kl',
        textAlign: 'left',
        fontSize : '22px',
        decimals: 2, // Mostrar dos decimales
        thousandsSeparator: ','
      },
      series: [{
        values: formattedTotalValues,
        "data-subtotal" : formattedSubtotal,
        "data-exoneracion" : formattedExoneracion,
        "data-total" : formattedTotalValuesTemp,
        valueBox: {
          placement: 'top',
          'font-color': "#000",
          'font-size': "14px",
        // Aquí especificamos que solo queremos mostrar el total
          decimals: 2, // Mostrar dos decimales
          thousandsSeparator: ','
        },
        marker: {
          visible: true,
          size: 8, // Tamaño del marcador (punto)
          backgroundColor: "#FF5733" // Color de fondo del marcador
        } // Utiliza los totales acumulados por mes como valores del gráfico
      }]
    };
  
    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
      width: '100%'
    });

    zingchart.click = function(data){ 
      let id = data["id"]
      if(id == "myChart"){
        let monthIndex = parseInt((data["targetid"]).split("node-")[1])
        if(monthIndex >= 0){
          console.log(monthIndex)
          showMonthBox(json,monthIndex);
        }
      }
     
     // alert("MES : " + arrayMonths[monthIndex]); 
 }

  }

  function onFetchGraph(){
    let year = document.getElementById("dp_graph").value
    fetchGraph(year)
  }

  function fetchGraph(year){

    loader.style = "display:block;"

    fetch(`${url}/get-graph-box/${year}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
       
        json = data
        loader.style = "display:none;"
        showGraph(json)

      })
      .catch(error => {
        Swal.fire(
            'Oops!',
            'Se produjo un error',
            'warning'
          )
        console.error(error)
    });
 }

 

function joinData(datosViejos, datosNuevos) {
  // Función para unir los datos nuevos con los datos viejos sin duplicar
  // Puedes personalizar cómo deseas realizar la unión aquí
  // En este ejemplo, simplemente combinamos los datos en un nuevo objeto
  return { ...datosViejos, ...datosNuevos };
}

 function showMonthBox(data, monthIndex) {
  let month = monthIndex + 1;
  let year = parseInt(document.getElementById("dp_graph").value);

  console.log(year)

  const daysInMonth = new Date(year, month, 0).getDate();
  console.log(daysInMonth)

  $('#modalBox').modal('show');
  document.getElementById("staticBackdropLabel").innerHTML = 'Detalle de caja del mes de ' + arrayMonths[monthIndex];

  // Filtra los datos para obtener solo los correspondientes al mes seleccionado
  const dataForMonth = data.filter(item => item.mes === month);

  // Prepara los arrays de valores para el gráfico
  const subtotalValues = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const entry = dataForMonth.find(item => item.dia === day);
    return entry ? parseFloat(entry.subtotal.toFixed(2)) : 0;
  });

  const exoneracionValues = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const entry = dataForMonth.find(item => item.dia === day);
    return entry ? parseFloat(entry.exoneraciones.toFixed(2)) : 0;
  });

  const totalValues = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const entry = dataForMonth.find(item => item.dia === day);
    return entry ? parseFloat(entry.Total.toFixed(2)) : 0;
  });

  // Configuración del gráfico
  let chartConfig = {
    type: 'area',
    plot: {
      connectNulls: true,
      aspect: "spline",
      'background-color': '#C70039',
    },
    scaleX: {
      labels: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()), // Etiquetas de días
      item: {
        "font-size": "18px",
        "font-color": "#000"
      }
    },
    scaleY: {
      item: {
        "font-size": "13px",
        "font-color": "#000"
      }
    },
    tooltip: {
      text: 'Subtotal: S/%data-subtotal<br>Exoneración: S/%data-exoneracion<br>Total: S/%data-total<br>Día: %kl',
      textAlign: 'left',
      fontSize: '22px',
      thousandsSeparator: ','
    },
    series: [{
      values: totalValues,
      "data-subtotal": subtotalValues,
      "data-exoneracion": exoneracionValues,
      "data-total": totalValues,
      valueBox: {
        placement: 'top',
        'font-color': "#000",
        'font-size': "12px", // Aquí especificamos que solo queremos mostrar el total
        decimals: 2, // Mostrar dos decimales
        thousandsSeparator: ','
      },
      marker: {
        visible: true,
        size: 6, // Tamaño del marcador (punto)
        backgroundColor: "#000" // Color de fondo del marcador
      },
      'line-color': '#FF5733', // Cambiar el color de la línea principal
      'gradient-colors': ['#FF5733', '#FFA07A']
    }]
  };

  zingchart.render({
    id: 'myChart2',
    data: chartConfig,
    height: '100%',
    width: '100%'
  });
}