var addEventButton = document.querySelector('.modal-add-button');

//communicates with the server to store the event
function storeEvent(weekNum, dayNum, eventInput, callback) {
	var postURL = '/' + weekNum;
	var postRequest = new XMLHttpRequest();
	postRequest.open('POST', postURL);

	//sending json content
	postRequest.setRequestHeader('Content-Type', 'application/json');
	// postRequest.addEventListener('load', function(event) {
	// 	console.log(event.target.status);
	// });
		//object to send
		var postBodyEvent = {
				"events": {"event-name": eventInput},
				"week-num" : weekNum,
				"day-num" : dayNum

		};

		//send to server in string form
		postRequest.send(JSON.stringify(postBodyEvent));

}


/*adds events code*/
//generate HTML for an event, and add it to the DOM
function addEvent() {

	//get user inputs
	var eventInput = document.getElementById('event-text').value;
	var dayNum = document.getElementById('dropdown-content').value;

	//get the week number from the URL
	var pathComponents = window.location.pathname.split('/');
	var weekNum = pathComponents[1];

	//append input to dom
	var dayID = "day-" + dayNum;
	var dayContainer = document.getElementById(dayID);
	var eventElement = dayContainer.childNodes[2];

	var eventHTML = "<li>" + eventInput + "</li>";

	eventElement.insertAdjacentHTML('beforeend', eventHTML);

	//communicate with server and append to DOM
	storeEvent(weekNum, dayNum, eventInput, function(){
		console.log("i made it to the callback function");
		var dayID = "day-" + dayNum;
		var dayContainer = document.getElementById(dayID);
		var eventElement = dayContainer.lastChild;

		var eventHTML = "<li>" + eventInput + "</li>";

		eventElement.insertAdjacentHTML('beforeend', eventHTML);
	});
}





//wait till DOM is loaded
window.addEventListener('DOMContentLoaded', function(event) {
	//hook up to button
	addEventButton.addEventListener('click', addEvent)
});
