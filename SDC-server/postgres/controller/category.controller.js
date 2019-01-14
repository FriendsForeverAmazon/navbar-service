const { Category } = require('../models/category.model');

const getAll = (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

const create = (req, res) => {
  const category = req.params;
  Category.create(category)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send({ err });
    })
};

const update = (req, res) => {
  const category = { category: req.params.category};
  const newCategory = { category: req.params.newCategory};
  Category.update(newCategory, {where: category})
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send({ err });
    })
};

const remove = (req, res) => {
  const category = req.params;
  Category.destroy({ where: category})
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send({ err });
    })
};

module.exports = { getAll, create, update, remove };
