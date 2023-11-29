const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'] 
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerido'] 
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'] 
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model('User', UserSchema);
