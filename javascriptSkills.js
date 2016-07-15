/* eslint-disable */

/* Create variable
================================ */
var foo; //implicitly typed

/*Assign variable
================================ */
foo = bar;


/* Function expression
================================ */

var functionExpression = function(){
	//do stuff
};

/* Function declaration
================================ */

function fooBarify(){
	//d0 $7u44
}

/* Create an array
================================ */

//1.Literal
var someArr = [1,2,3];

//2.Constructor
var anotherArr = new Array();
anotherArr[0] = 1;


/* Create an object
================================ */
//1.Literal
var someObj = {
	property: 'someValue',
	aMethod: function(){
		//due dings
	}
}

//2.Constructor
var anotherObj = new Object();
anotherObj.property = 'someValue';
anotherObj.aMethod = function(){
	//dew chumzing
};

/* Object constructor
================================ */

function ConstructMe(value){
	this.value = value;
}

/* Immediately invoked function expression
================================ */

var immediateFunction = function (parameter){
					//DO STUUUUUUFFFFF
			}(someDataToPass);		//This is what tells the interpreter to invoke the function immediately, rather than
									//assign the function itself as the value of variable immediateFunction;

/* Add an event handler
================================ */

//A couple of different ways
//1. Node objects have a number of different events you can access
//through dot notation

element.onclick = function(){
	//d00 stuvs
};

//*****************************!Remember!*****************************//
//**********When assigning a declared function to an event,***********//
//**********do not add the parentheses after the function*************//
//**********name.  This will invoke the function as soon**************//
//**********as the interpreter gets to it.              **************//

element.onclick = namedFunction;

//2. The addEventHandler() method
element.addEventHandler('EVENT', function(){	//Replace 'EVENT' with the desired event
	//due shtuff								//e.g., 'click'
});

/* Set an event handler for the webpage's load event
================================ */
window.onload = function(){
	//init()
};

//or sometimes

window.onload = init;

/* Set-up a closure using a returned function
================================ */

var iNeedAFunction = function(){
	
		return function(){
			//dO sTuFf
		}
	 
}(); //<-------------------------------Again, the parentheses mean that this function
									//will be invoked by the interpreter.
									//This is useful for moving the context of 'this' around

/* AJAX
================================ */

/**************************
Four steps to AJAX heaven
**************************/
//1. Create an XMLHttpRequest object
var xhr = new XMLHttpRequest();
//2. Create a callback function
function callback(data){	//pass it a parameter so it can
							//receive data from the HTTP response
							//object
	//do stuffs
}
//3. Open a request
xhr.open('METHOD', 'LOCATION');		//The method needs to be one of the HTTP verbs
									//Location is usually a local URL


//4. Send the request
xhr.send();


/**************************
Control statements
**************************/
/* For loop
================================ */

for(var i = 0; i < someArray.length;i++){
	//joo sumching
}


/* While loop
================================ */

while(someCondition){
	//doooooooo soooooooooooommmmmmmmething
}

/* Do-while loop
================================ */
do{
	//SOMETHING!
}while(someCondition)

/* forEach loop  **** actually an array object method
================================ */

someArray.forEach(function(item){
	//achoo sumding to each item
});


/* Conditional statement
================================ */

//1.
	if(someCondition){
		//goo things
	}

//2. Ternary operator
	var thing = (someCondition)? trueCondition : falseCondition;


/* Patterns
================================ */

/**************************
Object Decorator Pattern
**************************/

var carlike = function(obj, loc){		//The decorator function takes an object as an input
	obj.loc = loc;						//and extends it.
	obj.move = function(){				//The function is copied every time the decorator is used
		obj.loc++;						//which keeps it in the same closure scope as the object
	};									//being created
	return obj;
}

var birdlike = function(obj, sound, size){
	obj.size = size;
	obj.wings = 2;
	obj.sound = sound;
	obj.fly = function(){};				//This can cost a significant amount of memory
	obj.sing = function(){
		console.log(obj.sound);
	};
	return obj;
}

var escort = carlike({},3);				//Benefits???
var miata = carlike({},4);

var bluejay = birdlike({}, "Tweet", "small");

/**************************
Functional Class Pattern
**************************/

var Car = function(loc){
	var obj = {loc: loc};
	var move = function(){		//This function will be duplicated every time 
		obj.loc++;				//the class is instatiated.  Better to move it out.
	};
	return obj;
}

var Car = function(loc){
	var obj = {loc: loc};
	var move = move;			//Now, the class will reference the function, rather
	return obj;					//than instiantiate it.  This will save memory.
}

