const server = 'shsr1'
const port = 1433
const database = 'BD_SIS_TOOLS'
const user = 'poa3'
const password = 'poa15121001'

const config = {
    user: user,
    password: password,
    database: database,
    server: server,
    port:port,
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
      cryptoCredentialsDetails: {
        minVersion: 'TLSv1'
    }
    }
  }

module.exports = config;


/*

//PROD
const server = 'shsr1'
const port = 1433
const database = 'BD_SIS_TOOLS'
const user = 'poa3'
const password = 'poa15121001'


//DEV
const server = 'localhost'
const port = 49926
const database = 'BD_SIS_TOOLS'
const user = 'root'
const password = 'root'

  */