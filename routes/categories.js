const { Router } = require('express');
const { check }  = require('express-validator');
const { validateUserFields, validateJWT, isValidAdminRole } = require('../middlewares');
const { validateCategoryById } = require('../helpers/db-validators');

const { 
    getCategories,
    getCategoryById,
    categoriesPost,
    categoriesPut,
    categoriesDelete
} = require('../controllers/categories')



const router = Router();


router.get('/', getCategories);


router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( validateCategoryById ),
    validateUserFields
], getCategoryById);


router.post('/', [
    validateJWT,
    check('name', 'El nombre es requerido.').not().isEmpty(),
    validateUserFields
], categoriesPost);


router.put('/:id', [
    validateJWT,
    isValidAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('name', 'El nombre de la categoria es requerido.').not().isEmpty(),
    check('id').custom( validateCategoryById ),
    validateUserFields
], categoriesPut);


router.delete('/:id', [
    validateJWT,
    isValidAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( validateCategoryById ),
    validateUserFields
], categoriesDelete);



module.exports = router;