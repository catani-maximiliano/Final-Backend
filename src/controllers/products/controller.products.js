const Route = require("../../router/Class.Router");

const {
  MongoProductManager,
} = require("../../dao/mongoClassManagers/productsClass/productMongoManager");
const productsMongo = new MongoProductManager();
const createMock = require("../../utils/mocks/productsMock");
const productError = require("../../utils/errors/product/product.error");

const privateAcces = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

class ProductsRouter extends Route {
  init() {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Obtiene los productos
     *     tags:
     *       - Productos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: category
     *         schema:
     *           type: string
     *         description: Filtra los productos por categoría
     *       - in: query
     *         name: stock
     *         schema:
     *           type: number
     *         description: Filtra los productos por cantidad en stock
     *       - in: query
     *         name: limit
     *         schema:
     *           type: number
     *         description: Limita el número de productos devueltos por página
     *       - in: query
     *         name: page
     *         schema:
     *           type: number
     *         description: Número de página a recuperar
     *       - in: query
     *         name: sort
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *         description: Ordena los productos por precio de forma ascendente (asc) o descendente (desc)
     *     responses:
     *       '200':
     *         description: OK
     *       '500':
     *         description: Error interno del servidor
     */
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        const { user } = req.session;
        let linkMold = req.protocol + "://" + req.get("host") + "/products/";
        let limit;
        let page;
        let sort;
        let prevSort;
        let filter;

        if (req.query.category == undefined && req.query.stock == undefined) {
          filter = {};
        } else if (
          req.query.category == undefined &&
          req.query.stock != undefined
        ) {
          filter = {
            stock: { $gte: req.query.stock },
          };
        } else if (
          req.query.category != undefined &&
          req.query.stock == undefined
        ) {
          filter = {
            category: { $regex: req.query.category },
          };
        } else {
          filter = {
            category: { $regex: req.query.category },
            stock: { $gte: req.query.stock },
          };
        }

        if (req.query.limit == undefined) {
          limit = 10;
        } else {
          limit = req.query.limit;
        }

        if (req.query.page == undefined) {
          page = 1;
        } else {
          page = req.query.page;
        }

        if (req.query.sort == "asc") {
          prevSort = "asc";
          sort = 1;
        } else if (req.query.sort == "desc") {
          prevSort = "desc";
          sort = -1;
        } else {
          sort = undefined;
        }

        const condicionesQery = {
          page: page,
          limit: limit,
          sort: { price: sort },
        };

        const products = await productsMongo.getProducts(
          filter,
          condicionesQery
        );
        let nextLink;
        let prevLink;
        if (products.hasPrevPage == false) {
          prevLink = null;
        } else {
          prevLink =
            req.protocol +
            "://" +
            req.get("host") +
            "/products" +
            "?" +
            `page=${products.prevPage}` +
            `&limit=${limit}&sort=${prevSort}`;
        }

        if (products.hasNextPage == false) {
          nextLink = null;
        } else {
          nextLink =
            req.protocol +
            "://" +
            req.get("host") +
            "/products" +
            "?" +
            `page=${products.nextPage}` +
            `&limit=${limit}&sort=${prevSort}`;
        }

        const respuestaInfo = {
          status: "success",
          payload: products.docs,
          totalPges: products.totalDocs,
          prevPage: products.prevPage,
          nextPage: products.nextPage,
          page: products.page,
          hasPrevPage: products.hasPrevPage,
          hasNextPage: products.hasNextPage,
          prevLink: prevLink,
          nextLink: nextLink,
          linkMold: linkMold,
          user: user,
        };
        res.sendSuccess(respuestaInfo);
      } catch (error) {
        req.logger.fatal("Poductos no encontrados");
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    /**
     * @swagger
     * /mockingproducts:
     *   get:
     *     summary: Obtiene productos simulados (mock)
     *     tags:
     *       - Productos
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '200':
     *         description: OK
     *       '500':
     *         description: Error interno del servidor
     */
    this.get("/mockingproducts", ["PUBLIC"], (req, res) => {
      const products = createMock(100);

      res.sendSuccess(products);
    });

    /**
     * @swagger
     * /{id}:
     *   get:
     *     summary: Obtiene un producto por su ID
     *     tags:
     *       - Productos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del producto a obtener
     *     responses:
     *       '200':
     *         description: OK
     *       '500':
     *         description: Error interno del servidor
     */
    this.get("/:id", ["PUBLIC"], async (req, res) => {
      try {
        const productId = req.params.id;
        const getById = await productsMongo.getProductById(productId);
        res.sendSuccess(getById);
      } catch (error) {
        req.logger.error(error.cause);
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    /**
     * @swagger
     * /:
     *   post:
     *     summary: Crea un nuevo producto
     *     tags:
     *       - Productos
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               price:
     *                 type: number
     *               thumbnail:
     *                 type: string
     *               code:
     *                 type: string
     *               stock:
     *                 type: number
     *               status:
     *                 type: string
     *               category:
     *                 type: string
     *     responses:
     *       '200':
     *         description: OK
     *       '500':
     *         description: Error interno del servidor
     */
    this.post("/", ["ADMIN", "PREMIUM"], async (req, res) => {
      try {
        const { title, description, price, thumbnail, code, stock, status, category} = req.body;
        const newProduct = { title, description, price, thumbnail, code, stock, status, category,};
        console.log(newProduct);
        const verifyExistenceUndefined = Object.values(newProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
          const createdProduct = await productsMongo.addProduct(newProduct);
          const products = await productsMongo.getProducts();
          
          global.io.emit("statusProductsList", products);
          res.sendSuccess(createdProduct);

        } else {

          res.sendUserError({ mesagge: "Product with missing information" });
          return productError(null, { title, description, price, thumbnail, code, stock, category});
        }
      } catch (error) {
        req.logger.error(error.cause);
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    /**
     * @swagger
     * /{id}:
     *   put:
     *     summary: Actualiza un producto existente
     *     tags:
     *       - Productos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del producto a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               price:
     *                 type: number
     *               thumbnail:
     *                 type: string
     *               code:
     *                 type: string
     *               stock:
     *                 type: number
     *               status:
     *                 type: string
     *               category:
     *                 type: string
     *     responses:
     *       '200':
     *         description: OK
     *       '500':
     *         description: Error interno del servidor
     */
    this.put("/:id", ["ADMIN"], async (req, res) => {
      try {
        const productId = req.params.id;
        const {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          status,
          category,
        } = req.body;
        const newUpdatedProduct = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          status,
          category,
        };
        const verifyExistenceUndefined =
          Object.values(newUpdatedProduct).indexOf(undefined);

        if (verifyExistenceUndefined === -1) {
          const UpdatedProduct = await productsMongo.updateProduct(
            productId,
            newUpdatedProduct
          );
          const products = await productsMongo.getProducts();
          global.io.emit("statusProductsList", products);
          res.sendSuccess(UpdatedProduct);
        } else {
          res.sendUserError({ mesagge: "Product with missing information" });
          return productError(null, {
            title,
            description,
            price,
            thumbail,
            code,
            stock,
            category,
          });
        }
      } catch (error) {
        req.logger.error(error.cause);
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    /**
     * @swagger
     * /{id}:
     *   delete:
     *     summary: Elimina un producto por su ID
     *     tags:
     *       - Productos
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del producto a eliminar
     *     responses:
     *       '200':
     *         description: OK
     *       '500':
     *         description: Error interno del servidor
     */
    this.delete("/:id", ["ADMIN, PREMIUM"], async (req, res) => {
      try {
        const productId = req.params.id;
        const getById = await productsMongo.deleteById(productId);
        const products = await productsMongo.getProducts();
        global.io.emit("statusProductsList", products);
        res.sendSuccess(getById);
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });
  }
}

module.exports = ProductsRouter;
