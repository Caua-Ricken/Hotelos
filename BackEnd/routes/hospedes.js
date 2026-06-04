const express = require('express');
const cors = require('cors');
const router = express.Router();

const HospedeController = require('../controllers/HospedeController');

router.get('/', HospedeController.listarHospedes);

router.post('/', HospedeController.criarHospede);

router.delete('/:id', HospedeController.excluirHospede);


module.exports = router;