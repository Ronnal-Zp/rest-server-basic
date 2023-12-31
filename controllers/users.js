const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');



const usersGet = async (req = request, res = response) => {

    let { limit = 5, offset = 0} = req.query;
    const query = { estado: true };

    if(isNaN(limit)) 
        limit = 5;
    
    if(isNaN(offset))
        offset = 0;


    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
                    .limit(limit)
                    .skip(offset)
    ]);


    res.json({usuarios, total});
}

const userGetById = async (req = request, res = response) => {
    const { id } = req.params;
    
    const user = await User.findById(id);

    res.json({
        msg: 'ok',
        data: user
    })
}

const usersPost = async (req, res = response) => {

    const { name, password, email, rol } = req.body;
    const user = new User({ name, password, email, rol });


    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    await user.save();


    res.json({
        msg: 'ok',
        data: user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, google, password, email, ...data } = req.body;


    if(password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }


    const userUpdated = await User.findByIdAndUpdate(id, data);


    res.json({
        msg: 'ok',
        data: userUpdated
    });
}


const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    const query = { _id: id, estado: true};

    const user = await User.findOne(query);
    user.estado = false;

    await user.save();

    res.json({
        msg: 'ok',
        data: user
    });
}




module.exports = {
    usersGet,
    userGetById,
    usersPost,
    usersPut,
    usersDelete,
}