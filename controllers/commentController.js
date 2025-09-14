const Comment = require('../models/Comment');

const commentController = {
  async createComment(req, res) {
    try {
      const { professional_id, comment,user_id } = req.body;
      // const user_id = 1// req.user.id; vem do token autenticado

      if (!professional_id || !comment) {
        return res.status(400).json({ error: 'Dados incompletos.' });
      }

      const commentId = await Comment.create({ user_id, professional_id, comment });

      return res.status(201).json({ message: 'Comentário criado com sucesso.', commentId });
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async listComments(req, res) {
    try {
      const { professional_id } = req.params;

      const comments = await Comment.getByProfessionalId(professional_id);

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Erro ao listar comentários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = commentController;
