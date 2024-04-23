var type = document.getElementById("selectFilters")

type.addEventListener('change', function handleChange(event) {
  let value = event.target.value
  
  if(value == 1){
    byName()
  }else if(value == 2){
    byFUA()
  }else if(value == 3){
    byAccount()
  }else{
    byDNI()
  }

})

function searchByFua(){

    
    let fua = document.getElementById("fua").value
    let lote = document.getElementById("lote").value

    if(fua != "" && lote != ""){
      fetch(`${url}/get-fua-by-num-and-lote/${fua}/${lote}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
    
        let x = data[0]
        document.getElementById("fuaNum").innerHTML = x.FuaDisa+"-"+x.FuaLote+"-"+x.FuaNumero
        document.getElementById("name").innerHTML = x.NombrePaciente
        document.getElementById("fechaAte").innerHTML = x.FuaAtencionFecha
        document.getElementById("cuenta").innerHTML = x.idCuentaAtencion
        document.getElementById("medico").innerHTML = (x.FuaMedico).toUpperCase()
        document.getElementById("digitador").innerHTML = x.NombreDigitador
        
      }).catch(err => {
        
        console.log(err)
        enableButtonsError()
      }); 
    }else{
      sweetAlert('info','Oops!','Complete los campos')
    }
  }

  function searchByAccount(){

    
    let account = document.getElementById("account").value
  
    if(account != ""){
      fetch(`${url}/get-fua-by-account/${account}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
    console.log(data)
        let x = data[0]
        document.getElementById("fuaNum").innerHTML = x.FuaDisa+"-"+x.FuaLote+"-"+x.FuaNumero
        document.getElementById("name").innerHTML = x.NombrePaciente
        document.getElementById("fechaAte").innerHTML = x.FuaAtencionFecha
        document.getElementById("cuenta").innerHTML = x.idCuentaAtencion
        document.getElementById("medico").innerHTML = (x.FuaMedico).toUpperCase()
        document.getElementById("digitador").innerHTML = x.NombreDigitador
        
      }).catch(err => {
        
        console.log(err)
        enableButtonsError()
      }); 
    }else{
      sweetAlert('info','Oops!','Complete los campos')
    }
  }
  

  function searchByFullname(){

    
    let ap = document.getElementById("ap").value
    let am = document.getElementById("am").value
    let fullname = document.getElementById("fullname").value
  
    if(ap != "" && am != "" && fullname != ""){
      fetch(`${url}/get-fua-by-fullname/${ap}/${am}/${fullname}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
  
        let ctx = 0
        //let x = data[0]
        $("#tbody").html(data.map((d) => {
          ctx++
                return `
                <tr style="cursor: pointer;">
                <td class="minText2">${ctx}</td>
                <td class="minText2">${d.NombrePaciente}</td>
                <td class="minText2">${d.FuaNumero}</td>
                <td class="minText2">${d.FuaLote}</td>
                <td class="minText2">${d.FuaAtencionFecha}</td>
                <td class="minText2">${d.idCuentaAtencion}</td>
                <td class="minText2">${d.FuaMedico}</td>
                <td class="minText2">${d.NombreDigitador}</td>
                </tr>`;
            })
            .join("")
        );
  
        
      }).catch(err => {
        
        console.log(err)
        enableButtonsError()
      }); 
    }else{
      sweetAlert('info','Oops!','Complete los campos')
    }
  }
  
  function searchByDni(){

    
    let dni = document.getElementById("dni").value
  
    if(dni != ""){
      fetch(`${url}/get-fua-by-dni/${dni}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
  
        let ctx = 0
        console.log(data)
        //let x = data[0]
        $("#tbody").html(data.map((d) => {
          ctx++
                return `
                <tr style="cursor: pointer;">
                <td class="minText2">${ctx}</td>
                <td class="minText2">${d.NombrePaciente}</td>
                <td class="minText2">${d.FuaNumero}</td>
                <td class="minText2">${d.FuaLote}</td>
                <td class="minText2">${d.FuaAtencionFecha}</td>
                <td class="minText2">${d.idCuentaAtencion}</td>
                <td class="minText2">${d.FuaMedico}</td>
                <td class="minText2">${d.NombreDigitador}</td>
                </tr>`;
            })
            .join("")
        );
  
        
      }).catch(err => {
        
        console.log(err)
        enableButtonsError()
      }); 
    }else{
      sweetAlert('info','Oops!','Complete los campos')
    }
  }
  

  function byName(){

    let x = `
    <div class="input-group-prepend">
              <span class="input-group-text">A.Paterno</span>
              </div>
              <input type="tel" class="form-control" id="ap">

              <div class="input-group-prepend">
              <span class="input-group-text">A.Materno</span>
              </div>
              <input type="text" class="form-control" id="am">

              <div class="input-group-prepend">
              <span class="input-group-text">Nombres</span>
              </div>
              <input type="text" class="form-control" id="fullname">
    `
    let type = `
    <div class="table-responsive">
      <table class="table table-hover table-bordered display" id="tb-data">
          <thead>
            <tr>
              <th scope="col"><center>#</center></th>
              <th scope="col"><center>Paciente</center></th>
              <th scope="col"><center>FUA</center></th>
              <th scope="col"><center>Lote</center></th>
              <th scope="col"><center>F.Ate(FUA)</center></th>
              <th scope="col"><center>N° de cuenta</center></th>
              <th scope="col"><center>Médico</center></th>
              <th scope="col"><center>Digitador</center></th>
            </tr>
          </thead>
          <tbody id="tbody">
          </tbody>
        </table>
      </div>
    `
    let btn = `<button class="btn btn-success" id="btn-query"
     onclick="searchByFullname()" style="font-weight: bold;"
      type="button"><i class="bi bi-search"></i>Consultar</button>`

    document.getElementById("content").innerHTML = ''
    document.getElementById("content").innerHTML = x
    document.getElementById("type-content").innerHTML = ''
    document.getElementById("type-content").innerHTML = type
    document.getElementById("btnType").innerHTML = ''
    document.getElementById("btnType").innerHTML = btn 
  }

  function byFUA(){

    let x = `
    <div class="input-group-prepend">
    <span class="input-group-text">FUA</span>
    </div>
    <input type="tel" class="form-control" id="fua">
    <div class="input-group-prepend">
    <span class="input-group-text">Lote</span>
    </div>
    <input type="tel" maxLength="2" class="form-control" id="lote">`
    let type = `
    <div class="card">
    <h2 class="card-header" id="name">PACIENTE</h2>
    <div class="card-body">
      <div style="display: flex; align-items: center;">
        <i class="bi bi-file-post fa-7x" style="margin-right: 1%;font-size: 80px;"></i>
        <div>
        <label style="display: flex;"><h5 class="card-title">FUA :</h5>&nbsp;<h5 class="card-title" style="color: blue;" id="fuaNum"></h5></label>
        <label style="display: flex;"><h5 class="card-title">Fecha de atencion (FUA) :</h5>&nbsp;<h5 class="card-title" style="color: blue;" id="fechaAte"></h5></label>
        <label style="display: flex;"><h5 class="card-title">N° de cuenta :</h5>&nbsp;<h5 class="card-title" style="color: blue;" id="cuenta"></h5></label>
        <label style="display: flex;"><h5 class="card-title">Médico :</h5>&nbsp;<h5 class="card-title" style="color: rgb(0, 107, 27);" id="medico"></h5></label>
        <label style="display: flex;"><h5 class="card-title">Digitador :</h5>&nbsp;<h5 class="card-title" style="color: rgb(212, 0, 0);" id="digitador"></h5></label>
        </div>
      </div>
      <p></p>
    </div>
  </div>
    `
    let btn = `<button class="btn btn-success" id="btn-query"
    onclick="searchByFua()" style="font-weight: bold;"
     type="button"><i class="bi bi-search"></i>Consultar</button>`

   document.getElementById("content").innerHTML = ''
   document.getElementById("content").innerHTML = x
   document.getElementById("type-content").innerHTML = ''
   document.getElementById("type-content").innerHTML = type
   document.getElementById("btnType").innerHTML = ''
   document.getElementById("btnType").innerHTML = btn 
  }

  function byAccount(){

    let x = `
    <div class="input-group-prepend">
    <span class="input-group-text">N° de cuenta</span>
    </div>
    <input type="number" class="form-control" id="account">`
    let type = `
    <div class="card">
    <h2 class="card-header" id="name">PACIENTE</h2>
    <div class="card-body">
      <div style="display: flex; align-items: center;">
        <i class="bi bi-file-post fa-7x" style="margin-right: 1%;font-size: 80px;"></i>
        <div>
        <label style="display: flex;"><h5 class="card-title">FUA :</h5>&nbsp;<h5 class="card-title" style="color: blue;" id="fuaNum"></h5></label>
        <label style="display: flex;"><h5 class="card-title">Fecha de atencion (FUA) :</h5>&nbsp;<h5 class="card-title" style="color: blue;" id="fechaAte"></h5></label>
        <label style="display: flex;"><h5 class="card-title">N° de cuenta :</h5>&nbsp;<h5 class="card-title" style="color: blue;" id="cuenta"></h5></label>
        <label style="display: flex;"><h5 class="card-title">Médico :</h5>&nbsp;<h5 class="card-title" style="color: rgb(0, 107, 27);" id="medico"></h5></label>
        <label style="display: flex;"><h5 class="card-title">Digitador :</h5>&nbsp;<h5 class="card-title" style="color: rgb(212, 0, 0);" id="digitador"></h5></label>
        </div>
      </div>
      <p></p>
    </div>
  </div>
    `
    let btn = `<button class="btn btn-success" id="btn-query"
    onclick="searchByAccount()" style="font-weight: bold;"
     type="button"><i class="bi bi-search"></i>Consultar</button>`

   document.getElementById("content").innerHTML = ''
   document.getElementById("content").innerHTML = x
   document.getElementById("type-content").innerHTML = ''
   document.getElementById("type-content").innerHTML = type
   document.getElementById("btnType").innerHTML = ''
   document.getElementById("btnType").innerHTML = btn 

  }

  function byDNI(){

    let x = `
    <div class="input-group-prepend">
    <span class="input-group-text">N° de DNI</span>
    </div>
    <input maxLength="8" onKeypress='if(event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;'  type="tel" maxLength="" class="form-control" id="dni">`
    let type = `
    <div class="table-responsive">
      <table class="table table-hover table-bordered display" id="tb-data">
          <thead>
            <tr>
              <th scope="col"><center>#</center></th>
              <th scope="col"><center>Paciente</center></th>
              <th scope="col"><center>FUA</center></th>
              <th scope="col"><center>Lote</center></th>              
              <th scope="col"><center>F.Ate(FUA)</center></th>
              <th scope="col"><center>N° de cuenta</center></th>
              <th scope="col"><center>Médico</center></th>
              <th scope="col"><center>Digitador</center></th>
            </tr>
          </thead>
          <tbody id="tbody">
          </tbody>
        </table>
      </div>
    `

     let btn = `<button class="btn btn-success" id="btn-query"
     onclick="searchByDni()" style="font-weight: bold;"
      type="button"><i class="bi bi-search"></i>Consultar</button>`

    document.getElementById("content").innerHTML = ''
    document.getElementById("content").innerHTML = x
    document.getElementById("type-content").innerHTML = ''
    document.getElementById("type-content").innerHTML = type
    document.getElementById("btnType").innerHTML = ''
    document.getElementById("btnType").innerHTML = btn 
  }

  function sweetAlert(type,title,message){
    Swal.fire(
      title,
      message,
      type
    )
  }