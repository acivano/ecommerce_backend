const express = require('express')
const { Router } = express;
const { authMiddleware } = require('../middlewares')
const routerCarritos = Router()
const ContenedorCarritos = require('../src/container/containerCarritos')

const manejadorCarritos = new ContenedorCarritos('carrito.txt')


routerCarritos.get('/:id/productos', async(req, res) => {
    let id = parseInt(req.params.id)
    let resultado = await manejadorCarritos.getProductos(id)
    res.json(resultado)
})

routerCarritos.post('/' ,async (req, res) => {
    let carrito ={}
    carrito.timestamp = Date.now()
    carrito.productos = []
    let resultado = await manejadorCarritos.newCarrito(carrito)
    res.json(resultado)
})
routerCarritos.post('/:id/productos/:id_prod', async (req, res) => {
    let {id, id_prod} = req.params

    let resultado = await manejadorCarritos.newProductToCart(id, id_prod)
    res.json(resultado)
})
routerCarritos.delete('/:id', async(req, res) => {
    let id = parseInt(req.params.id)
    let resultado = await manejadorCarritos.deleteById(id)
    res.json(resultado)
})
routerCarritos.delete('/:id/productos/:id_prod', async(req, res) => {
    let id = parseInt(req.params.id)
    let id_prod = parseInt(req.params.id_prod)
    
    let resultado = await manejadorCarritos.removeProductFromCart(id, id_prod)
    res.json(resultado)
})

module.exports = routerCarritos;