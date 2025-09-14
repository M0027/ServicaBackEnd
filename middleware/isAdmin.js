function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
}

module.exports = isAdmin;
