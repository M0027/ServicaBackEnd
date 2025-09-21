const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/auth'); // middleware para verificar JWT
const {validateComment} = require('../middleware/validateInput')
// Criar comentário
router.post('/',authenticate,validateComment, commentController.createComment);

// Listar comentários de um profissional
router.get('/:professional_id', authenticate, commentController.listComments);
module.exports = router;
