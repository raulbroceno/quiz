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
				res.render('quizes/index', { quizes: quizes, errors: []});
			}).catch(function(error) { next(error);})		
	}else{
		models.Quiz.findAll().then(
			function(quizes) {
				res.render('quizes/index', { quizes: quizes, errors: []});
			}).catch(function(error) { next(error);})
	}
};
exports.show = function(req, res){
	res.render('quizes/show',{quiz: req.quiz, errors: []});
	//res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

exports.answer = function(req, res){
	var resultado = "Incorrecto";
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = '¡Ole y ole! Acertaste';
	}
	res.render('quizes/answer', {quiz : req.quiz , respuesta: resultado, errors: []});
};
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta:"Pregunta", respuesta: "Respuesta", tema: "Ocio"}
	);
	res.render('quizes/new', {quiz : quiz, errors: []});
};
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	console.log(req.body.quiz);
	quiz.validate().then(
		function(err){
			if (err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}else{
				quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){
					res.redirect('/quizes');
				})
			}
		}
	);
};
exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz : quiz, errors: []});
};

exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	console.log("Pregunta: "+req.quiz.pregunta + "Respuesta: "+req.quiz.respuesta + "Tema: "+req.quiz.tema);
	req.quiz.validate().then(
		function(err){
			if(err){
				res.render('quizes/edit', {quiz: re.quiz, errors: err.errors});
			}else{
				req.quiz
					.save({fields: ["pregunta","respuesta","tema"]})
					.then(function(){res.redirect('/quizes');});
			}
		}
	);
};
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

