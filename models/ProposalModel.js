const db = require('../config/db');

async function createProposal({ professional_id, order_id, price, message }) {
  const [result] = await db.execute(
    `INSERT INTO propostas (professional_id, order_id,  message, price, status, created_at)
     VALUES (?, ?, ?, ?, 'pendente', NOW())`,
    [professional_id, order_id, price, message]
  );
  return result.insertId;
}

async function getProposalsByUser(user_id) {
  const [rows] = await db.execute(
    `SELECT propostas.*, professionals.name AS professional_name, propostas.professional_id
     FROM propostas
     JOIN orders ON propostas.order_id = orders.id
     JOIN users AS professionals ON propostas.professional_id = professionals.id
     WHERE orders.client_id = ?`,
    [user_id]
  );
  return rows;
}

async function deleteProposal(id) {
  const [result] = await db.execute(`DELETE FROM propostas WHERE id = ?`, [id]);
  return result.affectedRows;
}

async function updateProposal(id, status) {

  const [result] = await db.execute(`UPDATE propostas SET status = ? WHERE id = ?`,[status,id])
  
}

module.exports = {
  createProposal,
  getProposalsByUser,
  deleteProposal,
  updateProposal
};
