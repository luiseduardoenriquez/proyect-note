// para poder arrancar nuestro servidor

//Required
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride =  require('method-override');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');

// Initializations          Se inicializaran todos los modulos
const app = express();
require('./database');                                      // Llamamos el archivo el cual contiene la configuracion de la base de datos, y al incluirla ya estara nuestra base de datos conectada con nuestro proyecto
require('./config/passport');

// Settings 
app.set('port', process.env.PORT || 3000);                // el process.env sirva para decirle que si hay uno disponible lo tome o sino el que le declaro
app.set('views', path.join(__dirname, 'views'));         // Este es porque como metimos todo el proyecto dentro de una carpeta src es para evitar esos probelmas
app.engine('.hbs', exphbs({

    defaultLayout:'main',
    layoutsDir   :path.join(app.get('views'), 'layouts'), // concatenamos la direccion de donde esta la carpeta la cual tiene el archivo main
    partialsDir  :path.join(app.get('views'), 'partials'),
    extname      :'.hbs'  // se especifica cual es la extension de los archivos

}));                                                      // Es para no escribir la navegacion en todos los archivos lo que hacemos es hacer una especie de 
                                                         // plantilla o de marco, al configurar esto, y especificar los archivos automaticamente se duplica esa vista y esto remplaza el required de las vistas en todas las demas
app.set('view engine', '.hbs');                         // para configurar que motor de vistas vamos a usar con esto lo contiguramos

// Middlewares                                       iran todas las funciones que seran ejecutadas antes de pasarselas a las rutas

app.use(express.urlencoded({extended: false}))         // sirve para cuando un formulario va a leer un dato el servidor pueda leerlo y falso es para que no acepte imagenes
app.use(methodOverride('_method'))                            // especificamos atravez de que propiedad o que input el formulario nos enviaria los metodos con el cual queremos extender la funcionabilidad
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));                                                    // atravez de esta configuracion atravez de express se podra autenticar y validar sessiones

app.use(passport.initialize()); // para inicializar la sesison
app.use(passport.session()); // para guardarlo en una session
app.use(flash());            // el orden de como se llaman las cosas aqui influyen a la hora de que no vayan a interferir unas con otras al parecer

//Global variables,                                  iran ciertos datos que en todo el servidor sera accesible
    app.use(function(req, res, next){
        
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');  // añadimos esta linea a las variables globales porque como usamos mensajes flash en la autenticacion,entonces por eso nos da error
        
        res.locals.user = req.user || null ;  // Esta es la variable global la SESSIOn va a tener de valor de de passport que ha auntenticado
                                                // passport cuando autentica un usuario, guarda el valor dentro de un objeto dentro de req = request
                                                // dentro de req passport guarda la informacion de autenticacion y aca lo que hacemos es guardarla en una variable global para poderlo usar en cualquier lado
        //console.log(res.locals.user);           // Para hacer seguimiento de que estaba trayendo la variable y saber si me estaba trayendo todo lo que necesitaba
        next();                                         // Siempre que usemos esto, ponerlo para que no se nos olvide y se nos quede recargando
    });                                                 // Asi se declaran las variables goblales para usarlas en todo el proyecto
                                                        

// Routes                                            para configurar las rutas 
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// Static Files                                              Configuracion de los archivos estaticos osea del la carpeta public
app.use(express.static(path.join(__dirname, 'public')));    // Le damos la informacion de la dirrecion exacta de donde esta la carpeta
                                                            // Gracias a esto no tenemos necesidad de escribir la direccion entera de nuestros css o archivos en la carpeta public ni mencionar la carpeta public a la hora de definir donde esta lo que necesitamos

//Server is listenning                               Donde se inicializa el servidor
app.listen(app.get('port'), function(){
    console.log(`mi servidor esta corriendo en el puerto: ${app.get('port')}`);
});


// Solo para mostrar como serian los cambios ya en GITHUB :)