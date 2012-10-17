var winston = require('winston');

module.exports = function() {
    // common values here
    var conf = {
        serverName: 'mongo-api',
        listenPort: 3001,
        mongo: {
            url: 'localhost:27017/dosetime'
        }
    };
    // setup a logger for use within the app
    conf.logger = new(winston.Logger)({
        transports: [new(winston.transports.Console)({
            level: 'debug',
            emitErrs: false
        })]
    });
    return conf;
}();