const express = require('express');
const { Router } = express;
const { authMiddleware } = require('../middlewares')
const routerProductos = Router()
const ContenedorProductos = require('../src/container/containerProductos')

const manejadorProductos = new ContenedorProductos('productos.txt')

routerProductos.get('/:id?', async (req, res) => {

    if (req.params.id) {
        resultado = await manejadorProductos.getById(req.params.id)
    } else {
        resultado = await manejadorProductos.getAll()
    }
    res.send(resultado)
})

routerProductos.post('/', authMiddleware ,async (req, res) => {

    let producto = req.body 
    
    producto.timestamp = Date.now()
    let resultado = await manejadorProductos.save(producto)
    res.json(resultado)
})

routerProductos.put('/:id', authMiddleware , async (req, res) => {
    let producto = req.body
    console.log(req.body)
    let id = parseInt(req.params.id) 
    console.log(id)
    let resultado = await manejadorProductos.modifById(id, producto)

    res.json(resultado)
})
routerProductos.delete('/:id', authMiddleware , async(req, res) => {
    let id = parseInt(req.params.id)
    let resultado = await manejadorProductos.deleteById(id)
    res.json(resultado)
})

module.exports = routerProductos;