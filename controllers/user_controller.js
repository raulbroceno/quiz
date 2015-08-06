var users = { admin: {id:1, username:"admin", password:"1234"},
			  raul: {id:2, username:"raul", password:"5678"}
			};
exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		}else { 
			callback(new Error('Password erroneo'));
		}
	} else { 
		console.log("No existe usuario, ahora lo envio de vuelta");
		callback(new Error('No existe el usuario'));
	}
};