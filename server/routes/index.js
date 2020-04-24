const express = require('express');
const app = express();





//Para obtener las rutas de Usuario
app.use(require('./usuario'));

//Rutas del Login
app.use(require('./login'));

//Rutas de Categorias
app.use(require('./categoria'));


//Rutas Productos
app.use(require('./producto'));


module.exports = app;