/* Glossary
================================ 

Protocol - "interface"; a set of methods that can be adopted by another class in order to share data, encapsulate functionality,
            or make use of an existing lifecycle.
Categories - Methods that are added to a class at runtime, defined in the implementation file.  Used to extend classes without 
            source code.
Extensions - A way to define protected methods and properties. Put in the implementation file.

Accessors - Getter/setter methods used to get/set encapsulated data; automatically set when declared as a @property, and can
            have a custom name via @synthesize.
Message - Sending a message in ObjC is roughly the same as calling a method in other languages.  The difference is in how
        this request is dealt with in runtime.  Normally, calling a method on an object directs the computer to an area in 
        memory offset from the object - methods are a certain number of bytes away from where the object is defined, so this
        lookup is very fast.  ObjC instead keeps track of where the methods are in a lookup table.  [someObj someMethod:parameter] invokes
        the obj_msgSend(someObj, @selector(someMethod:), parameter), where the selector is a key to lookup the method in ObjC's 
        table.  The upshot of this difference is that the message can not only be accepted (thus invoking the method as expected),
        but also forwarded or ignored.  Important to note: objects are usually asked if they recognize a selector before trying
        to pass the message along.
 
Selector - A method's unique identifier.
 
*/

#import <someLibrary.h> //Import is different from standard C #include in that it checks to see if something is already included
#import "someLocalImplementation.h"

//Objective C is a strict superset of C, meaning that C will compile
int main(int argc, char const *argv[]) //argc is an integer representing the number of arguments, and argv is an array of arguments passed via the command line.
{
    int charlie = 15143; //Semicolons required
    char myFavoriteLetter = 'G'; //Primitive types work just the same

    NSArray *aBunchOfGreatStuff = @[2, @"Twinkle", myFavoriteLetter]; //ObjC datatypes are all objects and are prefixed with 'NS'.  The variable must be a pointer.

    

    return 0;
}

@interface exampleClass : exampleSuperClass
    //This is where the class signature is defined
    @property NSString *theBestStringEver; //Accessors created automatically
    @property NSString *notAsGoodOfAString;
    //Method signatures include...
    /*access modifier*/ - /*return type*/ (void) /*name*/ methodName: /*argument type and name*/ (NSString *) ExtendedByAString: /*additional arguments as necessary*/(NSNumber *) andGivenANumber 
    //Note the colon between the function name and the argument name.  Arguments often make up a part of the name.
    
    - (void) initWithAdditionalParameters: (NSString *) param1: (NSString *) param2;
@end


@implementation exampleClass
    //This is where the behavior of the class is defined

    @synthesize notAsGoodOfAString = _worstStringEver;

    - (instancetype) init { //instanceType is a weak type definition meaning "can be any type but will be the same type as the receiver's type" - here, exampleClass; same as 'id',
                //but more specific
        //Standard init function.  Automatically created, but can be customized.
        [super init]; //runs the init on the superclass, in this case exampleSuperClass.
        theBestStringEver = @"Dog berries";
        _worstStringEver = @"Jet fuel can't melt steel beams";
        return self;
    }

    - (instancetype) initWithAdditionalParameters: (NSString *) param1: (NSString *) param2 {
        [super init];
        [self init]; //Usually best to call the standard init and then modify behavior afterwards
        [super description];//Call this to return a string about the super class (can be overridden to offer whatever desc. you want
        theBestStringEver = param1;
        return self;
    }

    - (void) methodName: (NSString *) ExtendedByAString: (NSNumber *) andGivenANumber {
        NSLog(@"I'm doing something with the string %@ and the number %@!", ExtendedByAString, andGivenANumber);
    }

    + (void) classMethod
    {
            //This is invoked without instantiating the class.
    }
@end

//ivars are declared in the @interface with curly braces. This is the old way.
@interface iVarsClass {
    NSString* thisWillBeAnInstanceVariable; //Each of these will later need @synthesize
    @private
    NSNumber* thisWillBeAPrivateIVar;
    @public //etc..
    @protected
}

@property classProperty; //The compiler is smart enough to know when your
//variables should be class or instance properties. @property and @synthesize
//create ivars of those variables for you. @property is best practice.

@end

#ifdef __DEFINED_MACRO //Two underscores by convention
    //This will be read if __DEFINED_MACRO is defined
    #warning "This will be displayed as a warning if __DEFINED_MACRO is defined"
#endif

#ifndef __UNDEFINED_MACRO
    //This will be read if __UNDEFINED_MACRO is undefined
    #import "someHeaderFileThatDefinesStuff.h"
#endif

/* Objective C compiler directives start with @ (such as @implementation), while the normal C directives are #. */


