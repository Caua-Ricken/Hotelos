const Reserva = require('../models/Reservas');
const Hospede = require('../models/Hospedes');
const Quarto = require('../models/Quartos');


module.exports = {

    async cadastrarReserva(req, res) {
    const {
      hospedeId,
      quartoId,
      dataEntrada,
      dataSaida,
      numNoites,
      valorTotal,
      formaPagamento,
      status,
      observacoes
    } = req.body;

    try {
      const novaReserva = await Reserva.create({
        hospedeId: hospedeId,
        quartoId: quartoId,
        dataEntrada,
        dataSaida,
        numNoites,
        valorTotal: valorTotal,
        formaPagamento,
        status,
        observacoes
      });

      await Quarto.update({ status: 'Reservado' }, { where: { id: quartoId } });

      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
async listarReservas(req, res) {
    try {

        const reservas = await Reserva.findAll({
            include: [
                {
                    model: Hospede,
                    attributes: ['nome']
                },
                {
                    model: Quarto,
                    attributes: ['numero']
                }
            ]
        });

        res.json(reservas);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

async alterarStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const reserva = await Reserva.findByPk(id);

    if(!reserva) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    reserva.status = status;
    await reserva.save();

    if(status === 'cancelada') {
      await Quarto.update({ status: 'Disponível' }, { where: { id: reserva.quartoId } });
    }

    if(status === 'confirmada' || status === 'pendente') {
      await Quarto.update({ status: 'Reservado' }, { where: { id: reserva.quartoId } });
    }

    res.json(reserva);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},


}