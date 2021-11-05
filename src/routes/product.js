const express = require('express');
const Product = require('../controllers/product');
const store = require('../middlewares/multer')
const router = express.Router();


router.get('/', Product.getProducts);
router.post('/', Product.uploadImage);
router.post('/', Product.uploadProduct);
router.get('/:id', Product.getProduct);
router.patch('/:id', Product.updateProduct);
router.delete('/:id', Product.deleteProduct);

module.exports = router;
