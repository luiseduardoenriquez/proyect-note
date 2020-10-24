 const mongoose = require('mongoose');
 const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({

    name: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}

})
//lo que le decimos es que vamos a hacer un metodo en este Schema
UserSchema.methods.encryptPassword = async function(password){
   const salt = await bcrypt.genSalt(10);     //estoy es para generar un hash y para decir cuantas veces hara el ciclo y se demora en aplicar el algoritmo por eso es asincrono ese hash se da a la contraseña
   const hash = bcrypt.hash(password, salt);  // y aca ya se unen las dos cosas y se obtiene una contraseña cifrada
   return hash;                               // y retornamos la contraseña cifrada

};   

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);   // comparamos la contraseña que me da el usuario y la contraseña que tengo en el modelo de datos y eso tambien se demora entonces toca usar el await y asyc
};

module.exports = mongoose.model('User', UserSchema);