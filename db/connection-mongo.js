//importamos mongoose
const mongoose = require('mongoose');

//creamos una funcion flecha la cual se va a encargar de realizar la conexión a la bd
//es una función asíncrona, ya que va a realizar llamados asíncronos a un metodo particular
//por ejemplo el método de conectarnos a nuesta aplicación
const getConnection = async () => {
    try{
        const url = 'mongodb://user_bd:Vznh497T3lR47iEI@cluster0-shard-00-00.ipcfa.mongodb.net:27017,cluster0-shard-00-01.ipcfa.mongodb.net:27017,cluster0-shard-00-02.ipcfa.mongodb.net:27017/clientes-bd?ssl=true&replicaSet=atlas-uh6d7e-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);
    
        console.log('Conexion exitosa');

    }catch (error) {
        console.log(error);
    } 
}

module.exports = {
    getConnection,
}