var move = function(){			//This can get difficult to manage
	this.loc++;
}


var Car = function(loc){
	var obj = {loc: loc};					//Lastly, we can keep the functional class pattern 
	var move = Extend(obj, Car3.methods);  	//clean and organized by extending the object with another
	return obj;								//object that contains the methods and copy each one to 
}											//the object with some sort of extend() function (not native JS).
							
Car.methods = {								//This keeps the methods out of the global scope while also making
    move: function(){					//the code easier to maintain.
		this.loc++;
	}
};


/**************************
Prototypal Class Pattern
**************************/

/*There are some performance gains to be made by not using the extend() function above, but
	instead placing the shared methods in the object's prototype chain.  This way, any failed
	property look-ups will be delegated up the chain, and with no loss of functionality, the 
	code doesn't have to waste time copying methods or method references.
*/

var BadClass = function(){
	var obj = {};   //creating an object this way won't place it in the prototype chain as we want it.  
	return obj;
}					//Object literals and objects created with new Object() have Object as their prototypes,
					//which is not what we want.

var Car = function(loc){
	var obj = Object.create(Car3.methods);		  //This creates a new object that will delegate failed
												  //lookups to the correct methods object.  

	obj.loc = loc;					//Because obj is now an object we created through a function
									//we can again assign property values to it as normal
									//rather than through an extend() method.
	return obj;
}


Car.prototype.move = function(){		//We delegate the function to a prototype object.  This is a container 
	this.loc++;							//object that will provide all class instances a fallback when looking
};										//up function references.  It is created automatically with its object
										//and is being accessed here just like any other object.


	/*
		Objects created with the 'new' keyword are assigned the prototype defined by that constructor,
		but the constructor itself has a different prototype.
	*/

var myCar = Car(10);		//myCar's prototype is Car, but Car's prototype is some function object.
								//Car's prototype is Car.prototype in the sense that the latter is used
								//by the former when constructing an object to set its inhertience.

myCar.move();					//This will work fine, incrementing Car.loc to 11.

	/*
		Every prototype object has a .constructor property that points back to the function that created it
	*/

Car.prototype.constructor;			//The output of both of these will be the contents of the Car function.  
myCar.constructor;     				//myCar itself does not have the .constructor property, but because all lookups
									//for the myCar object fall back to the Car.prototype,
									//it will give us the output we expect.


myCar instanceof Car;				//Will output true.
									//Checks if Car's prototype object can be found anywhere in myCar's prototype chain.


/**************************
Psuedo-classical pattern
**************************/

/*
	JavaScript has ways of emulating the classical inheritence pattern found in other object oriented languages
	through some syntactic conveniences.  This pattern is derived from the prototypal pattern.
*/

/*** The following demonstrates code that is used in every object in the process of instantiation ***/

var Car = function(loc){
	var obj = Object.create(Car.prototype);	//Here...
	obj.loc = loc;
	return obj;//...and here
};

/*
	Because they are so frequently used, JavaScript has a built in keyword that automatically
	puts in lines of code to accomplish the same thing as the above marked lines.  This
	'constructor mode' is invoked whenever the keyword 'new' is used for a constructor function.
*/

var Car = function(loc){
	this.loc = loc;			//If we delete those unneeded lines of code and replace 'obj' with 'this'...
};	

var myCar = new Car(10);  	//... and run the constructor with the new keyword...

var Car = function(loc){
	/*var this = Object.create(Car.prototype);*/		//... the result is the same as if we had typed the 
	this.loc = loc;										//commented lines on the left.
	/*return this.*/
};


/*
	Aside from the obvious conveniences, creating objects this way also enables some performance
	enhancements under the JavaScript hood.
*/


/**************************
Subclasses and Superclasses
**************************/


/*
	Subclasses are variations of a superclass.  If two or more objects share properties, we can abstract 
	those properties out into a class that sits above the others.  Those other classes would become sub-
	classes, and would inherit all of the properties from their superclass.  This is important for reusing code.
*/

var Car = function(loc, wheels, topSpeed){
	this.loc = loc;							//Perhaps we want to also have a racecar and a truck.  
	this.wheels = wheels;					//How would we do this?
	this.topSpeed = topSpeed;
}

var Truck = function(loc, wheels, topSpeed){
	this.loc = loc;							//Would we manually copy all of the code from the car?   
	this.wheels = wheels;					
	this.topSpeed = topSpeed;
}

