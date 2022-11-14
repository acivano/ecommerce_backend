const { query } = require('express');
const uniqid = require('uniqid');

class ContenedorProductosFirebase {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        try {
            const query = this.db.collection('productos');
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs
            let response = docs.map((doc) => ({

                id: doc.id,
                timestamp: doc.data().timestamp,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().precio,
            }));

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const query = this.db.collection('productos');
            const querySnapshot = await query.get();
            const productosArray = querySnapshot.docs.map(doc => ({
                id: parseInt(doc.id),
                timestamp: doc.data().timestamp,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().precio,
            }));
            const producto = productosArray.find(elemento => elemento.id == id);

            if (!producto) return {Error: `No se encontró producto con id = ${id}`}

            return producto;
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {
            const query = this.db.collection('productos');
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs
            let response = docs.map((doc) => ({

                id: parseInt(doc.id),
                timestamp: doc.data().timestamp,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().precio,
            }));
            let id = 1
            if (response.length !== 0){
                let ordenado = response.sort((a, b) => b.id - a.id)
                id = parseInt(ordenado[0].id)+ 1
            }
            
            let doc = query.doc(`${id}`)
            const resp = await doc.create(product)
            return {'id' : id}
        } catch (error) {
            console.log(error);
        }
    }

    async modifById(id, productoNuevo) {
        try {
            const query = this.db.collection('productos');
            const doc = query.doc(`${id}`)
            let item = await doc.update(productoNuevo)
            return {Exito: `Producto con id: ${id} modificado con éxito`}
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const query = this.db.collection('productos');
            const doc = query.doc(`${id}`)
            let item = await doc.delete()
            return {Exito: `Producto con id = ${id} eliminado con éxito`}
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProductosFirebase;