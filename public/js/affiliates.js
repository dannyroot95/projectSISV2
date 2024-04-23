
/*$('#chk2').change(function() {
    if(this.checked != true){
        document.getElementById("d-aMaterno").style = "display:block;"
          document.getElementById("i-aMaterno").style = "display:block;"
     }
  else{
    document.getElementById("d-aMaterno").style = "display:none;"
    document.getElementById("i-aMaterno").style = "display:none;"
  } 
});*/

//const { json } = require("express");
//

var jsonAfiliate = {}

function search(){

    let n = document.getElementById("nro-formato").value

    if(n != ""){
        disabled()
        fetch(`${url}/affiliate/${n}`,{
          method: 'get',
          headers: {
            'Accept': 'application/json'
          }
      })
        .then(response => response.json())
        .then(data => {
            if(data.error == "sin datos"){
                Swal.fire(
                    'Oops',
                    'Sin resultados!',
                    'info'
                  )
                  document.getElementById("tbody").innerHTML = ""
                  enable()
            }else{
                insertData(data)
            }
        }).catch(err => {
            console.log(err)
        });  

    }else{
        Swal.fire(
            'Oops',
            'Complete los campos!',
            'info'
          )
    }

}

function add(){
    $('#addModal').modal('show')
}

function insertData(data){
    enable()
    let ctx = 0
    document.getElementById("tbody").innerHTML = ""
    $("#tbody").html(data.map((d) => {
      ctx++
              return `
              <tr>
              <td><center><button onclick="deleteAfiliate('${d.idSiasis}',${ctx})" class="btn btn-danger minText5">X</button></center></td>

              <td class="minText5"><center>${ctx}</center></td>

              <td class="minText5"><center>${isEqualData('0',d.idSiasis,d.AfiliacionNroFormato)}</center></td>

              <td class="minText5"><center>${d.AfiliacionDisa}</center></td>

              <td class="minText5"><center>${d.AfiliacionTipoFormato}</center></td>

              <td class="minText5"><center>${isEqualData('1',d.idSiasis,d.AfiliacionNroFormato)}</center></td>

              <td class="minText5">
              <center>${d.Paterno+' '+isNulled(d.Materno)+' '
              +d.Pnombre+' '+
              isNulled(d.Onombres).toUpperCase()}</center></td>
           
              <td class="minText5"><center>${typeDoc(d.DocumentoTipo)}</center></td>
   
              <td class="minText5"><center>${isNulledString(d.DocumentoNumero)}</center></td>

              <td class="minText5"<center>${hasCorrelative(d.AfiliacionNroIntegrante)}</center></td>
       
              <td class="minText5"><center>${isNulled(d.CodigoEstablAdscripcion)}</center></td>
            
              <td class="minText5"><center>${date(d.AfiliacionFecha)}</center></td>

              <td class="minText5"><center>${date(d.Fnacimiento)}</center></td>
   
              <td class="minText5"><center>${gender(d.Genero)}</center></td>

              <td class="minText5"><center>${d.IdDistritoDomicilio}</center></td>
 
              <td class="minText5"><center>${statusF(d.Estado)}</center></td>

              <td class="minText5"><center>${isNulledStringFBaja(d.Fbaja)}</center></td>
       
              <td class="minText5"><center>${isNulledString(d.MotivoBaja)}</center></td>
      
              </tr>
              `;

          })
          .join("")
      );

}

function details(d){
    d = JSON.parse(decodeURIComponent(d))
}

