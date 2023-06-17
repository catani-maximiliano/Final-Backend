const Cart = require("../../models/carts.model");



class MongoCartManager {

    /**La función getCarts es una función asincrónica que se encarga de obtener todos los documentos de la colección
     *  carts de la base de datos y devolverlos en un array. Para ello, se utiliza el método find() de Mongoose que 
     * busca en la colección todos los documentos que cumplen ciertas condiciones y los devuelve en un array.
     *  En caso de que ocurra algún error, se maneja en el bloque catch y se devuelve el error. */
    async getCarts() {
        try {
            const carts = await Cart.find();
            return carts;
        }
        catch (error) {
            return error;
        }
    }
/**Este método addCart() utiliza el método create() de Mongoose para agregar un nuevo carrito a la colección de carritos.
 *  Recibe un objeto cart que contiene una lista de productos con sus respectivas cantidades.

Primero, intenta crear un nuevo documento de carrito usando Cart.create(cart). Si se realiza con éxito, devuelve un mensaje
 de éxito indicando que el carrito se agregó correctamente. De lo contrario, captura cualquier error y lo devuelve. */
    async addCart(cart) {
        try {
            const addMongoCart = await Cart.create(cart);
            return "Cart added successfully";
        }
        catch (error) {
            return error;
        }
    }

    /**
La función getCartById sirve para buscar un carrito en particular en la base de datos a partir de su identificador único (_id).

Primero se intenta encontrar el carrito en la base de datos utilizando el método findOne() de Mongoose, pasando como argumento 
un objeto con la propiedad _id igual al valor de id. Si se encuentra el carrito, se devuelve el objeto correspondiente. 
Si no se encuentra, se devuelve el valor null. */
    async getCartById(id) {
        try {
            const getCartByIdMongo = await Cart.findOne({_id: id});
            return getCartByIdMongo;

        }
        catch (error) {
            return error;
        }
    }

    /**
Esta función se utiliza para agregar un producto a un carrito existente en la base de datos. Toma como parámetros el id
 del carrito, el id del producto y un valor booleano que indica si el producto ya está en el carrito o no. Si el producto
  ya está en el carrito, se incrementa la cantidad del producto en uno, de lo contrario, se agrega el producto al carrito
   con una cantidad de uno. Luego se actualiza el documento del carrito en la base de datos con los cambios realizados.
    La función devuelve la respuesta de la base de datos después de actualizar el documento del carrito. */
    async postCartProductsId(idCart, idProduct, exist) {
        try {
            const cart = await Cart.findById(idCart);
            if(exist){
                const productsArrayPosition = cart.products.findIndex(item => item.product.id == idProduct);
                cart.products[productsArrayPosition].quantity= cart.products[productsArrayPosition].quantity + 1;
            }
            else{
                cart.products.push({product: idProduct, quantity: 1});
            }
            const response = Cart.findByIdAndUpdate(idCart , cart)
            return response;
        }
        catch (error) {
            return error;
        }
    }

    /**Esta función permite eliminar un conjunto de productos de un carrito específico. Recibe como parámetros el id
     *  del carrito que se quiere modificar y el nuevo array de productos que se quiere guardar en el carrito actualizado.

Primero se utiliza el método findByIdAndUpdate() de Mongoose para buscar el carrito por su id y actualizar su campo products
 con el nuevo array de productos. Si todo sale bien, la función devuelve un mensaje de éxito indicando que los productos se
  eliminaron del carrito. En caso de error, se devuelve el error correspondiente. */
    async deleteCartProductsId(id, arrayProducts) {
        try {
            const ProductByIdMongo = await Cart.findByIdAndUpdate(id, { products: arrayProducts });
            return "cart products deleted"
        }
        catch (error) {
            return error;
        }
    }

    /**
Esta función se utiliza para eliminar un carrito de compras por su ID. Primero, utiliza el método findByIdAndDelete de Mongoose
 para buscar el carrito por su ID y eliminarlo de la base de datos. Luego, devuelve un mensaje indicando que el carrito 
 se ha eliminado correctamente o devuelve un mensaje de error en caso contrario. */
    async deleteById(id){
        try {
            const deleteByIdMongo = await Cart.findByIdAndDelete(id);
            return "deleted cart successfully"
        } 
        catch (error) {
            return error;
        }
    }

    /**La función updateCartProductsId se utiliza para actualizar la cantidad de un producto en un carrito de compras existente.
     *  Recibe como parámetros el ID del carrito (idCart), el ID del producto (idProduct), una bandera booleana exist que 
     * indica si el producto ya existe en el carrito o no, y la cantidad deseada (quantity).

Si exist es true, la función buscará la posición del producto en el arreglo de productos del carrito (cart.products) mediante 
el ID del producto y actualizará la cantidad con la cantidad deseada. En caso contrario, se agregará un nuevo objeto al 
arreglo de productos con el ID del producto y la cantidad deseada.

Luego, la función utiliza findByIdAndUpdate para actualizar el documento del carrito con los nuevos valores del arreglo de 
productos y devuelve el resultado de la operación. */
    async updateCartProductsId(idCart, idProduct, exist, quantity) {
        try {
            const cart = await Cart.findById(idCart);
            if(exist){
                const productsArrayPosition = cart.products.findIndex(item => item.product.id == idProduct);
                cart.products[productsArrayPosition].quantity = quantity;
            }
            else{
                cart.products.push({product: idProduct, quantity: quantity});
            }
            const response = Cart.findByIdAndUpdate(idCart , cart)
            return response;
        }
        catch (error) {
            return error;
        }
    }

    /**Esta función actualiza los productos de un carrito específico en la base de datos. Recibe como argumentos el id del 
     * carrito que se desea actualizar y el nuevo arreglo de productos. Primero, busca el carrito correspondiente utilizando
     *  el id. Luego, actualiza el arreglo de productos con el nuevo arreglo pasado como argumento. Finalmente, actualiza 
     * el carrito en la base de datos con los nuevos datos utilizando el método findByIdAndUpdate. Si ocurre algún error 
     * durante el proceso, se captura y se retorna como respuesta. */
    async updateCartId(idCart, products) {
        try {
            const cart = await Cart.findById(idCart);
            cart.products=products

            const response = Cart.findByIdAndUpdate(idCart , cart)
            return response;
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { MongoCartManager };
