const { json } = require('express');
var express = require('express');
var router = express.Router();
const sql = require("../dboperation");
const path = require('path');
const puppeteer = require('puppeteer');
const { Console } = require('console');

var browser
var page 

var tableData = []
var productionData = []
var observedData = []
/* GET home page. */


router.get("/getdata_invoice_charge/:quantity", function (req, res, next) {
  let query = req.params.quantity 
  sql.getdata_invoice_charge(query).then((result) => {
    res.json(result[0]);
  });
});

router.get("/getdata_by_num_doc/:num", function (req, res, next) {
  let query = req.params.num 
  sql.getdata_by_num_doc(query).then((result) => {
    res.json(result[0]);
  });
});

router.get("/getdata_by_razon_social/:rs", function (req, res, next) {
  let query = req.params.rs 
  sql.getdata_by_razon_social(query).then((result) => {
    res.json(result[0]);
  });
});

router.get("/getdata_status_invoice", function (req, res, next) {
  sql.getdata_status_invoice().then((result) => {
    res.json(result[0]);
  });
});

router.get("/diagnosticos_procedimientos/:st/:id", function (req, res, next) {
  let anio = req.params.st;
	let mes = req.params.id;
  
  sql.diag_and_proc(anio,mes).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }

   
  });
});

router.get("/diagnosticos_procedimientos_codigo/:st/:id/:code", function (req, res, next) {
  let anio = req.params.st;
	let mes = req.params.id;
  let code = req.params.code;
  
  sql.diag_and_proc_by_code(anio,mes,code).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }

   
  });
});

router.get("/diagnosticos_procedimientos_nom/:st/:id/:nom", function (req, res, next) {
  let anio = req.params.st;
	let mes = req.params.id;
  let nom = req.params.nom;
  
  sql.diag_and_proc_by_name(anio,mes,nom).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});


router.post("/update_status_invoice/:st/:id", function (req, res, next) {
  let query = req.params.st
  let query2 = req.params.id
  sql.update_status_invoice(query,query2).then((result) => {
    res.send(result);
  });
});

router.get("/auth", function (req, res,next) {
  let username = req.body.user;
	let password = req.body.password;
  
  sql.auth(username,password).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }

   
  });
});

router.get("/insurance_report/:type/:init/:final", function (req, res,next) {
  let type = req.params.type;
	let init_month = req.params.init;
  let final_month = req.params.final;
  
  sql.insurance_report(type,init_month,final_month).then((result) => {

    res.json(result[0]);
   
  });
});

router.get("/status_atention/:i/:f", function (req, res,next) {
  let f_i = req.params.i;
  let f_f = req.params.f;

  sql.status_atention(f_i,f_f).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/status_atention_pro/:n", function (req, res,next) {
  let num_account = req.params.n;

  sql.status_atention_pro(num_account).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/production/:x/:y/:z", function (req, res,next) {
  let f_init = req.params.x;
  let f_fin = req.params.y;
  let font = req.params.z;

  sql.production(f_init,f_fin,font).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/production_ins_med/:x/:y", function (req, res,next) {
  let f_init = req.params.x;
  let f_fin = req.params.y;

  sql.production_ins_med(f_init,f_fin).then((result) => {
    if(result[0].length>0){

      let data = result[0]

      data.forEach(item => {
        if (!result[item.nro_formato]) {
          result[item.nro_formato] = {
            cuenta:item.cuenta,
            nro_formato: item.nro_formato,
            f_atencion:item.f_atencion,
            beneficiario:item.beneficiario,
            servicio:item.servicio,
            hist_clinica:item.hist_clinica,
            digitador:item.digitador,
            mes:item.mes,
            medico:item.medico,
            periodo:item.periodo,
            servicio:item.servicio,
            servicio_egreso:item.servicio_egreso,
            nombre_digitador:item.nombre_digitador,
            usuario:item.usuario,
            insumos: item.insumos,
            medicamentos: item.medicamentos
          };
        } else {
          result[item.nro_formato].insumos += '|' + item.insumos;
          result[item.nro_formato].medicamentos += '|' + item.medicamentos;
        }
      });
      
      let output = Object.values(result)
      let newArray = [...output]; // Copia el array original
      newArray.splice(0, 1);
      res.json(newArray);

    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/discharge_control/:x/:y/:z", function (req, res,next) {
  let f_init = req.params.x;
  let f_fin = req.params.y;
  let font = req.params.z

  sql.discharge_control(f_init,f_fin,font).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/discharge_control_with_procedures/:x/:y", function (req, res,next) {
  let f_init = req.params.x;
  let f_fin = req.params.y;

  sql.discharge_control_with_procedures(f_init,f_fin).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/affiliate/:nro", function (req, res,next) {
  let nroFormato = req.params.nro;

  sql.searchAffiliate(nroFormato).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/affiliate-by-name/:a/:b/:c", function (req, res,next) {
  let ap1 = req.params.a;
  let ap2 = req.params.b;
  let n = req.params.c;

  sql.searchAffiliateByName(ap1,ap2,n).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/affiliate-by-name-v2/:a/:b/:c/:d", function (req, res,next) {
  let ap1 = req.params.a;
  let ap2 = req.params.b;
  let n = req.params.c;
  let n2 = req.params.d;

  sql.searchAffiliateByNameV2(ap1,ap2,n,n2).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/trama-atencion/:a/:b/:c/:d", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;
  let mesP = req.params.c;
  let anioP = req.params.d;

  sql.tramaAtencion(fechaini,fechafin,mesP,anioP).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/trama-atencion-especificos/:c/:d", function (req, res,next) {
  let mesP = req.params.c;
  let anioP = req.params.d;

  sql.tramaAtencionEspecificos(mesP,anioP).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-trama-atencion/:a/:b/:c/:d", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;
  let mesP = req.params.c;
  let anioP = req.params.d;


  sql.getTramaAtencion(fechaini,fechafin,mesP,anioP).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-atencion-especific/:c/:d", function (req, res,next) {

  let mesP = req.params.c;
  let anioP = req.params.d;


  sql.getTramaAtencionEspecific(mesP,anioP).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});


router.get("/trama-diagnostico/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaDiagnostico(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/trama-diagnostico-especificos", function (req, res,next) {

  sql.tramaDiagnosticoEspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-diagnostico/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaDiagnostico(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-diagnosys-especific", function (req, res,next) {

  sql.getTramaDiagnosticoEspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
  });
});


router.get("/trama-medicamentos/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaMedicamentos(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/trama-medicamentos-especificos", function (req, res,next) {

  sql.tramaMedicamentosEspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-medicamentos/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaMedicamentos(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-med-especific", function (req, res,next) {

  sql.getTramaMedEspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
  });
});


router.get("/trama-insumos/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaInsumos(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/trama-insumos-especificos", function (req, res,next) {

  sql.tramaInsumosEspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-insumos/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaInsumos(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-trama-ins-especific", function (req, res,next) {

  sql.getTramaInsEspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
   
  });
});

