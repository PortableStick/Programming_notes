/* eslint-disable */

/* ! d3 calculates x and y values like a tv ! */
		/** ! Top, left is [0,0] ! **/
/**************************
Basic syntax
**************************/
/* Selecting
================================ */

//Selects the first DOM element that meets the search criteria
d3.select('some css selector');

//Selects all of the DOM elements that meet the search criteria
d3.selectAll('some css selector');

/* Change style
================================ */

d3.selectAll('div').style('some css property', 'some property value');

/* Change attributes
================================ */

d3.selectAll('div').attr('some attribute', 'some attribute value');

/* Add/remove classes
================================ */

//Add
d3.selectAll('div').classed('class1 class2', true);
//or
d3.selectAll('div').classed({'class1': true, 'class2': false});

//Remove
d3.selectAll('div').classed('class2', false);

/* Adding elements
================================ */

d3.select('.thingy').append('someElement'); //Returns a d3 selection of the appended element

/* Convenience (request) methods
================================ */

//Used to parse various datatypes
d3.json('relative path to json file', function(error, data){
	/*some stuff*/
});

d3.csv('realtive path to csv file', function(error, data){
	/*some stuff*/
	
});

/**************************
Data binding
**************************/

/*Select a container for the visualization*/

var iable = d3.select('someContainerElement'); //best to put in a variable

/*Create a callback function that will visualize the data*/

function vizzy(data){		//this is just setup, not doing anything yet
	visualElements = iable.selectAll('circle')	//create an empty selection - spooky programming!
						.data(data)				//this will count the number of data items and pass the data
						.enter()				//returns placeholders for elements that don't have data bound to them yet.  
												//creates one element per datum
						.append('circle');		//Finally attaches the element to each datum
}

d3.csv/*or any other type*/('file full of data to bind', vizzy); //d3 parses the file and passes the data to the callback function

/*Now, visualElements can be used to manipulate the circles created by the callback function.  We can even use the data on element attributes*/

/*We can use the data being parsed as an input for style attributes*/

visualElements.attr('r', function(d){return d * 2}); // The first input is the data, passed as 'd' by convention.
													//Use the function to return a value manipulated from the data

visualElements.attr('cx', Math.random(0,10));  //Because no function is used to pass the data to, all of the elements in 	
											//visualElements will be set to the same value, here 'x of the center'

/*In the same way, we can input the index*/

visualElements.attr('cx', function(d, i){return })

/**************************
Scales
**************************/
/* Linear scales
================================ */

/*
	Scales are used to map the domain of inputs to a 
	range of outputs.  The benefit is that we can set a 
	bar chart to change the maximum or minimum values, 
	making it more readable, set the width of the bars to
	fill the given space, and even set the bars to change
	color based on their values.  Think about each one
	as its own linear graph being created dynamically 
	based on the programming provided.


	*Quantitative vs ordinal*
	
	Quantitative scales take an input and map it to an 
	output with no regard to the order, and the range is 
	a continuous output with no discrete categories.

	Ordinal scales map discrete inputs to discrete 
	outputs, being useful for names or categories
	rather than a range of values.
*/

/*We set up a scale thusly*/
var yScale = d3.scale.linear()
		.domain([0,dataMaximum]) 
		.range([0, sizeMaximum]); 
		//The range is set from one value to another.  
		//These are usually constraints on the SVG container.  
		//Remember that 0 is the top-most y-value.  

/***!!! domain and range functions take arrays !!!***/

//yScale is a function ready to take an input and returns a value.  

visualElements.attr('attribute', function(d){
	return yScale(d);
})

/*Now, the x scale...*/

var xScale = d3.scale.ordinal()
				.domain(/*[array]*/d3.range(collectionOfData)) //d3.range returns an array
				.rangeBands([0,width]);//rangeBands subdivides a continuous interval into discrete bands of data

visualElements.attr('attribute', function(d){xScale.rangeBand(d)})//xScale is an object which has a bunch of rangeBands.  We use this line of code to take one rangeBand from the collection.

/* Using time scales
================================ */

/*We can set either or both axis to take JavaScript 
date objects as inputs*/

//First, set up a date parser to parse dates into JavaScript
//date objects

var timeParser = d3.time.format("%Y%m%d"); //Tells the parser in which order the information will come.
											//Year, month, day
											//Returns JavaScript date objects

xDomain = d3.extent(data, function(element){
	return timeParser.parse(<dateFromData/>)
}); //This will go through the data and calculate the first and last date in the domain

/*We can reverse the process, and parse a date object
to whatever format the data uses by passing a date object
into the parser*/

timeParser(<JavaScriptDateObject/>);

/* Adding axes
================================ */

/*Setup the axis*/

var xAxis = d3.svg.axis().scale(xScale) //Invoke the axis function
					.orient("someOrientation") //Set where it goes via keyword
					.ticks(<numberOfTicksDesired/>);

/*Add it to the visualization*/

visualElements.append("g") //add an SVG group
		.classed("someClass", true)
		.attr("transform", "translate(0,"+someHeightValue+")")		//this will move the axis to the bottom as it defaults to the top ([0,0])
		.call(xAxis);

//OR

xAxis(visualElements.classed("someClass", true)); //set it all in one line

/* Events
================================ */

/*Adding a listener*/

visualElements.on('click', function(d){
	//Do something
	//Possible to use the data, as it is passed
});

/*Zoom & pan*/

//Zoom and pan are features of the element **containing**
//the visualization

var zoom = d3.behavior.zoom()
					.scaleExtent([zoomMin, zoomMax])
					.on("zoom", zoomed); 

function zoomed() {
      visualElementsContainer.attr("transform", "translate(" + 
                     d3.event.translate + ")" +  //
                    "scale(" + d3.event.scale + ")");
    };


