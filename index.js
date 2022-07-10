//importamos express que nos sirve para crear un servidor web
const express = require('express');
//importamos el método getConnection
const { getConnection } = require('./db/connection-mongo');

//creamos una variable a través de la importación a express
const app = express();
//como es contener web va a correr sobre el puerto 3000
const port = 3000; //http://localhost:3000

getConnection();

//Parseo JSON
app.use(express.json());

app.use('/cliente', require('./router/cliente'));
app.use('/tipoDocumento', require('./router/tipoDocumento'));

 //al levantar esta aplicación va a escuchar todas las peticiones que le lleguen al servid 
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });