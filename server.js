const express = require('express');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const config = require('./src/config')
const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = require('./src/routes/productos')
const routerCarritos = require('./src/routes/carrito')
app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarritos)


const server = httpServer.listen(config.puerto, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));