const { v4: uuidv4 } = require("uuid");

const ticketsModel = require("../../dao/models/tickets.model");
const userModel = require("../../dao/models/user.model");
const {
  MongoCartManager,
} = require("../../dao/mongoClassManagers/cartsClass/cartMongoManager");
const cartsMongo = new MongoCartManager();

const {
  MongoProductManager,
} = require("../../dao/mongoClassManagers/productsClass/productMongoManager");
const productsMongo = new MongoProductManager();
const Route = require("../../router/Class.Router");

class CartRouter extends Route {
  init() {
    //carrito de compras personal.
    this.get("/mycart", ["USER"], async (req, res) => {
      try {
        const _id = req.session.user.idd;

        const carts = await cartsMongo.getCartByUId(_id);
        //console.log(carts)
        res.sendSuccess(carts);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    //crear carrito de compras
    this.post("/", ["USER"], async (req, res) => {
      try {
        const createdCart = await cartsMongo.addCart({});
        res.sendSuccess(createdCart);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    //buscar carrito por id de usuario
    this.get("/:uid", ["USER"], async (req, res) => {
      try {
        const cartId = req.params.uid;
        const getById = await cartsMongo.getCartByUId(cartId);
        res.sendSuccess(getById);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    //agregar productos al carrito ... OK
    this.post(
      "/products/:pid",
      ["USER", "PREMIUM", "ADMIN"],
      async (req, res) => {
        try {
          const cartUId = req.session.user.idd;
          const productId = req.params.pid;

          const getCartByUId = await cartsMongo.getCartByUId(cartUId);

          console.log(getCartByUId);

          if (getCartByUId.products && getCartByUId.products.length === 0) {
            const updateCartProducts = await cartsMongo.postCartProductsId(
              cartUId,
              productId,
              false
            );
            res.sendSuccess(updateCartProducts);
          } else {
            const verifyExistence = getCartByUId.products.find(
              (e) => e.product === productId
            );
            console.log(verifyExistence);

            if (verifyExistence) {
              const updateCartProducts = await cartsMongo.postCartProductsId(
                cartUId,
                productId,
                true
              );
              res.sendSuccess(updateCartProducts);
            } else {
              const updateCartProducts = await cartsMongo.postCartProductsId(
                cartUId,
                productId,
                false
              );
              res.sendSuccess(updateCartProducts);
            }
          }
        } catch (error) {
          res.sendServerError(`something went wrong ${error}`);
        }
      }
    );

    //borrar productos del carrito...  OK
    this.delete(
      "/products/:pid",
      ["USER", "PREMIUM", "ADMIN"],
      async (req, res) => {
        try {
          const cartUId = req.session.user.idd;
          const productId = req.params.pid;

          const getCartById = await cartsMongo.getCartByUId(cartUId);

          const verifyExistence = getCartById.products.find(
            (e) => e.product == productId
          );

          if (verifyExistence === undefined) {
            res.sendUserError({ mesagge: "not found" });
          } else {
            const productsArrayPosition = getCartById.products.findIndex(
              (item) => item.product.id === productId
            );
            getCartById.products.splice(productsArrayPosition, 1);
            let newArray = getCartById.products;
            const cartId = getCartById._id;
            console.log(newArray);
            const deleteCartProducts = await cartsMongo.deleteCartProductsId(
              cartId,
              newArray
            );
            res.sendSuccess(deleteCartProducts);
          }
        } catch (error) {
          res.sendServerError(`something went wrong ${error}`);
        }
      }
    );

    //vaciar carrito ... OK
    this.delete("/", ["USER", "PREMIUM", "ADMIN"], async (req, res) => {
      try {
        const cartUId = req.session.user.idd;

        const getCartByUId = await cartsMongo.getCartByUId(cartUId);
        console.log(getCartByUId);
        const getById = await cartsMongo.emptyCart(getCartByUId._id);
        res.sendSuccess(getById);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    //actualizar quantity de productos dentro del carrito .... OK
    this.put(
      "/products/:pid",
      ["USER", "PREMIUM", "ADMIN"],
      async (req, res) => {
        try {
          const { quantity } = req.body;
          //console.log("quantity: " + quantity)
          const cartUId = req.session.user.idd;
          const productId = req.params.pid;
          //console.log("productId: " + productId)
          const getCartByUId = await cartsMongo.getCartByUId(cartUId);
          //console.log("getCartByUId: " + getCartByUId)

          const verifyExistence = getCartByUId.products.find(
            (e) => e.product == productId
          );
          const cartId = getCartByUId._id;
          //console.log("verifyExistence: " + verifyExistence)

          if (verifyExistence) {
            const updateCartProducts = await cartsMongo.updateCartProductsId(
              cartId,
              productId,
              true,
              quantity
            );
            res.sendSuccess(updateCartProducts);
          } else {
            const updateCartProducts = await cartsMongo.updateCartProductsId(
              cartId,
              productId,
              false,
              quantity
            );
            res.sendSuccess(updateCartProducts);
          }
        } catch (error) {
          res.sendServerError(`something went wrong ${error}`);
        }
      }
    );

    this.get("/", ["USER"], async (req, res) => {
      try {
        const carts = await cartsMongo.getCarts();
        res.sendSuccess(carts);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    this.get("/:id", ["USER"], async (req, res) => {
      try {
        const cartId = req.params.id;
        const getById = await cartsMongo.getCartById(cartId);
        res.sendSuccess(getById);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    this.post("/purchase", ["USER", "PREMIUM", "ADMIN"], async (req, res) => {
      try {
        const user = req.session.user;
        const cartUId = await cartsMongo.getCartByUId(user.idd);
        const cart = await cartsMongo.getCartById(cartUId._id);
        
        console.log("carttttttttttttttttt", cart);
        const currentUser = user.email;

        const productsToPurchase =[];
        const productsCart = cart.products

        for (const p of productsCart) {
          const productData = await productsMongo.getProductById(p.product);
          productsToPurchase.push({product : productData});
        }
        console.log(productsToPurchase);
/*
        const purchaseFilterAvailable = productsToPurchase.filter((p) => p.product.stock !== 0 && p.product.stock > p.quantity);
        const purchaseFilterUnavailable = productsToPurchase.filter((p) => p.product.stock === 0 || p.product.stock < p.quantity);
        if (purchaseFilterUnavailable.length == 0) {
          try {
            await Promise.all(
              purchaseFilterAvailable.map(async (p) => {
                const productToSell = await productsMongo.getProductById(
                  p.product._id
                );
                productToSell.stock = productToSell.stock - p.quantity;

                let product = {
                  title: productToSell.title,
                  quantity: p.quantity,
                };
                //console.log(product);
                
                products.push(product);

                await productsMongo.updateProduct(p.product._id, productToSell);
              })
            );
          } catch (error) {
            return res.sendError("Ocurrió un error al procesar los productos");
          }
        } else {
          return res.sendSuccess("Hay productos no disponibles");
        }*/

        function calculateTotal(cartProducts, productsToPurchase) {
            let total = 0;
          
            for (const cartProduct of cartProducts) {
              for (const purchaseProduct of productsToPurchase) {
                if (cartProduct.product.toString() === purchaseProduct.product._id.toString()) {
                  const subTotal = cartProduct.quantity * purchaseProduct.product.price;
                  total += subTotal;
                }
              }
            }
          
            return total;
          }
          const total = calculateTotal(productsCart, productsToPurchase);
        console.log("TOTAL"+total);
        
        const newTicketInfo = {
          purchase_datatime: new Date().toLocaleString(),
          amount: total,
          purchaser: currentUser.email,
          products: productsToPurchase,
        };

        const newTicket = await ticketsModel.create(newTicketInfo);

        res.sendSuccess(newTicket);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.put("/:cid", ["ADMIN"], async (req, res) => {
      try {
        const { products } = req.body;
        const cartId = req.params.cid;
        const getCartById = await cartsMongo.updateCartId(cartId, products);
        res.sendSuccess("cart updated");
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });
  }
}

module.exports = CartRouter;
