var conf = require('../conf.js');
var log = conf.logger;
var usermodel = require(__dirname + '/../models/users.js');

exports.showsignup = function(req, res) {
	console.log('hello');
	res.render('signup', {
		title: 'Sign Up'
	});
};

exports.register = function(req, res) {

	var user = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		notifications: req.body.notifications,
		sleeptimestart: req.body.sleeptimestart,
		sleeptimeend: req.body.sleeptimeend
	};
	
	console.log(user);
	
	usermodel.saveUser(user, function(err, result) {
		if(err) {
			res.send(400);
		} else {
			res.send(200, user);
		}
	});
};


exports.getUser = function(req, res) {
	dao.getUser(req.params.id, function(err, user) {
		if(err) {
			res.send(400, errors.errorByCode(err, 2001));
		} else if(!user) {
			res.send(404, errors.errorByCode(err, 2001));
		} else {
			res.json(user);
		}
	});
};

exports.getUsers = function(req, res) {
	dao.getUsers(function(err, users) {
		if(err) {
			res.send(400, errors.errorByCode(err, 2001));
		} else if(!users) {
			res.send(404, errors.errorByCode(err, 2001));
		} else {
			res.json(users);
		}
	});
};