const Hospedes = require('./Hospedes');
const Quartos = require('./Quartos');
const Reservas = require('./Reservas');
const Estadias = require('./Estadias');
const Atividades = require('./Atividades');

//Reservas
Reservas.belongsTo(Hospedes, {
    foreignKey: {
        name: 'hospedeId',
        field: 'res_hospede_id',
    }
})

Reservas.belongsTo(Quartos, {
    foreignKey: {
        name: 'quartoId',
        field: 'res_quarto_id',
    }
})

//Quartos
Quartos.hasMany(Reservas, {
  foreignKey: {
    name: 'quartoId',
    field: 'res_quarto_id',
  }
});

//Hospedes
Hospedes.hasMany(Reservas, {
  foreignKey: {
    name: 'hospedeId',
    field: 'res_hospede_id',
  }
});



module.exports = {
    Hospedes,
    Quartos,
    Reservas,
    Estadias,
    Atividades
};
