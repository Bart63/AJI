const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getClient } = require('./db');
const app = express();
const { router } = require('./router');

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));

router(app);
app.listen(5000);
