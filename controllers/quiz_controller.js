exports.question = function(req,res){
	res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

exports.answer = function(req,res){
	if (req.query.respuesta==='Roma'){
		res.render('quizes/answer', {respuesta: '¡Ole! Acertaste'});
	}else{
		res.render('quizes/answer', {respuesta: '¡Noo! Prueba otra vez'});
	}
};