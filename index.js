const express = require('express');
const http = require('http')

const port = process.env.port || 8080

const router = require('./app.js')
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true}));
app.use(router)

server.listen(port, () => console.log('SERVIDOR INICIADO'));
server.setTimeout(5040000);

function startServer() {
    server.listen(port, () => console.log('SERVIDOR INICIADO'));
  }
  
  function runServer() {
    try {
      startServer();
    } catch (error) {
      console.error('Se produjo un error no manejado:', error);
      // Vuelve a ejecutar el servidor después de un pequeño retraso
      setTimeout(runServer, 1000); // Reintentar después de 1 segundo
    }
  }
  
  //runServer(); // Inicia el servidor por primera vez
  /*
  process.on('uncaughtException', (err) => {
    console.error('Error no manejado global:', err);
    // Vuelve a ejecutar el servidor después de un pequeño retraso
    setTimeout(runServer, 1000); // Reintentar después de 1 segundo
  });*/
  
