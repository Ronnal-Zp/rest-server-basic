const { request, response } = require('express');
const Category = require('../models/category')


const getCategories = async (req = request, res = response) => {

    let { limit = 5, offset = 0} = req.query;
    
    if(isNaN(limit)) 
        limit = 5;
    if(isNaN(offset)) 
        offset = 0;

    const query = { estado: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query).limit(limit).skip(offset).populate("user")
    ])


    res.json({
        msg: 'OK',
        total,
        categories
    });
}


const getCategoryById = async (req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findById( id );

    res.json({
        msg: 'OK',
        category
    });
}


const categoriesPost = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });


    if( categoryDB ) {
        return res.status(400).json({
            msg: `Ya existe un categoria con el nombre ${ category.name }`
        })
    }

    const category = new Category({
        name,
        user: req.user._id
    });

    await category.save();

    return res.status(201).json({
        msg: 'OK',
        category
    });
}


const categoriesPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, user, ...data  } = req.body;
    
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findOneAndUpdate({ _id: id }, data, { new: true});
    
    return res.json({
        msg: 'OK',
        category
    });
}


const categoriesDelete = async (req = request, res = response) => {

    const id = req.params.id;
    const category = await Category.findOneAndUpdate({ _id: id }, { estado: false }, { new: true});

    res.json({
        msg: 'OK',
        category
    });
}


module.exports = {
    getCategories,
    getCategoryById,
    categoriesPost,
    categoriesPut,
    categoriesDelete
}