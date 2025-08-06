const express = require('express');
const router = express.Router();//se crea el enrutador para que funcionen los metodos
//esta es la instancia para obtener los controladores realizados
const productController = require('../controllers/productController');

//metodo de crear producto
router.post('/create',productController.createProduct);
//metodo de eliminacion de prodcuto por ID, el ID se pasa como parametro en la ruta
router.delete('/:id_product',productController.deleteProductById);
//metodo de enlistar normal los productos
router.get('/list',productController.getAllProducts);
//metodo para enlistar en orden los productos
router.get('/list_sort',productController.getProductsSorted);
//metodo para obtener un producto con nombre, el nombre se pasa como parametro en la ruta
router.get('/name/:name',productController.getProductByName);
module.exports = router;