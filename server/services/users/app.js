if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const cors = require('cors');
const {connection} = require('./config/dbConfig');
const errHandler = require('./middleware/errorHandler');
const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const router = require('./routes');

app.use(cors());
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(router);
app.use(errHandler);

connection().then(() => {
    app.listen(port, () => console.log(`Running onnn port ${port}`))
})

module.exports = app;