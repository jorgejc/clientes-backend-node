const { Router } = require('express');
const router = Router();
const TipoDocumento = require('../modelos/TipoDocumento');

router.post('/', async function(req, res) {
    try{

        let tipoDocumento = new TipoDocumento();
        tipoDocumento.nombre = req.body.nombre;
        tipoDocumento.fechaCreacion = new Date();
        tipoDocumento.fechaActualizacion = new Date();

        tipoDocumento = await tipoDocumento.save();

        res.status(201).send(tipoDocumento);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió error al consultar tipo documento')

    }
     
});

router.get('/', async function(req, res) {
    try{
        const tiposDocumento = await TipoDocumento.find();
        res.send(tiposDocumento);
    } catch(error) {
        console.log(error);
        res.send('Ocurrió un error al consultar inventario');
    }
});

//Listar por Id
router.get('/:id', async function(req, res) {
    try{
        const tipoDocumento = await TipoDocumento.findById(req.params.id);
        if(!tipoDocumento) {
            return res.status(404).send('Tipo documento no existe');
        }
        res.send(tipoDocumento);
    } catch(error) {
        console.log(error);
        res.send('Ocurrió un error al consultar inventario');
    }
});

router.put('/:id', async function(req, res) {
    try{
        let tipoDocumento = await TipoDocumento.findById(req.params.id);
        if(!tipoDocumento) {
            return res.status(404).send('Tipo documento no existe');
        }

        tipoDocumento.nombre = req.body.nombre;
        tipoDocumento.fechaActualizacion = new Date();

        tipoDocumento = await tipoDocumento.save();

        res.status(201).send(tipoDocumento);

    } catch(error) {
        console.log(error);
        res.send('Ocurrió un error al consultar tipo documento');
    }
});

module.exports = router;