const express = require('express');
const router = express.Router();
const { approveProfessional } = require('../controllers/adminController');
const isAdmin = require('../middleware/isAdmin');
const authenticate = require('../middleware/auth')
const {approveProfessional} = require('../controllers/adminController')


// Rota protegida por autenticação e verificação de admin
router.patch('/approve/:userId', authenticate, isAdmin, approveProfessional);

module.exports = router;
