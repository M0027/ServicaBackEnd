const db = require('../config/db');

async function approveProfessional(req, res) {
  const { userId } = req.params;

  try {
    // Verifica se o usuário é mesmo um profissional pendente
    const [users] = await db.query(
      `SELECT * FROM users WHERE id = ? AND role = 'professional' AND is_approved = 0`,
      [userId]
    );
    const user = users[0];

    if (!user) {
      return res.status(404).json({ error: 'Profissional não encontrado ou já aprovado.' });
    }

    // Atualiza o status e define o prazo dos 30 dias grátis
    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    await db.query(
      `UPDATE users SET is_approved = 1, subscription_expires_at = ? WHERE id = ?`,
      [oneMonthLater, userId]
    );

    res.json({ message: `Profissional ${user.name} aprovado com 30 dias grátis.` });
  } catch (err) {
    console.error('Erro ao aprovar profissional:', err);
    res.status(500).json({ error: 'Erro ao aprovar profissional.' });
  }
}

module.exports = {approveProfessional};