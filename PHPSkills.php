/* Start PHP with an open tag
================================ */

<?php  //don't close unless mixing PHP
		//with another language


/* Create a variable
================================ */

$iable;

/* Assign a variable value
================================ */

$iable = 'foo';

/* Function expression
================================ */

$someFunc = function(){
	//things
};

/* Function declarations
================================ */

function declaredFunction(){
	//things
}

/* Closures
================================ */

$someOtherFunc = function($thing){
	$self = $this;
	//returns execution scope with variables
	return function($self, $thing){
		//do a thing
	}
};

/* Array
================================ */
//C-style
$arr = [1,2,3];

//Constructor
$arr2 = array('value1', 2, 3, 4);

/* Associative array
================================ */

$ass = ['key'=>'value','key2'=>'value'];

/* If-statement
================================ */

if(someCondition){
	//things
}

switch(thingToCheck){
	case condition1:
		something();
		break;
	case condition2:
		somethingElse();
		break;
	default:
		somethingCompletelyDifferent();
}

/* Loops
================================ */

//For loop

for($variable = 0; $variable < 10; $variable++){
	//things
}

//Foreach

foreach ($someArray as $key) {
	//things using $key $someArray times
}

//while

while(someCondition){
	//Stuff
}

//do...while
do{
	//things
}while(someCondition)

/**************************
Classes and objects
**************************/
/* classes
================================ */

class SomeClass{
	$property1;
	$property2;

	function __construct($prop1, $prop2){
		$this->$property1 = $prop1;
		$this->$property2 = $prop2;
	}

	function someMethod(){
		//Make your class do a thing!
	}

}

/* objects
================================ */

$someObject = new SomeClass('property1', 'property2');

//access modifiers
class Modifiers{

	public $publicProperty = "I'm public! Anyone can see me!";
	private $privateProperty = "I'm private.  No one can see me but the class that defined me (which includes other objects, even though they are not the same instance)";
	protected $protectedProperty = "I'm protected, which means my own classs, as well as any inherited or parent classes, can access me."


	public function publicFunction(){
		//This is the default if no access modifier is used.
		//Allows this function to be invoked anywhere
	}

	private function privateFunction(){
		//This function can be accessed only by the 
		//class that defines it
	}

	protected function protectedFunction(){
		//This function can be accessed only by the
		//class that defines it, and also by
		//inherited and parent classes
	}
}

/* Accessing object members
================================ */

$aVariableContainingAnOutput = $someObject->someMethod();// The '->' is an 'object operator'

//Need to learn about using static methods/accessing static variables


/* Set values for configuration options to affect PHP's behavior
================================ */

init_set('option to set (string)', 'value to pass to the option');

/**************************
Error handling
**************************/
try{
	//code to try
	//If successful, will bypass the 'catch' block
}catch(Exception $e){
	//If exception occurs, the 'catch' block is send
	//an exception object, passed as the variable $e
}

/**************************
PDO - PHP Data Objects
**************************/
/* Vocab
================================ */

//DSN - Data Source Name: Declares the type of the database, as well as the path to it (relative to the file invoking the PDO).  It is a string in the form 'database format:<path to database>', ie. 'sqlite:./database.db'.

/* Create a PDO and link to database
================================ */

$somePDO = new PDO('sqlite:<path to database>'); 

/* Change attributes of PDO instance
================================ */

$somePDO->setAttribute(PDO::<attribute>, PDO::<value>); //Note that the attributes and the available values are contained in the PDO object and are static.  

/* Query and filter results
================================ */

$results = $somePDO->query(<SQL query>);
$results->fetchAll(PDO::<option to filter results>)