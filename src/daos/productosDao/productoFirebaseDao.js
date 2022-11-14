const contenedorProductosFirebase = require('../../container/containerProductos/containerProductosFirebase');

class ProductoFirebaseDao extends contenedorProductosFirebase {
    constructor(db) {
        super(db);
    }

}

module.exports = ProductoFirebaseDao;