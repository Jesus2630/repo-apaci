import express  from "express";
import conectarDB from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

conectarDB();

app.use('/', (req,res)=>{
    res.send('Olis')
})


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})