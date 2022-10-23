import {request,response} from 'express';

const registrar = (req = request,res = response)=>{

    const {nombre,password,email} = req.body

    res.json({
        msg: 'Registro de usuario',
        body :{
            nombre,
            password,
            email
        }
    }) 
}

const perfil = (req,res)=>{
    res.json({
        msg: 'Mostrando el perfil'
    }) 
}

export {
    registrar,
    perfil
}