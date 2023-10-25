const Role = require('./../models/role');

const validateRol = async (rol ='') => {
    const existsRole = await Role.findOne({ rol });

    if(!existsRole) {
        throw new Error(`El rol '${ rol }' no se encuentra en la DB`);
    }
}


module.exports = {
    validateRol
}