const contenedorProductosMongo = require('../../container/containerProductos/containerProductosMongo');


class ProductoMongoDao extends contenedorProductosMongo {
    constructor() {
        super();
    }

}

module.exports = ProductoMongoDao;