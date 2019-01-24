const Sequelize = require('sequelize');
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');

const get = (req, res) => {
  const categoryParam = req.params.category.toLowerCase();
  const { query } = req.params;

  if (categoryParam === 'all departments') {
    Product.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${query.toLowerCase()}%`,
        },
      },
      limit: 5
    })
      .then((products) => {
        res.status(200).send({ products });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  } else {
    Category.findOne({ where: { category: categoryParam } })
      .then((category) => {
        if (category) {
          return Product.findAll({
            where: {
              categoryId: category.id,
              name: {
                [Sequelize.Op.like]: `%${query.toLowerCase()}%`,
              },
            },
          });
        }

        return [];
      })
      .then((products) => {
        res.status(200).send({ products });
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }
};

const create = (req, res) => {
  const { product } = req.params;
  return Product.create({
      categoryId: 1,
      name: product,
      description: ''
  })
  .then((products) => {
    res.status(200).send({ products });
  })
  .catch((err) => {
    res.status(500).send({ err });
  });
}

const update = (req, res) => {
  const oldProduct = req.params.oldProduct;
  const newProduct = req.params.newProduct;
  Product.update(
    {
      name: newProduct,
      description: ''
    },
    {where: {name: oldProduct} }
    )
  .then(products => {
    res.status(200).send({ products });
  })
  .catch(err => {
    res.status(500).send({ err });
  })
}

const remove = (req, res) => {
  const query = req.params.query;
  Product.destroy(
    {where: {name: query}
  })
  .then(products => {
    res.status(200).send({ products });
  })
  .catch(err => {
    res.status(500).send({ err });
  })
}

module.exports = { get, create, update, remove };
