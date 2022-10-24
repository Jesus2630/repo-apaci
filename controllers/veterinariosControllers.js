//Importo req y res para el autocompletado
import {request,response} from 'express';
import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarID from '../helpers/generarID.js';

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

const perfil = (req = request,res = response)=>{
    const { veterinario } = req;

    res.json({
        msg: 'Mostrando el perfil',
        perfil: veterinario
    }) 
}

const confirmar = async(req = request,res = response) =>{

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

const autenticar = async(req = request,res = response) =>{

    const {email,password} = req.body;

    //Compruebo usuario
    const usuario = await Veterinario.findOne({email});
    
    if(!usuario){
        const error = new Error('El usuario no es válido');
        return res.status(403).json({msg: error.message})
    }
    
    //Compruebo usuario confirmado
    if(!usuario.confirmado){
        const error = new Error('El usuario no se encuentra confirmado');
        return res.status(403).json({msg: error.message});
    }


    //Revisar password
    if(await usuario.comprobarPW(password)){
        //Autenticar
        res.json({token: generarJWT(usuario.id)}) 
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

const restablecer = async(req = request, res = response) =>{
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({email});

    if(!existeVeterinario){
        const error = new Error('El usuario no existe.')
        return res.status(400).json({msg: error.message})
    }

    try {
        existeVeterinario.token =  generarID()
        await existeVeterinario.save()

        res.json({msg: 'Hemos enviado un Email con las instrucciones para restablecer su password'})
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async(req = request, res = response) =>{
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido){
        //El token es válido, el usuario existe
        res.json({msg: 'Token válido, el usuario existe'});
    }else{
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
}

const nuevoPassword = async(req = request, res = response) =>{

    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});

    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message})
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error)
    }
}


export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    restablecer,
    comprobarToken,
    nuevoPassword
}