var Racecar = function(loc, wheels, topSpeed){
	this.loc = loc;							//This duplicates a lot of code, making it more difficult to   
	this.wheels = wheels;					//maintain.  And what happens when we need to make a truck
	this.topSpeed = topSpeed;				//different from a car?  
}

Car.prototype.drive = function(){/*...*/}
Truck.prototype.drive = function(){/*...*/}		//This is not to mention the extra work involved in
Racecar.prototype.drive = function(){/*...*/}	//setting up the shared method calls...


/*We can create a superclass for this*/

var Vehicle = function(loc, wheels, topSpeed){
	this.loc = loc;							 
	this.wheels = wheels;				
	this.topSpeed = topSpeed;
}

/*
	But how do we create subclasses?
*/

var Racecar = function(){
	/* ??? */				//Something goes here to build an object from the Vehicle superclass into the 
}							//Racecar subclass.


var Racecar = function(){
	new Vehicle();			//This not only doesn't quite get the object we want where we want it, it has
}							//the effect of creating a new instance of Vehicle every time Racecar is run.

var Racecar = function(){
	this = Vehicle();		//We cannot assign to 'this' *at all*.
}

var Racecar = function(){
	Vehicle();				//Wrong again. Because Vehicle is being invoked here as a free function, all of its references
}							//to 'this' would go to the global scope.  We would end up with all of those variables
							//floating around the global scope.


/* What we need is a way to call Vehicle that will let us establish the lexical scope of 'this'. */

var Racecar = function(loc, wheels, topSpeed){
	Vehicle.call(this, loc, wheels, topSpeed);   //Finally, we have a racecar.
}

/* 
	We still need to modify Racecar's prototype chain so it will delegate failed lookups where
	we want it to.
*/

Racecar.prototype = /*?????*/;  //But how?

Racecar.prototype = new Vehicle();  //This used to be the preferred method, but is no longer.  The problem
								//comes from the parameters of the called object.  If 
								//the code later tries to access one of those parameters, the interpreter
								//will throw an error.

Racecar.prototype = Object.create(Vehicle.prototype);  //This sets the delegation chain just how we want it
														//without invoking Vehicle's constructor function.


/* Lastly, we need to set up the Racecar's .constructor property so it correctly refers to Racecar.*/
myRacecar = new Racecar(10, 4, 180);
myRacecar.constructor; 	//Currently, this will output Car.  By overwriting the Racecar's prototype
						//object, we also overwrote the .constructor property.  We need to 'reset' it.

Racecar.prototype.constructor = Racecar;	//Simply assign it the name of the Racecar constructor function!


/* More on prototypes and objects
================================ */

Object.create(<"thing that will be the prototype">, {
	//The second argument is an object that contains the properties of the desired object, along with 
	//some that JavaScript needs under the hood
	name: {
		value: "Name goes here",
		enumerable: true,
		writeable: true,
		configurable: true
	}
});

//ES6 classes offer some sugar for this

class ClassName {
	constructor(property) {
		this.property = property;
	}

    es7ClassMethod() {
        //These are not enumerable by default
    }
}

ClassName.method = function() {}; //ES7 allows methods to be defined in the class like a grown up language

//Attributes
Object {
	value: "The object's value",
	writeable: true, //defines whether the value can be changed from its initial
	enumerable: true, //will be included in the object's keys when looped, incl JSON serialization
	configurable: true //allows the changing of object properties
}

Object.defineProperty(objectToBeDefined, "propertyToChange", {writeable: false});
//The writeable property is not inherited if the value is some sort of collection.  That is...

Object {
	value: {val1: "llasjdf", val2: "oqiuero"}, //...can still have val1 and val2 edited
	writeable: false
}

Object.freeze(objectToFreeze); //Absolutely prevents an object from being changed

//Getters and setters can be created thusly
Object.defineProperty(racecar, 'makeAndModel', {
    get: function() {
        return this.make + ' ' + this.model;
    },
    set: function(makeAndModel) {
        var parts = makeAndModel.split(' ');
        this.make = parts[0],
        this.model = parts[1]
    }
});

var someCar = new racecar();
console.log(somecar.makeAndModel); //Would automatically invoke getter to format the make and model string

/********************************
An object's prototype is different from a function's prototype!
********************************/

/*A function's prototype is the object instance that will become the prototype for all objects created using this function as a constructor*/

/*An object's prototype is the object instance from which the object is inherited*/

function Cat(name, color) {
    this.name = name,
    this.color = color
}

Cat.prototype.age = 4;

