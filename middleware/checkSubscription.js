const db = require('../config/db');

async function checkSubscription(req, res, next) {
  const user = req.user;

  if (user.role !== 'profissional') {
    return res.status(403).json({ error: 'Apenas profissionais podem acessar esta funcionalidade.' });
  }

  try {
    const [resultPerfil] = await db.query(`
      SELECT * FROM professional_profiles WHERE user_id = ?`, [user.id]);

    if (resultPerfil.length === 0) {
      return res.status(403).json({ error: 'É necessário criar um perfil.' });
    }

    const perfil = resultPerfil[0];

    const [resultSubiscricao] = await db.query(`
      SELECT * FROM subscriptions WHERE user_id = ?`, [user.id]);

    if (resultSubiscricao.length === 0) {
      return res.status(403).json({ error: 'Sem nenhuma subiscricao.' });
    }

    const subiscrition = resultSubiscricao[0];

    if (perfil.status !== 'aprovado') {
      return res.status(403).json({ error: 'Conta ainda não foi aprovada por um administrador.' });
    }

    const now = new Date();
    const subscriptionExpiresAt = new Date(subiscrition.end_date);

    if (subscriptionExpiresAt < now) {
      return res.status(403).json({
        error: 'Sua assinatura gratuita expirou. Renove para continuar recebendo pedidos.'
      });
    }
    next();

  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = checkSubscription;
