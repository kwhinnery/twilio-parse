// Custom REST API dependencies
var express = require('express'),
    twilio = require('cloud/twilio/index'),
    config = require('cloud/config');

// Create Express web app
var app = express();
app.use(express.bodyParser());

// API endpoints for testing
app.get('/test', function(request, response) {
    var p = request.param('test');
    response.send('got: '+p);
});

app.post('/test', function(request, response) {
    var c = twilio(config.accountSid, config.authToken);

    c.makeCall({
        to:'+16512834912',
        from:config.testNumber,
        url:'http://twimlets.com/message?Message%5B0%5D=http://demo.kevinwhinnery.com/audio/zelda.mp3'
    }, function(err, data) {
        response.send(data);
    });
});
 
// This line is required to make Express respond to http requests.
app.listen();