var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

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
app.get('/:weekNum', function (req, res, next) {
  //check for errors in week numbers (must be 1-5)
	var weekNum = req.params.weekNum - 1;
  if(weekNum >= 0 && weekNum<= 4) {
  	var week = monthData[weekNum];
    var nextWeek;
    if(weekNum < 4){
      nextWeek = weekNum + 2;
    }
    else if(weekNum == 4) {
      nextWeek = 1;
    }
    else nextWeek = 4;
  	res.render('eventPage', {
  		"day": week,
      "next-url": nextWeek,
      "current": req.params.weekNum
  	});
    res.status(200);
  }
});

app.use(bodyParser.json());


//function to find week numbers
function findWeekNum(dayNum) {
  for(var i=0; i<monthData.length; i++) {
    for(var j=0; j<7; j++) {
      if(monthData[i][j]["day-num"] === dayNum) {
        return i;
      }
    }
  }
}

//function to find the day of the week the date is in
function findDayName(dayNum, weekNum) {
  for(var i=0; i<7; i++) {
    if(monthData[weekNum][i]["day-num"] == dayNum) {
      return i;
    }
  }
}

//post request
//should add fs thing?? to add to the json.
app.post('/:weekNum', function (req, res, next) {
  var eventToAdd = req.body.events; //object to push to events
  var dayOfEvent = req.body['day-num'];
  var weekOfEvent = findWeekNum(dayOfEvent);
  var numInWeek = findDayName(dayOfEvent, weekOfEvent);
  monthData[weekOfEvent][numInWeek].events.push(eventToAdd);
  res.status(200).send();
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
