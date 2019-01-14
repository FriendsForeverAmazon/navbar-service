const sequelize = require('sequelize');
const { connection } = require('./db.js');
const { category } = require('../models/category.model.js');
const { product } = require('../models/product.model.js');

connection.query(
  "COPY categories (category, \"createdAt\", \"updatedAt\") from ? DELIMITER '\t'",
  { replacements: [__dirname + '/../data/category.data.tsv'], type: sequelize.QueryTypes.SELECT }
)
.then(() => {
  return connection.query(
    "COPY products (name, description, \"categoryId\", \"createdAt\", \"updatedAt\") from ? DELIMITER '\t'",
    { replacements: [__dirname + '/../data/product.data.tsv'], type: sequelize.QueryTypes.SELECT }
  )
})
.then(() => {
  console.log('GOSH DANG YOU JUST KNOW THAT DATABASE GOT SEEDED BOI')
})