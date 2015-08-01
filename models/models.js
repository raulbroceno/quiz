var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar el modelo ORM
var Sequelize = require('sequelize');

//La BBDD SQLite, para desearrollo, le dice el dialeto de tipo BBDD y el fichero que ha de crear para la tabla definida en quiz.js
//var sequelize = new Sequelize(null,null,null,
//							  {dialect: "sqlite", storage: "quiz.sqlite"}
//);

// Usar BBDD SQLite en desarrollo o Postgres en explotacion
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
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
