const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
// const { sendWelcomeEmail } = require('../utils/emailService');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  const { name, phone, password, role } = req.body;

  if (!name || !phone || !password || !role) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Telefone já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (name, phone, password, role) 
       VALUES (?, ?, ?, ?)`,
      [name, phone, hashedPassword, role]
    );

    // Buscar o usuário recém-criado
    const [users] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    const user = users[0];

    // Enviar e-mail de boas-vindas (opcional)
    // await sendWelcomeEmail(phone, name);

    return res.status(201).json({
      message: 'Cadastro realizado com sucesso.',
      role: user.role,
      id: user.id,
      nome:user.name
    });

  } catch (err) {
    console.error('Erro no cadastro:', err);
    return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
  }
}




// login
async function login(req, res) {
  const { phone, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    const user = users[0];
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas.' });

    console.log(user.id)
    
    const [professionalProfiles] = await db.query('SELECT * FROM professional_profiles WHERE user_id = ?', [user?.id]);
    // console.log("Conteúdo de professionalProfiles:", professionalProfiles);
    let professionalProfile = null;
    let serviceId = null;

    if (professionalProfiles.length > 0) {
      professionalProfile = professionalProfiles[0];
      serviceId = professionalProfile.service_id;
    }
    console.log("aquuiii", serviceId);
    // if (user.role === 'professional' && user.is_approved !== 1) {
    //   return res.status(403).json({ error: 'Sua conta ainda não foi aprovada.' });
    // }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        service_id: serviceId,
        role: user.role
      }
    });


  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno ao fazer login.' });
  }
}

module.exports = { register, login };