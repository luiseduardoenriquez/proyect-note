const express = require('express');
const router = express.Router();    // este enrutador nos permite crear rutas en el servidor
const User = require('../models/User');

const passport = require('passport');
const { route } = require('.');


router.get('/users/signin', function(req, res){
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',  // si todo esta bien que le muestre esta vista 
    failureRedirect: '/users/signin', // si no esta bien entonces que le muestre nuevamente el signin
    failureFlash: true
})); // al hacer esto ya passport hara todo el trabajo de autenticar al usuario y ya aca determinamos si le mandamos o no la vista









router.get('/users/signup', function(req, res){
    res.render('users/signup');
});

router.post('/users/signup', async function(req, res){
   // console.log(req.body); // Muy efectivo para saber que esta llegando
   const {name, email, password, confirm_password} = req.body;
   
   const errors = []; 

   if (password == "") {
        errors.push({text: 'Escriba una constraseña'});
   }
   if (password != confirm_password) {
        errors.push({text: 'La contraseña no coincide'});
   }

    if(password.lengh < 4){
        errors.push({text: 'La contraseña No tiene suficiente longitud'});
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {

        const emailUser = await User.findOne({email: email});


        if (emailUser) {   // Vamos a validad mediante la consulta que hicimos anteriore mente que si el email, que esta ingresando que si la base de datos encuentra un registro, entonces que mande un mensaje de advertencia y lo rediriga
            req.flash('error_msg', 'El email ya se escuentra registrado');
            res.redirect('/users/signup');
        }
       const newUser =  new User({name, email, password});

       newUser.password = await newUser.encryptPassword(password);
       await newUser.save();

       req.flash('success_msg', 'Te has registrado satisfactoriamente');
       res.redirect('/users/signin');
    }
});



router.get('/users/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

// Las direcciones pueden ser iguales a las cuales se puede pedir algo, y no afectarian la diferencia seria por que metodo se esta enviando

module.exports = router;