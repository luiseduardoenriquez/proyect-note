const express = require('express');
const router = express.Router();    // este enrutador nos permite crear rutas en el servidor

const Note = require('../models/Note');  // Vamos a poder usar las funciones/Metodos Insertar Editar Llamar y eliminar
const { isAuthenticated } = require('../helpers/auth'); // para usarlo aca tenemos que exportar la funcion desde el archivo

// entonces lo empezamos a colocar en las rutas, y le estamos diciendo que antes de que se le mande o procese , estamos validando si esta o no autenticado
// con esto validamos o aseguramos las direcciones, si el usuario visita la ruta, hacemos la validacion, y si esta logueado lo mandamos a la dirrecion y si no que haga lo de la funcion


router.get('/notes/add', isAuthenticated, function(req, res){
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async function(req, res){
    //console.log(req.body);
   const {title, description} = req.body; // mediante el req = request usando la funcion .body lo que hacemos es separar lo que nos llega por propiedades o name's separados en una constante
    const errors = [];
    if (!title) {
        errors.push({text: 'Por Favor Escriba un Titulo'});
    }

    if (!description) {
        errors.push({text: 'Por Favor Escriba una Descripcion'});
    }

    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        }); // Lo que queremos hacer es tratar de si hay errores en el arreglo los cuales son llenados si un campo no es llenado, entonces mediante una alerta se renderisa otra ves el formulario, con las alertas advirtiendo que necesita llenar

    }else{
        const newNote = new Note({title, description});
        //console.log(newNote); // Esto aun no esta guardado, solo esta instanciado , solo esta armado pero aun no esta guardado
        await newNote.save();         // Ya con este comando lo estamos guardando, como no sabemos cuando terminara la operacion de la base de datos, de guardar o hacer algun proceso, entonces tenemos que usar el pensamiento asincrono que veniamos trabajando
        req.flash('success_msg', 'Nota agregada correctamente'); // Con flash no tenemos necesidad de hacer el proceso que hicimos con lo de los errores, en una sola vista, ademas de que se encarga de que el mensaje se pueda usar globalmente
                                     // Entonces le agregamos a la funcion principal, al metodo async y a las funciones que sabemos que queremos volver asincronas pues le añadimos antes el await
         res.redirect('/notes');     // en esta ruta va a ser la encargada de consultar todos los datos de la base de datos

        
    }

   

}); // ya por el metodo post recibimos los datos y procedemos a guardarlos a la BD

router.get('/notes', isAuthenticated, async function(req, res){
   const notes = await Note.find().lean().sort({date: 'desc'});     // Para solucionar el error de que no se podida enviar eso por cuestiones de seguridad, se soluciono agregando .lean()
   //console.log(notes);
    res.render('notes/all-notes', { notes });  //Lo que hacemos es pasarle la vista con los resultados de la base de datos
                                            // Ya lo que tenmos que hacer es con codigo handlebander es pintarlos

});

router.get('/notes/edit/:id', isAuthenticated, async function(req, res){
    const note = await Note.findById(req.params.id).lean();
    //console.log(note);
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async function(req, res){
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description}); // Con esto actualizamos el dato, ademas de que estamos usando el metodo PUT
    
    req.flash('success_msg', 'Nota editada correctamente');
    
    res.redirect('/notes');

});

router.delete('/notes/delete/:id', isAuthenticated, async function(req, res){
    
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada correctamente');                       // Con este eliminamos 
    res.redirect('/notes');
});

// algo que he notado, todo lo de la base de datos debe ser asincrono entonces antes de la funcion async y antes del codifo de llamado o consulta etc await
module.exports = router;