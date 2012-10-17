var conf = require('../conf.js');
var log = conf.logger;
var usermodel = require(__dirname + '/../models/users.js');

exports.showsignup = function(req, res) {
	res.render('signup', {
		title: 'Sign Up'
	});
};

exports.showlogin = function(req, res) {
	res.render('login', {
		title: 'Login'
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

	usermodel.saveUser(user, function(err, result) {
		if(err) {
			res.send(400);
		} else {
			res.send(200, user);
		}
	});
};

exports.authenticate = function(req, res) {
	var user = {
		username: req.body.username,
		password: req.body.password
	}
	usermodel.authenticateUser(user, function(err, result) {
		if(err) {
			res.send(400);
		} else {
			res.json(result);
		}
	});
};
