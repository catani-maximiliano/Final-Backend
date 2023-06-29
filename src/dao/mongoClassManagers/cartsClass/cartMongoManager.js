const Cart = require("../../models/carts.model");

class MongoCartManager {

  async getCarts() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      return error;
    }
  }
//crear carrito ..... OK
  async addCart(uid, cart) {
    try {
      const getCartByUIdMongo = await Cart.findOne({ user_id: uid });

      if (!getCartByUIdMongo) {

        await Cart.create(cart);
        req.session.cart = getCartByUIdMongo._id
        console.log(getCartByUIdMongo._id);

        return "Cart added successfully";
      }
      console.log(getCartByUIdMongo._id)
    } catch (error) {
      return error;
    }
  }
// traer carrito ..... OK
  async getCartById(id) {
    try {
      const getCartByIdMongo = Cart.findOne({ _id: id });
      return getCartByIdMongo;
    } catch (error) {
      return error;
    }
  }
  //traer carrito de comprar con id de usuario..... OK
  async getCartByUId(_id) {
    try {
      const getCartByUIdMongo = await Cart.findOne({ user_id: _id });
      //console.log(getCartByUIdMongo);
      return getCartByUIdMongo;
    } catch (error) {
      return error;
    }
  }
  //agrega productos al carrito y si existen agrega una cantidad mas..... OK
  async postCartProductsId(uidCart, idProduct, exist) {
    try {
      const uicart = await this.getCartByUId(uidCart);
      const cart = await Cart.findById(uicart._id);
      const idCart = cart._id;
      if (exist) {

        const productsArrayPosition = cart.products.findIndex(
          (item) => item.product == idProduct);
          console.log(productsArrayPosition)
        cart.products[productsArrayPosition].quantity = cart.products[productsArrayPosition].quantity + 1;
      
      } else {
        cart.products.push({ product: idProduct, quantity: 1 });
      }
      const response = Cart.findByIdAndUpdate(idCart, cart);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteCartProductsId(id, arrayProducts) {
    try {
      const ProductByIdMongo = await Cart.findByIdAndUpdate(id, {
        products: arrayProducts,
      });
      return "cart products deleted";
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const deleteByIdMongo = await Cart.findByIdAndDelete(id);
      return "deleted cart successfully";
    } catch (error) {
      return error;
    }
  }
//actualizar quantity de productos dentro del carrito .... OK
  async updateCartProductsId(idCart, idProduct, exist, quantity) {
    try {
      //const cart = await Cart.findByUId(idCart);
      const cart = await Cart.findById(idCart);
      //console.log("cart: " + cart)

      if (exist) {
        const productsArrayPosition = cart.products.findIndex((item) => item.product == idProduct);
        cart.products[productsArrayPosition].quantity = quantity;
      } else {
        cart.products.push({ product: idProduct, quantity: quantity });
      }
      const response = Cart.findByIdAndUpdate(idCart, cart);
      return response;
    } catch (error) {
      return error;
    }
  }

  //Vaciar carrito ... OK
  async emptyCart(idCart) {
    try {
      const cart = await Cart.findById(idCart);
      cart.products= [];
      const response = Cart.findByIdAndUpdate(idCart, cart);
      return response;
    } catch (error) {
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
      cart.products = products;

      const response = Cart.findByIdAndUpdate(idCart, cart);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { MongoCartManager };
