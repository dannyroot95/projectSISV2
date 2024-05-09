
function date(st){

    /* Date format you have */
    const fechaOriginal = st; // fecha en formato aaaa-mm-dd hh:mm:ss
    const fecha = new Date(fechaOriginal); // creamos un objeto Date a partir de la fecha original

    const dia = fecha.getUTCDate(); // obtenemos el día del mes (1-31)
    const mes = fecha.getUTCMonth() + 1; // obtenemos el mes (0-11) y sumamos 1 para obtener el número de mes correcto (1-12)
    const anio = fecha.getUTCFullYear(); // obtenemos el año (4 dígitos)

    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio.toString()}`; // concatenamos las partes de la fecha en una cadena con el formato dd/mm/aaaa

    return fechaFormateada

}

function dateWithHour(st){

    /* Date format you have */
    const fechaOriginal = st; // fecha en formato aaaa-mm-dd hh:mm:ss
    const fecha = new Date(fechaOriginal); // creamos un objeto Date a partir de la fecha original

    const dia = fecha.getUTCDate(); // obtenemos el día del mes (1-31)
    const mes = fecha.getUTCMonth() + 1; // obtenemos el mes (0-11) y sumamos 1 para obtener el número de mes correcto (1-12)
    const anio = fecha.getUTCFullYear(); // obtenemos el año (4 dígitos)
    const hour = fecha.getHours()
    const minutes = fecha.getMinutes()

    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio.toString()} ${hour}:${minutes}`; // concatenamos las partes de la fecha en una cadena con el formato dd/mm/aaaa

    return fechaFormateada

}



function typeService(service){

    let type = ""

    if(service == null){
        type = "<center>-</center>"
    }else if(service == "TOPICO CIRUGIA" || service == "TOPICO OBSTÉTRICA" || service == "TOPICO MEDICINA" || service == "TOPICO TRAUMATOLOGIA" || 
        service == "OBSERVACION EMERGENCIA MASCULINO" || service == "OBSERVACION EMERGENCIA FEMENINO" || service == "TOPICO DE MEDICINA 1" || 
        service == "TRAUMA SHOCK" || service == "OBSERVACIÓN EMERGENCIA MASCULINO"){
        type = "EMERGENCIA"
    }else if(service == "TOPICO PEDIATRIA" || service == "OBSERVACION NIÑOS"){
        type = "EMERGENCIA PEDIATRICA"
    }else if(service.includes("TRAUMATOLOGIA") || service.includes("TRAUMATOLOGÍA")){
        type = "TRAUMATOLOGIA"
    }else if(service.includes("CIRUGIA")){
        type = "CIRUGIA"
    }else if(service.includes("OBSTETRICIA") || service.includes("GINECOLOGÍA")){
        type = "GiNECOLOGIA"
    }else if(service == "MEDICINA I" || service == "MEDICINA II" || service == "MEDICINA III" || service == "MEDICINA GENERAL" || 
             service == "MEDICINA INFECTOLOGIA" || service == "MEDICINA SALUD MENTAL" || service == "MEDICINA CUIDADOS INTERMEDIOS"){
        type = "MEDICINA"
    }else if(service.includes("ECOGRAFIA")){
        type = "ECOGRAFIA"
    }else if(service.includes("NEONATOLOGIA") || service.includes("NEONATOLOGÍA")){
        type = "NEONATOLOGIA"
    }else if(service.includes("PEDIATRÍA") || service.includes("PEDIATRIA")){
        type = "PEDIATRIA"
    }else{
        type = service
    }

    return type

  }

  function obtenerNombreMes(numeroMes) {
    // Array de nombres de meses
    const nombresMeses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    // Validar que el número de mes esté dentro del rango válido (1-12)
    if (numeroMes >= 1 && numeroMes <= 12) {
        // Restar 1 al número del mes para obtener el índice correcto en el array
        const indiceMes = numeroMes - 1;
        // Devolver el nombre del mes en mayúsculas
        return nombresMeses[indiceMes];
    } else {
        // Si el número de mes no está en el rango válido, devolver un mensaje de error
        return "Número de mes inválido";
    }
}