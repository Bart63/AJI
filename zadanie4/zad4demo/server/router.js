exports.router = (app) => {

const { getIdeasHandler } = require('./handlers/getIdeasHandler');
const { upVoteIdeaHandler } = require('./handlers/upVoteIdeaHandler');
const { downVoteIdeaHandler } = require('./handlers/downVoteIdeaHandler');
const { createIdeaHandler } = require('./handlers/createIdeaHandler');

app.post('/ideas', createIdeaHandler);
app.get('/ideas', getIdeasHandler);
app.post(`/ideas/:ideaId/votes`, upVoteIdeaHandler);
app.delete(`/ideas/:ideaId/votes`, downVoteIdeaHandler);


}