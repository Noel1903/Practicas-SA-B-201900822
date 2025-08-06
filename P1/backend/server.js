//server.js - main de la practica

const express = require('express');//creacion con express
const cors = require('cors');//utilizacion de cors
//instancia del enrutador de los productos
const productRoutes = require('./routes/productRoute');

const app = express();
const PORT = 3000;//este es el puerto que se va a utilizar

//middlewares
app.use(cors());
app.use(express.json());

//rutas creadas para los productos
app.use('/product',productRoutes);

//Ruta base GET para verificar servidor
app.get('/',(req, res) =>{
    res.send('Hola Mundo!!!!!');
})


//Inicializando el servidor
app.listen(PORT,() =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})