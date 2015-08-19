//MW, en el caso de estar la session de usuario activa continua, en caso contrario redirige a login
exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('login');
	}
}
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', {errors: errors});
};
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, 
		function(error,user){
			if (error){
				
				req.session.errors =[{"message": 'Se ha producido el error: '+error}];
				res.redirect("/login");
				return;
			}
		
			req.session.user = {id: user.id, username: user.username};
			var fecha = new Date();
			//console.log("SESSION_CONTROLER.JS -- Fecha antes de sumar dos minutos: \n"+ fecha);
			fecha = new Date(fecha.getTime() + 120000);
			req.session.user.tiempoLim = fecha;
			req.session.cookie.expires = fecha;
			console.log("\n SESSION_CONTROLER.JS -- Fecha despues de sumar dos minutos en variable: \n" + req.session.user.tiempoLim);
			console.log("\n SESSION_CONTROLER.JS -- Fecha despues de sumar dos minutos en cookie: \n" + req.session.cookie.expires);
		
			res.redirect(req.session.redir.toString());
		}
	);
};
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};