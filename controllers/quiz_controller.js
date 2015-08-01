var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe el identificador QuizId=' + quizId));
			}
		}
	).catch(function(error) {next(error);});
};

exports.index = function (req, res){
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index', { quizes: quizes});
		}).catch(function(error) { next(error);})
	};

exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show',{quiz: req.quiz});
	})
	//res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if (req.query.respuesta=== req.quiz.respuesta){
			resultado = '¡Ole y ole! Acertaste';
		}else{
			res.render('quizes/answer', {quiz : req.quiz , respuesta: resultado});
		}
	})
};