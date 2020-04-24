const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();
const Categoria = require('../models/categoria');

// 5 servicios, grabarlos en postman 



// ===========================
//Mostrar todas las categorias
// ===========================

app.get('/categoria', verificaToken, (req, res) => {

    //Usar Token

    let desde = req.query.desde || 0;
    desde = Number(desde);


    let limite = req.query.limite || 10;
    limite = Number(limite);

    //entre '' estan solo los campos que quiero mandar
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, categoria) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categoria
            });
        });


});



// ===========================
//Mostrar una categoria por ID
// =========================== 

app.get('/categoria/:id', verificaToken, (req, res) => {
    //Usar Token
    // Categoria.findById();

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Error al buscar la categoria'
                }
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });




});



// ===========================
//Crear una nueva categoria 
// ===========================
app.post('/categoria', [verificaToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBD
        });
    });
});



// ===========================
//Actualizar una  categoria 
// ===========================
app.put('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, 'descripcion');

    Categoria.findByIdAndUpdate(id, body, (err, categoriaBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Error al buscar el ID de la categoria'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBD
        });
    });


});



// // ===========================
// //Eliminar una  categoria 
// // ===========================

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {


    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Error al eliminar categoria'
                }
            });
        }
        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontradoa'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaBorrada
        });

    });

})






module.exports = app;