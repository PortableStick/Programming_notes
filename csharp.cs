using System;
using System.Collections.Generic;
using System.Linq;

namespace Notes {
    class CollectionTypes {
        public static void Arrays() {
            // Arrays
            // Simplest type
            // Index list of items
            // Array access is blazingly fast
            // To initialize, define the datatype and append square brackets
            int[] someArray = new int[3]; // Must define array size
            // Can initialize data in literal
            int[] someOtherArray = new int[] { 6, 7, 8 };
            // When adding numbers at initialization, we don't need to specify the type in the constructor, or use the 'new' keyword
            int[] theBestArray = { 11, 9, 6 };
            // We can create multidimensional arrays
            string[][] twodee = new string[10][]; //Note that we define the size of the outer array, not the inner
            // This defines a 10 element array of string arrays, and the method we used is the 'jagged array'
            // string[][] twodeetwo = new string[10][9]; <-- throws compile time error
            // Actual multidimensional arrays are different
            int[,] MDArray = new int[100, 10];
            // This creates a single array of size 100 * 10.  If we were to get the size of MDArray
            int length1 = MDArray.Length; // would be 1000, but twodee
            int length2 = twodee.Length; // would be 10, regardless of what the length of the inner arrays was.
            // MD arrays initialize each item to 0 for int, and 'null' for other objects.
            //  Console.WriteLine(MDArray.GetLength(0)) The .GetLength method returns the length of the array at the given dimension.  A two dimensional MDArray has 0 and 1.  A 3D array has 0,1,2.. etc.
            //  Arrays in C# are _NOT_ mutable
        }

        public static void Lists() {
            // Lists
            // Requires 'using System.Collections.Generic'
            List<string> students = new List<string>(); // List of strings; List is a generic type
            students.Add("Me"); // Modify lists with methods
            students.Count; // Length property
            students[0]; // "Me"; We can access with indices
            students.Capacity; // 4; List is an array wrapper that will create a new array as needed
            // Copying one array to another in order to add or remove items is an expensive operation.  Lists allow you to estimate the size of the array to increase performance over frequent array writes
            List<string> movies = new List<string>(1000); // If the array needs to grow, it will.
            // If we were to manage this manually, we would run into a problem where all of the code that references the source array would have to now point to the new array.  This is cumbersome, if not impossible.  By being a wrapper around the array, a list object manages this reference so we don't have to.
            // Populate list at initialization
            List<int> numbers = new List<int>(5) { 0, 1, 2, 3, 4 }; // Notice that we're still passing the expected size.  That's not required, but a good idea.
            // Convert array to list
            int[] theBestArray = { 11, 9, 6 };
            List<int> theBestList = new List<int>(theBestArray);
            // Convert list to array
            int[] theBestArrayPart2 = theBestList.ToArray();
            numbers.Insert(1, 9187324); // Insert the number 9187324 into index 1 and shift the other numbers ahead of it
            numbers.RemoveAt(2); // Remove the integer at index 2
            numbers.Remove(9187324); // Will remove the number 9187324 no matter where it is in the list, but only the first occurrence.
        }

        public static void Sets() {
            // Sets
            // Sets are actually an interface in C# and can be implemented in many ways.  The most common implementation is the included hashset type
            // Hashsets are manipulated with functions that describe the manipulation as a set operation
            string[] somethingDoesntFit = {"dog", "cat", "bird", "train"};
            HashSet<string> newHash = new HashSet<string>();
            newHash.UnionWith(somethingDoesntFit); // Union adds unique items only
            // Hashes are determined to be unique based on their hash code, which is access by the GetHashCode() method on System.Object
            // It's possible to change this hash code by overriding GetHashCode in whichever class you're storing in a hash
            // When overriding GetHashCode, it's important to also override Equals so that the class is able to determine how the hash should match
        }

        public static void Dictionaries() {
            // Dictionaries
            // Matches keys to values
            // Initialized with both key and value types
            // Dictionary<keyType, valueType> dictionaryName = new Dictionary<keyType, valueType>();
            Dictionary<int, string> uselessNumberedList = new Dictionary<int, string>();
        }
    }

    class learnLINQ
    {
        List<Person> somePeople = People.SomePeople;
        // Queries can be written in either Linq or method syntax
        public static void LINQSyntaxes() {
            var linqSyntax = from p in somePeople where p.Age > 33 select new { FullName = p.FirstName + ", " + p.LastName, Age = p.Age, Hair = p.HairColor };
            var methodSyntax = somePeople.Where(p => p.Age > 33).Select(p => new { FullName = p.FirstName + ", " + p.LastName, Age = p.Age, Hair = p.HairColor });
        }

