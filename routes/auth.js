const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('./../controllers/auth');
const { validateUserFields } = require('../middlewares/validateFields');


const router = Router();

router.post('/login', [
    check('email', 'Email inválido.').isEmail(),
    check('password', 'La contraseña es requerida.').not().isEmpty(),
    validateUserFields
], login);


router.post('/google-sign-in', [
    check('idToken', 'El token de google es requerido.').not().isEmpty(),
    validateUserFields
], googleSignIn)

module.exports = router;

