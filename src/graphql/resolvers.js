// esto especifica que hara cuando declaren en la api algo, dependiendo de que coloquen asi mismo se les declarara
// Atravez de una funcion cuando le consulten algo, le vamos a devolver esto

// Cuando queremos recibir datos por medio del cliente, tenemos que especificar los dos parametros
// (root, args) el primero lo podemos obviar y el segundo seria el nombre de la variable la cual tiene
// en su interior lo que envio el cliente
// si queremos que una entrada sea obligatoria, se le agrega en el tipo de dato ! ejemplo String!
// ideas, para devolverlo al cliente, y el con eso puede hacer validaciones
// si no queremos todo con ese podemos usar el destructurin que es usar {} ejm { name }

/* greet(root, args){
    console.log(args);
    return `Hello ${args.name}`;
}, */

// el context es lo que definimos en el index donde esta el codigo principal
// el cual queremos que se le pase a todos los resolvers

// (_, {input}) cuando especificamos el guion abajo nos referimos a que vamos a ignorar ese parametro

// RESOLVER ES EL ENCARGADO DE AGARRAR LOS MODELOS

const Note = require('../models/Note');
const resolvers = {
    Query: {
        async oneNote(_,{_id}){
            const oneNote = await Note.findById(_id);
            return oneNote;
        },
        async allNotes(){
            const notes = await Note.find();
            return notes;
        }
    },
    Mutation: {
        async createNota(_,{ input }){
            const newNote = new Note(input);
            //console.log(newNote);
            return await newNote.save();
             

        },
        async deleteNota(_, { _id }){
           return await Note.findByIdAndDelete(_id);
        },
        async uptadeNota(_, { _id,input }){
            return await Note.findByIdAndUpdate(_id, input, {new: true});
        }
    }
};

// en la linea del editar, el return que hace moongose es del usuario viejo, pero nosotros queremos ver como retorno
// lo que se ha modificado osea de una los datos nuevos entonces por eso colocamos el {new: true}

// Uy para hacer un return mas efectivo, se puede hacer en la misma linea, se puede asi o guardando eso en una variable
// y luego retornando la variable

module.exports = resolvers;
