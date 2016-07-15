//Two-way data binding: Inputs are bound to outputs, and outputs are bound to inputs

/**************************
Modules
**************************/
// Where our application components live
var app = angular.module('SomeModule', {/*Module options*/});

/* The 4 primary elements of the Angular framework
================================ */

	/**************************
	1. Directives
	**************************/
	//HTML annotations that trigger JavaScript behaviors
	//The fundamental building blocks of Angular.js.
	//These define various declarations to be used in the
	//application.
	//These are small, usually self-contained modules that
	//can be dropped in an app and expected to work

	//Define:
	app.directive('someDirective', function(){
		return{
			'restrict': '/*'E'lement, 'A'ttribute, or 'C'lass*/', //depends on how you want to use the directive
			'templateUrl': '/url/to/template.html',
			controller: function(){
				//functionality
			},
			'controllerAs': 'controllerAlias'
		}
	});

	//Implement
	<some-directive></some-directive> //camelCase -> camel-case; No self-closing tags!!

	/**************************
	2. Factories
	**************************/
	//Used to maintain a single instance of something, or maintain its state.
	//Can also be used to provide abstraction between directives and APIs

	/**************************
	3. Controllers
	**************************/
	//Where we add application behavior
	//Mostly used for data connections and logical restraints
	//Cannot contain templating or complex ordering
	//Often included in directives

	app.controller('SomeController', function(){
		this.property = value;
		this.someFunction = function(){};
	});


	/**************************
	4. Filters
	**************************/
	//We can pass data through filters to change their format
	{{ data | filter:options }}

	//or

	{{ ng-directive="something in some.object | filter:options "}}

/* 
================================ */

/**************************
Expressions
**************************/
//How values get displayed within the page

/**************************
Data binding
**************************/
//Use the directive 'ng-model="someVariable"'

<div ng-model="someObj.name"></div>

<input type="text" ng-model="someObj.name" />

/**************************
Bind handler to event
**************************/
//Define
$scope.someFunction = function(){
	//things
};

//Bind
<button ng-click="someFunction()"></button> //This function can be passed
											//any parameter that's being
											//used by Angular i.e.ng-repeat

//Watching input is more involved
//First, we need something on the $scope object to watch

$scope.object.property = "Yardy har har";

//Second, register the watcher on the property

$scope.$watch('object.property',function(newValue, oldValue){
	//Do something here
});