        // We can group results as needed
        public static void GroupSearch() {
            var oldFolks = from p in somePeople where p.Age > 33 orderby p.Age descending select new { FullName = p.FirstName + ", " + p.LastName, Age = p.Age, Hair = p.HairColor };
            // sort by multiple properties with comma separation
            var oldFolksByHaircolor = from p in somePeople where p.Age > 33 orderby p.HairColor, p.Age descending select new { FullName = p.FirstName + ", " + p.LastName, Age = p.Age, Hair = p.HairColor };
            // return a GroupedEnumerable with the group operator
            var numberOfOldFolksByHairColor = from p in somePeople where p.Age > 33 group p by p.HairColor;
            Console.WriteLine(numberOfOldFolksByHairColor.GetType()); // IEnumerable<IGrouping<...>...>; we get an enumerable of groups
            // We can dump the groups into a variable name so that we can project the properties into a new object
            var groupByHairColor = from p in somePeople group p by p.HairColor into Hairs select new { color = Hairs.Key, count = Hairs.Count() };
        }
    }

    class Delegates
    {
        // Delegates are anonymous functions
        // They are used in 4 steps
        // 1. Declare the delegate type function
        delegate int SomeDelegate(int number);
        // 2. Define another method with the same signature as the delegate
        public int TrueRNG(int number)
        {
            return number * 3193847;
        }
        // 3. Instatiate the delegate and pass the desired functionality
        public void LetsDoAThing()
        {
            SomeDelegate randomizedNumber = new SomeDelegate(TrueRNG);
            // 4. Call the delegate
            int myTrulyRandomNumber = randomizedNumber(2);
            // We can also skip the ceremony of creating a matching function, instead passing the functionality into the delegate directly
            // Remember that we can only do this with an existing delegate instance.  The delegate is the empty shell we put functionality into.
            randomizedNumber = delegate(int number)
            {
                return number * 8989927; // Wow. Such random.  Wow.  Many unpredictables.
            };
            // Call it as before
            int anotherAbsolutelyRandomNumber = randomizedNumber(6);
        }
    }

    class ActionsAndFuncs
    {
        public static void Main()
        {
            // Actions are another type of delegate that can be declared at instantiation.  They are generics.
            // They do not return anything!
            Action<string> myFirstAction = delegate(string word)
            {
                Console.WriteLine(word);
            };

            myFirstAction("Useless string");

            // Funcs are like actions, but they return a value
            // When declaring the func, Func<T1, Tn>, Tn will always be the return value type, while all types before it are the input types.
            Func<string, string> myFirstFunc = delegate(string word)
            {
                return word + " if you're nasty";
            };

            string whatsMyName = myFirstFunc("Greg");
        }
    }

    class Lambdas
    {
        // Lambdas are the most abstract delegate form
        // (param) => param + 2;
        // param is mapped to param plus 2
        // ES6 arrow functions, Ruby lambdas...

        Func<string, string> yellWord = word => word + "!";
        string iLove = yellWord("lamp");
    }

    class AnonymousTypes
    {
        List<Person> somePeople = People.SomePeople;
        // Anonymous types are unamed objects that are frequently returned from LINQ queries.
        public static void anonTypes()
        {
            var linqSyntax = from p in somePeople where p.Age > 33 select new { FullName = p.FirstName + ", " + p.LastName, Age = p.Age, Hair = p.HairColor };
        }
    }


    // ******** Useful example code ******** //
    class Person
    {
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public int Age {get; set;}
        public string HairColor {get; set;}
    }

    static class People
    {
        public static List<Person> SomePeople { get {
                return new List<Person> {
                    new Person { FirstName = "Dirk", LastName = "Dickson", Age = 36, HairColor = "Brown" },
                    new Person { FirstName = "Dunt", LastName = "Dorbson", Age = 37, HairColor = "Brown" },
                    new Person { FirstName = "Daz", LastName = "Dolson", Age = 31, HairColor = "Brown" },
                    new Person { FirstName = "Dick", LastName = "Dirkson", Age = 34, HairColor = "Black" },
                    new Person { FirstName = "Durm", LastName = "Dackson", Age = 34, HairColor = "Black" },
                    new Person { FirstName = "Dack", LastName = "Dorkson", Age = 35, HairColor = "Blonde" },
                    new Person { FirstName = "Dank", LastName = "Delson", Age = 35, HairColor = "Blonde" },
                    new Person { FirstName = "Dorb", LastName = "Dankson", Age = 32, HairColor = "Red" }
                };
            } }
    }
}

