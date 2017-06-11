var fs = require('fs');
var express = require('express');
var path = require('path');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//var twits = fs.readFileSync('./views/partials/twit.handlebars', 'utf8');
var index = fs.readFileSync('./public/index.html', 'utf8');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {

  res.render('index');

});

app.get('*', function (req, res) {
  res.status(404);
  res.render('404Page');
});

app.listen(port, function () {
  console.log("== Server listening on port", port);
});

// app.get('/', function(req, res, next) {

// 	res.render
// })
