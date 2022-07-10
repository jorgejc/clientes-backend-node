const { Router } = require('express');
const router = Router();
const Cliente = require('../modelos/Cliente');
const TipoDocumento = require('../modelos/TipoDocumento');
const { validarCliente } = require('../helpers/validar-cliente');


router.post('/', async function(req, res) {

    //usamos la desestructuracion para sacar las propiedades de req.body
    const { numeroDocumento, tipoDocumento } = req.body 
    try{
        const validaciones = validarCliente(req);

        if(validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeDocumentoCliente = await Cliente
            .findOne({ numeroDocumento, tipoDocumento });
        if (existeDocumentoCliente) {
            return res.send('Ya existe el documento para otro cliente').status(400);
        }

        let cliente = new Cliente();
        cliente.numeroDocumento = req.body.numeroDocumento;
        cliente.nombre = req.body.nombre;
        cliente.apellidos = req.body.apellidos;
        cliente.edad = req.body.edad;
        cliente.telefono = req.body.telefono;
        cliente.direccion = req.body.direccion;
        cliente.tipoDocumento = req.body.tipoDocumento._id;
        cliente.fechaCreacion = new Date();
        cliente.fechaActualizacion = new Date();


        cliente = await cliente.save();

        res.status(201).send(cliente);
       
    } catch(error) {
        console.log(error).status(500);
        res(500).send('Ocurrió un error al consultar cliente');
    }

    // console.log(req.body); //los datos se recuperan a través de req.body
    // res.send(req.body); // se responden los datos en el body a través de req

});

router.get('/', async function(req, res) {
    try{
        const clientes = await Cliente.find().populate([
            {
                path: 'tipoDocumento', select: 'nombre'
            }
        ]);
        res.send(clientes);
    } catch(error) {
        console.log(error).status(500);
        res.status(500).send('Ocurrió un error al consultar cliente');
    }
});

router.put('/:id', async function(req, res) {
    try{

        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).send('Cliente no existe');
        }

        let tipoDocumentoExiste = await TipoDocumento.findById(req.body.tipoDocumento._id);
        if(!tipoDocumentoExiste) {
            return res.status(404).send('No existe tipo documento');
        }

        const clienteExiste = await Cliente
            .findOne({ numeroDocumento: req.body.numeroDocumento, tipoDocumento:  req.body.tipoDocumento, _id: { $ne: cliente._id } });
        if (clienteExiste) {
            return res.status(400).send('Ya existe documento para otro cliente');
        }  
        
        cliente.numeroDocumento = req.body.numeroDocumento;
        cliente.nombre = req.body.nombre;
        cliente.apellidos = req.body.apellidos;
        cliente.edad = req.body.edad;
        cliente.telefono = req.body.telefono;
        cliente.direccion = req.body.direccion;
        cliente.tipoDocumento = req.body.tipoDocumento._id;
        cliente.fechaActualizacion = new Date();

        cliente = await cliente.save();

        res.status(201).send(cliente);

    } catch (error) {
        res.status(500).send('ocurrió un error');
        console.log(error);
    }
});

module.exports = router;