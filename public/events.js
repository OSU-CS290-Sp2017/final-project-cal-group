var modal = document.getElementById('add-event-modal');
var inputElement = document.querySelector('.event-input');
var twitContainer = document.querySelector('.cal-container');

/*shows modal when clicking red button*/
var redButton = document.getElementById('add-event-button');

function hideShowModal() {
	modal.classList.toggle('hidden');
	var modalBackground = document.getElementById('modal-backdrop');
	modalBackground.classList.toggle('hidden');
  //console.log("I'm in hideShowModal");
}

redButton.addEventListener('click', hideShowModal);

var textInput = document.getElementById('event-text');

/*closing the modal*/
var closeButton = document.querySelector('.modal-close');

/*clear input fields*/
function resetModal() {
	hideShowModal();
	textInput.value = "";
}

closeButton.addEventListener('click', resetModal);
