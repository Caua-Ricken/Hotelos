const {DataTypes} = require('sequelize');
const conn = require('../db/conn');

const Reserva = conn.define('reservas', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'res_id'
  },
    dataEntrada: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'res_data_entrada'
  },
    dataSaida: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'res_data_saida'
  },
  numNoites: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'res_num_noites'
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'res_valor_total'
  },
  formaPagamento: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'res_forma_pagamento'
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'res_status'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'res_observacoes'
  },
}, {
  tableName: 'reservas',

  createdAt: 'res_created_at',
  updatedAt: 'res_updated_at'
});


module.exports = Reserva;