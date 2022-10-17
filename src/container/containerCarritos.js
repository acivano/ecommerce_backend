const { deepStrictEqual } = require('assert');
const fs = require('fs');

class ContainterCarritos {

    constructor(archivo){
        this.archivo = archivo;
    }

    async newCarrito(carrito){
        try {
            let carritos = await fs.promises.readFile(this.archivo, 'utf-8');
            
            const carritosExistentes = JSON.parse(carritos);
            const arrayIds = carritosExistentes.map(elemento => elemento.id);
            carrito.id = Math.max(...arrayIds) + 1;
            carritosExistentes.push(carrito)
            carritosExistentes.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(carritosExistentes, null, 2));
            return {'id' : carrito.id}
        } catch(error){
            return error
        }
    }

    async getProductos(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const objeto = data.find(elemento => elemento.id == id);
        
            if (objeto) {

                return objeto.productos 
            }
            return {Error: `No existe carrito con id = ${id} `}; 
            
        } catch (error) {
            console.log(error);
        }
    }

    async newProductToCart(idCarrito, idProducto) {
        try {           
            //el carrito existe?
            const carritosExistentes = await fs.promises.readFile(this.archivo, 'utf-8');
            const carritosExistentesJson = JSON.parse(carritosExistentes);
            const carritoExist = carritosExistentesJson.find(elemento => elemento.id == idCarrito);
            if (carritoExist){
                //existe el producto?
                const producto = await fs.promises.readFile('productos.txt', 'utf-8');
                const productoJson = JSON.parse(producto);
                const productoAAgregar = productoJson.find(elemento => elemento.id == idProducto);
                if (!productoAAgregar) {
                    return {Error: `No existe producto con id = ${idProducto} `};
                }else{
                    //existe el producto en el carrito?
                    const productosCarrito = await this.getProductos(idCarrito)
                    const productoExistenteEnCarrito = productosCarrito.find(elemento => elemento.id == idProducto);
                    if (productoExistenteEnCarrito) {
                        return {Error: `El producto con id = ${idProducto} ya está incluido en el carrito con id= ${idCarrito}`};
                    }else{
                        //agrego el producto  a la lista de productos del carrito
                        productosCarrito.push(productoAAgregar)
                        productosCarrito.sort((a, b) => a.id - b.id);
                        //agrego la lista de productos al carrito
                        carritoExist.productos = productosCarrito
                        const carritosSinCarritoActural = carritosExistentesJson.filter(elemento => elemento.id != idCarrito)
                        //agrego el carrito a la lista de carritos existentes
                        carritosSinCarritoActural.push(carritoExist)
                        carritosSinCarritoActural.sort((a, b) => a.id - b.id);
                        await fs.promises.writeFile(this.archivo, JSON.stringify(carritosSinCarritoActural, null, 2));
                        return carritoExist
                    }
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
            const carritosExistentes = await fs.promises.readFile(this.archivo, 'utf-8');
            const carritosExistentesJson = JSON.parse(carritosExistentes);
            const carritoExist = carritosExistentesJson.find(elemento => elemento.id == idCarrito);
            if (carritoExist){
                //existe el producto en el carrito?
                const productosCarrito = await this.getProductos(idCarrito)

                const productoExistenteEnCarrito = productosCarrito.find(elemento => elemento.id == idProducto);
                if (productoExistenteEnCarrito) {
                    const carritoSinProducto = productosCarrito.filter(elemento => elemento.id != idProducto);
                    //agrego la lista de productos al carrito
                    carritoExist.productos = carritoSinProducto || []
                    const carritosSinCarritoActural = carritosExistentesJson.filter(elemento => elemento.id != idCarrito)
                    //agrego el carrito a la lista de carritos existentes
                    carritosSinCarritoActural.push(carritoExist)
                    carritosSinCarritoActural.sort((a, b) => a.id - b.id);
                    await fs.promises.writeFile(this.archivo, JSON.stringify(carritosSinCarritoActural, null, 2));
                    return carritoExist

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
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const arrayFiltrado = data.filter(elemento => elemento.id != id);
            if (data.length == arrayFiltrado.length) {
                return {error : `No existe carrito con id = ${id} `}
            }
            arrayFiltrado.sort((a, b) => a.id - b.id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(arrayFiltrado, null, 2));
            return {Mensaje: `Carrito con id = ${id} eliminado con éxito`}
        } catch(error){
            return error
        } 
    }

    async getCarrito(id){
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const objeto = data.find(elemento => elemento.id == id);
            if (objeto) {
                return objeto; 
            }
            return {Error: `No existe carrito con id = ${id} `}; 
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const objeto = data.find(elemento => elemento.id == id);
            console.log(objeto)
            if (objeto) {
                return objeto; 
            }
            return {Error: `No existe carrito con id = ${id} `}; 
            
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = ContainterCarritos