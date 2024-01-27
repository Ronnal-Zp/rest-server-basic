const Category = require('../models/category');
const Role     = require('../models/role');
const User     = require('../models/user');

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


const validateUserDelete = async (id) => {
    const query = {_id: id, estado: false}
    const existUser = await User.findOne(query);

    if(existUser) {
        throw new Error(`Este usuario ya ha sido eliminado`);
    }
}


const validateCategoryById = async (id = '') => {
    const query = { _id: id, estado: true };
    const existsCategory = await Category.find(query);

    if( !existsCategory ) {
        throw new Error(`Categoria con ID ${id} no existe`);
    }
}



module.exports = {
    validateRol,
    validateEmail,
    validateUserById,
    validateUserDelete,
    validateCategoryById
}