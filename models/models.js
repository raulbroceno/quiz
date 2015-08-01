var path = require('path');

// Cargar el modelo ORM
var Sequelize = require('sequelize');

//La BBDD SQLite, para desearrollo, le dice el dialeto de tipo BBDD y el fichero que ha de crear para la tabla definida en quiz.js
var sequelize = new Sequelize(null,null,null,
							  {dialect: "sqlite", storage: "quiz.sqlite"}
							 );
// Importacion de defincion la tabla quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
//exporta la definion de la tabla Quiz
exports.Quiz = Quiz;
//sequelize.sync() crea e inicializa la tabla de preguntas em la Base de Datos
sequelize.sync().success(function() {
	//sucess(..) ejecuta el handler una vez creada la tabla
	Quiz.count().success(function (count){
		if (count === 0) {
			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
