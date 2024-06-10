var contentModulo = document.querySelector(".myContent");

$('document').ready(function () {

    inicio();
  
      window.addEventListener('hashchange', (e) => {
  
        let direccion = window.location.hash;
  
        if (direccion == '#inicio') {
          inicio()
        }else if (direccion == '#arfsis') {
          arfsis()
        }
        else if (direccion == '#estado_comprobante') {
          estado_comprobante()
        }else if (direccion == '#reporte_seguros') {
          reporte_seguros()
        }else if (direccion == '#fua_analysis') {
          fua_analysis()
        }else if (direccion == '#fua_correcion') {
          fua_correcion()
        }else if (direccion == '#estado_atencion') {
          estado_atencion()
        }else if (direccion == '#diag_proc') {
          diag_and_procedure()
        }else if (direccion == '#produccion') {
          produccion()
        }else if (direccion == '#produccion_ins_med') {
          produccion_ins_med()
        }else if (direccion == '#afiliados') {
          affiliate()
        }else if (direccion == '#control_altas') {
          discharge_control()
        }else if (direccion == '#control_altas_cpt') {
          discharge_control_cpt()
        }else if (direccion == '#trama_sis') {
          plot_sis()
        }else if (direccion == '#trama_saludpol') {
          plot_saludpol()
        }else if (direccion == '#catalogo') {
          catalog()
        }else if (direccion == '#estadisticas-atenciones') {
          graph()
        }else if (direccion == '#estadisticas-caja') {
          box()
        }else if (direccion == '#auditoria') {
          audit()
        }else if (direccion == '#indicadores') {
          indicators()
        }else if (direccion == '#actualizacion-historia') {
          updateHistory()
        }else {
          routeErrE();
        }
      });
  
  })
  

 function inicio() {
    window.location.hash = "#inicio"
    contentModulo.innerHTML = urlModule("/content/inicio.html");
  }
 function estado_comprobante() {
    window.location.hash = "#estado_comprobante"
    contentModulo.innerHTML = urlModule("/content/estado-comprobante.html");
  }
  function reporte_seguros() {
    window.location.hash = "#reporte_seguros"
    contentModulo.innerHTML = urlModule("/content/reporte-seguros.html");
  }
  function fua_analysis() {
    window.location.hash = "#fua_analysis"
    contentModulo.innerHTML = urlModule("/content/analisis-fua.html");
  }
  function fua_correcion() {
    window.location.hash = "#fua_correcion"
    contentModulo.innerHTML = urlModule("/content/correcion-fua.html");
  }
  function estado_atencion() {
    window.location.hash = "#estado_atencion"
    contentModulo.innerHTML = urlModule("/content/estado-atencion.html");
  }
  function produccion() {
    window.location.hash = "#produccion"
    contentModulo.innerHTML = urlModule("/content/produccion.html");
  }
  function produccion_ins_med() {
    window.location.hash = "#produccion_ins_med"
    contentModulo.innerHTML = urlModule("/content/produccion-ins-med.html");
  }
  function affiliate() {
    window.location.hash = "#afiliados"
    contentModulo.innerHTML = urlModule("/content/afiliados.html");
  }
  function discharge_control() {
    window.location.hash = "#control_altas"
    contentModulo.innerHTML = urlModule("/content/control-de-altas.html");
  }
  function discharge_control_cpt() {
    window.location.hash = "#control_altas_cpt"
    contentModulo.innerHTML = urlModule("/content/control-de-altas-cpt.html");
  }
  function diag_and_procedure() {
    window.location.hash = "#diag_proc"
    contentModulo.innerHTML = urlModule("/content/diagnosticos-y-procedimientos.html");
  }
  function plot_sis() {
    window.location.hash = "#trama_sis"
    contentModulo.innerHTML = urlModule("/content/trama-sis.html");
  }
  function plot_saludpol() {
    window.location.hash = "#trama_saludpol"
    contentModulo.innerHTML = urlModule("/content/trama-saludpol.html");
  }
  function arfsis() {
    window.location.hash = "#arfsis"
    contentModulo.innerHTML = urlModule("/content/arfsis.html");
  }
  function catalog() {
    window.location.hash = "#catalogo"
    contentModulo.innerHTML = urlModule("/content/catalogo.html");
  }
  function graph() {
    window.location.hash = "#estadisticas-atenciones"
    contentModulo.innerHTML = urlModule("/content/grafico-atenciones.html");
  }
  function box() {
    window.location.hash = "#estadisticas-caja"
    contentModulo.innerHTML = urlModule("/content/grafico-caja.html");
  }
  function audit() {
    window.location.hash = "#auditoria"
    contentModulo.innerHTML = urlModule("/content/auditoria.html");
  }
  function indicators() {
    window.location.hash = "#indicadores"
    contentModulo.innerHTML = urlModule("/content/indicadores.html");
  }
  function updateHistory() {
    window.location.hash = "#actualizacion-historia"
    contentModulo.innerHTML = urlModule("/content/actualizacion-historias.html");
  }
  function routeErrE() {
    console.log("ruta error")
    contentModulo.innerHTML = "no existe la ruta";
  }
  
 
  
  function urlModule(url) {
    return (
      "<iframe src='" +
      url +
      "' style='width: 100%; height: 100%; border: none;'></iframe>"
    );
  }
  

  $('#details').on('hidden.bs.modal', function (e) {
    console.log("cerrando")
  })
 

  