exports.router = (app) => {

const { getIdeasHandler } = require('./handlers/getIdeasHandler');
const { upVoteIdeaHandler } = require('./handlers/upVoteIdeaHandler');
const { downVoteIdeaHandler } = require('./handlers/downVoteIdeaHandler');
const { createIdeaHandler } = require('./handlers/createIdeaHandler');
const { createProductHandler } = require('./handlers/createProductHandler');
const { getCategoriesHandler } = require('./handlers/getCategoriesHandler');
const { getProductsHandler } = require('./handlers/getProductsHandler');

app.post('/ideas', createIdeaHandler);
app.post('/products', createProductHandler);
app.get('/ideas', getIdeasHandler);
app.get('/categories', getCategoriesHandler);
app.get('/products', getProductsHandler);
app.post(`/ideas/:ideaId/votes`, upVoteIdeaHandler);
app.delete(`/ideas/:ideaId/votes`, downVoteIdeaHandler);


}