function deleteSymbols(event) {
    let input = event.target;
    let text = input.value;
    input.value = text.replace(/[^\w\s]/gi, '');
  }

  function enable(){
    document.getElementById("btn-search").disabled = false
    document.getElementById("btn-search-web").disabled = false
    document.getElementById("btn-search-arfsis").disabled = false
    loader.style = "display:none;"
  }

  function disabled(){
    document.getElementById("btn-search").disabled = true
    document.getElementById("btn-search-web").disabled = true
    document.getElementById("btn-search-arfsis").disabled = true
    loader.style = "display:block;"
  }

  function isNulled(val){

    let x = val

    if(x == null || x == "" || x == "__________"){
        x = ""
    }

    return x

  }

  function isNulledString(val){

    let x = val

    if(x == null || x == "" || x == "__________"){
        x = "<b>Sin registro</b>"
    }

    return x

  }

  function isNulledStringFBaja(val){

    let x = val

    if(x == null || x == "" || x == "__________"){
        x = "<b>Sin registro</b>"
    }else{
      const fechaObj = new Date(x);
      const año = fechaObj.getFullYear();
      const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes porque los meses van de 0 a 11
      const dia = String(fechaObj.getDate()).padStart(2, '0');
      x = `${dia}/${mes}/${año}`;
    }

    return x

  }

  function hasCorrelative(val){
    let x = val

    if(x == null || x == ""){
        x = "<b>Sin registro</b>"
    }

    return `<center>${x}</center>`
  }

  function typeDoc(val){

    let doc = "Sin registro"

    if(val == '1'){doc = "dni"}
    else if(val == '2'){doc = "Código temporal ó Sin registro de Madre/tutor"}
    else if(val == '3'){doc = "Carnet de Extranjeria"}

    return doc.toUpperCase()

  }

  function gender(val){

    let doc = "masculino"

    if(val == '1'){doc = `<i style="color:blue;" class='bx bx-male' ></i> masculino`}
    else if(val == '0'){doc = `<i style="color:red;" class='bx bx-female-sign'></i> femenino`}
    else{
        doc = "<b>Sin registro</b>"
    }

    return doc.toUpperCase()

  }

  function statusF(val){

    let doc = "<b>Sin registro</b>"

    if(val == '1'){doc = `<b style="color:red;">Inactivo</b>`}
    else if(val == '0'){doc = `<b style="color:green;">Activo</b>`}

    return doc.toUpperCase()

  }

  function searchArfsis(){
    let tipo = document.getElementById("s-type-formated").value
    let num = document.getElementById("nro-formato").value
    if(tipo != "" && num !=""){

      if(tipo == "2" && num.length == 8){
        fetchSearchArfsis(tipo,num.trim())
      }else if(tipo == "3" && num.length == 9){
        fetchSearchArfsis(tipo,num.trim())
      }else if(tipo == "E" && num.length == 8){
        fetchSearchArfsis(tipo,num.trim())
      }else{
        Swal.fire(
          'Oops',
          'Error formato de afiliación!',
          'info'
        )
      }
    }else{
      Swal.fire(
        'Oops',
        'Complete los campos!',
        'info'
      )
    }

  }

  function searchWebService() {

    let disa = document.getElementById("disa").value
    let tipo = document.getElementById("s-type-formated").value
    let num = document.getElementById("nro-formato").value

    if(disa != "" && tipo != "" && num !=""){

      if(tipo == "2" && num.length == 8){
        ft(disa,tipo,num.trim())
      }else if(tipo == "3" && num.length == 9){
        ft(disa,tipo,num.trim())
      }else{
        Swal.fire(
          'Oops',
          'Error formato de afiliación!',
          'info'
        )
      }
    }else{
      Swal.fire(
        'Oops',
        'Complete los campos!',
        'info'
      )
    }

   
  }

  function ft(disa,tipo,num){
    disabled()
    fetch(`${url}/get-afiliate-web-service`)
      .then(response => response.json())
      .then(data => {
        showDataAuth(data[0].server_response,disa,tipo,num)
        // Accede a la información organizada
        //console.log('Success:', data[0].success); // 'autorizado'
        //console.log('Session ID:', data[0].server_response); // El ID de sesión obtenido del XML
      })
      .catch(error => {
        enable()
        console.error('Error:', error);
      });
  }

  function showDataAuth(data,disa,tipo,num){
    var xmlString = data;
  
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    // Obtener la respuesta SOAP
    var response = xmlDoc.getElementsByTagName("GetSessionResponse")[0];    
    // Obtener los elementos de la respuesta
    var auth = response.getElementsByTagName("GetSessionResult")[0].textContent;
    searchWebServiceData(auth,disa,tipo,num)
    console.log(auth)
  }

  function searchWebServiceData(auth,disa,tipo,num) {
    console.log(auth+" "+disa+" "+tipo+" "+num)
    fetch(`${url}/get-afiliate-web-service-data/${auth}/${disa}/${tipo}/${num}`)
      .then(response => response.json())
      .then(data => {
        enable()
        showDataAfiliate(data[0].server_response)
        // Accede a la información organizada
      })
      .catch(error => {
        enable()
        console.error('Error:', error);
      });
  }


  function showDataAfiliate(data) {
    var xmlString = data;
  
    // Parsear el XML
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
    // Obtener la respuesta SOAP
    var response = xmlDoc.getElementsByTagName("ConsultarAfiliadoFuaEResult")[0];
  
    // Obtener los elementos de la respuesta
    var idError = response.getElementsByTagName("IdError")[0].textContent;
    var resultado = response.getElementsByTagName("Resultado")[0].textContent;
    var tipoDocumento = response.getElementsByTagName("TipoDocumento")[0].textContent;
    var nroDocumento = response.getElementsByTagName("NroDocumento")[0].textContent;
    var apePaterno = response.getElementsByTagName("ApePaterno")[0].textContent;
    var apeMaterno = response.getElementsByTagName("ApeMaterno")[0].textContent;
    var nombres = response.getElementsByTagName("Nombres")[0].textContent;
    var fecAfiliacion = response.getElementsByTagName("FecAfiliacion")[0].textContent;
    var eess = response.getElementsByTagName("EESS")[0].textContent;
    var descEESS = response.getElementsByTagName("DescEESS")[0].textContent;
    var eessUbigeo = response.getElementsByTagName("EESSUbigeo")[0].textContent;
    var descEESSUbigeo = response.getElementsByTagName("DescEESSUbigeo")[0].textContent;
    var regimen = response.getElementsByTagName("Regimen")[0].textContent;
    var tipoSeguro = response.getElementsByTagName("TipoSeguro")[0].textContent;
    var descTipoSeguro = response.getElementsByTagName("DescTipoSeguro")[0].textContent;
    var contrato = response.getElementsByTagName("Contrato")[0].textContent;
    var estado = response.getElementsByTagName("Estado")[0].textContent;
    var tabla = response.getElementsByTagName("Tabla")[0].textContent;
    var idNumReg = response.getElementsByTagName("IdNumReg")[0].textContent;
    var genero = response.getElementsByTagName("Genero")[0].textContent;
    var fecNacimiento = response.getElementsByTagName("FecNacimiento")[0].textContent;
    var idUbigeo = response.getElementsByTagName("IdUbigeo")[0].textContent;
    var disa = response.getElementsByTagName("Disa")[0].textContent;
    var tipoFormato = response.getElementsByTagName("TipoFormato")[0].textContent;
    var nroContrato = response.getElementsByTagName("NroContrato")[0].textContent;
    var correlativo = response.getElementsByTagName("Correlativo")[0].textContent;
    var idPlan = response.getElementsByTagName("IdPlan")[0].textContent;
    var idGrupoPoblacional = response.getElementsByTagName("IdGrupoPoblacional")[0].textContent;
    var msgConfidencial = response.getElementsByTagName("MsgConfidencial")[0].textContent;
  
    document.getElementById("updateInAccount").value = ""

    console.log(nombres)

    if(idError == "0"){
      
      $('#addModal').modal('show')
      jsonAfiliate = {}

      if(estado == "ACTIVO"){
        document.getElementById("status").innerHTML = estado
        document.getElementById("status").style = "color:green;font-weight: bold;"
        estado = "0"
      }else{
        document.getElementById("status").innerHTML = "INACTIVO"
        document.getElementById("status").style = "color:red;font-weight: bold;"
        estado = "1"
      }

      document.getElementById("typeLocalHealth").innerHTML = descEESS
      document.getElementById("eessCode").innerHTML = eess
      document.getElementById("descriptionCode").innerHTML = descTipoSeguro

      var year = fecAfiliacion.substring(0, 4);
      var month = fecAfiliacion.substring(4, 6);
      var day = fecAfiliacion.substring(6, 8);

      var yearN = fecNacimiento.substring(0, 4);
      var monthN = fecNacimiento.substring(4, 6);
      var dayN = fecNacimiento.substring(6, 8);

      var newdateAfiliate = year + "-" + month + "-" + day;
      var newdateBirth = yearN + "-" + monthN + "-" + dayN;

      setDataAfiliate(idNumReg,tabla,disa,tipoFormato,nroContrato,correlativo,tipoDocumento,genero,eess,
        newdateAfiliate,apePaterno,apeMaterno,nombres,newdateBirth,idUbigeo,nroDocumento)
      
      jsonAfiliate = {
         idSiasis : parseInt(idNumReg)
        ,Codigo : tabla
        ,AfiliacionDisa : disa
        ,AfiliacionTipoFormato : tipoFormato
        ,AfiliacionNroFormato : nroContrato
        ,AfiliacionNroIntegrante : isEmptyCorrelative(correlativo)
        ,DocumentoTipo : tipoDocumento
        ,CodigoEstablAdscripcion : eess
        ,AfiliacionFecha : newdateAfiliate
        ,Paterno : apePaterno
        ,Materno : emptyMomLastName(apeMaterno)
        ,Pnombre : nombres.split(" ")[0]
        ,Onombres : isUndefined(nombres)
        ,Genero : genero
        ,Fnacimiento : newdateBirth
        ,IdDistritoDomicilio : idUbigeo
        ,Estado : estado
        ,Fbaja : null
        ,DocumentoNumero : nroDocumento
        ,MotivoBaja : null   
        ,FbajaOK : null
      }

      console.log(jsonAfiliate)

    }else{
      Swal.fire(
        'Oops',
        'Sin resultados!',
        'info'
      )
    }

  }

  function setDataAfiliate(idNumReg,tabla,disa,tipoFormato,nroContrato,correlativo,tipoDocumento,genero,eess,
    newdateAfiliate,apePaterno,apeMaterno,nombres,newdateBirth,idUbigeo,nroDocumento){
      document.getElementById("idSiasis").value = idNumReg
      document.getElementById("idTypeTable").value = tabla
      document.getElementById("idDisa").value = disa
      document.getElementById("idTypeFormatAffiliate").value = tipoFormato
      document.getElementById("nroFormatAffi").value = nroContrato
      document.getElementById("correlative").value = isEmptyCorrelative(correlativo)
      document.getElementById("inputGroupSelectTypeDoc").value = tipoDocumento
      document.getElementById("inputGroupSelectSex").value = genero
      document.getElementById("estCode").value = eess
      document.getElementById("dateAffiliation").value = newdateAfiliate
      document.getElementById("aPaterno").value = apePaterno
      document.getElementById("aMaterno").value = apeMaterno
      document.getElementById("aPNombre").value = nombres.split(" ")[0]
      document.getElementById("aSNombre").value = isUndefined(nombres)
      document.getElementById("dateBirth").value = newdateBirth
      document.getElementById("idDistrito").value = idUbigeo
      document.getElementById("nDoc").value = nroDocumento
  }

  function fetchSearchArfsis(type,nro) {
    disabled()
    fetch(`${url}/get-afiliate-arfsis/${type}/${nro}`)
      .then(response => response.json())
      .then(data => {
        enable()
        if(data.length > 0){
          jsonAfiliate = {}
          let d = data[0]

          const fechaObjFormato = new Date(d.afi_FecFormato);
          const fechaObjNac = new Date(d.afi_FecNac);
          let fechaDeBaja = null

          if(d.afi_FecBaja != "" || d.afi_FecBaja != null){
            const fechaObjBaja = new Date(d.afi_FecBaja)
            const añoB = fechaObjBaja.getFullYear();
            const mesB = String(fechaObjBaja.getMonth() + 1).padStart(2, '0'); 
            const diaB = String(fechaObjBaja.getDate()).padStart(2, '0');  
            fechaDeBaja = `${añoB}-${mesB}-${diaB}`;
          }

          const añoF = fechaObjFormato.getFullYear();
          const mesF = String(fechaObjFormato.getMonth() + 1).padStart(2, '0'); 
          const diaF = String(fechaObjFormato.getDate()).padStart(2, '0');

          const añoN = fechaObjNac.getFullYear();
          const mesN = String(fechaObjNac.getMonth() + 1).padStart(2, '0'); 
          const diaN = String(fechaObjNac.getDate()).padStart(2, '0');


          const fechaFormato = `${añoF}-${mesF}-${diaF}`;
          const fechaNacimiento = `${añoN}-${mesN}-${diaN}`;

          jsonAfiliate = {
            idSiasis : d.afi_IdSiasis
           ,Codigo : d.afi_TipoTabla
           ,AfiliacionDisa : d.afi_IdDisa
           ,AfiliacionTipoFormato : d.afi_TipoFormato
           ,AfiliacionNroFormato : d.afi_NroFormato
           ,AfiliacionNroIntegrante : isEmptyCorrelative(d.afi_CorrelativoIns)
           ,DocumentoTipo : d.afi_IdTipoDocumento
           ,CodigoEstablAdscripcion : d.afi_IdEESSAte
           ,AfiliacionFecha : fechaFormato
           ,Paterno : d.afi_ApePaterno
           ,Materno : emptyMomLastName(d.afi_ApeMaterno)
           ,Pnombre : d.afi_Nombres.split(" ")[0]
           ,Onombres : isUndefined(d.afi_Nombres)
           ,Genero : d.afi_IdSexo
           ,Fnacimiento : fechaNacimiento
           ,IdDistritoDomicilio : d.afi_IdDistrito
           ,Estado : d.afi_IdEstado
           ,Fbaja : fechaDeBaja
           ,DocumentoNumero : d.afi_Dni
           ,MotivoBaja : d.afi_MotivoBaja   
           ,FbajaOK : null
         }

          document.getElementById("typeLocalHealth").innerHTML = ""
          document.getElementById("eessCode").innerHTML = ""
          document.getElementById("descriptionCode").innerHTML = ""

         if(d.afi_IdEstado == "0"){
          document.getElementById("status").innerHTML = "ACTIVO"
          document.getElementById("status").style = "color:green;font-weight: bold;"
        }else{
          document.getElementById("status").innerHTML = "INACTIVO"
          document.getElementById("status").style = "color:red;font-weight: bold;"
        }

         setDataAfiliate(d.afi_IdSiasis,d.afi_TipoTabla,d.afi_IdDisa,d.afi_TipoFormato,d.afi_NroFormato,
          d.afi_CorrelativoIns,d.afi_IdTipoDocumento,d.afi_IdSexo,d.afi_IdEESSAte,fechaFormato,d.afi_ApePaterno,
          d.afi_ApeMaterno,d.afi_Nombres,fechaNacimiento,d.afi_IdDistrito,d.afi_Dni)
         
          $('#addModal').modal('show')

          console.log(jsonAfiliate)

        }else{
          Swal.fire(
            'Oops',
            'Sin resultados!',
            'info'
          )
        }
      })
      .catch(error => {
        enable()
        console.error('Error:', error);
      });
  }

  function isUndefined(name){
    let secondName = name.split(" ")[1]
    let thirdName = name.split(" ")[2]
    let allNames = ""
    if(secondName == undefined){
      allNames = ""
    }else{
      if(thirdName == undefined){
        allNames = secondName
      }else{
        allNames = secondName+' '+thirdName
      }
    }
    return allNames
  }

  function emptyMomLastName(MomLastname){
    let last = MomLastname
    if(last == ""){
      last = "VACIO"
    }
    return last
  }

  function isEmptyCorrelative(c){
    if(c == "" || c == null){
      c = "0"
    }
    return c.substring(0, 1)
  }


  function addToSisGalenPlus(){

    console.log(jsonAfiliate)

    let addLoader =  document.getElementById("loaderAddGalenos")
    let btnAdd = document.getElementById("btnAddGalenos")
    let btnUpdate = document.getElementById("btnUpdateAfiliate")
    let btnUpdateIDToAccount = document.getElementById("btnUpdateToAccount")
    let btnClose = document.getElementById("closeBtnModal")
    addLoader.style = "display:block;"
    btnAdd.disabled = true
    btnUpdate.disabled = true
    btnUpdateIDToAccount.disabled  = true
    btnClose.disabled = true

    fetch(`${url}/affiliate/${jsonAfiliate.AfiliacionNroFormato}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
        if(data.error == "sin datos"){
            
          addAfiliateToGalenos(jsonAfiliate)

        }else{
          btnAdd.disabled = false
          btnClose.disabled = false
          btnUpdate.disabled = false
          btnUpdateIDToAccount.disabled  = false
          addLoader.style = "display:none;"
          Swal.fire(
            'Oops!',
            'Ya existe en SisGalenPlus',
            'info'
          )
        }
    }).catch(err => {
        btnAdd.disabled = false
        btnClose.disabled = false
        btnUpdate.disabled = false
        btnUpdateIDToAccount.disabled  = false
        addLoader.style = "display:none;"
        Swal.fire(
          'Oops!',
          'Ocurrió un error 404',
          'error'
        )
    });  
  }


  function addAfiliateToGalenos(data){

    let addLoader =  document.getElementById("loaderAddGalenos")
    let btnAdd = document.getElementById("btnAddGalenos")
    let btnClose = document.getElementById("closeBtnModal")
    let btnUpdate = document.getElementById("btnUpdateAfiliate")
    let btnUpdateIDToAccount = document.getElementById("btnUpdateToAccount")

    fetch(`${url}/add-afiliate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
  
      console.log(data)

        if(data[0].success == "actualizado"){

            btnClose.disabled = false
            btnAdd.disabled = false
            btnUpdate.disabled = false
            btnUpdateIDToAccount.disabled  = false
            addLoader.style = "display:none;"

            Swal.fire(
              'Muy bien!',
              'Afiliado agregado a SisGalenPlus!',
              'success'
            )

            //$('#addModal').modal('hide')
            
        }else{
          btnAdd.disabled = false
          btnClose.disabled = false
          btnUpdate.disabled = false
          btnUpdateIDToAccount.disabled  = false
          addLoader.style = "display:none;"
          Swal.fire(
            'Oops!',
            'Ocurrió un error',
            'error'
          )
        }
    }).catch(err => {
        btnAdd.disabled = false
        btnClose.disabled = false
        addLoader.style = "display:none;"
        Swal.fire(
          'Oops!',
          'Ocurrió un error 404',
          'error'
        )
    }); 

  }

  function updateAfiliateToGalenos(){

    let data = jsonAfiliate
    console.log(data)

    let addLoader =  document.getElementById("loaderAddGalenos")
    let btnAdd = document.getElementById("btnAddGalenos")
    let btnClose = document.getElementById("closeBtnModal")
    let btnUpdate = document.getElementById("btnUpdateAfiliate")
    let btnUpdateIDToAccount = document.getElementById("btnUpdateToAccount")

    btnClose.disabled = true
    btnAdd.disabled = true
    btnUpdate.disabled = true
    btnUpdateIDToAccount.disabled  = true

    fetch(`${url}/update-afiliate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
  
      console.log(data)

        if(data[0].success == "actualizado"){

            btnClose.disabled = false
            btnAdd.disabled = false
            btnUpdate.disabled = false
            btnUpdateIDToAccount.disabled  = false
            addLoader.style = "display:none;"

            Swal.fire(
              'Muy bien!',
              'Afiliado actualizado!',
              'success'
            )

            //$('#addModal').modal('hide')
            
        }else{

          btnAdd.disabled = false
          btnClose.disabled = false
          btnUpdate.disabled = false
          btnUpdateIDToAccount.disabled  = false
          addLoader.style = "display:none;"
          Swal.fire(
            'Oops!',
            'La afiliación no existe!',
            'error'
          )
        }
    }).catch(err => {
        btnAdd.disabled = false
        btnClose.disabled = false
        addLoader.style = "display:none;"
        Swal.fire(
          'Oops!',
          'Ocurrió un error 404',
          'error'
        )
    }); 

  }

  function deleteAfiliate(idSiasis, row) {

    Swal.fire({
      title: 'Estas seguro de eliminar la afiliación?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText : 'No'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        fetch(`${url}/delete-afiliate/${idSiasis}`)
        .then(response => response.json())
        .then(data => {
    
          if(data[0].success == "eliminado"){
              document.getElementById("tb-data").deleteRow(row);
              updateRowNumbers(idSiasis);
              Swal.fire('Eliminado!', '', 'success')
          }else{
            Swal.fire(
              'Oops!',
              'Ocurrió un error!',
              'error'
            )
          }
          
        }).catch(err =>{
            console.log(err)
            Swal.fire(
              'Oops!',
              'Ocurrió un error!',
              'error'
            )
        } );

      }})

  }

  function updateRowNumbers(idSiasis) {
    var tabla = document.getElementById("tb-data");
    var filas = tabla.getElementsByTagName("tr");
 
    for (var i = 1; i < filas.length; i++) {
       // Actualizar el número en la segunda celda de cada fila
       filas[i].cells[1].innerHTML = "<center>" + i + "</center>";
       filas[i].cells[0].innerHTML = `<center><button onclick="deleteAfiliate('${idSiasis}',${i})" class="btn btn-danger minText5">X</button></center>`;
    }
 }

  function isEqualData(type,idSiasis,formato){

    let x = ""

    if(type == "0"){

      if(idSiasis == formato){
        x = `<b style="color:red;">${idSiasis}</b>`
      }else{
        x = idSiasis
      }

    }else{
      if(idSiasis == formato){
        x = `<b style="color:red;">${formato}</b>`
      }else{
        x = formato
      }
    }

    return x 

  }

  function updateSiasisAte(){

    let idSiasis = document.getElementById("idSiasis").value
    let idCuentaAtencion = document.getElementById("updateInAccount").value

    if(idCuentaAtencion != "" && idCuentaAtencion.length == 7){

      fetch(`${url}/update-siasis-ate/${idCuentaAtencion}/${idSiasis}`)
      .then(response => response.json())
      .then(data => {

        console.log(data)
        if(data[0].success == "actualizado"){
            Swal.fire('Actualizado!', '', 'success')
        }else{
          Swal.fire(
            'Oops!',
            'Ocurrió un error!',
            'error'
          )
        }
        
      }).catch(err =>{
          console.log(err)
          Swal.fire(
            'Oops!',
            'Ocurrió un error!',
            'error'
          )
      } );

    }else{
      Swal.fire(
        'Oops!',
        'Verifique la cuenta!',
        'info'
      )
    }

  }