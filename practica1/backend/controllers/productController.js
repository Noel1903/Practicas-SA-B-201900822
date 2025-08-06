//const Product = require('../models/productModel');

const products = require('../data/productDB');

const createProduct = async(req,res)=>{
    const {name,quantity,price} = req.body;
    try {
        if (name === undefined || quantity === undefined || price === undefined){
            return res.status(400).json({msg:"Error al crear el producto"});
        }
        const newProduct = {
            id_product: Date.now().toString(),
            name,
            quantity,
            price,
        };
        products.push(newProduct);
        return res.status(201).json({msg:"Producto agregado correctamente"});
    }catch{
        return res.status(500).json({msg:"Error al crear el producto"});
    }
    
}


const deleteProductById = async(req,res) =>{
    
    try{
        const {id_product} = req.params;
        const index = products.findIndex(p => p.id_product === id_product);
        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        products.splice(index,1);
        return res.status(200).json({ msg: "Producto eliminado correctamente" });
    }catch(error){
        console.log("El error fue: ",error);
        return res.status(500).json({ msg: "Error al eliminar producto" });
    }
}


const getAllProducts = async(req, res) => {
    try{
        return res.json(products);
    }catch(error){
        return res.status(500).json({ msg: "Error al mostrar la lista de productos" });
    }
}

const getProductsSorted = async (req, res) => {
  try {
    const { sortBy = 'price', order = 'asc' } = req.query;
    const sorted = [...products].sort((a, b) => {
        return order === 'desc' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
    });

    return res.json(sorted);
  } catch (error) {
    console.error('Error al ordenar productos:', error.message);
    return res.status(500).json({ msg: 'Error al ordenar productos' });
  }
}

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    return res.json(product);
  } catch (error) {
    console.error('Error al buscar producto por nombre:', error.message);
    return res.status(500).json({ msg: 'Error al buscar producto' });
  }
}



module.exports = {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductsSorted,
    getProductByName
}