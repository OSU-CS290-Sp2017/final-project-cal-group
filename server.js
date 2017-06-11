var fs = require('fs');
var express = require('express');
var path = require('path');

var exphbs = require('express-handlebars');
var handlebars = require('handlebars');
var monthData = require('./dayData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'cal_events'}));
app.set('view engine', 'handlebars');

//var twits = fs.readFileSync('./views/partials/twit.handlebars', 'utf8');
var index = fs.readFileSync('./public/index.html', 'utf8');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {

  res.render('index');

});

//routing for week number
//routes to a certain week to print out the events
app.get('/week/:weekNum', function (req, res, next) {
	var weekNum = req.params.weekNum - 1;
	var week = monthData[weekNum];

	res.render('eventPage', {
		day: week
	});
});

app.get('*', function (req, res) {
  res.status(404);
  res.render('404Page');
});

app.listen(port, function () {
  console.log("== Server listening on port", port);
});




// 	res.render
// })

