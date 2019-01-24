var { Product } = require('../models/product.model');
var { Category } = require('../models/category.model');
var { cache } = require('../db/db.js');

var get = (req, res) => {
  var categoryParam = req.params.category.toLowerCase();
  var query = req.params.query.toLowerCase();
  
  if (categoryParam === 'all departments') {
    cache.exists(query)
      .then(exists => {
        if (exists) {
          return cache.get(query);
        } else {
          console.log(exists);
          return Promise.resolve(false);
        }
      })
      .then(products => {
        if (products) {
          res.status(200).send({ products: JSON.parse(products) });
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false)
        }
      })
      .then(responseWasSent => {
        if(!responseWasSent) {
          return Product.find({name: new RegExp(`^${query}`)}).limit(5)
        } else {
          return Promise.resolve("Response was sent");
        }
      })
      .then(products => {
        if (products.length === 0) {
          return Product.find({name: new RegExp(query)}).limit(5)
        } else if (products === "Response was sent") {
          return Promise.resolve(false);
        } else {
          cache.set(query, JSON.stringify(products));
          res.status(200).send({ products });
          return Promise.resolve(false);
        }
      })
      .then(products => {
        if(products) {
          cache.set(query, JSON.stringify(products));
          res.status(200).send({ products });
        }
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
  var product = req.params.product;
  Category.find({
    category: 'all departments'
  })
  .then(category => {
    if (category) {
      
      return Product.create({
        categoryId: category.id,
        name: product,
        description: ''
      })
    }
  })
  .then(product => {
    cache.set(product, JSON.stringify(product));
    res.status(200).send({ product });
  })
  .catch(err => {
    res.status(500).send({ err });
  })
}

var update = (req, res) => {
  var oldProduct = req.params.oldProduct;
  var newProduct = req.params.newProduct;
  Category.find({
    category: 'all departments'
  })
  .then(category => {
    if (category) {
      return Product.update(
        {name: oldProduct}, 
        {
          name: newProduct
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
  var { query } = req.params;
  Category.find({
    category: 'all departments'
  })
  .then(category => {
    if (category) {
      return Product.deleteOne({
        categoryId: category.id,
        name: query
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