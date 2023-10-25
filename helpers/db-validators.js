const Role = require('./../models/role');
const User = require('./../models/user');

const validateRol = async (rol ='') => {
    const existsRole = await Role.findOne({ rol });

    if(!existsRole) {
        throw new Error(`El rol '${ rol }' no se encuentra en la DB`);
    }
}


const validateEmail = async(email = '') => {
    const existUser = await User.findOne({ email })

    if(existUser) {
        throw new Error(`El email '${ email }' ya encuentra registrado`);
    }
}


const validateUserById =  async (id = '') => {
    const existUser = await User.findById(id);

    if(!existUser) {
        throw new Error(`El usuario con ID '${ id }' no existe`);
    }
}


module.exports = {
    validateRol,
    validateEmail,
    validateUserById
}