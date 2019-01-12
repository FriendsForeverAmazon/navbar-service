const sequelize = require('sequelize');
const { connection } = require('./db.js');
const { category } = require('../models/category.model.js');
const { product } = require('../models/product.model.js');

connection.query(
  "COPY categories from ? DELIMITER ',' CSV",
  { replacements: [__dirname + '/../data/category.data.csv'], type: sequelize.QueryTypes.SELECT }
)

connection.query(
  "COPY products from ? DELIMITER ',' CSV",
  { replacements: [__dirname + '/../data/product.data.csv'], type: sequelize.QueryTypes.SELECT }
)