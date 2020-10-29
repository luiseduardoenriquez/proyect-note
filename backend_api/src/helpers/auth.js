const helpers = {}; // un objeto con multiples metodos 

// Al parecer el isAuthenticated es una palabra reservada 

helpers.isAuthenticated = function(req, res, next){  // un metodo de autenticar y es un middwear vamos a comprar si existe o no el usaurio

    if (req.isAuthenticated()) {      //passport tiene la funcion que hace estas validaciones tambien, si esta funcion, si el usauario se ha logueado devuelve un TRUE y si no se ha logueado entonces le enviamos un error y lo redireccionamos
        return next();          // si se encuentra autenticado entonces siga
    }

    req.flash('error_msg', 'No esta autorizado');
    res.redirect('/users/signin');
};

module.exports = helpers;