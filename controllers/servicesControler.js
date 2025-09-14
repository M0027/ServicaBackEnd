const Service = require('../models/services');

async function Adicionar(req, res) {
    const {name} = req.body;

    try {
        const service = await Service.createService(name);
        res.status(201).json({message: 'Criado com sucesso'})
        
    } catch (error) {

        console.error('errro ao cria servico',error)
        res.status(500).json({message:'erro do servidor'})
        
    }
}

async function listar(req, res) {

    try {
        const service= await Service.selecionarServices();
        res.status(201).json(service)
        return service;
    } catch (error) {

        console.error('errro ao listar servico',error)
        res.status(500).json({message:'erro do servidor'})
        
    }
}


module.exports ={ Adicionar,listar}