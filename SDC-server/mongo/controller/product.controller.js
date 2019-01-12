var { Product } = require('../models/product.model');
var { Category } = require('../models/category.model');

var get = (req, res) => {
  var categoryParam = req.params.category.toLowerCase();
  var { query } = req.params

  if (categoryParam === 'all departments') {
    Product.find({
          name: 
            new RegExp(query.toLowerCase(),'g')
        })
      .then(products => {
        res.status(200).send({ products });
      })
      .catch(err => {
        res.status(500).send({ err });
      });
  } else {
    Category.find({
        category: 
          categoryParam
      })
      .then(category => {
        if (category) {
          return Product.find({
            categoryId: category.id,
            name: 
              new RegExp(query.toLowerCase(),'g')
          })
        }
        return [];
      })
      .then(products => {
        res.status(200).send({ products });
      })
      .catch(err => {
        res.status(500).send({ err });
      })
  }
  var categoryParam = req.params.category.toLowerCase();
  var { query } = req.params

  if (categoryParam === 'all departments') {
    Product.find({
          name: 
            new RegExp(query.toLowerCase(),'g')
        })
      .then(products => {
        res.status(200).send({ products });
      })
      .catch(err => {
        res.status(500).send({ err });
      });
  } else {
    Category.find({
        category: 
          categoryParam
      })
      .then(category => {
        if (category) {
          return Product.find({
            categoryId: category.id,
            name: 
              new RegExp(query.toLowerCase(),'g')
          })
        }
        return [];
      })
      .then(products => {
        res.status(200).send({ products });
      })
      .catch(err => {
        res.status(500).send({ err });
      })
  }
}

var create = (req, res) => {
  var categoryParam = req.params.category;
  var { query } = req.params;
  Category.find({
    category: 
      categoryParam
  })
  .then(category => {
    if (category) {
      return Product.create({
        categoryId: category.id,
        name: 
          new RegExp(query.toLowerCase(),'g')
      })
    }
  })
  .then(products => {
    res.status(200).send({ products });
  })
  .catch(err => {
    res.status(500).send({ err });
  })
}

var update = (req, res) => {
  var categoryParam = req.params.category;
  var oldProduct = req.params.oldProduct;
  var newProduct = req.params.newProduct;
  Category.find({
    category: 
      categoryParam
  })
  .then(category => {
    if (category) {
      return Product.update(
        {name: oldProduct},
        {
          name: newProduct,
          description: req.body
        })
    }
  })
  .then(products => {
    res.status(200).send({ products });
  })
  .catch(err => {
    res.status(500).send({ err });
  })
}

var remove = (req, res) => {
  var categoryParam = req.params.category;
  var { query } = req.params;
  Category.find({
    category: 
      categoryParam
  })
  .then(category => {
    if (category) {
      return Product.deleteOne({
        categoryId: category.id,
        name: 
          new RegExp(query.toLowerCase(),'g')
      })
    }
  })
  .then(products => {
    res.status(200).send({ products });
  })
  .catch(err => {
    res.status(500).send({ err });
  })
}

module.exports = { get, create, update, remove };