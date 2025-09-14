const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const professionalRoutes = require('./routes/professional');
const subscriptionRoutes = require('./routes/subscriptions');
const userRoutes = require('./routes/auth');
const pedidoRoutes = require('./routes/orders')
const proposalRoutes = require('./routes/proposalRoutes');
const serviceRoutes = require('./routes/serviceRoutes')
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

app.use(cors());
app.use(express.json());

// Importar rotas (serão criadas depois)
app.use('/api/users', userRoutes);
app.use('/api/professional', professionalRoutes);
app.use('/api/pedidos', pedidoRoutes)
app.use('/api/propostas', proposalRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/subscricao', subscriptionRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
