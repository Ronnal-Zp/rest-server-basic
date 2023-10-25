
const { Router } = require('express');
const { check }  = require('express-validator');

const { validateRol, validateUser } = require('./../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');
const { validateUserFields } = require('../middlewares/validateFields');

const router = Router();


router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/', [
    check('email', 'Email invalido').isEmail(),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password debe tener al menos 8 caracteres').isLength({ min: 8 }),
    // check('rol', 'Rol incorrecto').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validateRol ),
    check('email').custom( validateUser ),
    validateUserFields
], usersPost);

router.delete('/', usersDelete );

router.patch('/', usersPatch );





module.exports = router;