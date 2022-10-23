import express from "express";
const router = express.Router();

import {perfil,registrar,confirmar} from '../controllers/veterinariosControllers.js'


router.post('/', registrar)
router.get('/perfil', perfil)
router.get('/confirmar/:token', confirmar);



export default router;