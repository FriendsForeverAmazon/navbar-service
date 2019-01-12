const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

//MONGO ROUTERS
const categoriesRouter = require('./mongo/routes/category.routes');
const productsRouter = require('./mongo/routes/product.routes');

//POSTGRES ROUTERS
// const categoriesRouter = require('./postgres/routes/category.routes');
// const productsRouter = require('./postgres/routes/product.routes');

const app = express();
const PORT = 3003;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(cors());
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;