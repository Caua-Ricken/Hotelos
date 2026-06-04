const {DataTypes} = require('sequelize');
const conn = require('../db/conn');

const reserva = require('./Reservas');

const Estadias = conn.define('estadias', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'est_id'
  },
    checkinEm: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
    field: 'est_checkin_em'
  },
    checkoutEm: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'est_checkout_em'
  },
  valorCobrado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'est_valor_cobrado'
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'est_status'
  },
}, {
  tableName: 'estadias',

  createdAt: 'est_created_at',
  updatedAt: 'est_updated_at'
});

Estadias.belongsTo(reserva, {
    foreignKey: {
        name: 'reservaId',
        field: 'est_reserva_id',
    }
});

module.exports = Estadias;