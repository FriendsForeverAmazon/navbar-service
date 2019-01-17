const mongoose = require('mongoose');
const { connection } = require('../db/db')

const ProductSchema = new mongoose.Schema(
  {
    index: Number,
    name: String,
    description: String,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
  });
  
const Product = connection.model('Product', ProductSchema);
module.exports = { Product };