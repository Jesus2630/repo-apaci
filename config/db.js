import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const dbConnection = async() =>{
    const URI = process.env.URI;
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    console.log('Base de datos conectada correctamente')
    } catch (error) {
        throw new Error('Error al conectarse a la base de datos')
    }
}

export default dbConnection;