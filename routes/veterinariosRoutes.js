import express from "express";
const router = express.Router();

import {
        perfil,registrar,confirmar,autenticar,restablecer,
        comprobarToken,nuevoPassword
    }
from '../controllers/veterinariosControllers.js'

import {checkAuth} from '../middlewares/authMiddlewares.js'

//Rutas públicas
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar); 
router.post('/restablecer', restablecer);
router.route('/restablecer/:token').get(comprobarToken).post(nuevoPassword);

//Rutas privadas
router.get('/perfil', checkAuth ,perfil) 


export default router;