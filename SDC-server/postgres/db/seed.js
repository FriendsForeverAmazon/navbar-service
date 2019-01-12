const sequelize = require('sequelize');
const { connection } = require('./db.js');
const { category } = require('../models/category.model.js');
const { product } = require('../models/product.model.js');

connection.query(
  "COPY categories (category, \"createdAt\", \"updatedAt\") from ? DELIMITER '\t'",
  { replacements: [__dirname + '/../data/category.data.tsv'], type: sequelize.QueryTypes.SELECT }
)

connection.query(
  "COPY products (name, description, \"createdAt\", \"updatedAt\") from ? DELIMITER '\t'",
  { replacements: [__dirname + '/../data/product.data.tsv'], type: sequelize.QueryTypes.SELECT }
)