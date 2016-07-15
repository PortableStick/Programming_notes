/* Variable assignment
================================ */

var someNumber = 1 //Strong, implicit typing.  
var anotherNumber:Int //Explicitly typed, unitialized
let aConstant:String //let creates constants

var someOptionalString:String? = "This is a string"

/*
    Optionals are objects that can contain either
    a value or the absence of a value (nil). Non-
    optional objects cannot contain 'nil', so it is
    critical to use an optional value if there is 
    a chance it will need to (or could) be valueless.

    Nil in Swift is the absence of a value, whereas in 
    Objective-C and other languages, it is a pointer
    to a null object.

    Optionals must be 'unwrapped'; that is, their contents
    must be tested because an unsupported nil could crash the program.
*/

if let blockScopedConst = someOptionalString {
    "This would show if the variable holds a value"
} else {
    "This would show if the variable is nil"
}

//Optionals can be implicitly unwrapped with a '!'

var implicitlyUnwrappedString:String! = "Don't ever let this be nil!"

/* The variable will be automatically unwrapped.  This means 
if it were ever to be nil, the program will crash
*/

/* Datatypes
================================ */

/*Tuples*/
//Holds an arbitrary number of values. Associated with an index by default
var someData = ("I'm a string", 8764, true, implicitlyUnwrappedString) 

//Can be decomposed into separate values

var (myString, myInt, myBool, _) = someData //Be aware of implicit typing!

//Use an '_' to indicate you want to skip a value.  

//Function parameters can be passed a tuple

var functionParams = ("So many strings!", 88)
superUsefulFunction(functionParams)

/*Arrays*/

//Arrays in Swift **cannot** have differing types

/* Control statements
================================ */

/*For loops*/

for var i = 0; i < 5; ++i {
    //for loops aren't written with parentheses
    //Apple suggests using ++i rather than i++
}

for i in 1...8 {
    "This will print 8 times"
}

for i in 1..<8 {
    "This will print 7 times"
}

//i can be omitted

for _ in 6...9 {
    "Blahblahblah"
}

var someArray = ["Thing1", "Thing2", "Thing3"]

for string in someArray {
    "This is \(thing)"
    //Will print out each thing
}

//Type declaration is sometimes necessary!

for thing:CustomClass in arrayOfCustomClasses {
    //this will create a variable, thing, for each item
    //in the array, each of type CustomClass
}

//Arrays will also pass their index in fast enumeration
var testArray = ["one", "two", "three", "four"]
for (index, value) in enumerate(testArray) {
    //the enmuerate function provides the range 0..<testArray.count
}

//'if-blocks' are not appreciably different from other languages

/*Switch-case*/
var number = 23948
switch num {
    case 1..3:
        "Between 1 and 3"
    case 4,5,6,7:
        "Between 4 and 8"
    case > 10:
        "Greater than 10"
    default:
        "What could this possibly be?"
}

var myTuple = (2,19)
switch myTuple {
    case (< 5, 8...13)
        "lkajsdf;kj"
    case (_, > 9)
        "Underscore means 'anything here'"
    case (x, y)
        //Matches anything
        "I will print \(x) and \(y)"
    case (x, y) where x < 50
        "In reality, we would never see this"
    default
        "Something else entirely"
}

//Break, continue, and labeled statements

var hiddenMessage = "Cowpoop"
var arrayOfWords = ["NotCowpoop", "Frozen pizza", "Dobby", "Fuck grass", "oiwhefkj", "Cowpoop", "Filthy dingus", "Fist cannon"]

namedLoop: for var i = 0; i < arrayOfWords.count; ++i {
    switch i {
        case "Frozen Pizza":
            continue //Goes back to the loop, skips all other conditions
        case 1351:
            "This is a number!"
        case true:
            "A boolean?!?!?!"
            break //Breaks out of the case statement only, no different from continue in this example
        case hiddenMessage:
            "You've found the secret message!!"
            break namedLoop //Breaks out of the switch block and the for loop
    }
}


