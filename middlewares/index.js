const validateFields = require('../middlewares/validateFields');
const validateRol = require('../middlewares/validateRol');
const validateJWT = require('../middlewares/validateJWT');

module.exports = {
    ...validateFields,
    ...validateRol,
    validateJWT
}

