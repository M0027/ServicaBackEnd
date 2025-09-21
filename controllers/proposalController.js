const Proposal = require('../models/ProposalModel');

async function enviarProposta(req, res) {
  const { order_id, price, message, user_id } = req.body;
  const professional_id = req.user.id;

  if (!order_id || !price || !message) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    const proposalId = await Proposal.createProposal({ professional_id,order_id, message, price, user_id });
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

async function listarPropostasPorProfissional(req, res) {
  const { profId } = req.params;

  console.log(profId);

  try {
    const propostas = await Proposal.getProposalsByProf(profId);
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
  const {dados} = req.body  

  console.log('@@@@@@@@@@@@@@@@@@@@@', dados.status, dados.profissional_id)

    try {

    const result = await Proposal.updateProposal(id, dados.status, dados.profissional_id);
     
    res.status(200).json({message: `${dados.status}`})
      
    } catch (error) {
      console.error('erro ao responder a proposta', error)
      res.status(500).json({message:'erro ao responder a proposta'})
    }
}

module.exports = {
  enviarProposta,
  listarPropostasPorPedido,
  deletarProposta,
  responderProposta,
  listarPropostasPorProfissional
};
