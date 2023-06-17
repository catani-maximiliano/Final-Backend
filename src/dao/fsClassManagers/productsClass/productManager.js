const fs = require("fs");

class ProductManager {

    /**Este código parece ser el constructor de una clase de gestión de productos. El constructor toma un argumento products, 
     * que probablemente sea el archivo o la base de datos donde se almacenan los datos de los productos. La clase probablemente
     *  tendría métodos para acceder, modificar y agregar productos en el archivo o base de datos. */
    constructor(products) {
        this.products = products;
    }

    /**Este método lee el archivo JSON con la información de los productos y lo parsea a un objeto JavaScript. Luego, retorna
     *  este objeto. Si hay algún error en la lectura del archivo, retorna el error. */
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (error) {
            return error;
        }
    }

    /**Este código es una función asíncrona llamada addProduct que recibe un objeto product y retorna una promesa. 
     * La función se encarga de agregar un nuevo producto al archivo de productos. Primero, se llama a la función 
     * getProducts para leer el archivo de productos y parsearlo a un objeto JSON. Luego, se verifica que el producto 
     * no exista en el archivo de productos verificando si existe un objeto con el mismo código. Si el producto no existe, 
     * se verifica que tenga todas las propiedades requeridas y se le asigna un nuevo ID. Finalmente, se agrega el nuevo 
     * producto al arreglo de productos existentes y se escribe el archivo con los datos actualizados.
       Si hay algún error durante la ejecución, se retorna un mensaje de error explicando la razón del error. */
    async addProduct(product) {
        try {
            const jsonData = await this.getProducts();
            let newJsonData;
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price") && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock") && product.hasOwnProperty("status") && product.hasOwnProperty("category");
            const verifyExistence = Object.values(jsonData).find((e) => e.code === product.code);
            if (verifyExistence === undefined) {
                if (propertyCondition) {
                    if (jsonData.length === 0) {
                        product.id = jsonData.length + 1;
                    }
                    else {
                        if (jsonData[jsonData.length - 1].id == jsonData.length) {
                            product.id = jsonData.length + 1;
                        }
                        else {
                            product.id = jsonData[jsonData.length - 1].id + 1;
                        }
                    }
                    newJsonData = JSON.stringify([...jsonData, product]);
                    await fs.promises.writeFile(this.products, newJsonData);
                    return "Product added successfully";
                }
                else {
                    return "Product with missing information";
                }
            }
            else {
                return "Product already in stock";
            }
        }
        catch (error) {
            return error;
        }
    }

    /**Este método busca un producto por su id en el archivo JSON que contiene la lista de productos.
Primero, lee el archivo JSON con la función getProducts, luego busca el objeto con la propiedad id igual al 
parámetro id utilizando el método find de JavaScript. Si se encuentra un objeto con el id especificado, lo devuelve,
 de lo contrario devuelve la cadena "Not Found". */
    async getProductById(id) {
        try {
            const jsonData = await this.getProducts();
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
/**La función deleteById elimina un producto de la lista de productos. Si se encuentra el producto, se elimina de la
 *  lista y se sobrescribe el archivo JSON con la lista actualizada. De lo contrario, se devuelve "Not Found".
 * 
En general, la implementación parece correcta y no hay errores obvios. Sin embargo, sería recomendable agregar alguna
 validación adicional para garantizar que el archivo se sobrescriba correctamente en caso de algún error.

También puede ser útil agregar un mensaje de confirmación después de eliminar un producto exitosamente para informar al
 usuario que la operación se ha completado correctamente. */
    async deleteById(id) {
        try {
            const jsonData = await this.getProducts();
            const product = Object.values(jsonData).find((e) => e.id === id);
            if (product) {
                let newJsonData = jsonData.filter((item) => item.id !== id);
                await fs.promises.writeFile(this.products, JSON.stringify(newJsonData));
                return "Removed product successfully";
            }
            else {
                return "Not Found";
            }
        }
        catch (error) {
            return error;
        }
    }

    /**async updateProduct(id, product) es un método que permite actualizar un producto existente en un archivo JSON que 
     * contiene información de una lista de productos.

El método recibe dos parámetros: id, que es el identificador único del producto que se desea actualizar, y product, que es
 un objeto que contiene la información actualizada del producto.

El método primero lee el archivo JSON que contiene la lista de productos usando el método getProducts(). Luego, busca el 
producto con el id especificado en la lista de productos usando el método find(). Si el producto no se encuentra, se devuelve 
el mensaje "Not Found". Si se encuentra el producto, se verifica que el objeto product contenga todas las propiedades requeridas
 mediante la variable propertyCondition. Si no se cumple la condición, se devuelve el mensaje "Product with missing information".

Si se cumple la condición, se actualiza el objeto itemId con los valores del objeto product, y se guarda la lista de productos 
actualizada en el archivo JSON mediante el método writeFile(). Finalmente, se devuelve el mensaje "updated product successfully"
 indicando que la actualización se realizó con éxito. */
    async updateProduct(id, product) {
        try {
            const jsonData = await this.getProducts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price") && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock") && product.hasOwnProperty("status") && product.hasOwnProperty("category");

            if (itemId === undefined) {
                return "Not Found";
            }
            else {
                if (propertyCondition) {
                    itemId.title = product.title;
                    itemId.description = product.description;
                    itemId.price = product.price;
                    itemId.thumbnail = product.thumbnail;
                    itemId.code = product.code;
                    itemId.stock = product.stock;
                    itemId.status = product.sattus;
                    itemId.category = product.category;

                    await fs.promises.writeFile(this.products, JSON.stringify(jsonData));
                    return "updated product successfully";
                }
                else {
                    return "Product with missing information";
                }
            }
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { ProductManager };