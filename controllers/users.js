const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');



const usersGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usersPost = async (req, res = response) => {

    const { name, password, email, rol } = req.body;
    const user = new User({ name, password, email, rol });


    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    await user.save();


    res.json({
        msg: 'post API - usersPost', 
        user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, google, password, email, ...user } = req.body;


    if(password) {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }


    const userUpdated = await User.findByIdAndUpdate(id, user);


    res.json({
        msg: 'put API - usersPut',
        userUpdated
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usersDelete'
    });
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}