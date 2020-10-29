const express = require('express');
const router = express.Router();    // este enrutador nos permite crear rutas en el servidor

router.get('/', function(req, res){
    res.render('index');  // no es necesario incluir la extension .hbs
});

router.get('/about', function(req, res){
    res.render('about');
});

module.exports = router;