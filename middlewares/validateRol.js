const { request, response } = require("express");


const isValidAdminRole = (req = request, res = response, next) => {

    if( !req.user ) {
        return res.status(500).json({
            msg: 'Se esta tratando de validar permisos de usuario sin un token.'
        });
    }

    const { rol, name } = req.user;


    if(rol != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no tiene permisos para esta accion.`
        });
    }
    
    next();
}


const isValidRols = ( ...rols ) => {
    return (req, res, next) => {
        if( !req.user ) {
            return res.status(500).json({
                msg: 'Se esta tratando de validar permisos de usuario sin un token.'
            });
        }


        const { rol, name } = req.user;

        if( !rols.includes(rol) ) {
            return res.status(401).json({
                msg: `Rol ${rol} no tiene permisos para esta accion.`
            });
        }

        next();
    }
}


module.exports = {
    isValidAdminRole,
    isValidRols
};