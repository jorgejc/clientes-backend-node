const validarCliente = (req) => {
    const validaciones = [];

    if (!req.body.serial) {
        validaciones.push('Número de documento es requerido')
    }

    if (!req.body.serial) {
        validaciones.push('Nombre es requerido')
    }

    if (!req.body.serial) {
        validaciones.push('Apellido es requerido')
    }

    if (!req.body.serial) {
        validaciones.push('Edad es requerida')
    }

    if (!req.body.serial) {
        validaciones.push('teléfono es requerido')
    }

    if (!req.body.serial) {
        validaciones.push('dirección es requerido')
    }

    if (!req.body.serial) {
        validaciones.push('Tipo de documento es requerido')
    }

    return validaciones;
}

module.exports = {
    validarCliente,
}