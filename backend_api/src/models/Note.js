// aqui definiremos nuestro modelo de datos de los document para que se guarden en mongoDB como crear la tabla en mysql entre comillas

const moongose = require('mongoose'); // primero se requiere moongose es para crear esquemas de datos
const { Schema } = moongose;  // solo queremos de moongose la funcion de esquema

const NoteSchema = new Schema({
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = moongose.model('notes',NoteSchema)

/* Instanciamos el Schema y esa instanciacion lo que hacemos es como si le mandaramos por parametros para que 
    que el mismo se inicialice con la estructura que le estamos mencionando, entonces lo que hacemos es definirle nuestra 
    estructura, nuestro esquema, eso lo almacenamos en una Constante o variable, porque este esquema es para decirle a mongoDB como sera nuestro modelo de datos
    Estructura:
    {
        NombreVariable/Propiedad {Definimos el tipo de dato: String  Y mediante coma, si se especifica otra cosa como si es requerido o no}

    }


    y en el module.exports = el moongose.model(1.parametro es el nombre, 2. parametro es nuestro esquema)
*/