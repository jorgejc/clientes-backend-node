const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    numeroDocumento: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    edad: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    tipoDocumento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento',
        required: true,
        //unique: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    },
});

module.exports = model('Cliente', ClienteSchema);