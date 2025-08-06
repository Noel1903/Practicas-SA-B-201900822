// instancia para poder obtener la base de datos
const products = require('../data/productDB');

//método de creación de un producto 
const createProduct = async(req,res)=>{
    const {name,quantity,price} = req.body; //solicitud en forma de JSON
    try {
        //si algun parametro esta vacio lanzará el error
        if (name === undefined || quantity === undefined || price === undefined){
            return res.status(400).json({msg:"Error al crear el producto"});
        }
        //se crea un nuevo producto
        const newProduct = {
            id_product: Date.now().toString(), //se crea un timestamp para el id del producto
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

//Método para eliminar un producto por medio del ID creado
const deleteProductById = async(req,res) =>{
    
    try{
        const {id_product} = req.params;
        const index = products.findIndex(p => p.id_product === id_product);//busca el id del producto
        //si el id no existe entonces lanza un error de inexistencia
        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        products.splice(index,1);//si existe elimina de la lista el registro
        return res.status(200).json({ msg: "Producto eliminado correctamente" });
    }catch(error){
        console.log("El error fue: ",error);
        return res.status(500).json({ msg: "Error al eliminar producto" });
    }
}


const getAllProducts = async(req, res) => {
    try{
        return res.json(products);//por medio de un JSON manda los productos enlistados
    }catch(error){
        return res.status(500).json({ msg: "Error al mostrar la lista de productos" });
    }
}

//Método de ordenamiento de lista en orden por el precio
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

//Método de obtencion de un producto por medio de su nombre
const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    //Se busca el producto no importa si es con mayuscula o minuscula
    const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
    //si no encuentra el nombre el producto no existe y lanza el error
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