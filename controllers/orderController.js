const db = require('../config/db');

async function createPedidoPublic(req, res) {
  //const {client_id}= req.params
  const { client_id, title, description, event_date, location, service_id } = req.body;

  if (!client_id || !service_id || !title || !description || !service_id) {
    console.log(client_id, title, description, event_date, location, client_id)
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });

  }

  try {
    const [result] = await db.execute(`
      INSERT INTO orders (client_id, title, description, event_date, location, service_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [client_id, title, description, event_date, location, service_id]);

    res.status(201).json({ message: 'Pedido enviado com sucesso!', orderId: result.insertId });
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

// Listar todos os pedidos
async function listarPedidos(req, res) {
  const {id} = req.params

  console.log(id)
  try {
    const [pedidos] = await db.execute('SELECT * FROM orders WHERE service_id = ? ORDER BY created_at DESC', [id]);
    if (pedidos.length > 0) {

      res.status(200).json(pedidos);
    } else {
      res.status(200).json([])
    }
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
}

// Deletar um pedido por ID
async function deletarPedido(req, res) {
  const { id } = req.params;

  try {
    const [resultado] = await db.execute('DELETE FROM orders WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    res.status(200).json({ message: 'Pedido deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    res.status(500).json({ error: 'Erro interno.' });
  }
}

module.exports = {
  createPedidoPublic,
  listarPedidos,
  deletarPedido
}
