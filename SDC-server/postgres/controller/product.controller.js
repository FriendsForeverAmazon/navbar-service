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
  const categoryParam = req.params.category;
  const { query } = req.params;
  Category.findOne({ where: { category: categoryParam } })
  .then((category) => {
    if (category) {
      return Product.create({
        where: {
          categoryId: category.id,
          name: `${query.toLowerCase()}`
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

const update = (req, res) => {
  const categoryParam = req.params.category;
  const oldProduct = req.params.oldProduct;
  const newProduct = req.params.newProduct;
  Category.find({
    category: 
      categoryParam
  })
  .then(category => {
    if (category) {
      return Product.updateOne(
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

const remove = (req, res) => {
  const categoryParam = req.params.category;
  const { query } = req.params;
  Category.find({
    category: 
      categoryParam
  })
  .then(category => {
    if (category) {
      return Product.destroy({
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
