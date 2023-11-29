const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');
const generateJWT = require('./../helpers/generate-jwt');


const login = async (req = request, res = response) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });


        if(!user) {
            return res.json({
                msg: 'El correo no esta asociado a un usuario.'
            }); 
        }


        if(user.estado == false) {
            return res.json({
                msg: 'El usuario esta inactivo.'
            });
        }


        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.json({
                msg: 'Credenciales incorrectas.'
            });
        }


        const token = await generateJWT( user.id );

        res.json({
            msg: 'ok',
            data: user,
            token
        });

    } catch (error) {
        console.log('ERROR: ', error);

        res.status(500).json({
            msg: 'Algo salio mal :('
        });    
    }

}


module.exports = {
    login
}