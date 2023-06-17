const ProductsRouter = require('../controllers/products/controller.products');
const AuthRouter = require('../controllers/auth/controller.auth');
const CartRouter = require('../controllers/carts/controller.carts');
const RealTimeRouter = require('../controllers/realTime/controller.realTimeProducts');
const UsersRouter = require('../controllers/users/controller.users');
const SessionRouter = require('../controllers/sessions/controller.sessions');
const ViewsRouter = require('../controllers/views/controller.views');


const productsRouter = new ProductsRouter();
const authRouter = new AuthRouter();
const cartRouter = new CartRouter();

const realTimeRouter = new RealTimeRouter();
const usersRouter = new UsersRouter();
const sessionRouter = new SessionRouter();
const viewsRouter = new ViewsRouter();

/**Esta es una función que configura el enrutamiento de la aplicación.

En este código se están definiendo las rutas de diferentes routers, que son módulos encargados de manejar las 
diferentes secciones de la aplicación.

Por ejemplo, para las rutas que empiezan con "/api/sessions", se está usando un router llamado "sessionRouter". 
Para las rutas que empiezan con "/api/products", se está usando un router llamado "productsRouter".

De la misma manera, se están definiendo otros routers para manejar la autenticación de usuarios, las vistas de la 
aplicación, la gestión de carritos de compra, etc.

Finalmente, estos routers se registran en la aplicación para que puedan manejar las diferentes solicitudes que 
lleguen al servidor. */
const router = (app) => {
    
    app.use('/api/sessions', sessionRouter.getRouter());
    app.use('/api/products', productsRouter.getRouter());
    app.use('/api/carts', cartRouter.getRouter());
    app.use('/api/auth', authRouter.getRouter());
    app.use('/api/realTimeProducts', realTimeRouter.getRouter());

    app.use('/', viewsRouter.getRouter());
    app.use('/user', usersRouter.getRouter());
};

module.exports = router;