const mongoose = require('mongoose');

/**
mongoose-paginate-v2 es un plugin para Mongoose que agrega paginación a los modelos. Permite obtener un conjunto
 específico de documentos de una colección y limitar el número de documentos devueltos. Además, también proporciona 
 información sobre el número total de documentos disponibles para que se puedan crear enlaces de paginación. */
const mongoosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'product';

/**Este código define un esquema de Mongoose para el modelo de producto. El esquema especifica los campos y tipos 
 * de datos que componen un producto, así como algunas opciones adicionales.

Los campos definidos en el esquema son los siguientes:

title: Tipo de dato String. Representa el título del producto.
description: Tipo de dato String. Representa la descripción del producto.
price: Tipo de dato Number. Representa el precio del producto. También tiene un índice definido.
thumbnail: Tipo de dato Array. Representa una matriz de imágenes en miniatura del producto.
code: Tipo de dato String. Representa el código del producto.
stock: Tipo de dato Number. Representa la cantidad en stock del producto.
status: Tipo de dato Boolean. Representa el estado del producto (activo o inactivo).
category: Tipo de dato String. Representa la categoría del producto.
owner: Tipo de dato String. Representa el propietario del producto, con un valor predeterminado de 'ADMIN'.
idd: Tipo de dato Number. Representa un identificador numérico adicional para el producto.*/
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {
        type: Number,
        index: true
        },
    thumbnail: Array,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
    owner: {
        type: String,
        default: 'ADMIN',
    },
    idd: Number

});

/**la función productSchema.plugin(mongoosePaginate) se utiliza para añadir el plugin de paginación a la definición del 
 * esquema de Mongoose de los productos. */
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productsCollection, productSchema);

module.exports = Product