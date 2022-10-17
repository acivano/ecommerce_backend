const fs = require('fs');

class ContainterProductos {

    constructor(archivo){
        this.archivo = archivo;
    }

    async save(producto){
        try {
            let productos = await fs.promises.readFile(this.archivo, 'utf-8');
            
            const productosExistentes = JSON.parse(productos);
            const arrayIds = productosExistentes.map(elemento => elemento.id);

            producto.id = Math.max(...arrayIds) + 1;
            productosExistentes.push(producto)
            productosExistentes.sort((a, b) => a.id - b.id);

            await fs.promises.writeFile(this.archivo, JSON.stringify(productosExistentes, null, 2));
            return {'id' : producto.id}
        } catch(error){
            return error
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const objeto = data.find(elemento => elemento.id == id);
            if (objeto) {
                return objeto
            } else {
                return {error : `No existe producto con id = ${id} `}

            }
        } catch (error) {
            console.log(error);
        }
    }

    async modifById(id, producto){
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const arrayFiltrado = data.filter(elemento => elemento.id != id);
            if (data.length == arrayFiltrado.length) {
                return {error : `No existe producto con id = ${id} `}
            }
            producto.id = id
            producto.timestamp = Date.now()
            arrayFiltrado.push(producto)
            arrayFiltrado.sort((a,b) => a.id -b.id)
            await fs.promises.writeFile(this.archivo, JSON.stringify(arrayFiltrado, null, 2));
            return producto
        } catch(error){
            return error
        } 
    }

    async deleteById(id){
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
            const data = JSON.parse(contenido);
            const arrayFiltrado = data.filter(elemento => elemento.id != id);
            if (data.length == arrayFiltrado.length) {
                return {Error : `No existe producto con id = ${id} `}
            }
            arrayFiltrado.sort((a, b) => a.id - b.id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(arrayFiltrado, null, 2));
            return {Mensaje: `Producto con id = ${id} eliminado con éxito`}
        } catch(error){
            return error
        } 
    }
}

module.exports = ContainterProductos