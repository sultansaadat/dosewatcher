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
    sleeptimeStart: String,
    sleeptimeEnd: String
});

var User = db.model('User', userSchema);

exports.saveUser = function(user, done) {
    var toSave = new User({
        userName: user.username,
        email: user.email,
        password: user.password,
        notifications: user.notifications,
        sleeptimeStart: user.sleeptimeStart,
        sleeptimeEnd: user.sleeptimeEnd
    });
    toSave.save(function(err) {
        done(err, toSave);
    });
};