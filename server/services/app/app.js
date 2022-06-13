if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
require('dotenv').config();
const cors = require('cors');
const errHandler = require('./middlewares/errHandler');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes');

app.use(cors());

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(router);

app.use(errHandler);

app.listen(port, () => console.log(`Running on port ${port}`))

module.exports = app;