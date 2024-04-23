var qATE = 0
var qDIA = 0
var qINS = 0
var qMED = 0
var qPRO = 0
var qRN = 0
var qSER = 0
var qSMI = 0

function generatePackage(){

  let r1 = document.getElementById("rd1")
  let r2 =document.getElementById("rd2")

  if(r1.checked){
    //excel
    var archivoInput = document.getElementById('inputGroupFile01');
    var archivo = archivoInput.files[0];
    
    if(archivo){
      builPackage()
    }else{
      Swal.fire(
        'Oops',
        'Debe subir un archivo excel!',
        'info'
      )
    }

  }else if(r2.checked){

    builPackage()
  
}else{
  Swal.fire(
    'Oops',
    'Seleccione una opción!',
    'info'
  )
}

}

function builPackage(){
  atencion = ``
  diagnostico = ``
  medicamentos = ``
  insumos = ``
  procedimientos = ``
  smi = ``
  ser = ``
  rn = ``
  res = ``

  qATE = 0
  qDIA = 0
  qINS = 0
  qMED = 0
  qPRO = 0
  qRN = 0
  qSER = 0
  qSMI = 0

  $('#modalFuaEspecific').modal('hide')
  disabledButtons()
  let mes_SEND= document.getElementById("inputGroupSelectProductionMonth2").value
  let anio_SEND = document.getElementById("inputGroupSelectYearSend2").value
  packageEspecificATENCION(mes_SEND,anio_SEND)
}

function packageEspecificATENCION(mes_send,anio_send){
    
  fetch(`${url}/get-trama-atencion-especific/${mes_send}/${anio_send}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qATE++
          if(data.length != ctx){
              atencion += value+"\n"
          }else{
              atencion += value
          }
      });

      packageEspecificATENCIONDIA()

    }).catch(err => {
      Swal.fire(
        'Oops',
        'Sin datos!',
        'info'
      )
      console.log(err)
      enableButtonsError()
    }); 

}

function packageEspecificATENCIONDIA(){
    
  fetch(`${url}/get-trama-diagnosys-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qDIA++
          if(data.length != ctx){
               diagnostico += value+"\n"
          }else{
               diagnostico += value
          }
      });

      packageEspecificATENCIONINS()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function packageEspecificATENCIONINS(){
    
  fetch(`${url}/get-trama-ins-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qINS++
          if(data.length != ctx){
               insumos += value+"\n"
          }else{
            insumos += value
          }
      });

      packageEspecificATENCIONMED()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function packageEspecificATENCIONMED(){
    
  fetch(`${url}/get-trama-med-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qMED++
          if(data.length != ctx){
               medicamentos += value+"\n"
          }else{
            medicamentos += value
          }
      });
      packageEspecificATENCIONPRO()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

function packageEspecificATENCIONPRO(){
    
  fetch(`${url}/get-trama-pro-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qPRO++
          if(data.length != ctx){
               procedimientos += value+"\n"
          }else{
            procedimientos += value
          }
      });

      packageEspecificATENCIONRN()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 
}

function packageEspecificATENCIONRN(){
    
  fetch(`${url}/get-trama-rn-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qRN++
          if(data.length != ctx){
               rn += value+"\n"
          }else{
            rn += value
          }
      });
      packageEspecificATENCIONSER()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 
}

