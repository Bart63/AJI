exports.router = (app) => {

const { getIdeasHandler } = require('./handlers/getIdeasHandler');
const { upVoteIdeaHandler } = require('./handlers/upVoteIdeaHandler');
const { downVoteIdeaHandler } = require('./handlers/downVoteIdeaHandler');
const { createIdeaHandler } = require('./handlers/createIdeaHandler');
const { createProductHandler } = require('./handlers/createProductHandler');
const { getCategoriesHandler } = require('./handlers/getCategoriesHandler');

app.post('/ideas', createIdeaHandler);
app.post('/products', createProductHandler);
app.get('/ideas', getIdeasHandler);
app.get('/categories', getCategoriesHandler);
app.post(`/ideas/:ideaId/votes`, upVoteIdeaHandler);
app.delete(`/ideas/:ideaId/votes`, downVoteIdeaHandler);


}