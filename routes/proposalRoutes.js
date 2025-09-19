const express = require('express');
const router = express.Router();
const {enviarProposta, listarPropostasPorPedido, deletarProposta, responderProposta, listarPropostasPorProfissional} = require('../controllers/proposalController');
const  authenticateUser = require('../middleware/auth');
const checkSubscription = require('../middleware/checkSubscription')
const {validateProposta} = require('../middleware/validateInput')


router.post('/', authenticateUser, checkSubscription, validateProposta, enviarProposta);
router.get('/:id',authenticateUser, listarPropostasPorPedido);
router.get('/byProf/:profId', authenticateUser, listarPropostasPorProfissional);
router.delete('/:id', authenticateUser, checkSubscription, deletarProposta);
router.put('/:id', authenticateUser,responderProposta);

module.exports = router;
