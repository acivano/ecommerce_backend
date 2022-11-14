const express = require('express')
const { Router } = express;
const { authMiddleware } = require('../middlewares')
const routerCarritos = Router()

const { productoDao, carritoDao } = require('../daos/handleDaos')


routerCarritos.get('/:id/productos', async(req, res) => {
    let id = parseInt(req.params.id)
    let resultado = await carritoDao.getProductos(id)
    res.json(resultado)
})

routerCarritos.post('/' ,async (req, res) => {
    let carrito ={}
    carrito.timestamp = Date.now()
    carrito.productos = []
    carrito.id = 0
    let resultado = await carritoDao.newCarrito(carrito)
    res.json(resultado)
})
routerCarritos.post('/:id/productos/:id_prod', async (req, res) => {
    let {id, id_prod} = req.params
    let producto = await productoDao.getById(id_prod)
    if (producto.Error){
        res.json(producto)
    }else{

        let resultado = await carritoDao.newProductToCart(id, producto)
        res.json(resultado)
    }
})
routerCarritos.delete('/:id', async(req, res) => {
    let id = parseInt(req.params.id)
    let resultado = await carritoDao.deleteById(id)
    res.json(resultado)
})
routerCarritos.delete('/:id/productos/:id_prod', async(req, res) => {
    let id = parseInt(req.params.id)
    let id_prod = parseInt(req.params.id_prod)
    
    let resultado = await carritoDao.removeProductFromCart(id, id_prod)
    res.json(resultado)
})

module.exports = routerCarritos;