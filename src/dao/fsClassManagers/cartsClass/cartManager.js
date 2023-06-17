const fs = require("fs");

class CartManager {

    /**
Este código muestra un constructor para una clase. El constructor recibe un argumento cart que se asigna a una 
propiedad cart de la instancia de la clase. El propósito de este constructor es inicializar la instancia de la clase
 con el valor adecuado de cart. */
    constructor(cart) {
        this.cart = cart;
    }

    /**Este método se encarga de leer el archivo donde se almacenan los carritos de compra y devolverlos en formato JSON. 
     * Primero utiliza la función fs.promises.readFile() para leer el archivo, pasando el path del archivo y el encoding 
     * deseado ("utf-8" en este caso). Luego, se utiliza JSON.parse() para convertir el archivo en un objeto JavaScript. 
     * Si se produce un error durante la lectura o conversión del archivo, se captura el error y se devuelve.
     *  En caso contrario, se devuelve el objeto JSON correspondiente a los carritos de compra. */
    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.cart, "utf-8");
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (error) {
            return error;
        }
    }

    /**
Este método agrega un carrito nuevo al archivo JSON de carritos almacenado en la ubicación especificada por la propiedad 
cart de la clase. Primero, lee los datos del archivo JSON con getCarts(). Luego, determina el ID del nuevo carrito. 
Si no hay carritos existentes, establece el ID en 1 y establece la matriz de productos vacía. De lo contrario, 
si el ID del último carrito existente es igual al número de carritos, establece el ID en el número de carritos más 1 y
 establece la matriz de productos vacía. De lo contrario, establece el ID en el ID del último carrito existente más 1 y 
 establece la matriz de productos vacía. A continuación, convierte la matriz de carritos actualizada a una cadena JSON y 
 escribe los datos en el archivo JSON con fs.promises.writeFile(). Si hay algún error, lo captura y lo devuelve. 
 Si todo sale bien, devuelve una cadena que indica que el carrito se agregó correctamente. */
    async addCart(cart) {
        try {
            let newJsonData;
            const jsonData = await this.getCarts();
            if (jsonData.length === 0) {
                cart.id = jsonData.length + 1;
                cart.products = [];
            }
            else {
                if (jsonData[jsonData.length - 1].id == jsonData.length) {
                    cart.id = jsonData.length + 1;
                    cart.products = [];
                }
                else {
                    cart.id = jsonData[jsonData.length - 1].id + 1;
                    cart.products = [];
                }
            }
            newJsonData = JSON.stringify([...jsonData, cart]);
            await fs.promises.writeFile(this.cart, newJsonData);
            return "Cart added successfully";
        }
        catch (error) {
            return error;
        }
    }

    /**
2 / 2

Esta función parece buscar un carrito específico en el archivo JSON de carritos a través de su ID. Comienza leyendo el 
archivo JSON de carritos utilizando la función getCarts(). Luego, utiliza la función Object.values() para obtener un array
 de los valores de todos los objetos en el JSON. A continuación, utiliza el método find() para buscar el objeto que tenga
  una propiedad id igual al parámetro id pasado a la función. Si encuentra el objeto, lo devuelve. Si no lo encuentra,
   devuelve la cadena "Not Found". */
    async getCartById(id) {
        try {
            const jsonData = await this.getCarts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            if (itemId === undefined) {
                return "Not Found";
            }
            else {
                return itemId;
            }
        }
        catch (error) {
            return error;
        }
    }

    /**Este método actualiza el array de productos de un carrito en particular identificado por su ID. Primero, 
     * lee el archivo JSON que contiene los datos de todos los carritos, busca el carrito con el ID especificado y 
     * actualiza su propiedad products con el nuevo array de productos. Luego, escribe el archivo actualizado en el disco.
     *  Si todo sale bien, el método devuelve un mensaje indicando que los productos del carrito 
     * se han actualizado correctamente. Si ocurre un error, el método devuelve el error. */
    async updateCartProductsId(id, arrayProducts) {
        try {
            const jsonData = await this.getCarts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            itemId.products = arrayProducts
            await fs.promises.writeFile(this.cart, JSON.stringify(jsonData));
            return "cart products updated"
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { CartManager };
