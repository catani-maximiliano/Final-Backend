const Product = require("../../models/products.model");

class MongoProductManager{

    /**
Esta función es para obtener una lista paginada de productos en base a un filtro y condiciones de consulta.
 Recibe dos parámetros: el primero es el filtro que se aplicará para obtener los productos, y el segundo son las
  condiciones de consulta que incluyen los parámetros para la paginación (como por ejemplo, el número de página y 
    la cantidad de elementos por página). La función utiliza el método paginate de Mongoose para obtener la lista 
    paginada de productos y devuelve el resultado. */
    async getProducts(filter,condicionesQuery){
        try {
            const products = await Product.paginate(filter, condicionesQuery);
            return products;
        } 
        catch (error) {
            return error;
        }
    }

    /**Este código es una función asincrónica en JavaScript que utiliza Mongoose para agregar un producto
     *  a una base de datos MongoDB.

La función recibe un objeto "product" con los datos del producto a agregar. Primero verifica si el producto
 ya existe en la base de datos utilizando la función "findOne" de Mongoose. Si el producto ya existe, devuelve 
 un mensaje indicando que el producto ya está en stock. Si el producto no existe, utiliza la función "create" de
  Mongoose para agregarlo a la base de datos. Si se agrega correctamente, devuelve un mensaje indicando que el
   producto se agregó con éxito. Si ocurre algún error durante el proceso, devuelve un objeto de error. */
    async addProduct(product){
        try {
            const condition = await Product.findOne({code: product.code})
            if(condition){
                return "Product already in stock";
            }
            else{
                const addMongoProduct = await Product.create(product);
                return 'Product added successfully';  
            } 
        } 
        catch (error) { 
            return error;
        }
    }

    /**
La función getProductById es una función asíncrona que recibe un parámetro id, que representa el identificador único 
de un producto. La función utiliza el método findById de Mongoose para buscar en la base de datos un producto que tenga
 el mismo id proporcionado como parámetro. Si se encuentra el producto, se devuelve el objeto completo de producto. 
 Si no se encuentra, se devuelve el error generado por la base de datos. */
    async getProductById(id){
        try {
            const getProductByIdMongo = await Product.findById(id);
            return getProductByIdMongo
        } 
        catch (error) {
            return error;
        }
    }

/**Este método deleteById elimina un producto de la base de datos por su id. Primero, se busca el producto por su id
 *  utilizando el método findById. Luego, se utiliza el método findByIdAndDelete para eliminar el producto de la base 
 * de datos. Si se realiza con éxito, se devuelve un mensaje indicando que el producto se eliminó correctamente. 
 * Si se produce un error, se devuelve el objeto de error correspondiente. */
    async deleteById(id){
        try {
            const deleteByIdMongo = await Product.findByIdAndDelete(id);
            return "deleted product successfully"
        } 
        catch (error) {
            return error;
        }
    }

    /**Esta función actualiza un producto existente en la base de datos. Toma como parámetros el ID del producto que se 
     * va a actualizar y un objeto que contiene los nuevos valores para actualizar el producto. Utiliza el método 
     * findByIdAndUpdate() de Mongoose para buscar el producto por ID y actualizar sus valores en la base de datos. 
     * Si la operación es exitosa, la función devuelve un mensaje de éxito, de lo contrario devuelve un objeto de error. */
    async updateProduct(id,product){
        try {
            const getProductByIdMongo = await Product.findByIdAndUpdate(id,product);
            return "updated product successfully"; 
        } 
        catch (error) {
            return error;
        }
    }
}

module.exports = {MongoProductManager};