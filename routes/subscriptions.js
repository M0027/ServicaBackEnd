const express = require('express');
const router = express.Router();
const {  getMySubscription, crearSubscription, expirarSubiscricao } = require('../controllers/subscriptionController');
const  authenticateUser  = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.get('/me', authenticateUser, getMySubscription);
router.put('/expirar',authenticateUser,isAdmin, expirarSubiscricao);
router.post('/activar',authenticateUser,isAdmin, crearSubscription);

module.exports = router;
