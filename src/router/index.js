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