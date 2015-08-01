var models = require('../models/models.js');

exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question',{pregunta: quiz[0].pregunta});
	})
	//res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

exports.answer = function(req,res){
	models.Quiz.findAll().success(function(quiz) {
		if (req.query.respuesta=== quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: '¡Ole y ole! Acertaste'});
		}else{
			res.render('quizes/answer', {respuesta: '¡Noo! Prueba otra vez'});
		}
	})
};