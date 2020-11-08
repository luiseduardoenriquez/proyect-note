
//Required - Importaciones
const express = require('express');
const cors = require('cors');

const graphqlHTTP = require("express-graphql").graphqlHTTP;


// Initializations - Se inicializaran todos los modulos que se necesiten
const app = express();


//Base de datos
require('./database');                 // Importacion el archivo donde se configuro la base de datos - conexion
const schema = require('./graphql/schema');      // Importamos los archivos del schema


// Settings 
app.set('port', process.env.PORT || 3100);                // el process.env sirva para decirle que si hay uno disponible lo tome o sino el que le declaro, mas que todo se refiere cuando queremos desplegar nuesto aplicativo y en algunas hosting manejan unas variables de entorno internos, entonces con eso le ayudamos a que haga la conexion


// Middlewares                                           // iran todas las funciones que seran ejecutadas antes de 
app.use(cors());                                        // Para habilitar la funcion de entre dominios, en este caso este backend y el frontend React, para que se pueda acceder, toca configurar este cors, para no infringir la politica de mandar solicitudes a el otro dominio (Violancion de cors)

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}))


//Server is listenning -  Donde se inicializa el servidor
app.listen(app.get('port'), function(){
    console.log(`mi servidor esta corriendo en el puerto: ${app.get('port')}`);
});
