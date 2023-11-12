
const { Router } = require('express');
const { check }  = require('express-validator');

const { validateRol, 
        validateEmail, 
        validateUserById, 
        validateUserDelete } = require('./../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');
const { validateUserFields } = require('../middlewares/validateFields');

const router = Router();


router.get('/', usersGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( validateUserById ),
    validateUserFields
], usersPut );

router.post('/', [
    check('email', 'Email invalido').isEmail(),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password debe tener al menos 8 caracteres').isLength({ min: 8 }),
    // check('rol', 'Rol incorrecto').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validateRol ),
    check('email').custom( validateEmail ),
    validateUserFields
], usersPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( validateUserById ),
    check('id').custom( validateUserDelete ),
    validateUserFields
], usersDelete);

router.patch('/', usersPatch );





module.exports = router;