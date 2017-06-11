var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var monthData = require('./dayData');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);

//statically serve files
app.use('/', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'cal_events'}));
app.set('view engine', 'handlebars');


//routing for week number
//routes to a certain week to print out the events
app.get('/week/:weekNum', function (req, res, next) {
	var week = monthData[req.params.weekNum];

	res.render('eventPage', {
		day: week
	});
});

app.get('/block', function(req, res, next) {
	
})