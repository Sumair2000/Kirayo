const express = require('express');
const Product = require('../controllers/product');
const store = require('../middlewares/multer')
const router = express.Router();

router.post('/reserve',Product.reserve);
router.get('/getProducts', Product.getProducts);
router.post('/uploadImage', Product.uploadImage);
router.post('/uploadProduct', Product.uploadProduct);
router.get('/:id', Product.getProduct);
router.patch('/:id', Product.updateProduct);
router.delete('/:id', Product.deleteProduct);
router.get('/getMyPosts/:id',Product.getMyPosts);
module.exports = router;
