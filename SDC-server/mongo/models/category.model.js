const mongoose = require('mongoose');
const { connection } = require('../db/db.js')

const CategorySchema = new mongoose.Schema(
  {
    category: String,
    image: String
  });

const Category = connection.model('Category', CategorySchema);
module.exports = { Category };