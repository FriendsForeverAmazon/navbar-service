const router = require('express').Router();
const categoriesController = require('../controller/category.controller');

router.get('/', categoriesController.getAll);
router.post('/create/:category', categoriesController.create);
router.put('/update/:category/:newCategory', categoriesController.update);
router.delete('/delete/:category', categoriesController.remove);

module.exports = router;
