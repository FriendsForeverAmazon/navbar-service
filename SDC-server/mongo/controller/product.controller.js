const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');

const get = (req, res) => {
  const categoryParam = req.params.category.toLowerCase();
  const { query } = req.params

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

module.exports = { get };