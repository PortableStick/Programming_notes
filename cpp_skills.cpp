#include <iostream>
#include <string> //Include from the standard library
#include "custom_class" //Include custom made things; note the quotes
using namespace std; //allows omission of std::

int main(int argc, char* argv[]) {
    //argc is the length of argv
    //argv[0] is the path and name of the program
    int a = 72349870; //Data is strongly typed
    return 0; //Return an int; 1 = true, 0 = false, -1 = error
}

class SomeFantasticClass { //This goes in the headerfile, SomeFantasticClass.h
public:
    SomeFantasticClass(); //default constructor
    ~SomeFantasticClass(); //destructor
private:
    memberFunction1();
    memberFunction2(int anArgument,string anotherArgument);
};

