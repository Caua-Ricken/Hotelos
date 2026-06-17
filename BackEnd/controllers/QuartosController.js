const Quartos = require('../models/Quartos');
const Reservas = require('../models/Reservas');
const Hospedes = require('../models/Hospedes');
Quartos.hasMany(Reservas, {
  foreignKey: "quartoId",
});

module.exports = {

    async listarQuartosLivres(req, res) {
        try {
            const quartosLivres = await Quartos.findAll({ raw: true,
                where: { status: 'disponivel'}
            });
            res.json(quartosLivres);
        } catch (error) {
            console.error("Erro ao listar quartos livres:", error);
            res.status(500).json({ error: "Erro ao listar quartos livres" });
        }
    },

    async listarTodosQuartos(req, res) {
        try {
            const quartos = await Quartos.findAll({ 
                include: [
    {
      model: Reservas,
      include: [
        {
          model: Hospedes,
          attributes: ['nome']
        }
      ]
    }
  ]
            });
            res.json(quartos);
        } catch (error) {
            console.error("Erro ao listar quartos:", error);
            res.status(500).json({ error: "Erro ao listar quartos" });
        }
    },

    
}