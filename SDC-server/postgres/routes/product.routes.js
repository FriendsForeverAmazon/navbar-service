const router = require('express').Router();
const productsController = require('../controller/product.controller');

router.get('/:category/:query', productsController.get);
router.post('/create/:category/:query', productsController.create);
router.put('/update/:category/:oldProduct/:newProduct', productsController.update);
router.delete('/delete/:category/:query', productsController.remove);

module.exports = router;