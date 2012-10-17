var conf = require('../conf.js');
var log = conf.logger;
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var db = mongoose.createConnection(conf.mongo.url);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {});

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    notifications: Boolean,
    sleeptimestart: String,
    sleeptimeend: String
});

var User = db.model('User', userSchema);

exports.saveUser = function(user, done) {
    var toSave = new User({
        userName: user.username,
        email: user.email,
        password: user.password,
        notifications: user.notifications,
        sleeptimestart: user.sleeptimestart,
        sleeptimeend: user.sleeptimeend
    });
    toSave.save(function(err) {
        done(err, toSave);
    });
};

exports.authenticateUser = function(user, done) {
    User.findOne({
        username: user.username,
        password: user.password
    }, function(err, obj) {
        if(err) {
            done(err);
        } else {
            //console.log(obj);
            done(null, obj);
        }
    });
};