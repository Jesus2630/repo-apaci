import express from "express";
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('Hola soy el api-get') 
})

router.get('/login', (req,res)=>{
    res.send('Hola soy el api-get del login') 
})



export default router;