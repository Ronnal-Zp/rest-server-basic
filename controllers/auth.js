const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');
const generateJWT = require('./../helpers/generate-jwt');
const googleVerifyToken = require('../helpers/google-verify-token');


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
            msg: 'OK',
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


const googleSignIn = async (req = request, res = response) => {
    const { idToken } = req.body;

    try {
        const { email, name, picture: img } = await googleVerifyToken(idToken);

        let user = await User.findOne({ email });

        
        if( !user ) {
            
            const data = {
                name,
                email,
                estado: true,
                google: true,
                rol: 'USER_ROLE',
                password: '',
                img
            }

            user = new User( data );
            await user.save();
        }


        if( user.estado == false ) {
            res.status(401).json({
                msg: 'El usuario se encuentra inactivo.'
            });
        }


        const token = await generateJWT( user.id );

        res.json({
            msg: 'OK',
            data: user,
            token
        });

    } catch (error) {
        
        res.status(401).json({
            msg: 'El token es invalido o ha caducado.'
        });

    }

}


module.exports = {
    login,
    googleSignIn
}