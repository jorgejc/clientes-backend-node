const { Schema, model } = require('mongoose');

const TipoDocumentoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        enum: [
            'CC', 'TI', 'CE', 'PEP'
        ]
    },

    fechaCreacion: {
        type: Date,
        required: true,
    },

    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

module.exports = model('TipoDocumento', TipoDocumentoSchema);