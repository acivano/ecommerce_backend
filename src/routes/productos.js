const express = require('express');
const { Router } = express;
const { authMiddleware } = require('../middlewares')
const routerProductos = Router()
const { productoDao, carritoDao } = require('../daos/handleDaos')


//const manejadorProductos = new ContenedorProductos('productos')

routerProductos.get('/:id?', async (req, res) => {

    if (req.params.id) {
        resultado = await productoDao.getById(req.params.id)
    } else {
        resultado = await productoDao.getAll()
    }
    res.send(resultado)
})

routerProductos.post('/', authMiddleware ,async (req, res) => {

    let producto = req.body 
    
    producto.timestamp = Date.now()
    let resultado = await productoDao.save(producto)
    res.json(resultado)
})

routerProductos.put('/:id', authMiddleware , async (req, res) => {
    let producto = req.body
    let id = parseInt(req.params.id) 
    let resultado = await productoDao.modifById(id, producto)

    res.json(resultado)
})
routerProductos.delete('/:id', authMiddleware , async(req, res) => {
    let id = parseInt(req.params.id)
    let resultado = await productoDao.deleteById(id)
    res.json(resultado)
})

module.exports = routerProductos;