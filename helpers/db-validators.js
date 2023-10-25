const Role = require('./../models/role');
const User = require('./../models/user');

const validateRol = async (rol ='') => {
    const existsRole = await Role.findOne({ rol });

    if(!existsRole) {
        throw new Error(`El rol '${ rol }' no se encuentra en la DB`);
    }
}


const validateUser = async(email = '') => {
    const existUser = await User.findOne({ email })

    if(existUser) {
        throw new Error(`El email '${ email }' ya encuentra registrado`);
    }
}



module.exports = {
    validateRol,
    validateUser
}