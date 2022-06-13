if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const router = require('./routes');

const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(router);

app.listen(port, () => console.log(`Running on port ${port}`));