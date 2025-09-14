const jwt = require('jsonwebtoken');
const db = require('../config/db');

const SECRET = process.env.JWT_SECRET;

async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    // Buscar o usuário no banco
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.id]);

    if (!rows[0]) {
      return res.status(401).json({ error: 'Usuário inválido.' });
    }

    req.user = rows[0]; // coloca o usuário no req
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

module.exports = authenticateUser;