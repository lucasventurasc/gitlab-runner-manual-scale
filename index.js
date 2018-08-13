var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyparser.json());

app.set('port', (process.env.PORT || 5389));
app.use(express.static(__dirname + '/public'));

var runnerConfigFile = require('./app/RunnerConfigFile');

app.patch('/runner-scaling/increase', function(request, response) {
    runnerConfigFile.increaseMaxConcurrent();

    response.send('Max concurrent increased by one, now are ' + runnerConfigFile.max_concurrent);
});

app.patch('/runner-scaling/reduce', function(request, response) {
    runnerConfigFile.reduceMaxConcurrent();

    response.send('Max concurrent increased by one, now are ' + runnerConfigFile.max_concurrent);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
