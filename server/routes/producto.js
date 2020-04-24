const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

const _ = require('underscore');

const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const app = express();

// nombre
// precioUni
// descripcion
// disponible
// categoria
// usuario

//=========================
// Obtener todos los productos
//=========================
app.get('/producto', verificaToken, (req, res) => {
    //Trae todos los productos
    //Populate:Usuario y categoria
    //paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);


    let limite = req.query.limite || 10;
    limite = Number(limite);

    //entre '' estan solo los campos que quiero mandar
    Producto.find({ disponible: true })
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto
            });
        });


});


//=========================
//Obtener  producto por id
//=========================
app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoBD) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al buscar el producto'
                    }
                });
            }
            if (!productoBD) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrada'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoBD
            });
        }).populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion');

    //Populate:Usuario y categoria

});


//=========================
// Buscar los productos
//=========================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regEx = new RegExp(termino, 'i');



    //entre '' estan solo los campos que quiero mandar
    Producto.find({ disponible: true, nombre: regEx })
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto
            });
        });
});




//=========================
//Crear un nuevo producto
//=========================
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: Number(body.precioUni),
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });
    producto.save((err, productoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoBD
        });
    });



});

//=========================
//Actualizar un nuevo producto
//=========================
app.put('/producto/:id', verificaToken, (req, res) => {

    //grabar elusuario
    //grabar una categoria

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);

    console.log(body);
    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Error al buscar el ID del producto'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoBD
        });
    });




});

//=========================
//Borrar un nuevo producto
//=========================
app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoBorrado
        });

    });


});



//=========================
// Obtener todos los productos
//=========================
app.get('/producto', verificaToken, (req, res) => {
    //Trae todos los productos
    //Populate:Usuario y categoria
    //paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);


    let limite = req.query.limite || 10;
    limite = Number(limite);

    //entre '' estan solo los campos que quiero mandar
    Producto.find({ disponible: true })
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto
            });
        });


});





module.exports = app;