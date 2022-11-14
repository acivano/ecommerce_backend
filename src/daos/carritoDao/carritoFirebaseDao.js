const contenedorCarritosFirebase = require('../../container/containerCarritos/containerCarritosFirebase');

class CarritoFirebaseDao extends contenedorCarritosFirebase {
    constructor(db) {
        super(db);
    }

}

module.exports = CarritoFirebaseDao;