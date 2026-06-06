const Quartos = require('../models/Quartos');

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
}