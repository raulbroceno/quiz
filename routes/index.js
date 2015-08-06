var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz - Encuestas', errors: [] });
});

router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Raúl Broceño', errors: [] });
});

//Hace el Autoload, localizando el parámetro quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

//Definicion de rutas de sesion
router.get('/login', sessionController.new); //formulario de entrada
router.post('/login', sessionController.create); // Creacion de la sesion
router.get('/logout', sessionController.destroy);//Eliminacion de la sesion



//Definicion de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new',sessionController.loginRequired, quizController.new);
router.post('/quizes/create',sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.destroy);

// Definicion de las rutas /comment
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', commentController.publish);

module.exports = router;
