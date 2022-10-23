import express from "express";
const router = express.Router();

import {perfil,registrar} from '../controllers/veterinariosControllers.js'


router.post('/', registrar)

router.get('/perfil', perfil)



export default router;