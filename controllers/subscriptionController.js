const SubscriptionModel = require('../models/Subscription');

async function getMySubscription(req, res) {
  const userId = req.user.id;

  try {
    const subscription = await SubscriptionModel.getSubscriptionByUserId(userId);
    if (!subscription) {
      return res.status(404).json({ message: 'Nenhuma assinatura encontrada.' });
    }
    res.json(subscription);
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    res.status(500).json({ error: 'Erro interno.' });
  }
}


async function crearSubscription (req, res) {
  const userId = req.user.id;

  try {
    const crearSubsiscricao = await SubscriptionModel.createSubscription(userId, 30)

    return res.status(201).json({message:`subiscrito com sucesso ${userId}`})

  } catch (error) {

    console.error('erro ao subcrever',error);
    return res.status(500).json({message:`subiscrito sem sucesso ${userId}`})

    
  }
  

  
}

async function expirarSubiscricao (req, res) {
  const userId = req.user.id;

  try {
    const expirarSubsiscricao = await SubscriptionModel.expireSubscriptions(userId)

    return res.status(201).json({message:`subiscrito expirada com sucesso ${userId}`})

  } catch (error) {

    console.error('erro ao expirar subcricao',error);
    return res.status(500).json({message:`expiracao sem sucesso sem sucesso ${userId}`})

    
  }
  

  
}

module.exports = {
  getMySubscription,
  crearSubscription,
  expirarSubiscricao
};
