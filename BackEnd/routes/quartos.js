const express = require('express');
const cors = require('cors');
const router = express.Router();

const QuartosController = require('../controllers/QuartosController');

router.get('/', QuartosController.listarQuartosLivres);

router.get('/todos', QuartosController.listarTodosQuartos);


module.exports = router;