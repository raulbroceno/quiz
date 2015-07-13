var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quizcontroller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz - Encuestas' });
});

router.get('quizes/question', quizController.question);
router.get('quizes/answer', quizController.answer);

module.exports = router;