var frisky = Cat('Frisky', 'caleco');
var garfield = Cat('Garfield', 'orange');

frisky.age = 18;

console.log(frisky.age); //18
console.log(frisky.__proto__.age); //4
console.log(garfield.age); //4

console.log(frisky.hasOwnProperty('age')); //true
console.log(garfield.hasOwnProperty('age')); //false

console.log(Object.keys(frisky)); //Array {0: name, 1: color, 2: age}
console.log(Object.keys(garfield)); //Array {0: name, 1: color}

/**************************
Functional Programming
**************************/
/* Purpose
================================ */

/*
	Most operations performed on collections can be conceptually grouped into five
	functions:
	
	1.Map
	2.Filter
	3.ConcatAll
	4.Reduce
	5.Zip

	Functional programming is the implementation of these functions
	such that most of the work done with collections is abstracted
	into cleaner, easier to read, and more manageable code.

*/

/* Map
================================ */

/*
	To project an array is to take its data, pass it through a function,
	and collect the data in another array.  

	All array projections share two operations in common:

		1. Traverse the source array
		2. Add each item's projected value to a new array
*/

//ex.
function() {
	var newReleases = [					//We need to take the id and title 
		{								//from each movie in the newRelases
			"id": 70111470,				//array, put them in a new object
			"title": "Die Hard",		//and push each object to a new array
			"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": [4.0],
			"bookmark": []
		},
		/*...*/
	],
	videoAndTitlePairs = [];

  newReleases.forEach(function(movie){videoAndTitlePairs.push({  //This function accomplishes
    id:movie.id,												 //exactly what we need
    title:movie.title
  })});

	return videoAndTitlePairs;
}

/*We can abstract out how this is done*/

Array.prototype.map = function(projectionFunction) { //projectionFunction is applied to each item in the array
	var results = [];								 
	this.forEach(function(itemInArray) {			 
   		 results.push(projectionFunction(itemInArray));

	});

	return results;
};

/*Now the first attempt can be refactored...*/
return newReleases.map(function(movie){
    return {id: movie.id, title: movie.title};
  }); 

/* Filter
================================ */

/*To filter an array is to make a new array from a subset of the
original array.  Each item must pass a test to be moved.
	
Every filter shares two operations in common:
	1. Traverse the array
	2. Add objects that pass a given test to a new array

*/


//ex.

function() {
	var newReleases = [				//We need to filter the newReleases
		{							//array, making a new array of only
			"id": 70111470,			//movies with a rating of 5
			"title": "Die Hard",
			"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 4.0,
			"bookmark": []
		},
		/*...*/
		
	],
	videos = [];

  newReleases.forEach(function(movie){
    if(movie.rating === 5){
    	videos.push(movie);
    }
  });	

/*Abstracting this out, we can create a function that filters
based on the results of a predicateFunction
*/


  Array.prototype.filter = function(predicateFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
    if(predicateFunction(itemInArray)){
     	results.push(itemInArray); 
    }
	});

	return results;
};

/*We can refactor the first attempt to get movies with a rating of 5 to this much more concise code.*/

  
return newReleases.filter(function(movie){return movie.rating === 5;}).map(function(movie){return movie.id}); //Returns an array of ids
	
/* Querying trees - ConcatAll
================================ */

/*In order to use map or filter on a two (or more) dimensional array,
we need to flatten the desired values down to a single dimension array.*/
function() {
	var movieLists = [
		{
			name: "New Releases",
			videos: [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id:432534, time:65876586 }]
				}
			]
		},
		{
			name: "Dramas",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id:432534, time:65876586 }]
				}
			]
		}
	],
	allVideoIdsInMovieLists = [];

/*This requires two forEach loops, one nested in the other.  */
	
	  movieLists.forEach(
	    function(col){
	      col.videos.forEach(function(video){
	      	allVideoIdsInMovieLists.push(video.id);
	      });
	    }
	  );			
  
	return allVideoIdsInMovieLists;

}
		
/*We need a function that will express our intent to flatten
a tree without going into the messy details*/
		
Array.prototype.concatAll = function() {
		var results = [];
		this.forEach(function(subArray) {
  	 	subArray.forEach(function(item){results.push(item);});

  	 	/*results.push.apply(results, subArray);*/
  	 	
	});

	return results;
};

/*Refactoring the above code, we can flatten the movieLists
array into a single array of video ids*/
movieLists.map(function(movieList) {return movieList.videos.map(function(video) {return video.id;});}).concatAll();


