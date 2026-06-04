const {DataTypes} = require('sequelize');
const conn = require('../db/conn');

const Quartos = conn.define('quartos', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'qua_id'
  },
    numero: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    field: 'qua_numero'
  },
    tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,   
    field: 'qua_tipo'
  },
  andar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'qua_andar'
  },
  diaria: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'qua_diaria'
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'qua_status'
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'qua_descricao'
  }
}, {
  tableName: 'quartos',

  createdAt: 'qua_created_at',
  updatedAt: 'qua_updated_at'
});

module.exports = Quartos;