function packageEspecificATENCIONSER(){
    
  fetch(`${url}/get-trama-ser-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qSER++
          if(data.length != ctx){
               ser += value+"\n"
          }else{
            ser += value
          }
      });
      packageEspecificATENCIONSMI()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 
}

//-----------------------

function getLastCorrelativeEspecific(){

  let mes= document.getElementById("inputGroupSelectProductionMonth2").value
  let anio = document.getElementById("inputGroupSelectYearSend2").value

  var correlative = '00000'
    
  fetch(`${url}/get-last-correlative/${anio}/${mes}`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
  
      let x = data[0].correlativo
     
      if(x != null){
        correlative = x
        setResumEspecific(correlative,anio,mes,0)
      }else{
        setResumEspecific(correlative,anio,mes,0)
      }
      
      
    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 

}

//--------------

function packageEspecificATENCIONSMI(){
    
  fetch(`${url}/get-trama-smi-especific`,{
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
  })
    .then(response => response.json())
    .then(data => {
      let ctx = 0
 
      data.forEach(e => {
          let value = e.items
          ctx++
          qSMI++
          if(data.length != ctx){
               smi += value+"\n"
          }else{
            smi += value
          }
      });

      getLastCorrelativeEspecific()

    }).catch(err => {
      
      console.log(err)
      enableButtonsError()
    }); 
}

function setResumEspecific(correlative,anio,mes){

  let codReanes = '00002698'
  let nZip = codReanes+anio+padNumber(mes)+nSend(correlative)+'.zip'

  let data = {
    anio: anio,
    mes : mes,
    nroEnvio: nSend(correlative),
    nZip : nZip,
    dni: dniResp,
    mesP: mes
  }

    fetch(`${url}/send-resum-debug/`, {
      method: 'POST', // o 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // data es un objeto con los datos a enviar
    })
    .then(response => response.json())
    .then(data => {
       if(data.length > 0){
        
        //GET RESUMEN
        getAtencionResumenDebugEspecific(anio,mes,nSend(correlative))
  
       }
    })
    .catch(error => {
      enableButtonsError()
      Swal.fire(
          'Oops!',
          'Se produjo un error',
          'warning'
        )
      console.error(error)
  });


}

function getAtencionResumenDebugEspecific(anio,mes,nEnvio){

  let month = document.getElementById("inputGroupSelectProductionMonth2").value 

  fetch(`${url}/get-trama-res-debug/${anio}/${mes}/${nEnvio}`,{
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
})
  .then(response => response.json())
  .then(data => {


    let nomPack = (data[0].NomPaquete).replace(/2023/g, anio.toString());

    res += anio+"\n"
    res += padNumber(month)+"\n"
    res += data[0].NroEnvio+"\n"
    res += nomPack+"\n"
    res += data[0].VersionGTI+"\n"
    res += qATE.toString()+"\n"
    res += qSMI.toString()+"\n"
    res += qDIA.toString()+"\n"
    res += qMED.toString()+"\n"
    res += qINS.toString()+"\n"
    res += qPRO.toString()+"\n"
    res += qSER.toString()+"\n"
    res += qRN.toString()+"\n"
    res += data[0].NomApp+"\n"
    res += data[0].VersApp+"\n"
    res += data[0].VersEnvio+"\n"
    res += data[0].IdResp+"\n"
    res += data[0].NroDoc+"\n"
 
    sendTrama(atencion,diagnostico,medicamentos,insumos,procedimientos,smi,ser,rn,res,data[0].NomPaquete,0)

    
  }).catch(err => {
    enableButtonsError()
    console.log(err)
    enableButtons()
  }); 

}

function showHideDiv(divId) {
  let div1 = document.getElementById("div-file-arfsis");
  let div2 = document.getElementById("div-table-fua-especific");
  let r1 = document.getElementById("rd1")
  let r2 =document.getElementById("rd2")
  if(divId == "div-file-arfsis"){
    div1.style = "display:block;"
    div2.style = "display:none;"
    r2.checked = false
  }else{
    div1.style = "display:none;"
    div2.style = "display:block;"
    r1.checked = false
  }
}


function leerArchivoExcel(archivo) {
  jsonArfsisObs = []
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: 'array' });
    var sheet_name_list = workbook.SheetNames;
    var dataJSON = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { header: 1 });
    
    // Filtrar solo las columnas de lote (columna 3) y fua (columna 4), empezando desde el segundo elemento
    for (var i = 1; i < dataJSON.length; i++) {
      var row = dataJSON[i];
      jsonArfsisObs.push(row[2] + '|' + row[3]);
    }
    
    console.log(jsonArfsisObs);
  };
  reader.readAsArrayBuffer(archivo);
}

// Selecciona el archivo y llama a la función para leerlo
document.getElementById('inputGroupFile01').onchange = function (e) {
  var archivo = e.target.files[0];
  leerArchivoExcel(archivo);
};

function downloadZip(){

  $('#modalDownload').modal('hide');
  let zip = document.getElementById("nameZip").innerHTML

  const urlDescarga = `${url}/descargar-archivo?name=${encodeURIComponent(zip)}`;
  window.location.href = urlDescarga;

}