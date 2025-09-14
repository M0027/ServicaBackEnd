const Proposal = require('../models/ProposalModel');

async function enviarProposta(req, res) {
  const { order_id, price, message } = req.body;
  const professional_id = req.user.id;

  if (!order_id || !price || !message) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    const proposalId = await Proposal.createProposal({ professional_id,order_id, message, price });
    res.status(201).json({ message: 'Proposta enviada com sucesso.', proposalId });
    console.log('buscou', proposalId)
  } catch (error) {
    console.error('Erro ao enviar proposta:', error);
    res.status(500).json({ error: 'Erro interno.' });
  }
}

async function listarPropostasPorPedido(req, res) {
  const { id } = req.params;

  try {
    const propostas = await Proposal.getProposalsByUser(id);
    res.status(200).json(propostas);
  } catch (error) {
    console.error('Erro ao buscar propostas:', error);
    res.status(500).json({ error: 'Erro interno.' });
  }
}

async function deletarProposta(req, res) {
  const { id } = req.params;

  try {
    const resultado = await Proposal.deleteProposal(id);

    if (resultado === 0) {
      return res.status(404).json({ error: 'Proposta não encontrada.' });
    }

    res.status(200).json({ message: 'Proposta deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar proposta:', error);
    res.status(500).json({ error: 'Erro interno.' });
  }
}

async function responderProposta(req, res){
  const {id} = req.params
  const {status} = req.body  

    try {

    const result = await Proposal.updateProposal(id, status);
     
    res.status(200).json({message: `${status}`})
      
    } catch (error) {
      console.error('erro ao responder a proposta', error)
      res.status(500).json({message:'erro ao responder a proposta'})
    }
}

module.exports = {
  enviarProposta,
  listarPropostasPorPedido,
  deletarProposta,
  responderProposta
};
