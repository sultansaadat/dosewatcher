var conf = require('../conf.js');
var log = conf.logger;
var usermodel = require(__dirname + '/../models/users.js');
var Twilio = require('twilio-js');

Twilio.AccountSid = "AC69fa6c1bb36d508a1f0dd9fbaa8e45df";
Twilio.AuthToken = "868989fede7263e73cf25dd2d5ab2a97";

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


exports.starttimer = function(req, res) {
	Twilio.SMS.create({
		to: "+971562319447",
		from: "+14253215939",
		url: "http://test.com/sms"
	}, function(err, res) {
		//console.log('SMS Sent');
		console.log(res);
	})
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
			// res.send(200, user);
			res.render('timer', {
				title: 'Start Dose Timer'
			});

		}
	});
};

exports.authenticate = function(req, res) {
	var user = {
		username: req.body.username,
		password: req.body.password
	}
	console.log(user);
	usermodel.authenticateUser(user, function(err, result) {
		if(err) {
			res.send(400);
		} else {
			res.json(result);
		}
	});
};