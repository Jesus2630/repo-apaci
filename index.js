import express  from "express";
import conectarDB from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()

//Routes importaciones
import veterinariosRoutes from './routes/veterinariosRoutes.js'

//Inicializo app
const app = express();

//Conecto base de datos
conectarDB();

//Routes
app.use('/api/veterinarios', veterinariosRoutes)

//Inicio puerto
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})