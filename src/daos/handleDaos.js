const admin = require('firebase-admin');
const config = require('../config')

let productoDao
let carritoDao

switch (process.env.PERS) {
    case 'mongodb':
        const ProductosDaoMongoDb = require('../daos/productosDao/productoMongoDao')
        const CarritosDaoMongoDb = require('../daos/carritoDao/carritoMongoDao')
        productoDao = new ProductosDaoMongoDb()
        carritoDao = new CarritosDaoMongoDb()
        console.log('conectado a mongo')
        
        break;
    case 'firebase': 
        admin.initializeApp({
            credential: admin.credential.cert(config.firebase),
        });

        const db = admin.firestore();

        const ContenedorProductosFb = require('../daos/productosDao/productoFirebaseDao');
        const ContenedorCarritosFb = require('../daos/carritoDao/carritoFirebaseDao');

        console.log("conectado a Firebase");

        productoDao = new ContenedorProductosFb(db);
        carritoDao = new ContenedorCarritosFb(db);

        break;
    default:
        break;
}
module.exports = {productoDao, carritoDao}