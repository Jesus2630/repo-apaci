const registrar = (req,res)=>{
    res.json({
        msg: 'Registro de usuario'
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