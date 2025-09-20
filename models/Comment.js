const db = require('../config/db');

const Comment = {
  async create({ user_id, professional_id, comment }) {
    const [result] = await db.execute(
      `INSERT INTO comments (user_id, professional_id, comment) VALUES (?, ?, ?)`,
      [user_id, professional_id, comment]
    );
    return result.insertId;
  },

  async getByProfessionalId(professional_id) {
    const [rows] = await db.execute(
      `SELECT comments.*, users.name 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE comments.professional_id = ? 
       ORDER BY comments.created_at DESC`,
      [professional_id]
    );
    return rows;
  },

  async ListAllComments() {
    const [rows] = await db.execute(
      `SELECT comments.*, users.name 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       ORDER BY comments.created_at DESC
       LIMIT 3`
       
    );
    return rows;
  }
};

module.exports = Comment;
