const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');


router.post('/create',productController.createProduct);
router.delete('/:id_product',productController.deleteProductById);
router.get('/list',productController.getAllProducts);
router.get('/list_sort',productController.getProductsSorted);
router.get('/name/:name',productController.getProductByName);
module.exports = router;