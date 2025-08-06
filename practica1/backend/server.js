//server.js - main de la practica

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoute');

const app = express();
const PORT = 3000;




//middlewares
app.use(cors());
app.use(express.json());


//rutas
app.use('/product',productRoutes);

//Ruta base GET para verificar servidor
app.get('/',(req, res) =>{
    res.send('Hola Mundo!!!!!');
})


//Inicializando el servidor
app.listen(PORT,() =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})