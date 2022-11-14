const mongoose = require('mongoose')
const config = require('../../config.js')
const { ProductosModel } = require('../../model/productosModel')


mongoose.connect(process.env.DB_URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

class ContainterProductos {
    

    async save(producto){
        try {
            let ultimoIdUsado = await ProductosModel.find({},{'id':1, '_id':0}).sort({'id':-1}).limit(1);
            let nuevoId
            if ((Object.values(ultimoIdUsado)[0]) !== undefined) {
                nuevoId = parseInt(Object.values(ultimoIdUsado)[0].id) +1 
            } else {
                nuevoId = 1
            }
            producto.id = nuevoId 
            let resultado = await ProductosModel.insertMany(producto)

            return {'id' : nuevoId}

        } catch(error){
            console.log(error)
        }
    }

    async getAll() {
        try {
            const contenido = await ProductosModel.find({}, {'_id':0, "__v":0}).sort({'id':1});

            return contenido
            
        
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const contenido = await ProductosModel.find({'id': id}, {'_id':0, "__v":0}).sort({'id':1});
            if (contenido.length == 0) return {Error: `No se encontró producto con id = ${id}`}
            
            return Object.values(contenido)[0]
            
        } catch (error) {
            console.log(error);
        }
    }

    async modifById(id, producto){
        try {

            
            const modif = await ProductosModel.updateOne({'id': id}, {$set: {'nombre': producto.nombre , 'descripcion': producto.descripcion, 'codigo': producto.codigo, 'foto': producto.foto, 'precio': producto.precio, 'stock': producto.stock}});
            if (modif.matchedCount == 0) {
                return {Error: `No encontró producto con id: ${id} `}    
            }
            return {Exito: `Producto con id: ${id} modificado con éxito`}
        } catch(error){
            return error
        } 
    }

    async deleteById(id){
        try {
            const res = await ProductosModel.deleteOne({'id': id});
            if (res.deletedCount == 0) {
                return {Error: `No se encontró producto con id = ${id}`}
            }
            return {Exito: `Producto con id = ${id} eliminado con éxito`}
        } catch(error){
            return error
        } 
    }
}

module.exports = ContainterProductos