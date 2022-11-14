const uniqid = require('uniqid');

class ContenedorCarritosFirebase {
    constructor(db) {
        this.db = db;
    }

    async getProductos(id) {
        try {
            const carritos = this.db.collection('carritos');
            const querySnapshot = await carritos.get();
            const carritosArray = querySnapshot.docs.map(doc => ({
                id: parseInt(doc.id),
                timestamp: doc.data().timestamp,
                productos: doc.data().productos
            }));

            const carrito = carritosArray.find(elemento => elemento.id == id);

            if (!carrito) return {Error: `No existe carrito con id = ${id} `}

            const productos = carrito.productos;


            return productos;
        } catch (error) {
            console.log(error);
        }
    }

    async newCarrito(carrito) {
        try {
            const query = this.db.collection('carritos');
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs
            let response = docs.map(doc => ({
                id: parseInt(doc.id),
                timestamp: doc.data().timestamp,
                productos: doc.data().productos
            }));
            let id = 1
            if (response.length !== 0){
                let ordenado = response.sort((a, b) => b.id - a.id)
                id = parseInt(ordenado[0].id)+ 1
            }
            
            let doc = query.doc(`${id}`)
            delete carrito.id
            const resp = await doc.create(carrito)
            return {'id' : id}
        } catch (error) {
            console.log(error);
        }
    }

    async newProductToCart(idCarrito, producto) {
        try {

            const query = this.db.collection('carritos');
            
            const doc = query.doc(`${idCarrito}`)
            const item = await doc.get()
            const respuesta = item.data()
            if (!respuesta) {
                return {Error: `No existe carrito con id = ${idCarrito} `}; 
    
            }
        
            if (respuesta.productos.length == 0) {
                respuesta.productos.push(producto)
            }else{
                let productosCarrito = respuesta.productos.find(elem => elem.id == producto.id)
                if(!productosCarrito){
                    respuesta.productos.push(producto)
                }else{
                    return {Error: `El producto con id = ${producto.id} ya está incluido en el carrito con id= ${idCarrito}`};
                }
            }

            let upd = await doc.update({productos: respuesta.productos})
            return {Exito:`El producto con id: ${producto.id} fue agregado con éxito en el carrito: ${idCarrito}`}
        } catch (error) {
            console.log(error);
        }
    }

    async removeProductFromCart(idCarrito, idProducto) {
        try {
            const query = this.db.collection('carritos');

            const doc = query.doc(`${idCarrito}`)
            const item = await doc.get()
            const respuesta = item.data()
            if (!respuesta) {
                return {Error: `No existe carrito con id = ${idCarrito} `}; 
        
            }
            
            if (respuesta.productos.length == 0) {
                return {Error: `El producto con id = ${idProducto} no está incluido en el carrito con id= ${idCarrito}`}
            }else{
                let productosCarrito = respuesta.productos.filter(elem => elem.id !== idProducto)
                if(respuesta.productos.length == productosCarrito.length){
                    return {Error: `El producto con id = ${idProducto} no está incluido en el carrito con id= ${idCarrito}`}

                }else{
                        
                    let upd = await doc.update({productos: productosCarrito})
                    return {Exito:`El producto con id: ${idProducto} fue eliminado con éxito en el carrito: ${idCarrito}`}
                }
            }

            } catch (error) {
                console.log(error);
            }
        }

    async deleteById(id) {
        try {

            const query = this.db.collection('carritos');
            const doc = query.doc(`${id}`)
            let item = await doc.delete()
            return {Exito: `Carrito con id = ${id} eliminado con éxito`}
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorCarritosFirebase;