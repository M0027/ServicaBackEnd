const express = require('express');
const router = express.Router();
const { Adicionar, listar} = require('../controllers/servicesControler');
const  authenticateUser  = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin')

router.get('/', listar);
router.post('/', authenticateUser,isAdmin, Adicionar);

module.exports = router;
