const express = require('express');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// Configuración de socket
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = require('./routes/productos')
const routerCarritos = require('./routes/carrito')
app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarritos)

// io.on('connection', async socket => {

//     console.log('Se conectó un nuevo cliente');

//     // Productos
//     socket.emit('productos', await routerProductos.get());

//     socket.on('update', async producto => {
//         await manejadorProductos.save(producto, true);
//         io.sockets.emit('productos', await manejadorProductos.getAll());
//     })

// });




const PORT = process.env.PORT || 8081;

const server = httpServer.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));