/* ConcatMap() - making life easier
================================ */

/*map() is so often followed by concatAll() that we should make a new
function to combine them*/

Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this
		.map(function(item) {
      		return projectionFunctionThatReturnsArray(item); //returns a child array
		})		//this array becomes a two-dimensional array
		.concatAll(); //flatten into a one-dimensional array
};	

/* Reduce
================================ */

/*We often want to reduce the information in an array.  That
is, we want to pass a function into an array that will do 
something to the data in it, and return a single array
with a single item*/

//This sort of thing is fairly straightforward with a foreach loop and 
//some variables

function() {
	var boxarts = [
			{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
			{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
		],
		currentSize,
		maxSize = -1,
		largestBoxart;

	boxarts.forEach(function(boxart) {
		currentSize = boxart.width * boxart.height;
		if (currentSize > maxSize) {
			largestBoxart = boxart;
			maxSize = currentSize;
		}
	});

	return largestBoxart;
}

//However, re-writing this every time means re-writing the method of
//traversal.  We can abstract this operation out into a function we 
//call reduce()

Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
		accumulatedValue;

	// If the array is empty, do nothing
	if (this.length === 0) {
		return this;
	}
	else {
		// If the user didn't pass an initial value, use the first item.
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}

		// Loop through the array, feeding the current value and the result of
		// the previous computation back into the combiner function until
		// we've exhausted the entire array and are left with only one value.
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter])
			counter++;
		}

		return [accumulatedValue];
	}
};

//We can refactor the above code to

boxarts.reduce(function(accumulated, current){
	var currentSize = current.width * current.height;
	var accumulatedSize = accumulated.width * accumulated.height;
	if(currentSize > accumulatedSize){
		return current;
	} else {
		return accumulated;
	}
});

//We can also use reduce() to return a datatype different from what
//we put in.  

/********* this is super fucking cool *****************/
function() {
	var videos = [
		{
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"id": 675465,
			"title": "Fracture"
		},
		{
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"id": 654356453,
			"title": "Bad Boys"
		}
	];

	// Expecting this output...
	// [
	//	 {
	//		 "65432445": "The Chamber",
	//		 "675465": "Fracture",
	//		 "70111470": "Die Hard",
	//		 "654356453": "Bad Boys"
	//	 }
	// ]
	return videos.
		reduce(function(accumulatedMap, video) {

			// Object.create() makes a fast copy of the accumulatedMap by
			// creating a new object and setting the accumulatedMap to be the
			// new object's prototype.
			// Initially the new object is empty and has no members of its own,
			// except a pointer to the object on which it was based. If an
			// attempt to find a member on the new object fails, the new object
			// silently attempts to find the member on its prototype. This
			// process continues recursively, with each object checking its
			// prototype until the member is found or we reach the first object
			// we created.
			// If we set a member value on the new object, it is stored
			// directly on that object, leaving the prototype unchanged.
			// Object.create() is perfect for functional programming because it
			// makes creating a new object with a different member value almost
			// as cheap as changing the member on the original object!

			var copyOfAccumulatedMap = Object.create(accumulatedMap);

			// ----- INSERT CODE TO ADD THE VIDEO TITLE TO THE ----
			// ----- NEW MAP USING THE VIDEO ID AS THE KEY	 ----
			copyOfAccumulatedMap[video.id] = video.title;
			return copyOfAccumulatedMap;
		},
		// Use an empty map as the initial value instead of the first item in
		// the list.
		{});
}

/* Zip
================================ */

//Sometimes we need to combine two arrays into one,
//but instead of mapping, we just need to match each
//of the items in order - zipping the arrays like teeth
//in a zipper.

//We could use a for-loop...

videoIdAndBookmarkIdPairs = [];

	for(var counter = 0; counter < Math.min(videos.length, bookmarks.length); counter++) {
		// Insert code here to create a {videoId, bookmarkId} pair and add it to the videoIdAndBookmarkIdPairs array.
    videoIdAndBookmarkIdPairs.push({videoId: videos[counter].id, bookmarkId: bookmarks[counter].id});
	}

	return videoIdAndBookmarkIdPairs;

//...or we could add a new zip() static function to the array object

Array.zip = function(left, right, combinerFunction) {
	var counter,
		results = [];

	for(i = 0; i < Math.min(left.length, right.length); i++) {
		// Add code here to apply the combinerFunction to the left and right-hand items in the respective arrays
    results.push(combinerFunction(left[i],right[i]));
	}

	return results;
};


/* eslint-enable */