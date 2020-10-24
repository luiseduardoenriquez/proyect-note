 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({   // Para definir una nueva estrategia de autenticacion aqui definimos por que cosas vamos a autenticar a nuestro usuario en este caso, que parametros enviara para autenticarlo 
    usernameField: 'email', // atraves de que se autenticara el usuario
                            // Estar pendiente de la d en field , lo que me estaba causando error
                            // 
}, async function(email, password, done){  // que cosas se recibiran 
   const user = await User.findOne({email: email}); // con esto buscaremos en la base de datos que nos da el usaurio , para ver si existe o no
   
                                                    // Tener cuidado aqui ya que Este User con la U mayuscula se refiere a la constante que definimos arriba y los de ahi para abajo ya son los que declaramos de esa linea 
   if (!user) {  // con esto autenticamos si se encuentra o si no se encuentra

       return done(null, false, { message: 'No se encontro el usuario'}); // Null para el error, false para el usuario, y que mensaje enviaremos
                    // Es para retornar un error, si retorna false es porque no ha encontrado un usuario y luego un mensaje
   } else {    // Y si encontro el correo entonces empezamos a validar la contraseña

       const match = await user.matchPassword(password); // mediante el metodo que hicimos en nuesto Schema

       if (match) {
            return done(null, user);
            
       } else {
           return done(null, false, {message: 'Contraseña Incorrecta'}); 
       }

   }

}));

passport.serializeUser(function(user, done){   // Aca lo que hacemos es almacenar un usuario y un callback, // cuando un usuario se autetique guardemos al usaurio en un session, aca almacenamos al usuario en una session
    done(null, user.id);
});

passport.deserializeUser(function(id, done){

    User.findById(id, function(err,  user){
        done(null, user); // Toma un id y un callback, este es el processo inverso, toma el id de la session // si hay un usuario en la session entonces se busca por el id, y si se encuentra lo devuelve y si no tambien
    }).lean();            // Aca le agregamos el .lean para que pudiera funcionar

});

// Lo que hacemos en estas lineas de codigo es que agarra el id y lo guarda en una session, pero con la otra lo que hacemos es que agarramos ese id que esta en session y hacemos una busquedad a la base de datos
// y la devolvemos con todo el resultado, todo lo de su interior