router.get("/trama-procedimientos/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaProcedimientos(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/trama-procedimientos-especificos", function (req, res,next) {

  sql.tramaProcedimientosEspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-trama-procedimientos/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaProcedimientos(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-trama-pro-especific", function (req, res,next) {
  
  sql.getTramaProEspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
   
  });
});

router.get("/trama-smi/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaSMI(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
}); 


router.get("/trama-smi-especificos", function (req, res,next) {

  sql.tramaSMIEspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
}); 

router.get("/get-trama-smi/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaSMI(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-trama-smi-especific", function (req, res,next) {

  sql.getTramaSMIEspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
  });
});

router.get("/trama-ser/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaSER(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/trama-ser-especificos", function (req, res,next) {

  sql.tramaSEREspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});


router.get("/get-trama-ser/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaSER(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-trama-ser-especific", function (req, res,next) {

  sql.getTramaSEREspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
   
  });
});

router.get("/trama-rn/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.tramaRN(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{error:"sin datos"}])
    }
   
  });
});

router.get("/trama-rn-especificos", function (req, res,next) {

  sql.tramaRNEspecificos().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{error:"sin datos"}])
    }
   
  });
});

router.get("/get-trama-rn/:a/:b", function (req, res,next) {
  let fechaini = req.params.a;
  let fechafin = req.params.b;

  sql.getTramaRN(fechaini,fechafin).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{error:"sin datos"}])
    }
   
  });
});

router.get("/get-trama-rn-especific", function (req, res,next) {

  sql.getTramaRNEspecific().then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json(result[0]);
      console.log("sin datos")
    }
   
  });
});

