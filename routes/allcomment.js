const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Criar comentário

// listar todos comennterio
router.get('/', commentController.listAllComments);

module.exports = router;
