const express = require('express');
const cors = require('cors');
const router = express.Router();

const hospedeRoutes = require('./hospedes');
router.use('/hospedes', hospedeRoutes);

const quartoRoutes = require('./quartos');
router.use('/quartos', quartoRoutes);

const reservaRoutes = require('./reservas');
router.use('/reservas', reservaRoutes); 

const estadiasRoutes = require('./estadias');
router.use('/estadias', estadiasRoutes);

const relatoriosRoutes = require('./relatorios');
router.use('/relatorios', relatoriosRoutes);

module.exports = router;

