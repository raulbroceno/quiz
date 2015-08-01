var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz - Encuestas' });
});

router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Raúl Broceño' });
});

//Hace el Autoload, localizando el parámetro quizId
router.param('quizId', quizController.load);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

//Definicion de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
