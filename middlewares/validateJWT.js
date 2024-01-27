const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization');

    if( !token ) {
        return res.status(401).json({
            msg: 'Debe proporcionar el token.'
        })
    }


    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY_ENCRYPT)
    
        const user = await User.findOne({ _id: uid });
        

        if( !user ) {
            return res.status(401).json({
              msg: 'No existe usuario.'
            });  
        }


        if( !user.estado ) {
          return res.status(401).json({
            msg: 'El usuario se encuentra eliminado.'
          });  
        }

        
        req.user = user;
        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            msg: 'Token inválido.'
        })
    }

}


module.exports = validateJWT