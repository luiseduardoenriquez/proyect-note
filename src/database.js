// para poder tener una conexion con la base, la cual tendra incluida index.js,  mediante moongose vamos a inicializar la base de datos y la vamos a usar

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notesdbapp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})                                              // si la base de datos no existe el la va a creear automaticamente, para que no de errores a la hora de conectarse, tenemos que hacer estas configuraciones, solo es para el funcionamiento de la biblioteca
    .then(db => console.log('DB esta conectada'))
    .catch(err => console.error(err));