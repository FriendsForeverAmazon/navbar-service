const { Category } = require('../models/category.model')

const getAll = (req, res) => {
  Category.find({})
    .then(categories => {
      res.status(200).send({ categories });
    })
    .catch(err => {
      res.status(500).send({ err });
    })
};

const create = (req, res) => {
  const { category } = req.params.category;
  Category.create(category)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send({ err });
    })
}

const update = (req, res) => {
  const { category } = req.params.category;
  const { newCategory } = req.params.newCategory;
  Category.updateOne(category, newCategory)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send({ err });
    })
}

const remove = (req, res) => {
  const { category } = req.params.category;
  Category.deleteOne(category)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send({ err });
    })
}

module.exports = { getAll, create, update, remove };