const router = require('express').Router();
// const productsController = require('../postgres/controller/product.controller');
const productsController = require('../mongo/controller/product.controller');


router.get('/:category/:query', productsController.get);
router.post('/create/:product', productsController.create);
router.put('/update/:oldProduct/:newProduct', productsController.update);
router.delete('/delete/:query', productsController.remove);

module.exports = router;