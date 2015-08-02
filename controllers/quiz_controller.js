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
	var strBusqueda = "";
	if (req.query.search){
		strBusqueda = req.query.search;
		strBusqueda = "%"+ strBusqueda.replace(/\s+/g,'%')+"%";
		//console.log("El string buscado és " + strBusqueda);
		models.Quiz.findAll({where: ["pregunta like ?", strBusqueda]}).then(
			function(quizes) {
				res.render('quizes/index', { quizes: quizes});
			}).catch(function(error) { next(error);})		
	}else{
		models.Quiz.findAll().then(
			function(quizes) {
				res.render('quizes/index', { quizes: quizes});
			}).catch(function(error) { next(error);})
	}
	};

exports.show = function(req, res){
	res.render('quizes/show',{quiz: req.quiz});
	//res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

exports.answer = function(req, res){
		var resultado = "Incorrecto";
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = '¡Ole y ole! Acertaste';
		}
		res.render('quizes/answer', {quiz : req.quiz , respuesta: resultado});
};