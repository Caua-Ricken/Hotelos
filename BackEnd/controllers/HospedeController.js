const { Hospedes, Reservas } = require('../models/index');


module.exports = {

    async listarHospedes(req, res) {
        try {
            const hospedes = await Hospedes.findAll({ raw: true });
            res.json(hospedes);
        } catch (error) {
            console.error("Erro ao listar hóspedes:", error);
            res.status(500).json({ error: "Erro ao listar hóspedes" });
        }
    },

    async criarHospede(req, res) {
        const { nome, cpf, email, telefone, nacionalidade } = req.body;

        try {
            const novoHospede = await Hospedes.create({
                nome,
                cpf,
                email,
                telefone,
                nacionalidade
            });
            res.status(201).json(novoHospede);
        } catch (error) {
            console.error("Erro ao criar hóspede:", error);
            res.status(500).json({ error: "Erro ao criar hóspede" });
        }
    },

   async excluirHospede(req, res) {
        const { id } = req.params;

        try {
        const hospede = await Hospedes.findByPk(id);

        if (!hospede) {
            return res.status(404).json({
                error: "Hóspede não encontrado"
            });
        }

        const reservaAtiva = await Reservas.findOne({
            where: {
                hospedeId: id,
                status: ['pendente', 'confirmada']
            }
        });

        if (reservaAtiva) {
            return res.status(400).json({
                error: "Este hóspede possui reservas ativas."
            });
        }

        await hospede.destroy();

        res.json({
            message: "Hóspede excluído com sucesso"
        });

        } catch (error) {
            console.error("Erro ao excluir hóspede:", error);
            res.status(500).json({ error: "Erro ao excluir hóspede" });
        }
    }

}