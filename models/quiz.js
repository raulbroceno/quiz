module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ 
			pregunta: {
				type: DataTypes.STRING,
				validate: {notEmpty:{msg: "-> No hay pregunta"}}
			},
			respuesta:{
				type: DataTypes.STRING,
				validate: {notEmpty:{msg: "-> No hay respuesta"}}					
			},
			tema:{
				type: DataTypes.STRING,
				validate: {notEmpty:{msg: "-> No hay seleccion tema"}}					
			}
		}
	);
}