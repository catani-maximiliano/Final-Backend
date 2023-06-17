const { persistence } = require('../config/index');


/**
Este fragmento de código utiliza una estructura de control switch para determinar qué módulo exportar en función del valor 
de la variable persistence. Si el valor es "memory", exportará el módulo correspondiente al DAO de productos basado en 
memoria (fsClassManagers/productsClass/). Si el valor es "mongo", primero se ejecuta la función mongoConnect() para conectarse
 a la base de datos MongoDB, y luego exporta el módulo correspondiente al DAO de usuarios basado en MongoDB 
 (mongoClassManagers/userClass/userMongoManager).
 */
switch (persistence) {
    case "memory":
        module.exports = require("../dao/fsClassManagers/productsClass/")
    break;
    
    case "mongo":
        mongoConnect();
        module.exports = require("../dao/mongoClassManagers/userClass/userMongoManager")
    break;
}