import {request,response} from 'express';
import Veterinario from '../models/Veterinario.js'

const registrar = async(req = request,res = response)=>{
    const {nombre,password,email} = req.body

    //Prevenir duplicación de usuarios
    const existeUsuario = await Veterinario.findOne({email})

    if(existeUsuario){
        const error = new Error('El usuario ya se encuentra registrado')
        return res.status(400).json({msg: error.message});
    }

    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado) 
    } catch (error) {
        console.log(error)
    }
}

const perfil = (req,res)=>{
    res.json({
        msg: 'Mostrando el perfil'
    }) 
}

const confirmar = async(req,res) =>{

    const {token} = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token})  

    if(!usuarioConfirmar){
        const error = new Error('Tokén no válido')
        return res.status(400).json({msg: error.message})
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save()

        res.json({
            msg: 'Usuario confirmado correctamente'
        })   
    } catch (error) {
        console.log(error)
    }
}

export {
    registrar,
    perfil,
    confirmar 
}