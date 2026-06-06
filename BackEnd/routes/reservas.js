const express = require('express');
const cors = require('cors');
const router = express.Router();

const ReservaController = require('../controllers/ReservasController');

router.post('/', ReservaController.cadastrarReserva);

router.get('/', ReservaController.listarReservas);

router.patch('/:id', ReservaController.alterarStatus);


module.exports = router;