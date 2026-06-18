const { Quartos, Reservas, Hospedes } = require('../models/index');

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
      const novaReserva = await Reservas.create({
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

      await Quartos.update({ status: 'Reservado' }, { where: { id: quartoId } });

      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
async listarReservas(req, res) {
    try {

        const reservas = await Reservas.findAll({
            include: [
                {
                    model: Hospedes,
                    attributes: ['nome']
                },
                {
                    model: Quartos,
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
    const reserva = await Reservas.findByPk(id);

    if(!reserva) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    reserva.status = status;
    await reserva.save();

    if(status === 'cancelada') {
      await Quartos.update({ status: 'Disponível' }, { where: { id: reserva.quartoId } });
    }

    if(status === 'confirmada' || status === 'pendente') {
      await Quartos.update({ status: 'Reservado' }, { where: { id: reserva.quartoId } });
    }

    res.json(reserva);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},


}