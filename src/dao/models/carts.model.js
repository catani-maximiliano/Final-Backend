const mongoose = require('mongoose');

const cartCollection = 'cart';

/**
Este código define el esquema para el carrito de compras en una base de datos MongoDB utilizando Mongoose. 
El esquema especifica que el carrito contendrá un array de objetos que tienen dos propiedades: "product" y "quantity".
 La propiedad "product" es de tipo ObjectId y hace referencia al modelo "product" definido previamente. La propiedad 
 "quantity" es de tipo número y especifica la cantidad de ese producto que se encuentra en el carrito. Por defecto, el
  array de productos está vacío. */
const cartSchema = new mongoose.Schema({
    products: {
        type: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'product'
            },
            quantity: Number
          }
        ],
        default: []
      }
});

/**Este código es un middleware que se ejecutará antes de la operación de búsqueda en la colección cart. 
 * El objetivo del middleware es agregar una función de populate para que los datos de los productos asociados con cada
 *  elemento del carrito se muestren en la respuesta. La función populate recibe dos argumentos: el primero es el campo
 *  que se va a popular, que en este caso es 'products.product', y el segundo es la lista de campos que se desean incluir
 *  en la respuesta, que en este caso son 'title' y 'price'. Esto significa que cuando se realiza una búsqueda en la 
 * colección 'cart', cada elemento del carrito devuelto incluirá la información completa del producto asociado, incluyendo 
 * su título y precio. */
cartSchema.pre('find', function () {
  this.populate('products.product', 'title price');
});

/**
Este código es similar al anterior, pero se utiliza el método findOne en lugar de find. El método findOne se utiliza para 
buscar un documento específico en la base de datos en función de un criterio de búsqueda.

La función pre se utiliza para registrar un middleware que se ejecutará antes de la consulta que se realice en el modelo.
 En este caso, se está registrando un middleware que se ejecutará antes de la consulta findOne en el modelo Cart. */
cartSchema.pre('findOne', function () {
  this.populate('products.product', 'title price');
})

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;