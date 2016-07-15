/* Init script on page load
================================ */

$(document).ready(function(){
	/*Stuff*/
});

/* Access DOM elements by passing any CSS selector into JQuery
================================ */

$('#someId');
$('.someClass');

/* Method chaining
================================ */

$('element').method1().method2();	//Each method returns a jQuery object, which allows methods to chain

/* Declare variables
================================ */

/*Variables are declared the same, but by convention,
variables used for jQuery begin with '$'*/

var $someVar = $('element').text();

/* Ajax
================================ */

var apiUrl = 'http://someapiendpoint.com/api.php'
var optionsObject = {option1: 'setting', option2: 'setting'}; //Object gets passed to the AJAX function
function callBackFunction(data){
	//stuff
}
var results = $.getJSON(apiUrl, optionsObject,callBackFunction);