router.get("/get-last-correlative/:a/:b", function (req, res,next) {
  let anio = req.params.a;
  let mes = req.params.b;

  sql.getLastCorrelative(anio,mes).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.post("/send-resum", function (req, res,next) {

  const data = req.body
  const anio = data.anio
  const mes = data.mes
  const nroEnvio = data.nroEnvio
  const nZip = data.nZip
  const dni = data.dni
  const mesP = data.mesP

  sql.setTramaRESUMEN(anio,mes,nroEnvio,nZip,dni,mesP).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});


router.post("/send-resum-debug", function (req, res,next) {

  const data = req.body
  const anio = data.anio
  const mes = data.mes
  const nroEnvio = data.nroEnvio
  const nZip = data.nZip
  const dni = data.dni
  const mesP = data.mesP
  let year = new Date().getFullYear().toString()

  sql.setTramaRESUMENDEBUG(anio,mes,nroEnvio,nZip,dni,mesP,year).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.post("/update-sis-afiliation", function (req, res,next) {

  const data = req.body
  sql.updateSisFiliacion(data)
  .then(() => {
    res.json({ success: "insertado" });
  })
  .catch((error) => {
    console.error("Error al insertar los valores:", error);
    res.status(500).json({ success: "error" });
  });

});


router.get("/get-trama-res/:a/:b/:c", function (req, res,next) {
  let anio = req.params.a;
  let mes = req.params.b;
  let nenvio = req.params.c

  sql.getTramaRes(anio,mes,nenvio).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-trama-res-debug/:a/:b/:c", function (req, res,next) {
  let anio = req.params.a;
  let mes = req.params.b;
  let nenvio = req.params.c

  sql.getTramaResDebug(anio,mes,nenvio).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.post("/send-trama", function (req, res,next) {

  const data = req.body;

  sql.sendTrama(data).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.post("/send-trama-debug", async function (req, res, next) {
  const data = req.body;
  try {
    const result = await sql.sendTramaDebug(data);
    if (result[0].length > 0) {
      res.json(result[0]);
    } else {
      res.json({ error: "sin datos" });
    }
  } catch (error) {
    console.error("Error sending trama:", error);
    res.status(500).json({ error: "Error sending trama" });
  }
});

router.get("/get-afiliate-web-service", async function (req, res, next) {
  //const data = req.body;
  try {
    const result = await sql.getAfiliateWebService();
    if (result[0].length > 0) {
      res.json(result[0]);
    } else {
      res.json({ error: "sin datos" });
    }
  } catch (error) {
    console.error("Error web service:", error);
    res.status(500).json({ error: "Error get auth" });
  }
});


router.get("/get-afiliate-arfsis/:a/:b", async function (req, res, next) {
  const type = req.params.a;
  const nro = req.params.b;

  try {
      const result = await sql.getAfiliateArfsisWeb(type, nro);
      res.json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los afiliados de ARFSIS.' });
  }
});


router.get("/get-afiliate-web-service-data/:a/:b/:c/:d", async function (req, res, next) {
  //const data = req.body;
  let auth = req.params.a;
  let disa = req.params.b;
  let tipo = req.params.c;
  let num = req.params.d;
  try {
    const result = await sql.getAfiliateWebServiceData(auth,disa,tipo,num);
    if (result[0].length > 0) {
      res.json(result[0]);
    } else {
      res.json({ error: "sin datos" });
    }
  } catch (error) {
    console.error("Error web service:", error);
    res.status(500).json({ error: "Error get auth" });
  }
});

router.get("/get-fua-by-num-and-lote/:a/:b", function (req, res,next) {
  let fua = req.params.a;
  let lote = req.params.b;

  sql.getFuaByNumAndLote(fua,lote).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-fua-by-account/:a", function (req, res,next) {
  let num = req.params.a;

  sql.getFuaByAccount(num).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

router.get("/get-fua-by-dni/:a", function (req, res,next) {
  let dni = req.params.a;

  sql.getFuaByDNI(dni).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/get-fua-by-fullname/:a/:b/:c", function (req, res,next) {
  let ap = req.params.a;
  let am = req.params.b;
  let name = req.params.c;

  sql.getFuaByFullname(ap,am,name).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/get-employee/:a", function (req, res,next) {
  let dni = req.params.a;

  sql.getEmployee(dni).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.post("/excludes", function (req, res, next) {
  const { values } = req.body;

  sql.setExcludes(values)
    .then(() => {
      res.json({ success: "insertado" });
    })
    .catch((error) => {
      console.error("Error al insertar los valores:", error);
      res.status(500).json({ success: "error" });
    });
});

router.post("/includes", function (req, res, next) {
  const { values } = req.body;

  sql.setIncludes(values)
    .then(() => {
      res.json({ success: "insertado" });
    })
    .catch((error) => {
      console.error("Error al insertar los valores:", error);
      res.status(500).json({ success: "error" });
    });
});

router.get("/saludpol/:a/:b", function (req, res,next) {
  let f1 = req.params.a;
  let f2 = req.params.b;

  sql.constructTramaSaludpol(f1,f2).then((result) => {

    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/saludpol-excludes/:a/:b", function (req, res,next) {
  let f1 = req.params.a;
  let f2 = req.params.b;

  sql.constructTramaSaludpolExcludes(f1,f2).then((result) => {

    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/saludpol-excludes-and-includes/:a/:b", function (req, res,next) {
  let f1 = req.params.a;
  let f2 = req.params.b;

  sql.constructTramaSaludpolExcludesAndIncludes(f1,f2).then((result) => {

    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/saludpol-includes/:a/:b", function (req, res,next) {
  let f1 = req.params.a;
  let f2 = req.params.b;

  sql.constructTramaSaludpolIncludes(f1,f2).then((result) => {

    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/trama-saludpol", function (req, res,next) {

  sql.generateTramaSaludpol().then((result) => {

    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/get-atention-saludpol/:a", function (req, res,next) {

  let account = req.params.a

  sql.getAtentionSaludpol(account).then((result) => {

    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.get("/get-fua-diagnosys/:a", function (req, res,next) {

  let account = req.params.a

  sql.getFuaDiagnosys(account).then((result) => {
    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-employee-by-user/:a/:b", function (req, res,next) {
  let dni = req.params.a;
  let user = req.params.b;

  sql.getEmployee(dni,user).then((result) => {

    if(result[0].length>0){
      let type = {
        content : getTypeUser(result[0][0].IdTipoEmpleado,user)
      }

      for (let i = result.length - 1; i >= 1; i--) {
        result[i + 1] = result[i];
      }

      result[1] = type;

      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  
  });
});

router.post("/create-user", function (req, res,next) {

  const data = req.body;
  const idEmpleado = data.IdEmpleado
  const ApellidoPaterno = data.ApellidoPaterno
  const ApellidoMaterno = data.ApellidoMaterno
  const Nombres = data.Nombres
  const IdCondicionTrabajo = data.IdCondicionTrabajo
  const IdTipoEmpleado = data.IdTipoEmpleado
  const DNI = data.DNI
  const CodigoPlanilla = data.CodigoPlanilla
  const FechaIngreso = data.FechaIngreso
  const FechaRegistroHerramienta = data.FechaRegistroHerramienta
  const Usuario = data.Usuario
  const ClaveSisHerramientas = data.ClaveSisHerramientas
  const ReniecAutorizado = data.ReniecAutorizado
  const idTipoDocumento = data.idTipoDocumento
  const idTipoSexo = data.idTipoSexo
  const TipoEmpleado = data.Descripcion
 

  sql.setUser(idEmpleado,ApellidoPaterno,ApellidoMaterno,Nombres,IdCondicionTrabajo,IdTipoEmpleado,DNI,CodigoPlanilla,FechaIngreso,FechaRegistroHerramienta,Usuario,ClaveSisHerramientas,ReniecAutorizado,idTipoDocumento,idTipoSexo,TipoEmpleado).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
   
  });
});

function getTypeUser(value,user){

  let x = ''

  if(value == 102){
    x = `
    
    <div class="sidebar">
      <div class="logo-details">
        <i class='bx bxs-ambulance' ></i>
        <span style="font-size: 18px;margin-left: -12px;" class="logo_name">Herramientas SIS</span>
      </div>
  
      <ul class="nav-links" id="links">
  
        <li>
          <a href="#inicio">
            <i class='bx bx-grid-alt' ></i>
            <span class="link_name">Inicio</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#inicio">Inicio</a></li>
          </ul>
        </li>

        <li>
        <a href="#auditoria">
                 <i class='bx bx-show'></i>
          <span class="link_name">Auditoría</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#auditoria">Auditoría</a></li>
        </ul>
      </li>
  
        <li>
          <a href="#arfsis">
          <i class='bx bxs-analyse'></i>
            <span class="link_name">Arfsis</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#arfsis">Arfsis web</a></li>
          </ul>
        </li>
  
        <li>
          <a href="#afiliados">
            <i class='bx bxs-vector'></i>
            <span class="link_name">Afiliados</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#afiliados">Afiliados</a></li>
          </ul>
        </li>
  
        <li>
        <a href="#catalogo">
        <i class='bx bx-folder-open'></i>
          <span class="link_name">Catalogo</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#catalogo">Catalogo</a></li>
        </ul>
      </li>

      
      <li>
      <div class="iocn-link">
        <a>
          <i class='bx bx-collection' ></i>
          <span class="link_name">Caja</span>
        </a>
        <i class='bx bxs-chevron-down arrow' ></i>
      </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Caja</a></li>
          <li><a href="#estado_comprobante">Estado de comprobantes</a></li>
        </ul>
      </li>


        <li>
          <div class="iocn-link">
            <a>
              <i class='bx bx-file'></i>
              <span class="link_name">Digitación</span>
            </a>
            <i class='bx bxs-chevron-down arrow' ></i>
          </div>
          <ul class="sub-menu">
            <li><a class="link_name" href="#">Digitación</a></li>
            <li><a href="#fua_analysis">Análisis de FUA</a></li>
            <li><a href="#fua_correcion">Correción de FUA</a></li>
          </ul>
        </li>
  

        <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-line-chart'></i>
            <span class="link_name">Indicadores</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Indicadores</a></li>
          <li><a href="#indicadores">Estadísticas globales</a></li>
          <li><a href="#estadisticas-atenciones">Atenciones</a></li>
          <li><a href="#estadisticas-caja">Caja</a></li>
        </ul>
      </li>

      <li>
      <div class="iocn-link">
        <a>
          <i class='bx bxs-bookmarks'></i>
          <span class="link_name">Historias</span>
        </a>
        <i class='bx bxs-chevron-down arrow' ></i>
      </div>
      <ul class="sub-menu">
        <li><a class="link_name">Historias</a></li>
        <li><a href="#actualizacion-historia">Actualizacion</a></li>
      </ul>
    </li>
      
      
        <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-objects-vertical-bottom'></i>
            <span class="link_name">Reportes</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Reportes</a></li>
          <li><a href="#reporte_seguros">Reporte de seguros SOAT</a></li>
          <li><a href="#produccion">Producción</a></li>
          <li><a href="#produccion_ins_med">Producción con ins y med.</a></li>
        </ul>
      </li>
  
      <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-clipboard'></i>
            <span class="link_name">Atenciones</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Atenciones</a></li>
          <li><a href="#control_altas">Control de altas</a></li>
          <li><a href="#control_altas_cpt">Control de altas CPT</a></li>
          <li><a href="#estado_atencion">Estado de atenciones</a></li>
          <li><a href="#diag_proc">Diagnosticos y Proced.</a></li>
        </ul>
      </li>
  
      <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-label'></i>
            <span class="link_name">Tramas</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Tramas</a></li>
          <li><a href="#trama_sis">Trama SIS</a></li>
          <li><a href="#trama_saludpol">Trama Saludpol</a></li>
        </ul>
      </li>
  
       <li>
      <div class="profile-details">
        <div class="profile-content">
        <i onclick="logout()" class='bx bx-log-out'></i>
          <img src="/image/profile.jpg" alt="profileImg">
        </div>
        <div class="name-job">
        <div id="nameuser" class="profile_name">Nombre de usuario</div>
        <div id="typeuser" class="job">Tipo de usuario</div>
        </div>
 
      </div>
    </li>

  </ul>
  
  
    </div>
    <section class="home-section">
      <div class="home-content">
        <i class='bx bx-menu' ></i>
      </div>
  
      <div class="myContent">
      </div>
    </section>

    `
  }
  else if(value == 212){
    x = `
    
    <div class="sidebar">
      <div class="logo-details">
        <i class='bx bxs-ambulance' ></i>
        <span style="font-size: 18px;margin-left: -12px;" class="logo_name">Herramientas SIS</span>
      </div>
  
      <ul class="nav-links" id="links">
  
        <li>
          <a href="#inicio">
            <i class='bx bx-grid-alt' ></i>
            <span class="link_name">Inicio</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#inicio">Inicio</a></li>
          </ul>
        </li>
  
        <li>
          <a href="#afiliados">
            <i class='bx bxs-vector'></i>
            <span class="link_name">Afiliados</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#afiliados">Afiliados</a></li>
          </ul>
        </li>

        <li>
        <a href="#auditoria">
              <i class='bx bx-show'></i>
          <span class="link_name">Auditoría</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#auditoria">Auditoría</a></li>
        </ul>
      </li>

        <li>
        <a href="#arfsis">
        <i class='bx bxs-analyse'></i>
          <span class="link_name">Arfsis</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#arfsis">Arfsis web</a></li>
        </ul>
      </li>

      <li>
          <div class="iocn-link">
            <a>
              <i class='bx bx-collection' ></i>
              <span class="link_name">Caja</span>
            </a>
            <i class='bx bxs-chevron-down arrow' ></i>
          </div>
          <ul class="sub-menu">
            <li><a class="link_name" href="#">Caja</a></li>
            <li><a href="#estado_comprobante">Estado de comprobantes</a></li>
          </ul>
        </li>

        <li>
          <div class="iocn-link">
            <a>
              <i class='bx bx-file'></i>
              <span class="link_name">Digitación</span>
            </a>
            <i class='bx bxs-chevron-down arrow' ></i>
          </div>
          <ul class="sub-menu">
            <li><a class="link_name" href="#">Digitación</a></li>
            <li><a href="#fua_analysis">Análisis de FUA</a></li>
            <li><a href="#fua_correcion">Correción de FUA</a></li>
          </ul>
        </li>

        <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-line-chart'></i>
            <span class="link_name">Indicadores</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Indicadores</a></li>
          <li><a href="#indicadores">Estadísticas globales</a></li>
          <li><a href="#estadisticas-atenciones">Atenciones</a></li>
          <li><a href="#estadisticas-caja">Caja</a></li>
        </ul>
      </li>


      <li>
      <div class="iocn-link">
        <a>
          <i class='bx bxs-bookmarks'></i>
          <span class="link_name">Historias</span>
        </a>
        <i class='bx bxs-chevron-down arrow' ></i>
      </div>
      <ul class="sub-menu">
        <li><a class="link_name">Historias</a></li>
        <li><a href="#actualizacion-historia">Actualizacion</a></li>
      </ul>
    </li>
      
        <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-objects-vertical-bottom'></i>
            <span class="link_name">Reportes</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Reportes</a></li>
          <li><a href="#reporte_seguros">Reporte de seguros SOAT</a></li>
          <li><a href="#produccion">Producción</a></li>
          <li><a href="#produccion_ins_med">Producción con ins y med.</a></li>
        </ul>
      </li>
  
      <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-clipboard'></i>
            <span class="link_name">Atenciones</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Atenciones</a></li>
          <li><a href="#control_altas">Control de altas</a></li>
          <li><a href="#control_altas_cpt">Control de altas CPT</a></li>
          <li><a href="#estado_atencion">Estado de atenciones</a></li>
          <li><a href="#diag_proc">Diagnosticos y Proced.</a></li>
        </ul>
      </li>
  
      <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-label'></i>
            <span class="link_name">Tramas</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Tramas</a></li>
          <li><a href="#trama_sis">Trama SIS</a></li>
          <li><a href="#trama_saludpol">Trama Saludpol</a></li>
        </ul>
      </li>
  
       <li>
      <div class="profile-details">
        <div class="profile-content">
        <i onclick="logout()" class='bx bx-log-out'></i>
          <img src="/image/profile.jpg" alt="profileImg">
        </div>
        <div class="name-job">
        <div id="nameuser" class="profile_name">Nombre de usuario</div>
        <div id="typeuser" class="job">Tipo de usuario</div>
        </div>
    </li>


  </ul>
  
  
    </div>
    <section class="home-section">
      <div class="home-content">
        <i class='bx bx-menu' ></i>
      </div>
  
      <div class="myContent">
      </div>
    </section>

    `
  }else if(user == "lazparrin"){
    x = `
    
    <div class="sidebar">
      <div class="logo-details">
        <i class='bx bxs-ambulance' ></i>
        <span style="font-size: 18px;margin-left: -12px;" class="logo_name">Herramientas SIS</span>
      </div>
  
      <ul class="nav-links" id="links">
  
        <li>
          <a href="#inicio">
            <i class='bx bx-grid-alt' ></i>
            <span class="link_name">Inicio</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#inicio">Inicio</a></li>
          </ul>
        </li>
  

        <li>
          <a href="#afiliados">
            <i class='bx bxs-vector'></i>
            <span class="link_name">Afiliados</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#afiliados">Afiliados</a></li>
          </ul>
        </li>
  
  
        <li>
          <a href="#">
          <i class='bx bx-folder-open'></i>
            <span class="link_name">Catalogo</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#">Catalogo</a></li>
          </ul>
        </li>

  
       <li>
      <div class="profile-details">
        <div class="profile-content">
          <i onclick="logout()" class='bx bx-log-out'></i>
          <img src="/image/profile.jpg" alt="profileImg">
        </div>
        <div class="name-job">
        <div id="nameuser" class="profile_name">Nombre de usuario</div>
        <div id="typeuser" class="job">Tipo de usuario</div>
        </div>
      </div>
    </li>
  </ul>
  
  
    </div>
    <section class="home-section">
      <div class="home-content">
        <i class='bx bx-menu' ></i>
      </div>
  
      <div class="myContent">
      </div>
    </section>

    `
  }
  else if(value == 41){
    x = `
    
    <div class="sidebar">
      <div class="logo-details">
        <i class='bx bxs-ambulance' ></i>
        <span style="font-size: 18px;margin-left: -12px;" class="logo_name">Herramientas SIS</span>
      </div>
  
      <ul class="nav-links" id="links">
  
        <li>
          <a href="#inicio">
            <i class='bx bx-grid-alt' ></i>
            <span class="link_name">Inicio</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#inicio">Inicio</a></li>
          </ul>
        </li>
  
        <li>
          <div class="iocn-link">
            <a>
              <i class='bx bx-file'></i>
              <span class="link_name">Digitación</span>
            </a>
            <i class='bx bxs-chevron-down arrow' ></i>
          </div>
          <ul class="sub-menu">
            <li><a class="link_name" href="#">Digitación</a></li>
            <li><a href="#fua_analysis">Análisis de FUA</a></li>
            <li><a href="#fua_correcion">Correción de FUA</a></li>
          </ul>
        </li>


      <li>
        <div class="iocn-link">
          <a>
            <i class='bx bx-label'></i>
            <span class="link_name">Tramas</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name">Tramas</a></li>
          <li><a href="#trama_sis">Trama SIS</a></li>
          <li><a href="#trama_saludpol">Trama Saludpol</a></li>
        </ul>
      </li>
  
       <li>
      <div class="profile-details">
        <div class="profile-content">
        <i onclick="logout()" class='bx bx-log-out'></i>
          <img src="/image/profile.jpg" alt="profileImg">
        </div>
        <div class="name-job">
        <div id="nameuser" class="profile_name">Nombre de usuario</div>
        <div id="typeuser" class="job">Tipo de usuario</div>
        </div>
    </li>
  </ul>
  
  
    </div>
    <section class="home-section">
      <div class="home-content">
        <i class='bx bx-menu' ></i>
      </div>
  
      <div class="myContent">
      </div>
    </section>

    `
  }
  
  else{
    x = `
   
    <div class="sidebar">
      <div class="logo-details">
        <i class='bx bxs-ambulance' ></i>
        <span style="font-size: 18px;margin-left: -12px;" class="logo_name">Herramientas SIS</span>
      </div>
 

    </div>
    <section class="home-section">
      <div class="home-content">
        <i class='bx bx-menu' ></i>
      </div>
  
      <div><center>
      <H1 style="margin-top:10%;">Módulos en mantenimiento</H1>
      
      <div class="form__group" style="margin-top: 10px;">
      <button style="cursor: pointer;" onclick="logout()" id="btn-login" class="btn-login">&nbsp;Cerrar sesión &nbsp;</button>
      </div>

      </center>
      </div>
    </section>
    `
  }

  return x

}


router.post("/get-package-trama/:a/:b/:c", function (req, res,next) {
  let anio = req.params.a;
  let month = req.params.b;
  let n_send = req.params.c;

    sql.getPackageTrama(anio,month,n_send).then((result) => {

      res.send(result);
  });
});

router.get("/report-saludpol/:a", function (req, res,next) {
  let account = req.params.a;

  sql.production_saludpol(account).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-id-procedure", function (req, res,next) {

  let d = req.body
  let account = d.account
  let procedure = d.name

  sql.id_procedure(account,procedure).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-id-laboratory", function (req, res,next) {
  
  let d = req.body
  let account = d.account
  let procedure = d.name

  sql.id_laboratory(account,procedure).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-id-image", function (req, res,next) {
  const data = req.body
  const account = data.account;
  const procedure =data.image;

  sql.id_image(account,procedure).then((result) => {

    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/update-quantity-procedure/:a/:b/:c", function (req, res,next) {
  let quantity = req.params.a;
  let id_product = req.params.b;
  let id_order = req.params.c;

  sql.update_quantity_procedure(quantity,id_product,id_order).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/update-dni-patient/:a/:b", function (req, res,next) {
  let dni = req.params.a;
  let id_patient = req.params.b;
  
  sql.update_dni_patient(dni,id_patient).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/update-gender-patient/:a/:b", function (req, res,next) {
  let gender = req.params.a;
  let id_patient = req.params.b;
  
  sql.update_gender_patient(gender,id_patient).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/update-gender-patient-fua/:a/:b/:c", function (req, res,next) {
 
  let cuenta = req.params.a;
  let id_patient = req.params.b;
  let gender = req.params.c;
  
  sql.update_gender_patient_fua(cuenta,gender,id_patient).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/update-date-atention/:a/:b/:c", function (req, res,next) {
  
  let account = req.params.a;
  let date1 = req.params.b;
  let date2 = req.params.c;
  
  sql.update_date_atention(account,date1,date2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/update-nro-ref-origin/:a/:b", function (req, res,next) {
  
  let atencion = req.params.a;
  let nro = req.params.b;
  
  sql.update_nro_ref_origin(atencion,nro).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/update-num-paper-reference/:a/:b", function (req, res,next) {
  
  let idCuentaAtencion = req.params.a;
  let nro = req.params.b;
  
  sql.updatePaperNumReference(idCuentaAtencion,nro).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});


router.get("/get-data-medic/:a", function (req, res,next) {
  
  let account = req.params.a;
 
  sql.get_data_medic(account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/get-data-validate-catalog/:a/:b", function (req, res,next) {
  
  let lote = req.params.a;
  let fua = req.params.b;
 
  sql.get_data_validate_catalog(lote,fua).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});


router.post("/update-dni-digitador", function (req, res,next) {
  
  let account = req.body.account;
  let dni = req.body.dni;
  
  console.log(account+" "+dni)

  sql.update_dni_digitador(account,dni).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/delete-procedure-saludpol/:a/:b/:c", function (req, res,next) {
  
  let orden = req.params.a;
  let idProducto = req.params.b;
  let account = req.params.c;
 
  sql.delete_procedure_saludpol(orden,idProducto,account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/delete-laboratory-saludpol/:a/:b/:c", function (req, res,next) {
  
  let orden = req.params.a;
  let idProducto = req.params.b;
  let account = req.params.c;
 
  sql.delete_laboratory_saludpol(orden,idProducto,account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/delete-images-saludpol/:a/:b/:c", function (req, res,next) {
  
  let orden = req.params.a;
  let idProducto = req.params.b;
  let account = req.params.c;
 
  sql.delete_images_saludpol(orden,idProducto,account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});


router.get("/search-procedure/:a", function (req, res, next) {
  let name = req.params.a 
  sql.search_procedure(name).then((result) => {
    res.json(result[0]);
  });
});

router.get("/search-procedure-by-code/:a", function (req, res, next) {
  let code = req.params.a 
  sql.search_procedure_by_code(code).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/insert-procedure-saludpol", function (req, res,next) {
  
  let data = req.body

  sql.add_procedure_saludpol(data).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.post("/insert-laboratory-saludpol", function (req, res,next) {
  
  let data = req.body

  sql.add_laboratory_saludpol(data).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.post("/insert-mov-laboratory-saludpol", function (req, res,next) {
  
  let data = req.body

  sql.add_mov_laboratory_saludpol(data).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.post("/insert-mov-images-saludpol", function (req, res,next) {
  
  let data = req.body

  sql.add_mov_images_saludpol(data).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/search-fua-by-num-size/:a/:b", function (req, res, next) {
  let size = req.params.a 
  let fua = req.params.b
  sql.search_fua_by_num_and_size(size,fua).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/search-medic-fua/:a", function (req, res, next) {
  let ap = req.params.a 
  sql.search_medic_fua(ap).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-medic-fua", function (req, res,next) {
  
  let d = req.body

  sql.update_medic_fua(d.dni,d.medic,d.type_doc,d.type_medic,d.fua,d.lote).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/get-sub-diagnosys/:a", function (req, res, next) {
  let type = req.params.a 
  sql.get_sub_diagnosys(type).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/get-diagnosys/:a", function (req, res, next) {
  let diagnosys = req.params.a 
  sql.get_diagnosys(diagnosys).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/insert-diagnosys-saludpol", function (req, res,next) {
  
  let d = req.body

  let IdAtencion = d.IdAtencion
  let IdClasificacionDx = d.IdClasificacionDx
  let IdDiagnostico = d.IdDiagnostico
  let IdSubclasificacionDx = d.IdSubclasificacionDx
  let labConfHIS = d.labConfHIS
  let GrupoHIS = d.GrupoHIS
  let SubGrupoHIS = d.SubGrupoHIS
  let labConfHIScodigo = d.labConfHIScodigo
  let idServicio = d.idServicio
  let IdUsuario = d.IdUsuario
  let NroEvaluacion = d.NroEvaluacion

  sql.insert_diagnosys_saludpol(IdAtencion,
    IdClasificacionDx,
    IdDiagnostico,
    IdSubclasificacionDx,
    labConfHIS,
    GrupoHIS,
    SubGrupoHIS,
    labConfHIScodigo,
    idServicio,
    IdUsuario,
    NroEvaluacion).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/delete-diagnosys/:a/:b", function (req, res, next) {
  let IdDiagnosys = req.params.a 
  let IdAtention = req.params.b
  sql.delete_diagnosys_saludpol(IdDiagnosys,IdAtention).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/delete-diagnosys-fua/:a/:b", function (req, res, next) {
  let id = req.params.a 
  let account = req.params.b
  sql.deleteDiagnosysFua(id,account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/get-graph/:a", function (req, res, next) {
  let year = req.params.a 
  sql.get_graph(year).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/get-graph-box/:a", function (req, res, next) {
  let year = req.params.a 
  sql.get_graph_box(year).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/search-service/:a", function (req, res, next) {
  let service = req.params.a 
  sql.search_service(service).then((result) => {
    res.json(result[0]);
  });
});

router.get("/update-service-in/:a/:b", function (req, res, next) {
  let idService = req.params.a 
  let account = req.params.b 
  sql.update_service_in(idService,account).then((result) => {
    res.json(result[0]);
  });
});

router.get("/update-service-out/:a/:b", function (req, res, next) {
  let idService = req.params.a 
  let account = req.params.b 
  sql.update_service_out(idService,account).then((result) => {
    res.json(result[0]);
  });
});

router.get("/get-type-finance", function (req, res, next) {
  sql.get_type_finance().then((result) => {
    res.json(result[0]);
  });
});

router.get("/get-all-users", function (req, res, next) {
  sql.getAllUsers().then((result) => {
    res.json(result[0]);
  });
});

router.post("/update-dx-med-ins", function (req, res,next) {
  
  let d = req.body

  let idReceta = d.idReceta
  let idItem = d.idItem
  let dx = d.dx


  sql.update_dx_med_ins(idReceta,idItem,dx).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({success:"error"})
    }
  });
});

router.get("/update-cod-ate-fua/:a/:b", function (req, res, next) {
  let account = req.params.a 
  let cod = req.params.b
  sql.update_cod_ate_fua(account,cod).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/value-production-atention/:a/:b/:c", function (req, res, next) {
  let account = req.params.a 
  let ff = req.params.b
  let nf = req.params.c
  sql.value_production_account(account,ff,nf).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/update-type-atention-fua/:a/:b", function (req, res, next) {
  let type = req.params.a 
  let account = req.params.b
  sql.update_type_atention_fua(type,account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/update-dni-patient-fua/:a/:b/:c/:d", function (req, res, next) {
  let type = req.params.a 
  let dni = req.params.b
  let account = req.params.c
  let idpaciente = req.params.d
  sql.update_dni_fua(type,dni,account,idpaciente).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/query-no-atention/:a", function (req, res, next) {
  let account = req.params.a 
  sql.queryAtentionSaludpol(account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/update-date-atention-saludpol/:a/:b/:c/:d/:e", function (req, res, next) {
  let account = req.params.a 
  let f1 = req.params.b 
  let h1 = req.params.c 
  let f2 = req.params.d 
  let h2 = req.params.e 
  sql.updateDateAtentionSaludpol(account,f1,f2,h1,h2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-date-birth-patient", function (req, res, next) {
 
  let v = req.body
  let birth = v.date
  let id = parseInt(v.idPatient)
  console.log(v)

  sql.updateDateBirthPatient(id,birth).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-date-pregnancy", function (req, res, next) {
 
  let v = req.body
  let preg = v.date
  let sm = v.sm
  let id = parseInt(v.idCuentaAtencion)
  console.log(v)

  sql.update_date_pregnancy(id,preg,sm).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-num-ipress", function (req, res, next) {
 
  let v = req.body
  let ipress = v.ipress
  let id = parseInt(v.idCuentaAtencion)

  sql.updateReferenceIpress(id,ipress).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-num-paper-reference", function (req, res, next) {
 
  let v = req.body
  let numPaper = v.numPaper
  let id = parseInt(v.idCuentaAtencion)

  sql.updateNumPaperReference(id,numPaper).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/update-date-null-pregnancy/:a", function (req, res, next) {
  let account = req.params.a 
  sql.dateNullPregnancy(account).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/add-afiliate", function (req, res, next) {
 
  let data = req.body
  sql.addAfiliate(data).then((result) => {
    if(result[0].success == 'actualizado'){
      res.json([{success:"actualizado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-afiliate", function (req, res, next) {
 
  let data = req.body
  sql.updateAfiliate(data).then((result) => {
    if(result[0].success == 'actualizado'){
      res.json([{success:"actualizado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});


router.post("/update-fullname-patient", function (req, res, next) {
 
  let data = req.body
  sql.updateFullNamePatient(data).then((result) => {
    if(result[0].success == 'actualizado'){
      res.json([{success:"actualizado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/delete-afiliate/:a", function (req, res, next) {
 
  let idSiasis = req.params.a 
  sql.deleteAfiliate(idSiasis).then((result) => {
    if(result[0].success == 'eliminado'){
      res.json([{success:"eliminado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.get("/update-siasis-ate/:a/:b", function (req, res, next) {
 
  let idCuentaAtencion = req.params.a
  let idSiasis = req.params.b
  sql.updateSiasisAte(idCuentaAtencion,idSiasis).then((result) => {
    if(result[0].success == 'actualizado'){
      res.json([{success:"actualizado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/get-audit-by-date", function (req, res,next) {

  let data = req.body
  let f1 = data.date1+' 00:00'
  let f2 = data.date2+' 23:59'
  console.log(data)

  sql.getAuditByDates(f1,f2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-audit-by-date-and-user", function (req, res,next) {

  let data = req.body
  let f1 = data.date1+' 00:00'
  let f2 = data.date2+' 23:59'
  let empleado = data.empleado
  console.log(data)

  sql.getAuditByDatesAndUser(f1,f2,empleado).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-detail-audit", function (req, res,next) {

  let data = req.body
  let account = data.account
  let user = data.user

  sql.getDetailAudit(account,user).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/delete-all-smi", function (req, res, next) {
 
  let data = req.body
  let account = data.account
  sql.deleteSMIAll(account).then((result) => {
    if(result[0].success == 'eliminado'){
      res.json([{success:"eliminado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/delete-especific-smi", function (req, res, next) {
 
  let data = req.body
  let account = data.account
  let activity = data.activity
  sql.deleteSMIEspecific(account,activity).then((result) => {
    console.log(result)
    if(result[0].success == 'eliminado'){
      res.json([{success:"eliminado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/update-insert-smi", function (req, res, next) {
 
  let data = req.body
  sql.updateInsertSMI(data).then((result) => {
    if(result[0][0].success == 'insertado'){
      res.json([{success:"insertado"}])
    }else{
      res.json([{success:"error"}])
    }
  });
});

router.post("/especifics", function (req, res, next) {
  const { values } = req.body;
  console.log(values)
  sql.setEspecifics(values)
    .then(() => {
      res.json({ success: "insertado" });
    })
    .catch((error) => {
      console.error("Error al insertar los valores:", error);
      res.status(500).json({ success: "error" });
    });
});

router.get('/descargar-archivo', (req, res) => {
  // Envía el archivo como respuesta al navegador
  const rutaDirectorio = 'C:/Users/Administrador/Desktop/tramas';
  // Ruta al archivo específico que deseas descargar
  const nombreArchivo = req.query.name;
  const rutaArchivo = path.join(rutaDirectorio, nombreArchivo);
  res.download(rutaArchivo, nombreArchivo, (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error al descargar el archivo');
    } else {
      console.log('Archivo descargado correctamente');
    }
  });
});

router.get("/audit-by-acccount/:a", function (req, res, next) {
 
  let idCuentaAtencion = req.params.a
  sql.getAuditByAccount(idCuentaAtencion).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-audit-recipes", function (req, res,next) {

  let data = req.body
  let f1 = data.date1+' 00:00'
  let f2 = data.date2+' 23:59'

  sql.getAuditRecipe(f1,f2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-audit-lab", function (req, res,next) {

  let data = req.body
  let f1 = data.date1+' 00:00'
  let f2 = data.date2+' 23:59'

  sql.getAuditLab(f1,f2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-audit-img", function (req, res,next) {

  let data = req.body
  let f1 = data.date1+' 00:00'
  let f2 = data.date2+' 23:59'

  sql.getAuditImg(f1,f2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-detail-recipe", function (req, res,next) {

  let data = req.body
  let id = data.idReceta
  let t = data.tipo
  sql.getAuditRecipeDetail(id,t).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.get("/get-list-trama-saludpol", function (req, res,next) {

  (async () => {
    const isLoggedIn = await getListChargeTrama();
  
    if (isLoggedIn) {
      res.json(tableData);

    } else {
      res.json({error:"fallido"})
    }
  })();

});

router.get("/get-trama-saludpol-login", function (req, res,next) {

  (async () => {
    const username = 'convenioshospitalsantarosa@gmail.com';
    const password = '29722788';
    const isLoggedIn = await loginSaludPol(username,password);
  
    if (isLoggedIn) {
      res.json({login:"success"});

    } else {
      res.json({login:"failed"})
    }
  })();
});

router.get("/get-list-trama-saludpol-production", function (req, res,next) {

  (async () => {
    const isLoggedIn = await getListProductionTrama();
  
    if (isLoggedIn) {
      res.json(productionData);

    } else {
      res.json({error:"fallido"})
    }
  })();
});

router.post("/get-observed-trama", async function (req, res, next) {
  try {
    let link = req.body.link;
    const isLoggedIn = await getObservedTrama(link);
  
    if (isLoggedIn) {
      res.json(observedData);
    } else {
      res.json({ error: "fallido" });
    }
  } catch (error) {
    console.error('Error en /get-observed-trama:', error);
    res.json({ error: "fallido" });
  }
});

router.post("/get-items-audit-only", function (req, res,next) {

  let data = req.body
  let type = data.type
  let f1 = data.fechaIni
  let f2 = data.fechaFin
  let code = data.code

  sql.getItemsAudit(type,f1,f2,code).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/get-items-audit-group", function (req, res,next) {

  let data = req.body
  let type = data.type
  let f1 = data.fechaIni
  let f2 = data.fechaFin

  sql.getItemsAuditGroup(type,f1,f2).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/includes-items-audit", function (req, res, next) {
  const { values } = req.body;

  sql.setIncludesItems(values)
    .then(() => {
      res.json({ success: "insertado" });
    })
    .catch((error) => {
      console.error("Error al insertar los valores:", error);
      res.status(500).json({ success: "error" });
    });
});

router.get("/indicator-ate-ages/:a/:b/:c", function (req, res, next) {
 
  let f1 = req.params.a
  let f2 = req.params.b
  let font = req.params.c
  sql.indicatorAteAges(f1,f2,font).then((result) => {
    if(result[0].length>0){
      res.json(result);
    }else{
      res.json({error:"sin datos"})
    }
  });
});


router.post("/get-history-patient", function (req, res,next) {

  let data = req.body
  let type = data.type
  let value = data.value

  sql.getQueryHistoryPatient(type,value).then((result) => {
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});

router.post("/update-history-patient", function (req, res,next) {

  let data = req.body
  let history = data.history
  let idPatient = data.idPatient

  sql.updateHistoryPatient(idPatient,history).then((result) => {
    console.log(result)
    if(result[0].length>0){
      res.json(result[0]);
    }else{
      res.json({error:"sin datos"})
    }
  });
});


//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------


async function loginSaludPol(username, password){
   browser = await puppeteer.launch(); // Headless:false para ver la interfaz gráfica
   page = await browser.newPage(); 

  try {
    await page.goto('https://app-gtips.saludpol.gob.pe:38071/app-gtips/login');

    await page.waitForSelector('input[name="username"]', { timeout: 10000 });
    await page.type('input[name="username"]', username);

    await page.waitForSelector('input[name="password"]', { timeout: 10000 });
    await page.type('input[name="password"]', password);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }), // Esperar a que la página cargue completamente
      page.click('input[type="submit"]')
    ]);

    const isLoggedIn = await page.evaluate(() => {
      return document.querySelector('.login-box') === null; // Comprueba si la clase .login-box ya no está presente
    });

    return isLoggedIn;

  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    return false; // Devuelve false si hay un error durante el inicio de sesión
  }finally {
    await page.close();
  }
}

async function getListChargeTrama() {
  page = await browser.newPage(); 

  try {
       // Verificar si el inicio de sesión fue exitoso
    const isLoggedIn = await page.evaluate(() => {
      return document.querySelector('.login-box') === null; // Comprueba si la clase .login-box ya no está presente
    });
  
    const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0' }); // Esperar a que la página se cargue completamente
    await page.goto('https://app-gtips.saludpol.gob.pe:38071/app-gtips/cargas/listar');
    await navigationPromise;
  
    await page.waitForSelector('#tablaCargas');
  
    tableData = []  
    tableData = await page.evaluate(() => {
      const tableRows = Array.from(document.querySelectorAll('#tablaCargas tbody tr'));
      return tableRows.map(row => {
        const columns = row.querySelectorAll('td');
        let link = '';
        row.querySelectorAll('a').forEach(anchor => {
          const href = anchor.getAttribute('href');
          if (href.includes('verobservaciones') || href.includes('ver') || href.includes('excel_carga')) {
            link += `${anchor.innerText.trim()} |${href}`;
          }
        });
        const data = Array.from(columns).map(column => column.innerText);
        if (link) {
          data[data.length - 1] = link.trim();
        } else {
          data[data.length - 2] = data[data.length - 1]; // Reemplazar el penúltimo con el último si no hay enlace presente
        }
        return data;
      });
    });

    console.log(tableData);

    return isLoggedIn;

  } catch (error) {
    console.error('Error al obtener datos:', error);
    return false; // Devuelve false si hay un error durante el inicio de sesión
  } finally {
    await page.close();
  }
}

async function getListProductionTrama() {
  page = await browser.newPage(); 
  try {
    // Verificar si el inicio de sesión fue exitoso
    const isLoggedIn = await page.evaluate(() => {
      return document.querySelector('.login-box') === null; // Comprueba si la clase .login-box ya no está presente
    });

    const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0' }); // Esperar a que la página se cargue completamente
    await page.goto('https://app-gtips.saludpol.gob.pe:38071/app-gtips/mesesproducciones/listar');
    await navigationPromise;

    // Esperar a que aparezca la segunda tabla después de iniciar sesión
    await page.waitForSelector('#tablamesesproducciones');

    // Obtener datos de la segunda tabla
    productionData = []
    productionData = await page.evaluate(() => {
      const tableRows = Array.from(document.querySelectorAll('#tablamesesproducciones tbody tr'));
      return tableRows.map(row => {
        const columns = row.querySelectorAll('td');
        // Convertir las columnas a un array y eliminar la última columna
        const rowData = Array.from(columns).map(column => column.innerText);
        rowData.pop(); // Eliminar la última columna
        return rowData;
      });
    });

    console.log('Datos de la segunda tabla:', productionData);

    return isLoggedIn;
  } catch (error) {
    console.error('Producción:', error);
    return false; // Devuelve false si hay un error durante el inicio de sesión
  }finally {
    await page.close();
  }
}

async function getObservedTrama(link) {
  page = await browser.newPage(); 
  try {
    // Ir a la página
    const isLoggedIn = await page.evaluate(() => {
      return document.querySelector('.login-box') === null; // Comprueba si la clase .login-box ya no está presente
    });

    const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0' }); // Esperar a que la página se cargue completamente
    await page.goto(link);
    await navigationPromise;

    // Esperar a que aparezca la tabla
    await page.waitForSelector('.my_datatable');

    // Obtener datos de la tabla
    observedData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.my_datatable tbody tr'));
      return rows.map(row => {
        const columns = row.querySelectorAll('td');
        const rowData = Array.from(columns).map(column => {
          if (column.querySelector('a')) {
            return {
              text: column.innerText.trim(),
              href: column.querySelector('a').getAttribute('href')
            };
          } else {
            return column.innerText.trim();
          }
        });
        return rowData;
      });
    });

    console.log('Datos de la tabla:', observedData);
    return isLoggedIn;
  } catch (error) {
    console.error('Error observacion:', error);
    return false;
  }finally {
    await page.close();
  }
}

/*
async function downloadFile(url) {
  page = await browser.newPage(); 
  try {
    // Ir a la URL de descarga
    await page.goto(url);

    // Esperar un momento para asegurarse de que la descarga se complete
    await page.waitForTimeout(5000);

    console.log('Descarga completada.');
  } catch (error) {
    console.error('Error durante la descarga:', error);
  }finally {
    await page.close();
  }

}*/

/*
const executeLogin = async () => {
  try {
      // Obtén la hora actual
      const now = new Date();
      const hours = now.getHours();

      // Verifica si la hora actual está entre las 7:00 AM y las 5:00 PM
      if (hours >= 7 && hours < 17) {
          // Si está dentro del intervalo de tiempo, procede con el inicio de sesión
          const username = 'convenioshospitalsantarosa@gmail.com';
          const password = '29722788';
          const loginSuccess = await loginSaludPol(username, password);

          if (loginSuccess) {
              console.log('Inicio de sesión exitoso');
          } else {
              console.log('Inicio de sesión fallido');
          }
      } else {
          // Si está fuera del intervalo de tiempo, simplemente muestra un mensaje de que no es hora de iniciar sesión
          console.log('No es hora de iniciar sesión');
      }
  } catch (error) {
      console.error('Error:', error);
  }
};
*/
// Ejecutar la función por primera vez
//executeLogin();
// Programar la ejecución cada 15 minutos
//setInterval(executeLogin, 10 * 60 * 1000);


module.exports = router;


