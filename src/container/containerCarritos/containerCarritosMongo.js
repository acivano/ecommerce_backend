const mongoose = require('mongoose')
const { CarritosModel } = require('../../model/carritosModel')

mongoose.connect(process.env.DB_URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

class ContainterCarritos {


    async newCarrito(carrito){
        try {
            let ultimoIdUsado = await CarritosModel.find({},{'id':1, '_id':0}).sort({'id':-1}).limit(1);
            let nuevoId
            if ((Object.values(ultimoIdUsado)[0]) !== undefined) {
                nuevoId = parseInt(Object.values(ultimoIdUsado)[0].id) +1 
            } else {
                nuevoId = 1
            }
            carrito.id = nuevoId

            let resultado = await CarritosModel.insertMany(carrito)
            return {'id' : nuevoId}
        } catch(error){
            console.log(error)
        }
    }

    async getProductos(id) {
        try {
            const contenido = await CarritosModel.find({'id': id}, {'__v':0});
            const objeto = contenido.find(elemento => elemento.id == id);
        
            if (objeto) {

                return objeto.productos 
            }
            return {Error: `No existe carrito con id = ${id} `}; 
            
        } catch (error) {
            console.log(error);
        }
    }

    async newProductToCart(idCarrito, producto) {
        try {           
            //el carrito existe?
            const carritosExistentes = await CarritosModel.findOne({'id': idCarrito});
            if (carritosExistentes){

                    //existe el producto en el carrito?
                    const productosCarrito = await this.getProductos(idCarrito)
                    const productoExistenteEnCarrito = productosCarrito.find(elemento => elemento.id == producto.id);
                    if (productoExistenteEnCarrito) {
                        return {Error: `El producto con id = ${producto.id} ya está incluido en el carrito con id= ${idCarrito}`};
                    }else{
                        //agrego el producto  a la lista de productos del carrito
                        carritosExistentes.productos.push(producto)

                        await carritosExistentes.save()
                        return {Exito:`El producto con id: ${producto.id} fue agregado con éxito en el carrito: ${idCarrito}`}
                    }
                
            }else{
                return {Error: `No existe carrito con id = ${idCarrito} `}; 
            }    
        } catch (error) {
            console.log(error);
        }
    }

    async removeProductFromCart(idCarrito, idProducto) {
        try {           
            //el carrito existe?
            const carritosExistentes = await this.getCarrito(idCarrito);


            if (!carritosExistentes.Error){
                //existe el producto en el carrito?
                const productosCarrito = await this.getProductos(idCarrito)

                const productoExistenteEnCarrito = productosCarrito.find(elemento => elemento.id == idProducto);
                if (productoExistenteEnCarrito) {
                    const carritoSinProducto = await CarritosModel.updateMany({},{$pull:{'productos':{'id': idProducto}}})
                    return await this.getCarrito(idCarrito);

                }else{
                    return {Error: `El producto con id = ${idProducto} no se encuentra en el carrito con id= ${idCarrito}`};

                } 
            }else{
                return {Error: `No existe carrito con id = ${idCarrito} `}; 
            }    
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const contenido = await CarritosModel.deleteOne({'id': id})
            if (contenido.deletedCount== 0) {
                return {Exito: `Carrito con id = ${id} no se pudo eliminar`}
            } else {
                
                return {Exito: `Carrito con id = ${id} eliminado con éxito`}
            }

        } catch(error){
            return error
        } 
    }

    async getCarrito(id){
        try {
            const contenido = await CarritosModel.find({'id': id}, {'_id':0, "__v":0}).sort({'id':1});
            if (contenido.length == 0) return {Error: `No se encontró carrito con id = ${id}`}
            
            return Object.values(contenido)[0]
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContainterCarritos