
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

const codigosDiagnosticoNoPermitidos065to067 = new Set([
    "A590", "A598", "A599", "A600", "A601", "A609", "A630", "A638", "A679", "A698", "A699", "A070", "A071", "A072", "A073", "A078",
    "B680", "B681", "B689", "B710", "B711", "B718", "B719", "B779", "B781", "B789", "B79X", "B80X", "B810", "B811", "B812", "B813", 
    "B814", "B818", "B820", "B829", "B830", "B831", "B832", "B833", "B834", "B838", "B839", "B350", "B351", "B352", "B353", "B354", 
    "B355", "B356", "B358", "B359", "B360", "B361", "B362", "B363", "B370", "B372", "B373", "D500", "D508", "D509", "G430", "G431", 
    "G432", "G433", "G438", "G439", "G440", "G441", "G442", "G443", "G444", "G448", "H100", "H101", "H102", "H103", "H104", "H105", 
    "H108", "H109", "H110", "H111", "H112", "H113", "H114", "H118", "H119", "H650", "H651", "H652", "H653", "H654", "H659", "H660", 
    "H661", "H662", "H663", "H664", "H680", "H690", "H71X", "H720", "H721", "H722", "J020", "J028", "J029", "J030", "J038", "J039", 
    "J00X", "J010", "J011", "J012", "J013", "J014", "J018", "J019", "J060", "J068", "J069", "K000", "K001", "K002", "K003", "K004", 
    "K005", "K006", "K007", "K008", "K009", "K010", "K011", "K030", "K031", "K032", "K033", "K034", "K035", "K036", "K037", "K038", 
    "K039", "K040", "K041", "K042", "K043", "K044", "K045", "K046", "K047", "K048", "K049", "K050", "K051", "K052", "K053", "K054", 
    "K055", "K056", "K060", "K061", "K062", "K020", "K021", "K022", "K023", "K024", "K028", "K029", "K299", "L100", "L101", "L102", 
    "L103", "L104", "L105", "L108", "L109", "L110", "L111", "L118", "L119", "L120", "L121", "L122", "L123", "L128", "L129", "L130", 
    "L131", "L138", "L139", "L14X", "L200", "L208", "L209", "L210", "L211", "L218", "L219", "L22X", "L230", "L231", "L232", "L233", 
    "L234", "L235", "L236", "L237", "L238", "L239", "L240", "L24", "L010", "L011", "L020", "L021", "L022", "L023", "L024", "M400", 
    "M401", "M402", "M403", "M404", "M405", "M410", "M411", "M412", "M413", "M414", "M415", "M429", "M435", "M436", "N341", "N342", 
    "N343", "N758", "N759", "N760", "N761", "N762", "N763", "N764", "N765", "N766", "N768", "N770", "N771", "R030", "R031", "R05X", 
    "R060", "R061", "R062", "R063", "R064", "R065", "R066", "R067", "R068", "R11X", "R12X", "R13X", "R14X", "R15X", "R160", "R161", 
    "R070", "R500", "R501", "R509", "R100", "R101", "R102", "R103", "R104", "S000", "S001", "S002", "S003", "S004", "S005", "S007", 
    "S008", "S009", "S010", "S011", "S012", "S013", "S014", "S015", "S017", "S018", "S019", "S092", "S101", "O260", "O261", "O280", 
    "O281", "Z340", "Z348", "Z010", "Z011", "Z012", "Z013", "Z014", "Z015", "Z016", "Z017", "Z018", "Z019", "Z020", "Z021", "Z022", 
    "Z023", "Z024", "Z025", "Z026", "Z027", "Z028", "Z029", "Z030", "Z031", "Z032", "Z033", "Z034", "Z035", "Z036", "Z038", "Z044", 
    "Z040", "Z200", "Z201", "Z202", "Z203", "Z204", "Z205", "Z206", "Z207", "Z208", "Z209", "Z220", "Z221", "Z222", "Z223", "Z224", 
    "Z225", "Z226", "Z228", "Z229", "Z230", "Z231", "Z232", "Z233", "Z234", "Z235", "Z236", "Z237", "Z238", "Z240", "Z241", "Z242", 
    "Z243", "Z244", "Z245", "Z246", "Z250", "Z251", "Z258", "Z260", "Z268", "Z269", "Z270", "Z316", "Z321", "Z33X", "Z370", "Z371", 
    "Z372", "Z373", "Z374", "Z375", "Z376", "Z377", "Z379", "Z550", "Z551", "Z552", "Z553", "Z554", "Z558", "Z559", "Z560", "Z561", 
    "Z562", "Z563", "Z564", "Z565", "Z566", "Z567", "Z570", "Z571", "Z572", "Z573", "Z574", "Z575"
  ]);

  const codigosDiagnosticoNoPermitidos068 = new Set([
    "A58X", "A590", "A598", "A599", "A600", "A601", "A609", "A630", "A638", "A64X", "A65X", "A660", "A661", "A662", "A663", "A664", 
    "A665", "A666", "A667", "A668", "A669", "A670", "A671", "A672", "A673", "A679", "A690", "A691", "A692", "A698", "A699", "A70X", 
    "A740", "A748", "A749", "A770", "A771", "A772", "A773", "A778", "A779", "A78X", "A79", "A020", "A021", "A022", "A028", "A029", 
    "A040", "A041", "A042", "A043", "A044", "A045", "A046", "A047", "A048", "A049", "A070", "A071", "A072", "A073", "A078", "A079", 
    "A09X", "B680", "B681", "B689", "B690", "B691", "B698", "B699", "B700", "B701", "B710", "B711", "B718", "B719", "B75X", "B770", 
    "B778", "B779", "B780", "B781", "B787", "B789", "B79X", "B80X", "B810", "B811", "B812", "B813", "B814", "B818", "B820", "B829", 
    "B830", "B831", "B832", "B833", "B834", "B838", "B839", "B350", "B351", "B352", "B353", "B354", "B355", "B356", "B357", "B358", 
    "B359", "B360", "B361", "B362", "B363", "B368", "B369", "B370", "B371", "B372", "B373", "B374", "B375", "B376", "B377", "B378", 
    "B379", "B380", "B381", "B382", "B383", "B387", "D500", "D501", "D508", "D509", "G430", "G431", "G432", "G433", "G438", "G439",
    "G440", "G441", "G442", "G443", "G444", "G448", "H100", "H101", "H102", "H103", "H104", "H105", "H108", "H109", "H110", "H111", 
    "H112", "H113", "H114", "H118", "H119", "H130", "H131", "H132", "H133", "H138", "H350", "H351", "H352", "H353", "H354", "H355", 
    "H356", "H357", "H358", "H359", "H650", "H651", "H652", "H653", "H654", "H659", "H660", "H661", "H662", "H663", "H664", "H669", 
    "H670", "H671", "H678", "H680", "H681", "H690", "H698", "H699", "H700", "H701", "H702", "H708", "H709", "H71X", "H720", "H721", 
    "H722", "H728", "H729", "H730", "J020", "J028", "J029", "J030", "J038", "J039", "J00X", "J010", "J011", "J012", "J013", "J014", 
    "J018", "J019", "J060", "J068", "J069", "J200", "J201", "J202", "J203", "J204", "J205", "J206", "J207", "J208", "J209", "J210", 
    "J218", "J219", "K000", "K001", "K002", "K003", "K004", "K005", "K006", "K007", "K008", "K009", "K010", "K011", "K030", "K031", 
    "K032", "K033", "K034", "K035", "K036", "K037", "K038", "K039", "K040", "K041", "K042", "K043", "K044", "K045", "K046", "K047", 
    "K048", "K049", "K050", "K051", "K052", "K053", "K054", "K055", "K056", "K060", "K061", "K062", "K020", "K021", "K022", "K023", 
    "K024", "K028", "K029", "K290", "K291", "K292", "K293", "K294", "K295", "K296", "K297", "K298", "K299", "L100", "L101", "L102", 
    "L103", "L104", "L105", "L108", "L109", "L110", "L111", "L118", "L119", "L120", "L121", "L122", "L123", "L128", "L129", "L130",
    "L131", "L138", "L139", "L14X", "L200", "L208", "L209", "L210", "L211", "L218", "L219", "L22X", "L230", "L231", "L232", "L233", 
    "L234", "L235", "L236", "L237", "L238", "L239", "L240", "L24", "L00X", "L010", "L011", "L020", "L021", "L022", "L023", "L024", 
    "L028", "L029", "L030", "L031", "L032", "L033", "L038", "L039", "L040", "L041", "L042", "L043", "L048", "L049", "L050", "L059", 
    "L080", "L081", "L088", "L089", "M400", "M401", "M402", "M403", "M404", "M405", "M410", "M411", "M412", "M413", "M414", "M415", 
    "M418", "M419", "M420", "M421", "M429", "M430", "M431", "M432", "M433", "M434", "M435", "M436", "M438", "M439", "M45X", "M460", 
    "M461", "M462", "M463", "M464", "M465", "M468", "M469", "M470", "M471", "M472", "M478", "M479", "M480", "M481", "N250", "N251", 
    "N26X", "N270", "N271", "N279", "N280", "N281", "N288", "N289", "N290", "N291", "N298", "N310", "N311", "N312", "N318", "N319", 
    "N320", "N321", "N322", "N323", "N324", "N328", "N329", "N330", "N338", "N340", "N341", "N342", "N343", "N350", "N351", "N358", 
    "N359", "N360", "N361", "N362", "N363", "N368", "N36", "N710",  "N711", "N719", "N751", "N758", "N759", "N760", "N761", "N762", 
    "N763", "N764", "N765", "N766", "N768", "N770", "N771", "N778", "R030", "R031", "R040", "R05X", "R060", "R061", "R062", "R063", 
    "R064", "R065", "R066", "R067", "R068", "R070", "R071", "R072", "R073", "R074", "R093", "R098", "R11X", "R12X", "R13X", "R14X",
    "R15X", "R160", "R161", "R16", "R500", "R501", "R509",  "S000", "S001", "S002", "S003", "S004", "S005", "S007", "S008", "S009", 
    "S010", "S011", "S012", "S013", "S014", "S015", "S017", "S018", "S019", "S040", "S041", "S042", "S043", "S044", "S045", "S046", 
    "S047", "S048", "S049", "S090", "S091", "S092", "S097", "S098", "S099", "S100", "S101", "S107", "S108", "S109", "S110", "S111", 
    "S112", "O800", "O801", "O808", "O809", "O200", "O208", "O209", "O210", "O211", "O212", "O218", "O219", "O220", "O221", "O222", 
    "O223", "O224", "O225", "O228", "O229", "O230", "O231", "O232", "O233", "O234", "O235", "O239", "O240", "O241", "O242", "O243", 
    "O244", "O249", "O25X", "O260", "O261", "O262", "O263", "O264", "O265", "O266", "O267", "O268", "O269", "O280", "O281", "Z390", 
    "Z391", "Z392", "Z340", "Z348", "Z349", "Z350", "Z351", "Z352", "Z353", "Z354", "Z355", "Z356", "Z357", "Z358", "Z359", "Z360", 
    "Z361", "Z362", "Z363", "Z364", "Z365", "Z368", "Z369", "Z000", "Z001", "Z002", "Z003", "Z004", "Z005", "Z006", "Z008", "Z010", 
    "Z011", "Z012", "Z013", "Z014", "Z015", "Z016", "Z017", "Z018", "Z019", "Z020", "Z021", "Z022", "Z023", "Z024", "Z025", "Z026", 
    "Z027", "Z028", "Z029", "Z030", "Z031", "Z032", "Z033", "Z034", "Z035", "Z036", "Z038", "Z039", "Z040", "Z041", "Z042", "Z043", 
    "Z044", "Z04", "Z200", "Z201", "Z202", "Z203", "Z204", "Z205", "Z206", "Z207", "Z208", "Z209", "Z220", "Z221", "Z222", "Z223", 
    "Z224", "Z225", "Z226", "Z228", "Z229", "Z230", "Z231", "Z232", "Z233", "Z234", "Z235", "Z236", "Z237", "Z238", "Z240", "Z241", 
    "Z242", "Z243", "Z244", "Z245", "Z246", "Z250", "Z251", "Z258", "Z260", "Z268", "Z269", "Z270", "Z27", "Z310", "Z311", "Z312", 
    "Z313", "Z314", "Z315", "Z316", "Z318", "Z319", "Z320", "Z321", "Z33X", "Z370", "Z371", "Z372", "Z373", "Z374", "Z375", "Z376", 
    "Z377", "Z379", "Z550", "Z551", "Z552", "Z553", "Z554", "Z558", "Z559", "Z560", "Z561", "Z562", "Z563", "Z564", "Z565", "Z566", 
    "Z567", "Z570", "Z571", "Z572", "Z573", "Z574", "Z575"
]);
  

const codigosDiagnosticoNoPermitidos056 = new Set(["Z000", "Z006", "Z008","Z043","Z57.0","Z57.9"])
  