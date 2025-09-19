const express = require('express');
const router = express.Router();
const { createPedidoPublic, listarPedidos, deletarPedido, listarPedidosUser } = require('../controllers/orderController');
const {validateOrder} = require('../middleware/validateInput')
const authenticateUser = require('../middleware/auth');


router.post('/criar',authenticateUser, validateOrder, createPedidoPublic); // rota pública
router.get('/:id', authenticateUser, listarPedidos);
router.get('/byUser/:id', authenticateUser, listarPedidosUser);
router.delete('/:id', authenticateUser, deletarPedido);



module.exports = router;
