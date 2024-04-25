var config = require("./dbconfig")
var configArfsis = require("./dbconfigArfsis")
const sql = require("mssql")
const fs = require('fs');
const axios = require('axios');
const archiver = require('archiver');
const { Console } = require("console");
const { use } = require("./routes");
archiver.registerFormat('zip-encrypted', require("archiver-zip-encrypted"));
const passwordProduction = 'q1U21p57'; 
const passwordTest = 'PilotoFUAE123'
const mysql = require('mysql2/promise');
const connection = mysql.createConnection(configArfsis);
//const passwordTest = 'PilotoFUAE123'
// old production password : 7017FuaE47121
// arfisis password = LO$5QJsd2+*fsdfHop67

//connection.end();

const urlTesting = 'http://pruebaws01.sis.gob.pe/cxf/esb/negocio/registroFuaBatch/v2'; // URL del servicio web SOAP
const urlProduction = 'http://ws01.sis.gob.pe/cxf/esb/negocio/registroFuaBatch/v2'; // URL del servicio web SOAP

const authTesting = '123456'
const authProduction = 'q1U21p57'

//requestSeachPackageTramaSOAP()

async function getPackageTrama(anio,month,n_send) {

  try {
    const xmlRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://sis.gob.pe/esb/negocio/registroFuaBatch/v2/">
         <soapenv:Header>
            <v2:requestHeader>
               <!--Optional:-->
               <v2:canal>SOAP</v2:canal>
               <v2:usuario>HSRPM</v2:usuario>
               <v2:autorizacion>DsutgQ3U</v2:autorizacion>
            </v2:requestHeader>
         </soapenv:Header>
         <soapenv:Body>
            <v2:consultarPaqueteRequest>
               <v2:paqueteNombre>00002698${anio}${month}${n_send}</v2:paqueteNombre>
            </v2:consultarPaqueteRequest>
         </soapenv:Body>
      </soapenv:Envelope>`;

    const headers = {
      'Content-Type': 'text/xml',
    };

    const response = await axios.post(urlProduction, xmlRequest, { headers });
    const responseData = {data:response.data};

    // Procesar la respuesta SOAP aquí
    //console.log(responseData);
    return responseData
    
  } catch (error) {
    console.error(error);
  }
}

async function getdata() {
  try {
    let pool = await sql.connect(config);
    console.log("sql server connected...");
  } catch (error) {
console.log("error :" + error);
  }finally {
    sql.close();
  }
}
 
  async function getdata_invoice_charge(quantity) {
    const q = quantity
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT TOP ${q} * from SIGH..CajaComprobantesPago X ORDER BY X.FechaCobranza DESC`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function get_type_finance() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT * FROM SIGH..FuentesFinanciamiento`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function getAllUsers() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`
      SELECT IdEmpleado,
      UPPER(ApellidoMaterno+' '+ApellidoPaterno+' '+Nombres)+' '+'-'+' '+LOWER(Usuario) AS 'cod'
      FROM SIGH..Empleados where Usuario IS NOT NULL
      ORDER BY Usuario
      `);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function getdata_by_num_doc(num) {
    const c = num
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT * from SIGH..CajaComprobantesPago X where X.NroDocumento = ${c}`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function getdata_by_razon_social(rs) {
    const c = rs
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT * from SIGH..CajaComprobantesPago X where X.RazonSocial like '${c}%'`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }


  async function update_status_invoice(status , id) {
    status = parseInt(status)
    id = parseInt(id)
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`update SIGH..CajaComprobantesPago set IdEstadoComprobante = ${status} where IdComprobantePago = ${id}`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function getdata_status_invoice() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`select * from SIGH..CajaEstadosComprobante`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function insurance_report(type , init_month , final_month ) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idFiltroTipo',type)
      .input('fecInicio',init_month)
      .input('fecFin',final_month)
      .execute(`SIGH.ReporteSisImplementacionSoaSis`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }finally {
      sql.close();
    }
  }

  async function status_atention(f_i,f_f) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('fecha_ini',f_i)
      .input('fecha_fin',f_f)
      .execute(`PACIENTE_POR_NUM_CUENTA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function status_atention_pro(num_account) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idCuentaAtencion',num_account)
      .execute(`JSP_SALUDPOL_PROCEDIMIENTOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function diag_and_proc(anio,mes) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('year1',anio)
      .input('month1',mes)
      .execute(`CONSULTA_DIAGNOSTICOS_Y_PROCEDIMIENTOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function diag_and_proc_by_code(anio,mes,codigo) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('year1',anio)
      .input('month1',mes)
      .input('codigo',codigo)
      .execute(`CONSULTA_DIAGNOSTICOS_Y_PROCEDIMIENTOS_POR_COD_SERV`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function diag_and_proc_by_name(anio,mes,name) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('year1',anio)
      .input('month1',mes)
      .input('nom',name)
      .execute(`CONSULTA_DIAGNOSTICOS_Y_PROCEDIMIENTOS_POR_NOM_SERV`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function production(f_init,f_fin,fuente) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('f_ini',f_init)
      .input('f_fin',f_fin)
      .input('fuente',fuente)
      .execute(`PRODUCCION`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function production_ins_med(f_init,f_fin) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('f_ini',f_init)
      .input('f_fin',f_fin)
      .execute(`PRODUCCION_INS_MED`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function discharge_control(f_init,f_fin,font) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('fecha_in',f_init)
      .input('fecha_out',f_fin)
      .input('fuente',font)
      .execute(`CONTROL_DE_ALTAS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function discharge_control_with_procedures(f_init,f_fin) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('fecha_in',f_init)
      .input('fecha_out',f_fin)
      .execute(`CONTROL_DE_ALTAS_CON_PROCEDIMIENTOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function searchAffiliate(nroFormato) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('n_formato',nroFormato)
      .execute(`BUSCAR_AFILIADOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function searchAffiliateByName(ap1,ap2,n) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('APELLIDO_PARTERNO',ap1)
      .input('APELLIDO_MARTERNO',ap2)
      .input('NOMBRE1',n)
      .execute(`BUSCAR_AFILIADOS_POR_NOMBRES`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function searchAffiliateByNameV2(ap1,ap2,n,n2) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('APELLIDO_PARTERNO',ap1)
      .input('APELLIDO_MARTERNO',ap2)
      .input('NOMBRE1',n)
      .input('NOMBRE2',n2)
      .execute(`BUSCAR_AFILIADOS_POR_NOMBRES_v2`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaAtencion(FECHAINI,FECHAFIN,MESPRODUCCION,ANIOPRODUCCION) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .input('MESPRODUCCION',MESPRODUCCION)
      .input('ANIOPRODUCCION',ANIOPRODUCCION)
      .execute(`CONSULTA_TRAMA_ATENCIONES`) 
      return res.recordsets
    } catch (error) {
      console.log("error -> " + error);
    }
  }

  async function tramaAtencionEspecificos(MESPRODUCCION,ANIOPRODUCCION) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('MESPRODUCCION',MESPRODUCCION)
      .input('ANIOPRODUCCION',ANIOPRODUCCION)
      .execute(`CONSULTA_TRAMA_ATENCIONES_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error -> " + error);
    }
  }

  async function getTramaAtencion(FECHAINI,FECHAFIN,MESPRODUCCION,ANIOPRODUCCION) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .input('MESPRODUCCION',MESPRODUCCION)
      .input('ANIOPRODUCCION',ANIOPRODUCCION)
      .execute(`SIGH.dbo.ATENCION`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaAtencionEspecific(MESPRODUCCION,ANIOPRODUCCION) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('MESPRODUCCION',MESPRODUCCION)
      .input('ANIOPRODUCCION',ANIOPRODUCCION)
      .execute(`ESPECIFICO_TRAMA_ATENCION`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaDiagnostico(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_DIAGNOSTICO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaDiagnosticoEspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_DIAGNOSTICO_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaDiagnostico(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONDIA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaDiagnosticoEspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONDIA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaMedicamentos(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_MEDICAMENTOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaMedicamentosEspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_MEDICAMENTOS_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaMedicamentos(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONMED`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaMedEspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONMED`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }


  async function tramaInsumos(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_INSUMOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaInsumosEspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_INSUMOS_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  } 

  async function getTramaInsumos(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONINS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaInsEspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONINS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaProcedimientos(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_PROCEDIMIENTOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaProcedimientosEspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_PROCEDIMIENTOS_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaProcedimientos(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONPRO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaProEspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONPRO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaSMI(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_SMI`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaSMIEspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_SMI_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaSMI(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONSMI`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaSMIEspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONSMI`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaSER(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_SERVICIOS_ADICIONALES`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaSEREspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_SERVICIOS_ADICIONALES_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaSER(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONSER`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaSEREspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONSER`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function tramaRN(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`CONSULTA_TRAMA_RECIEN_NACIDO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }
  
  
  async function tramaRNEspecificos() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`CONSULTA_TRAMA_RECIEN_NACIDO_ESPECIFICOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  
  async function getTramaRN(FECHAINI,FECHAFIN) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .execute(`SIGH.dbo.ATENCIONRN`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getTramaRNEspecific() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`ESPECIFICO_TRAMA_ATENCIONRN`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }


  async function setTramaRESUMEN(FECHAINI,FECHAFIN,NENVIO,NOMBREZIP,DNI,MESPRODUCCION,ANIOPRODUCCION) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHAINI',FECHAINI)
      .input('FECHAFIN',FECHAFIN)
      .input('NENVIO',NENVIO)
      .input('NOMBREZIP',NOMBREZIP)
      .input('DNI',DNI)
      .input('ANIOPRODUCCION',ANIOPRODUCCION)
      .input('MESPRODUCCION',MESPRODUCCION)
      .execute(`SIGH.dbo.ATENCIONRESUMEN`) 
      return [[{success:"Enviado!"}]]
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function setTramaRESUMENDEBUG(ANIO,MES,NENVIO,NOMBREZIP,DNI,MESPRODUCCION,ANIOPRODUCCION) {

    console.log(ANIO+' '+MES+' '+NENVIO+' '+NOMBREZIP+' '+DNI+' '+MESPRODUCCION+' '+ANIOPRODUCCION)

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ANIO',ANIO)
      .input('MES',MES)
      .input('NENVIO',NENVIO)
      .input('NOMBREZIP',NOMBREZIP)
      .input('DNI',DNI)
      .input('ANIOPRODUCCION',ANIOPRODUCCION)
      .input('MESPRODUCCION',MESPRODUCCION)
      .execute(`ATENCIONRESUMENDEBUG`) 
  
      return [[{success:"Enviado!"}]]
    } catch (error) {
      console.log("error : " + error);
    }
  }

  
  async function getTramaRes(ANIO,MES,NENVIO) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`select * from SIGH_EXTERNA..SisFuaResumen where anio = ${ANIO} and mes = ${MES} and NroEnvio = ${NENVIO}`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function getTramaResDebug(ANIO,MES,NENVIO) {
   
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`select * from BD_SIS_TOOLS..SisFuaResumenDebug where anio = ${ANIO} and mes = ${MES} and NroEnvio = ${NENVIO}`);
      return res.recordsets;
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function getLastCorrelative(ANIO,MES) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('anio',ANIO)
      .input('mes',MES)
      .execute(`OBTENER_ULTIMO_CORRELATIVO_TRAMA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }


  async function sendTrama(data) {

    try{
   
      // create archive and specify method of encryption and password
      let archive = archiver.create('zip-encrypted', {zlib: {level: 8}, encryptionMethod: 'zip20', password: passwordProduction});
      
      function writeFileWithUTF8(fileName, content) {
        fs.writeFileSync(fileName, content, 'utf8');
      }
    
      // Crea un archivo de texto y escribe algunos datos
      writeFileWithUTF8('ATENCION.TXT', data.ATENCION);
    
      // Crea otro archivo de texto y escribe algunos datos
      writeFileWithUTF8('ATENCIONDIA.TXT', data.ATENCIONDIA);
    
      writeFileWithUTF8('ATENCIONMED.TXT', data.ATENCIONMED);
    
      writeFileWithUTF8('ATENCIONINS.TXT', data.ATENCIONINS);
    
      writeFileWithUTF8('ATENCIONPRO.TXT', data.ATENCIONPRO);
    
      writeFileWithUTF8('ATENCIONSMI.TXT', data.ATENCIONSMI);
    
      writeFileWithUTF8('ATENCIONSER.TXT', data.ATENCIONSER);
    
      writeFileWithUTF8('ATENCIONRN.TXT', data.ATENCIONRN);
    
      writeFileWithUTF8('RESUMEN.TXT', data.RESUMEN);

      // Agrega los archivos al objeto Archiver
      archive.file('ATENCION.TXT', { name: 'ATENCION.TXT' });
      archive.file('ATENCIONDIA.TXT', { name: 'ATENCIONDIA.TXT' });
      archive.file('ATENCIONMED.TXT', { name: 'ATENCIONMED.TXT' });
      archive.file('ATENCIONINS.TXT', { name: 'ATENCIONINS.TXT' });
      archive.file('ATENCIONPRO.TXT', { name: 'ATENCIONPRO.TXT' });
      archive.file('ATENCIONSMI.TXT', { name: 'ATENCIONSMI.TXT' });
      archive.file('ATENCIONSER.TXT', { name: 'ATENCIONSER.TXT' });
      archive.file('ATENCIONRN.TXT', { name: 'ATENCIONRN.TXT' });
      archive.file('RESUMEN.TXT', { name: 'RESUMEN.TXT' });

      // Crea el archivo ZIP
      const output = fs.createWriteStream('C:/users/Administrador/desktop/tramas/'+data.nameTrama);
      archive.pipe(output);
      archive.finalize();

      return [[{success:"Enviado!"}]]
    }catch (error) {
      console.log("error : " + error);
    }

  }


 
  async function sendTramaDebug(data) {

    let actualYear = new Date().getFullYear()
    let nameTrama = (data.nameTrama).replace(/2023/g, actualYear.toString())

    try {
      let archive = archiver.create('zip-encrypted', {zlib: {level: 8}, encryptionMethod: 'zip20', password: passwordProduction});
      
      function writeFileWithUTF8(fileName, content) {
        fs.writeFileSync(fileName, content, 'utf8');
      }
    
      // Crea un archivo de texto y escribe algunos datos
      writeFileWithUTF8('ATENCION.TXT', data.ATENCION);
    
      // Crea otro archivo de texto y escribe algunos datos
      writeFileWithUTF8('ATENCIONDIA.TXT', data.ATENCIONDIA);
    
      writeFileWithUTF8('ATENCIONMED.TXT', data.ATENCIONMED);
    
      writeFileWithUTF8('ATENCIONINS.TXT', data.ATENCIONINS);
    
      writeFileWithUTF8('ATENCIONPRO.TXT', data.ATENCIONPRO);
    
      writeFileWithUTF8('ATENCIONSMI.TXT', data.ATENCIONSMI);
    
      writeFileWithUTF8('ATENCIONSER.TXT', data.ATENCIONSER);
    
      writeFileWithUTF8('ATENCIONRN.TXT', data.ATENCIONRN);
    
      writeFileWithUTF8('RESUMEN.TXT', data.RESUMEN);

      // Agrega los archivos al objeto Archiver
      archive.file('ATENCION.TXT', { name: 'ATENCION.TXT' });
      archive.file('ATENCIONDIA.TXT', { name: 'ATENCIONDIA.TXT' });
      archive.file('ATENCIONMED.TXT', { name: 'ATENCIONMED.TXT' });
      archive.file('ATENCIONINS.TXT', { name: 'ATENCIONINS.TXT' });
      archive.file('ATENCIONPRO.TXT', { name: 'ATENCIONPRO.TXT' });
      archive.file('ATENCIONSMI.TXT', { name: 'ATENCIONSMI.TXT' });
      archive.file('ATENCIONSER.TXT', { name: 'ATENCIONSER.TXT' });
      archive.file('ATENCIONRN.TXT', { name: 'ATENCIONRN.TXT' });
      archive.file('RESUMEN.TXT', { name: 'RESUMEN.TXT' });

      // Crea el archivo ZIP
      const output = fs.createWriteStream(
        "C:/users/Administrador/desktop/tramas/" + nameTrama
      );
  
      // Espera a que se complete la creación del archivo ZIP antes de continuar
      await new Promise((resolve) => {
        output.on("close", resolve);
        archive.pipe(output);
        archive.finalize();
      });
  
      
      const fileContent = readFileAsBase64(
        "C:/users/Administrador/desktop/tramas/" + nameTrama
      );

     /*const fileContent = readFileAsBase64(
        "C:/projects/FUAFolder/fua/0000269820240300035.zip"
      );*/

      // ... (código para construir xmlBody y realizar la solicitud)

      /*

      const xmlBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://sis.gob.pe/esb/negocio/registroFuaBatch/v2/">
      <soapenv:Header>
        <v2:requestHeader>
          <!--Optional:-->
          <v2:canal>ARFSISWEB</v2:canal>
         <v2:usuario>PDMDD028001</v2:usuario>
         <v2:autorizacion>${authProduction}</v2:autorizacion>
        </v2:requestHeader>
      </soapenv:Header>
      <soapenv:Body>
        <v2:registrarFuaRequest>
          <v2:nombreZip>${nameTrama}</v2:nombreZip>
          <v2:dataZip>${fileContent}</v2:dataZip>
        </v2:registrarFuaRequest>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  const headers = {
    'Content-Type': 'text/xml',
  };
   
  const response = await axios.post(urlProduction, xmlBody, { headers });
      return [
        [
          {
            success: "Enviado!",
            server_response: response.data,
          },
        ],
      ];
      */

      return [
        [
          {
            success: "Enviado!",
            server_response: nameTrama,
          },
        ],
      ];

    } catch (error) {
      console.log("error : " + error);
      throw error; // Propagar el error para manejarlo en el nivel superior
    }
  }  

  function readFileAsBase64(filePath) {
    const fileData = fs.readFileSync(filePath);
    return Buffer.from(fileData).toString('base64');
  }

  async function getAfiliateArfsisWeb(type, nro) {
    try {
        const connection = await mysql.createConnection(configArfsis);

        const [results, fields] = await connection.execute(`SELECT * FROM bdsis_asegurados.m_afiliados where afi_NroFormato = '${nro}' and afi_TipoFormato = '${type}'`, [nro, type]);
        return results;
    } catch (error) {
        throw error;
    }
}

  async function getAfiliateWebService(){

    let urlWebService = `http://app.sis.gob.pe/sisWSAFI/`
  
    try{

      const xmlBody = `
          <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sis="http://sis.gob.pe/">
          <soap:Header/>
          <soap:Body>
              <sis:GetSession>
                <!--Optional:-->
                <sis:strUsuario>HSRPM</sis:strUsuario>
                <!--Optional:-->
                <sis:strClave>DsutgQ3U</sis:strClave>
              </sis:GetSession>
          </soap:Body>
        </soap:Envelope>
    `;

  const headers = {
    'Content-Type': 'text/xml',
  };

  const response = await axios.post(urlWebService, xmlBody, { headers });

  return [
    [
      {
        success: "autorizado",
        server_response: response.data,
      },
    ],
  ];
    }catch(error){
      throw error;
    }
  }

  async function getAfiliateWebServiceData(auth,disa,tipo,num){

    let urlWebService = `http://app.sis.gob.pe/sisWSAFI/`
    let tipoDoc = tipo
    if(tipoDoc == "2"){
      tipoDoc = "1"
    }
  
    try{

      const xmlBody = `
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:sis="http://sis.gob.pe/">
      <soap:Header/>
      <soap:Body>
         <sis:ConsultarAfiliadoFuaE>
            <sis:intOpcion>1</sis:intOpcion>
            <!--Optional:-->
            <sis:strAutorizacion>${auth}</sis:strAutorizacion>
            <!--Optional:-->
            <sis:strDni>41857867</sis:strDni>
            <!--Optional:-->
            <sis:strTipoDocumento>${tipoDoc}</sis:strTipoDocumento>
            <!--Optional:-->
            <sis:strNroDocumento>${num}</sis:strNroDocumento>
            <!--Optional:-->
            <sis:strDisa>${disa}</sis:strDisa>
            <!--Optional:-->
            <sis:strTipoFormato>${tipo}</sis:strTipoFormato>
            <!--Optional:-->
            <sis:strNroContrato>${num}</sis:strNroContrato>
            <!--Optional:-->
            <sis:strCorrelativo></sis:strCorrelativo>
         </sis:ConsultarAfiliadoFuaE>
      </soap:Body>
   </soap:Envelope>
    `;

  const headers = {
    'Content-Type': 'text/xml',
  };

  const response = await axios.post(urlWebService, xmlBody, { headers });

  return [
    [
      {
        success: "success",
        server_response: response.data,
      },
    ],
  ];

    }catch(error){
      throw error;
    }
    
  }

  async function getFuaByNumAndLote(FUA,LOTE) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('fua',FUA)
      .input('lote',LOTE)
      .execute(`BUSCAR_FUA_POR_NUMERO_LOTE`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getFuaByAccount(num) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('num',num)
      .execute(`BUSCAR_FUA_POR_CUENTA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getFuaByDNI(dni) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('dni',dni)
      .execute(`BUSCAR_FUA_POR_DNI`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getFuaByFullname(LASTNAME1,LASTNAME2,NAME) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ap',LASTNAME1)
      .input('am',LASTNAME2)
      .input('name',NAME)
      .execute(`BUSCAR_FUA_POR_NOMBRES`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getEmployee(dni) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('DNI',dni)
      .execute(`BUSCAR_EMPLEADO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getEmployeeByDniAndUser(dni,user) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('DNI',dni)
      .input('USER',user)
      .execute(`BUSCAR_EMPLEADO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function setUser(idEmpleado,ApellidoPaterno,ApellidoMaterno,Nombres,
    IdCondicionTrabajo,IdTipoEmpleado,DNI,CodigoPlanilla,FechaIngreso,
    FechaRegistroHerramienta,Usuario,ClaveSisHerramientas,ReniecAutorizado,
    idTipoDocumento,idTipoSexo,TipoEmpleado) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idEmpleado',idEmpleado)
      .input('ApellidoPaterno',ApellidoPaterno)
      .input('ApellidoMaterno',ApellidoMaterno)
      .input('Nombres',Nombres)
      .input('IdCondicionTrabajo',IdCondicionTrabajo)
      .input('IdTipoEmpleado',IdTipoEmpleado)
      .input('DNI',DNI)
      .input('CodigoPlanilla',CodigoPlanilla)
      .input('FechaIngreso',FechaIngreso)
      .input('FechaRegistroHerramienta',FechaRegistroHerramienta)
      .input('Usuario',Usuario)
      .input('ClaveSisHerramientas',ClaveSisHerramientas)
      .input('ReniecAutorizado',ReniecAutorizado)
      .input('idTipoDocumento',idTipoDocumento)
      .input('idTipoSexo',idTipoSexo)
      .input('TipoEmpleado',TipoEmpleado)
      .execute(`CREAR_USUARIO`) 
      return [[{success:"creado"}]]
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function setExcludes(values) {
    try {
      let pool = await sql.connect(config);
      let res = await pool
        .request()
        .query(`INSERT INTO BD_SIS_TOOLS..excluidos_saludpol (IdCuentaAtencion) 
        VALUES ${values.map((value) => `(${value})`).join(", ")}`);
      return res.recordsets;
    } catch (error) {
      console.log("error: " + error);
    } finally {
      sql.close();
    }
  }

  async function setIncludes(values) {
    try {
      let pool = await sql.connect(config);
      let res = await pool
        .request()
        .query(`INSERT INTO BD_SIS_TOOLS..incluidos_saludpol (IdCuentaAtencion) 
        VALUES ${values.map((value) => `(${value})`).join(", ")}`);
      return res.recordsets;
    } catch (error) {
      console.log("error: " + error);
    } finally {
      sql.close();
    }
  }

  async function constructTramaSaludpol(f1,f2) {
    f1 = f1.replace(/-/g, "/");
    f2 = f2.replace(/-/g, "/");
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('F1',f1)
      .input('F2',f2)
      .execute(`REGISTRO_TRAMA_SALUDPOL`) 
      await pool.close();
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function constructTramaSaludpolExcludes(f1,f2) {
    f1 = f1.replace(/-/g, "/");
    f2 = f2.replace(/-/g, "/");
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('F1',f1)
      .input('F2',f2)
      .execute(`REGISTRO_TRAMA_SALUDPOL_EXCLUIDOS`) 
      await pool.close();
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function constructTramaSaludpolExcludesAndIncludes(f1,f2) {
    f1 = f1.replace(/-/g, "/");
    f2 = f2.replace(/-/g, "/");
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('F1',f1)
      .input('F2',f2)
      .execute(`REGISTRO_TRAMA_SALUDPOL_EXCLUIDOS_Y_INCLUIDOS`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function constructTramaSaludpolIncludes(f1,f2) {
    f1 = f1.replace(/-/g, "/");
    f2 = f2.replace(/-/g, "/");
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('F1',f1)
      .input('F2',f2)
      .execute(`REGISTRO_TRAMA_SALUDPOL_INCLUIDOS`) 
      await pool.close();
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function generateTramaSaludpol() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .execute(`BUILD_TRAMA_SALUDPOL`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function getAtentionSaludpol(x) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idCuentaAtencion',x)
      .execute(`CONSULTA_ATENCION_SALUDPOL_POR_CUENTA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function updateSisFiliacion(data) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('AFI_DISA',data.AfiliacionDisa)
      .input('AFI_TIPO_FORMATO',data.AfiliacionTipoFormato)
      .input('AFI_NRO_FORMATO',data.AfiliacionNroFormato)
      .input('ID_SIASIS',data.idSiasis)
      .input('LOTE',data.FuaLote)
      .input('CODIGO',data.Codigo)
      .input('CUENTA',data.idCuentaAtencion)
      .input('FECHANACIMIENTO',data.FechaNacimiento)
      .input('IDPACIENTE',parseInt(data.IdPaciente))
      .execute(`UPDATE_AFILIADO_FUA`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function production_saludpol(account) {
    let pool;
    try {
      pool = await sql.connect(config);
      const res = await pool.request()
        .input('idCuentaAtencion', account)
        .execute('PRODUCCION_SALUDPOL');
      
      // Cierra la conexión después de cada solicitud
      await pool.close();
  
      return res.recordsets;
    } catch (error) {
      console.log('Error: ' + error);
    } finally {
      // Asegúrate de liberar recursos en caso de un error inesperado
      if (pool) {
        try {
          await pool.close();
        } catch (error) {
          console.log('Error al cerrar la conexión: ' + error);
        }
      }
    }
  }

  async function id_procedure(account,procedure) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idCuentaAtencion',account)
      .input('procedimiento',procedure)
      .execute(`OBTENER_ID_PROCEDIMIENTO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function id_laboratory(account,procedure) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idCuentaAtencion',account)
      .input('procedimiento',procedure)
      .execute(`OBTENER_ID_LABORATORIO`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function id_image(account,procedure) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idCuentaAtencion',account)
      .input('procedimiento',procedure)
      .execute(`OBTENER_ID_IMAGEN`) 
      return res.recordsets
    } catch (error) {
      console.log("error : " + error);
    }
  }

  async function update_quantity_procedure(quantity,idProduct,idOrder) {
    const q = quantity
    const id_product = idProduct
    const id_order = idOrder
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`UPDATE SIGH..FacturacionServicioDespacho SET Cantidad = ${q}
      WHERE IdProducto = ${id_product} AND idOrden = ${id_order}`);
      return [[{success:"actualizado"}]]
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function update_dni_patient(dni,id_patient) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('DNI',dni)
      .input('ID_PACIENTE',id_patient)
      .execute(`ACTUALIZAR_DNI_PACIENTE`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function update_gender_patient(gender,id_patient) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('GENERO',gender)
      .input('ID_PACIENTE',id_patient)
      .execute(`ACTUALIZAR_GENERO_PACIENTE`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function update_date_atention(account,date1,date2) {
    try {
      console.log(date1)
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',account)
      .input('FECHA1',date1)
      .input('FECHA2',date2)
      .execute(`ACTUALIZAR_FECHA_PACIENTE_SALUDPOL`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function update_date_pregnancy(account,date,sm) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',account)
      .input('FECHA',date)
      .input('SALUDMATERNA',sm)
      .execute(`ACTUALIZAR_FECHA_FUA_PARTO`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
      console.log(error)
       return [[{success:"error"}]]
    
    }
  }

  async function update_nro_ref_origin(id_atention,nro) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ID',id_atention)
      .input('NRO',nro)
      .execute(`ACTUALIZAR_NRO_REF_ORIGEN`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function get_data_medic(id_atention) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',id_atention)
      .execute(`OBTENER_DATOS_MEDICO_POR_CUENTA`) 
      return res.recordsets
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function update_dni_digitador(id_atention,dni) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',id_atention)
      .input('DNI',dni)
      .execute(`ACTUALIZAR_DNI_DIGITADOR_FUA`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function get_data_validate_catalog(lote,fua) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('LOTE',lote)
      .input('FUA',fua)
      .execute(`BUSCAR_CATALOGO_PARAMETROS`) 
      return res.recordsets
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function delete_procedure_saludpol(order,idProducto,cuenta) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ORDEN',order)
      .input('PRODUCTO',idProducto)
      .input('CUENTA',cuenta)
      .execute(`BORRAR_PROCEDIMIENTO_SALUDPOL`) 
      return [[{success:"eliminado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }


  async function delete_laboratory_saludpol(order,idProducto,cuenta) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ORDEN',order)
      .input('PRODUCTO',idProducto)
      .input('CUENTA',cuenta)
      .execute(`BORRAR_LABORATORIO_SALUDPOL`) 
      return [[{success:"eliminado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function delete_images_saludpol(order,idProducto,cuenta) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ORDEN',order)
      .input('PRODUCTO',idProducto)
      .input('CUENTA',cuenta)
      .execute(`BORRAR_IMAGENES_SALUDPOL`) 
      return [[{success:"eliminado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function search_procedure(name) {
    const n = name
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT FC.IdProducto,FC.Codigo,FC.Nombre, FCS.PrecioUnitario FROM SIGH..FactCatalogoServicios  FC
      INNER JOIN SIGH..FactCatalogoServiciosHosp FCS ON FCS.IdProducto = FC.IdProducto 
      where Nombre like '${n}%' COLLATE Latin1_general_CI_AI AND FCS.IdTipoFinanciamiento = 7 AND FCS.Activo = 1`);
      return res.recordsets;
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function search_procedure_by_code(code) {
    const n = (code).toString()
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT FC.IdProducto,FC.Codigo,FC.Nombre, FCS.PrecioUnitario FROM SIGH..FactCatalogoServicios  FC
      INNER JOIN SIGH..FactCatalogoServiciosHosp FCS ON FCS.IdProducto = FC.IdProducto 
      where Codigo = '${n}' AND FCS.IdTipoFinanciamiento = 7 AND FCS.Activo = 1`);
      return res.recordsets;
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  
  async function add_procedure_saludpol(d) {
    try {

      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('PUNTOCARGA',d.puntoCarga)
      .input('PACIENTE',d.idPaciente)
      .input('CUENTA',d.idCuentaAtencion)
      .input('SERVICIO',d.idServicioPaciente)
      .input('TIPOFINANCIAMIENTO',d.idTipoFinanciamiento)
      .input('FUENTEFINANCIAMIENTO',d.fuenteFinanciamiento)
      .input('FECHACREA',d.fechaCrea)
      .input('USUARIO',d.usuario)
      .input('FECHADESPACHO',d.fechaDespacho)
      .input('USUARIODESPACHO',d.usuarioDespacho)
      .input('ESTADO',d.estado)
      .input('FECHACPT',d.fechaCpt)
      .input('PRODUCTO',d.idProducto)
      .input('CANTIDAD',d.cantidad)
      .input('PRECIO',d.precio)
      .input('TOTAL',d.precioTotal)
      .input('LABHIS',d.labHis)
      .input('GRUPO',d.grupo)
      .input('SUBGRUPO',d.subGrupo)
      .input('LABHISCODIGO',d.labHisCodigo)
  
      .execute(`INSERTAR_PROCEDIMIENTO_SALUDPOL`) 
      return [[{success:"insertado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function add_laboratory_saludpol(d) {
    try {

      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('PUNTOCARGA',d.puntoCarga)
      .input('PACIENTE',d.idPaciente)
      .input('CUENTA',d.idCuentaAtencion)
      .input('SERVICIO',d.idServicioPaciente)
      .input('TIPOFINANCIAMIENTO',d.idTipoFinanciamiento)
      .input('FUENTEFINANCIAMIENTO',d.fuenteFinanciamiento)
      .input('FECHACREA',d.fechaCrea)
      .input('USUARIO',d.usuario)
      .input('FECHADESPACHO',d.fechaDespacho)
      .input('USUARIODESPACHO',d.usuarioDespacho)
      .input('ESTADO',d.estado)
      .input('FECHACPT',d.fechaCpt)
      .input('PRODUCTO',d.idProducto)
      .input('CANTIDAD',d.cantidad)
      .input('PRECIO',d.precio)
      .input('TOTAL',d.precioTotal)
      .input('LABHIS',d.labHis)
      .input('GRUPO',d.grupo)
      .input('SUBGRUPO',d.subGrupo)
      .input('LABHISCODIGO',d.labHisCodigo)

      .execute(`INSERTAR_LABORATORIO_SALUDPOL`) 
      return res.recordsets
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function add_mov_laboratory_saludpol(d) {

    try {

      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('ORDEN',d.IdOrden)
      .input('CUENTA',d.idCuentaAtencion)
      .input('FECHACREA',d.fechaCrea)
      .input('IDPERSONATOMALAB',d.idPersonaTomaLab)
      .input('IDIDAGNOSTICO',d.idDiagnostico)
      .input('DIAGNOSTICODEF',d.EsDiagnosticoDefinitivo)
      .input('ORDENAPRUEBA',d.OrdenaPrueba)
      .input('PACIENTENOMBRE',d.Paciente)
      .input('TIPOSEXO',d.idTipoSexo)
      .input('FECHANAC',d.FechaNacimiento)
      .input('COLEGIATURA',d.colegiatura)
      .execute(`INSERTAR_MOV_LABORATORIO_SALUDPOL`) 
      return [[{success:"insertado"}]]
    } catch (error) {
    
       return [[{success:"error"}]]
    }
  }

  async function add_mov_images_saludpol(d) {

    try {

      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('FECHA',d.fecha)
      .input('IDUSUARIO',d.IdUsuario)
      .input('ORDEN',d.IdOrden)
      .input('CUENTA',d.idCuentaAtencion)
      .input('PACIENTE',d.Paciente)
      .input('SEXO',d.idTipoSexo)
      .input('FECHANACIMIENTO',d.FechaNacimiento)
      .execute(`INSERTAR_MOV_IMAGENES_SALUDPOL`) 
      return [[{success:"insertado"}]]
    } catch (error) {
    
       return [[{success:"error"}]]
    }
  }


  async function search_fua_by_num_and_size(lote,fua) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('LOTE',lote)
      .input('FUA',fua)
      .execute(`BUSCAR_FUA_POR_NRO_FUA`) 
      return res.recordsets
    } catch (error) {
       console.log(error);
       return [[{success:"error"}]]
    }
  }

  async function search_medic_fua(ap) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('AP',ap)
      .execute(`CORRECCION_FUA_BUSCAR_MEDICO`) 
      return res.recordsets
    } catch (error) {
       console.log("error : " + error);
       return [[{success:"error"}]]
    }
  }

  async function update_medic_fua(dni,medic,type_doc,type_medic,fua,lote) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('DNI',dni)
      .input('MEDICO',medic)
      .input('TIPO_DOCUMENTO',type_doc)
      .input('TIPO_MEDICO',type_medic)
      .input('FUA',fua)
      .input('LOTE',lote)
      .execute(`ACTUALIZAR_MEDICO_FUA`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function get_sub_diagnosys(type) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(` SELECT IdSubclasificacionDx,Descripcion,IdClasificacionDx 
      FROM SIGH..SubclasificacionDiagnosticos 
      WHERE IdTipoServicio = ${type}`);
      return res.recordsets;
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function get_diagnosys(diagnosys) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`SELECT IdDiagnostico,Descripcion
      FROM SIGH..Diagnosticos 
      WHERE Descripcion LIKE '${diagnosys}%' COLLATE Latin1_general_CI_AI`);
      return res.recordsets;
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function insert_diagnosys_saludpol(IdAtencion,
    IdClasificacionDx,
    IdDiagnostico,
    IdSubclasificacionDx,
    labConfHIS,
    GrupoHIS,
    SubGrupoHIS,
    labConfHIScodigo,
    idServicio,
    IdUsuario,
    NroEvaluacion) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('IdAtencion',IdAtencion)
      .input('IdClasificacionDx',IdClasificacionDx)
      .input('IdDiagnostico',IdDiagnostico)
      .input('IdSubclasificacionDx',IdSubclasificacionDx)
      .input('labConfHIS',labConfHIS)
      .input('GrupoHIS',GrupoHIS)
      .input('SubGrupoHIS',SubGrupoHIS)
      .input('labConfHIScodigo',labConfHIScodigo)
      .input('idServicio',idServicio)
      .input('IdUsuario',IdUsuario)
      .input('NroEvaluacion',NroEvaluacion)
      .execute(`INSERTAR_DIAGNOSTICO_SALUDPOL`) 
      return [[{success:"insertado"}]]
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function delete_diagnosys_saludpol(idDiagnostico,IdAtencion) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`DELETE FROM SIGH..AtencionesDiagnosticos
       WHERE IdAtencionDiagnostico = ${idDiagnostico} and IdAtencion = ${IdAtencion}`);
      return [[{success:"eliminado"}]];
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function get_graph(year) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('YEAR',year)
      .execute(`GRAFICO`) 
      return res.recordsets
    } catch (error) {
       return [[{success:"error"}]]
    }
  }

  async function get_graph_box(year) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('year',year)
      .execute(`GRAFICO_CAJA`) 
      return res.recordsets
    } catch (error) {
       return [[{success:"error"}]]
    }
  }
  
  async function search_service(name) {
    const n = name
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`
      SELECT S.IdServicio
      ,S.Nombre AS descripcion
      ,E.Nombre AS especialidad
      ,TS.Descripcion AS tipoServicio
      FROM SIGH..Servicios S
      INNER JOIN SIGH..Especialidades E ON E.IdEspecialidad = S.IdEspecialidad
      INNER JOIN SIGH..TiposServicio TS ON TS.IdTipoServicio = S.IdTipoServicio
      WHERE S.Nombre LIKE '${name}%'  COLLATE Latin1_general_CI_AI
  `);
      return res.recordsets;
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function update_service_in(idService,account) {
    idService = parseInt(idService)
    account = parseInt(account)
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`
      UPDATE SIGH..Atenciones SET IdServicioIngreso = ${idService} WHERE IdCuentaAtencion = ${account} 
  `);
  return [[{success:"actualizado"}]]
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function update_service_out(idService,account) {
    idService = parseInt(idService)
    account = parseInt(account)
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`
      UPDATE SIGH..Atenciones SET IdServicioEgreso = ${idService} WHERE IdCuentaAtencion = ${account} 
  `);
  return [[{success:"actualizado"}]]
    } catch (error) {
      return [[{success:"error"}]]
    }finally {
      sql.close();
    }
  }

  async function update_dx_med_ins(idReceta,idItem,dx) {

    try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('IDRECETA',idReceta)
      .input('IDITEM',idItem)
      .input('DX',dx)
      .execute(`ACTUALIZAR_DX_MED_INS`) 
      return [[{success:"actualizado"}]]
    } catch (error) {
      return [[{success:"error"}]]
    }
  }

  async function update_cod_ate_fua(account,cod){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',account)
      .input('CODIGO',cod)
      .execute(`ACTUALIZAR_COD_ATENCION_FUA`) 
      return [[{success:"actualizado"}]]
    }catch(error){
      return [[{success:"error"}]]
    }

  }

  async function value_production_account(account,ff,nf){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('idCuentaAtencion',account)
      .input('ff',ff)
      .input('nf',nf)
      .execute(`OBTENER_VALORIZADO_CUENTA_FF`) 
      return res.recordsets
    }catch(error){
      return [[{success:"error"}]]
    }

  }


  async function update_type_atention_fua(type,account){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('TIPO',parseInt(type))
      .input('CUENTA',account)
      .execute(`ACTUALIZAR_TIPO_ATENCION_FUA`) 
      return [[{success:"actualizado"}]]
    }catch(error){
      console.log(error)
      return [[{success:"error"}]]
    }
  }

  async function update_dni_fua(type,dni,account,idpaciente){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('TIPO',type)
      .input('DNI',dni)
      .input('CUENTA',account)
      .input('IDPACIENTE',idpaciente)
      .execute(`ACTUALIZAR_DOCUMENTO_PACIENTE`) 
      return [[{success:"actualizado"}]]
    }catch(error){
      return [[{success:"error"}]]
    }
  }

  async function queryAtentionSaludpol(account){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',account)
      .execute(`CONSULTA_CUENTA_NO_FIGURADA`) 
      return res.recordsets
      
    }catch(error){
      return [[{success:"error"}]]
    }
  }

  async function updateDateAtentionSaludpol(account,f1,f2,h1,h2){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',account)
      .input('F1',f1)
      .input('H1',h1)
      .input('F2',f2)
      .input('H2',h2)
      .execute(`ACTUALIZAR_FECHA_CUENTA_SALUDPOL`) 
      return [[{success:"actualizado"}]]
      
    }catch(error){
      return [[{success:"error"}]]
    }
  }

  async function updateDateBirthPatient(id,date){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('IDPACIENTE',id)
      .input('FECHA',date)
      .execute(`ACTUALIZAR_FECHA_NACIMIENTO_PACIENTE`) 
      return [[{success:"actualizado"}]]
      
    }catch(error){
      console.log(error)
      return [[{success:"error"+' '+error}]]
    }
  }

  async function updateReferenceIpress(id,ipress){

    try{
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('CUENTA',id)
      .input('IPRESS',ipress)
      .execute(`ACTUALIZAR_FUA_IPRESS`) 
      return [[{success:"actualizado"}]]
      
    }catch(error){
      console.log(error)
      return [[{success:"error"+' '+error}]]
    }
  }

  async function dateNullPregnancy(account) {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query(`UPDATE SIGH_EXTERNA..SisFuaAtencion SET FuaFechaParto = NULL,
       FuaCondicionMaterna = 0
       WHERE idCuentaAtencion = ${account}`);
      return [[{success:"actualizado"}]]
    } catch (error) {
      console.log("error :" + error);
    }finally {
      sql.close();
    }
  }

  async function addAfiliate(a) {

    console.log('data :'+a)

    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('IDSIASIS', parseInt(a.idSiasis))
            .input('CODIGO', a.Codigo)
            .input('AFILIACIONDISA', a.AfiliacionDisa)
            .input('AFILIACIONTIPOFORMATO', a.AfiliacionTipoFormato)
            .input('AFILIACIONUMEROFORMATO', a.AfiliacionNroFormato)
            .input('AFILIACIONROINTEGRANTE', a.AfiliacionNroIntegrante)
            .input('DOCUMENTOTIPO', a.DocumentoTipo)
            .input('CODIGOESTADSCRIPCION', a.CodigoEstablAdscripcion)
            .input('AFILIACIONFECHA', a.AfiliacionFecha)
            .input('PATERNO', a.Paterno)
            .input('MATERNO', a.Materno)
            .input('PNOMBRE', a.Pnombre)
            .input('ONOMBRE', a.Onombres)
            .input('GENERO', a.Genero)
            .input('FECHANACIMIENTO', a.Fnacimiento)
            .input('IDDISTRITODOMICILIO', a.IdDistritoDomicilio)
            .input('ESTADO', a.Estado)
            .input('FBAJA', a.Fbaja)
            .input('DOCUMENTONUMERO', a.DocumentoNumero)
            .input('MOTIVOBAJA', a.MotivoBaja)
            .input('FBAJAOK', a.FbajaOK)
            .execute('AGREGAR_AFILIADO');
        return [{ success: "actualizado" }];
    } catch (error) {
        console.log(error);
        return [{ success: "error" + ' ' + error.message }];
    }
}


async function updateFullNamePatient(a) {

  try {
      let pool = await sql.connect(config);
      let res = await pool.request()
          .input('IDPACIENTE', parseInt(a.idPaciente))
          .input('PATERNO', a.paterno)
          .input('MATERNO', a.materno)
          .input('NOMBRE1', a.primerNombre)
          .input('NOMBRE2', a.segundoNombre)
          .input('NOMBRE3', a.tercerNombre)
          .execute('ACTUALIZAR_NOMBRE_COMPLETO_PACIENTE');
      return [{ success: "actualizado" }];
  } catch (error) {
      console.log(error);
      return [{ success: "error" + ' ' + error.message }];
  }
}

async function deleteAfiliate(idSiasis) {

  try {
      let pool = await sql.connect(config);
      let res = await pool.request()
          .input('IDSIASIS', idSiasis)
          .execute('BORRAR_AFILIACION');
      return [{ success: "eliminado" }];
  } catch (error) {
      console.log(error);
      return [{ success: "error" + ' ' + error.message }];
  }
}

async function updateSiasisAte(idCuentaAtencion,idSiasis) {

  try {
      let pool = await sql.connect(config);
      let res = await pool.request()
          .input('IDSIASIS', idSiasis)
          .input('CUENTA', idCuentaAtencion)
          .execute('ACTUALIZAR_IDSIASIS_ATE');
      return [{ success: "actualizado" }];
  } catch (error) {
      console.log(error);
      return [{ success: "error" + ' ' + error.message }];
  }
}

async function updateAfiliate(a) {

  console.log(a)

  try {
      let pool = await sql.connect(config);
      let res = await pool.request()
          .input('IDSIASIS', parseInt(a.idSiasis))
          .input('CODIGO', a.Codigo)
          .input('AFILIACIONDISA', a.AfiliacionDisa)
          .input('AFILIACIONTIPOFORMATO', a.AfiliacionTipoFormato)
          .input('AFILIACIONUMEROFORMATO', a.AfiliacionNroFormato)
          .input('AFILIACIONROINTEGRANTE', a.AfiliacionNroIntegrante)
          .input('DOCUMENTOTIPO', a.DocumentoTipo)
          .input('CODIGOESTADSCRIPCION', a.CodigoEstablAdscripcion)
          .input('AFILIACIONFECHA', a.AfiliacionFecha)
          .input('PATERNO', a.Paterno)
          .input('MATERNO', a.Materno)
          .input('PNOMBRE', a.Pnombre)
          .input('ONOMBRE', a.Onombres)
          .input('GENERO', a.Genero)
          .input('FECHANACIMIENTO', a.Fnacimiento)
          .input('IDDISTRITODOMICILIO', a.IdDistritoDomicilio)
          .input('ESTADO', a.Estado)
          .input('FBAJA', a.Fbaja)
          .input('DOCUMENTONUMERO', a.DocumentoNumero)
          .input('MOTIVOBAJA', a.MotivoBaja)
          .input('FBAJAOK', a.FbajaOK)
          .execute('ACTUALIZAR_AFILIADO');
      return [{ success: "actualizado" }];
  } catch (error) {
      console.log(error);
      return [{ success: "error" + ' ' + error.message }];
  }
}

async function getFuaDiagnosys(account) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('CUENTA',account)
    .execute(`OBTENER_DIAGNOSTICO_FUA`) 
    return res.recordsets
  } catch (error) {
    console.log("error : " + error);
  }
}

async function deleteDiagnosysFua(id,account) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('ID',id)
    .input('CUENTA',account)
    .execute(`BORRAR_DIAGNOSTICO_FUA`) 
    return [[{success:"eliminado"}]];
  } catch (error) {
    return [[{success:"error"}]]
  }
}

async function getAuditByDates(f1,f2) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('FechaInicio',f1)
    .input('FechaFin',f2)
    .execute(`AUDITORIA_POR_FECHAS`) 
    return res.recordsets
  } catch (error) {
    console.log("error : " + error);
  }
}

async function getAuditByDatesAndUser(f1,f2,empleado) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('FechaInicio',f1)
    .input('FechaFin',f2)
    .input('empleado',empleado)
    .execute(`AUDITORIA_POR_FECHAS_Y_USUARIO`) 
    return res.recordsets
  } catch (error) {
    console.log("error : " + error);
  }
}

async function getDetailAudit(account,user) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('idCuentaAtencion',account)
    .input('usuario',user)
    .execute(`DETALLE_AUDITORIA`) 
    return res.recordsets
  } catch (error) {
    console.log("error : " + error);
  }
}

async function getAuditByAccount(account) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('CUENTA',account)
    .execute(`AUDITORIA_POR_CUENTA`) 
    return res.recordsets
  } catch (error) {
    console.log("error : " + error);
  }
}


async function deleteSMIAll(x) {
  const account = parseInt(x) 
  try {
    let pool = await sql.connect(config);
    let res = await pool.request().query(`DELETE FROM SIGH_EXTERNA..SisFuaAtencionSMI WHERE idCuentaAtencion = ${account}`);
    return [[{success:"eliminado"}]];
  } catch (error) {
    console.log("error :" + error);
  }finally {
    sql.close();
  }
}

async function deleteSMIEspecific(x,activity) {
  const account = parseInt(x) 
  try {
    let pool = await sql.connect(config);
    let res = await pool.request().query(`DELETE FROM SIGH_EXTERNA..SisFuaAtencionSMI WHERE idCuentaAtencion = ${account} AND IntervencionesPreventivas = '${activity}'`);
    return [[{success:"eliminado"}]];
  } catch (error) {
    console.log("error :" + error);
  }finally {
    sql.close();
  }
}

async function updateInsertSMI(data) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('CUENTA',data.cuenta)
    .input('PESO',data.peso)
    .input('TALLA',data.talla)
    .input('IMC',data.imc)
    .input('PRESION1',data.presion1)
    .input('PRESION2',data.presion2)
    .input('EDADGEST',data.edadGest)
    .input('EDADRN',data.edadRn)
    .input('APGAR305',data.apgar305)
    .input('APGAR306',data.apgar306)
    .input('VACUNABCG',data.vacunaBcg)
    .input('VACUNAHB',data.vacunaHb)
    .execute(`INSERTAR_SMI`) 
    return [[{success:"insertado"}]];
  } catch (error) {
    console.log("error : " + error);
  }
}

async function setEspecifics(values) {
  try {
    let pool = await sql.connect(config);
    let formattedValues = values.map(value => {
      let [FuaLote, FuaNumero] = value.split("|");
      return `('${FuaLote}', '${FuaNumero}')`;
    });
    let res = await pool
      .request()
      .query(`
      DELETE FROM BD_SIS_TOOLS..tramaFuaEspecificos;
      INSERT INTO BD_SIS_TOOLS..tramaFuaEspecificos (FuaLote, FuaNumero) VALUES ${formattedValues.join(", ")}`);
    return res.recordsets;
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    sql.close();
  }
}

async function updatePaperNumReference(account,num) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('ID',account)
    .input('NRO',num)
    .execute(`ACTUALIZAR_HOJA_DE_REFERENCIA`) 
    return [[{success:"actualizado"}]];
  } catch (error) {
    console.log("error : " + error);
  }
}


module.exports = {
  getdata: getdata,
  sendTrama:sendTrama,
  sendTramaDebug:sendTramaDebug,
  getdata_invoice_charge:getdata_invoice_charge,
  getdata_by_num_doc:getdata_by_num_doc,
  getdata_by_razon_social:getdata_by_razon_social,
  getdata_status_invoice:getdata_status_invoice,
  update_status_invoice:update_status_invoice,
  insurance_report:insurance_report,
  status_atention:status_atention,
  status_atention_pro:status_atention_pro,
  diag_and_proc:diag_and_proc,
  diag_and_proc_by_name:diag_and_proc_by_name,
  diag_and_proc_by_code:diag_and_proc_by_code,
  production:production,
  production_ins_med:production_ins_med,
  searchAffiliate:searchAffiliate,
  searchAffiliateByName:searchAffiliateByName,
  discharge_control:discharge_control,
  discharge_control_with_procedures:discharge_control_with_procedures,
  tramaAtencion:tramaAtencion,
  getTramaAtencion:getTramaAtencion,
  tramaDiagnostico:tramaDiagnostico,
  getTramaDiagnostico:getTramaDiagnostico,
  tramaMedicamentos:tramaMedicamentos,
  getTramaMedicamentos:getTramaMedicamentos,
  tramaInsumos:tramaInsumos,
  getTramaInsumos:getTramaInsumos,
  tramaProcedimientos:tramaProcedimientos,
  getTramaProcedimientos:getTramaProcedimientos,
  tramaSMI:tramaSMI,
  getTramaSMI:getTramaSMI,
  tramaSER:tramaSER,
  getTramaSER:getTramaSER,
  tramaRN:tramaRN,
  getTramaRN:getTramaRN,
  getLastCorrelative:getLastCorrelative,
  setTramaRESUMEN:setTramaRESUMEN,
  setTramaRESUMENDEBUG:setTramaRESUMENDEBUG,
  getTramaRes:getTramaRes,
  getTramaResDebug:getTramaResDebug,
  getFuaByNumAndLote:getFuaByNumAndLote,
  getFuaByAccount:getFuaByAccount,
  getFuaByDNI:getFuaByDNI,
  getFuaByFullname:getFuaByFullname,
  getEmployee:getEmployee,
  getEmployeeByDniAndUser:getEmployeeByDniAndUser,
  setUser:setUser,
  getPackageTrama:getPackageTrama,
  setExcludes:setExcludes,
  setIncludes:setIncludes,
  constructTramaSaludpol:constructTramaSaludpol,
  constructTramaSaludpolExcludes:constructTramaSaludpolExcludes,
  constructTramaSaludpolIncludes:constructTramaSaludpolIncludes,
  constructTramaSaludpolExcludesAndIncludes:constructTramaSaludpolExcludesAndIncludes,
  generateTramaSaludpol:generateTramaSaludpol,
  getAtentionSaludpol:getAtentionSaludpol,
  updateSisFiliacion:updateSisFiliacion,
  production_saludpol:production_saludpol,
  id_procedure:id_procedure,
  id_laboratory:id_laboratory,
  id_image:id_image,
  update_quantity_procedure:update_quantity_procedure,
  update_dni_patient:update_dni_patient,
  update_gender_patient:update_gender_patient,
  update_date_atention:update_date_atention,
  update_nro_ref_origin:update_nro_ref_origin,
  get_data_medic:get_data_medic,
  update_dni_digitador:update_dni_digitador,
  get_data_validate_catalog:get_data_validate_catalog,
  delete_procedure_saludpol:delete_procedure_saludpol,
  search_procedure:search_procedure,
  search_procedure_by_code:search_procedure_by_code,
  add_procedure_saludpol:add_procedure_saludpol,
  search_fua_by_num_and_size:search_fua_by_num_and_size,
  search_medic_fua:search_medic_fua,
  update_medic_fua:update_medic_fua,
  get_sub_diagnosys:get_sub_diagnosys,
  get_diagnosys:get_diagnosys,
  insert_diagnosys_saludpol:insert_diagnosys_saludpol,
  delete_diagnosys_saludpol:delete_diagnosys_saludpol,
  add_laboratory_saludpol:add_laboratory_saludpol,
  delete_laboratory_saludpol:delete_laboratory_saludpol,
  add_mov_laboratory_saludpol:add_mov_laboratory_saludpol,
  add_mov_images_saludpol:add_mov_images_saludpol,
  get_graph:get_graph,
  get_graph_box:get_graph_box,
  search_service:search_service,
  update_service_in:update_service_in,
  update_service_out:update_service_out,
  delete_images_saludpol:delete_images_saludpol,
  get_type_finance:get_type_finance,
  update_dx_med_ins:update_dx_med_ins,
  update_cod_ate_fua:update_cod_ate_fua,
  value_production_account:value_production_account,
  update_type_atention_fua:update_type_atention_fua,
  update_dni_fua:update_dni_fua,
  queryAtentionSaludpol:queryAtentionSaludpol,
  updateDateAtentionSaludpol:updateDateAtentionSaludpol,
  updateDateBirthPatient:updateDateBirthPatient,
  update_date_pregnancy:update_date_pregnancy,
  updateReferenceIpress:updateReferenceIpress,
  getAfiliateWebService:getAfiliateWebService,
  getAfiliateWebServiceData:getAfiliateWebServiceData,
  dateNullPregnancy:dateNullPregnancy,
  addAfiliate:addAfiliate,
  updateFullNamePatient:updateFullNamePatient,
  deleteAfiliate:deleteAfiliate,
  updateSiasisAte:updateSiasisAte,
  updateAfiliate:updateAfiliate,
  searchAffiliateByNameV2:searchAffiliateByNameV2,
  getFuaDiagnosys:getFuaDiagnosys,
  deleteDiagnosysFua:deleteDiagnosysFua,
  getAuditByDates:getAuditByDates,
  getAllUsers:getAllUsers,
  getAuditByDatesAndUser:getAuditByDatesAndUser,
  getDetailAudit:getDetailAudit,
  getAfiliateArfsisWeb:getAfiliateArfsisWeb,
  deleteSMIAll:deleteSMIAll,
  deleteSMIEspecific:deleteSMIEspecific,
  updateInsertSMI:updateInsertSMI,
  setEspecifics:setEspecifics,
  tramaAtencionEspecificos:tramaAtencionEspecificos,
  tramaDiagnosticoEspecificos:tramaDiagnosticoEspecificos,
  tramaMedicamentosEspecificos:tramaMedicamentosEspecificos,
  tramaInsumosEspecificos:tramaInsumosEspecificos,
  tramaProcedimientosEspecificos:tramaProcedimientosEspecificos,
  tramaSMIEspecificos:tramaSMIEspecificos,
  tramaSEREspecificos:tramaSEREspecificos,
  tramaRNEspecificos:tramaRNEspecificos,
  getTramaAtencionEspecific:getTramaAtencionEspecific,
  getTramaDiagnosticoEspecific:getTramaDiagnosticoEspecific,
  getTramaInsEspecific:getTramaInsEspecific,
  getTramaMedEspecific:getTramaMedEspecific,
  getTramaProEspecific:getTramaProEspecific,
  getTramaRNEspecific:getTramaRNEspecific,
  getTramaSEREspecific:getTramaSEREspecific,
  getTramaSMIEspecific:getTramaSMIEspecific,
  updatePaperNumReference:updatePaperNumReference,
  getAuditByAccount:getAuditByAccount
};
