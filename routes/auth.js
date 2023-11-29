const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('./../controllers/auth');
const { validateUserFields } = require('../middlewares/validateFields');


const router = Router();

router.post('/login', [
    check('email', 'Email inválido.').isEmail(),
    check('password', 'La contraseña es requerida.').not().isEmpty(),
    validateUserFields
], login);


module.exports = router;

