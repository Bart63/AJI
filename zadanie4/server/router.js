exports.router = (app) => {
    const { createProductHandler } = require('./handlers/createProductHandler');
    const { getCategoriesHandler } = require('./handlers/getCategoriesHandler');
    const { getProductsHandler } = require('./handlers/getProductsHandler');
    const { updateProductHandler } = require('./handlers/updateProductHandler');
    const { createOrderHandler } = require('./handlers/createOrderHandler');
    const { getOrdersWithStateHandler } = require('./handlers/getOrdersWithStateHandler');
    const { getOrdersStatesHandler } = require('./handlers/getOrdersStatesHandler');

    app.post('/products', createProductHandler);
    app.get('/categories', getCategoriesHandler);
    app.get('/products', getProductsHandler);
    app.get('/status', getOrdersStatesHandler);
    app.get('/orders/status/:stateId', getOrdersWithStateHandler);
    app.post(`/orders`, createOrderHandler);
    app.put('/products/:_id', updateProductHandler);
}