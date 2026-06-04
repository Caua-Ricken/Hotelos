const { DataTypes } = require('sequelize');
const conn = require('../db/conn');

const Atividade = conn.define('atividades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ati_id'
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'ati_tipo'
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'ati_descricao'
    },
    referencia: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'ati_referencia'
    },
    criadoEm: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'ati_criado_em'
    },
},
    {
        tableName: 'atividades',

        createdAt: 'ati_created_at',
        updatedAt: 'ati_updated_at'
    });

module.exports = Atividade;