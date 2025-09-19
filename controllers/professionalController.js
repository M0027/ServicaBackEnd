const profileModel = require('../models/ProfessionalProfile');
const { param } = require('../routes/proposalRoutes');

async function createOrUpdateProfile(req, res) {

  const { service_id, description, address, image_url } = req.body;
  const user_id = req.user.id; 
  
  //vem do token autenticado
  const Service_id = parseInt(service_id)
  
  try {
    const existing = await profileModel.getProfileByUserId(user_id);
    console.log("idididi", Service_id)
    if (existing) {
      await profileModel.updateProfile(user_id, { Service_id, description, address, image_url });
      res.status(200).json({ message: 'Perfil atualizado com sucesso.' });
    } else {
      await profileModel.createProfile({ user_id, Service_id, description, address, image_url });
      res.status(201).json({ message: 'Perfil criado com sucesso, por favor aguarde a aprovacao dentro de 24h.' });
    }
  } catch (err) {
    console.error('Erro ao salvar perfil:', err);
    res.status(500).json({ error: 'Erro interno ao salvar perfil.' });
  }
}

async function getOwnProfile(req, res) {
  const { id }= req.params;
  const requiId = req.user.id
  
  try {
    const profile = await profileModel.getProfileByUserId(id);
    if (!profile) return res.status(404).json({ message: 'Perfil não encontrado.' });
    res.json(profile);
    console.log(profile);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
}

module.exports = { createOrUpdateProfile, getOwnProfile };
