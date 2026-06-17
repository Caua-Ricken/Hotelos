const {DataTypes} = require('sequelize');
const conn = require('../db/conn');

const Hospede = conn.define('hospede', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'hos_id'
  },

  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'hos_nome'
  },

  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true,
    field: 'hos_cpf'
  },

  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    field: 'hos_telefone'
  },

   email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'hos_email'
   },
   nacionalidade: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'hos_nacionalidade'
   },
}, {
  tableName: 'hospedes',

  createdAt: 'hos_created_at',
  updatedAt: 'hos_updated_at'
});

module.exports = Hospede;