/***********************************
NEVER FORGET TO CLOSE THE CONNECTION
***********************************/


const mongo = require('mongodb').MongoClient; //Get us Mongo

mongo.connect('mongodb://some.mongo.server', (err, database) => { //note the protocol
  //Handle your errors!
  if(err){throw err;}

  //With Mongo connected, we can access the database as an object

  database.collection('collectionName').find({
    "key": "value", //case sensitive search
    /*Query Operator*/
    "anotherKey": {$gt: 100}, //query operators start with $ and are contained in curlies

    /*
      $gt = greater than
      $lt = less than
      $gte = greater than or equal to
      $lte = less than or equal to
      $ne = does not equal
      $elemMatch = only match arrays that match at least ONE of the following criteria. Failure to use array query operators will not produce desired results.

      "someArray": {$elemMatch: {$lt: 20, $gt: 5}};
     */
  },
  { //Second argument to find() is the data projection. Cannot mix exclusion and inclusion - with exception of _id!
    "_id": 0, // 0 indicates this value is not projected
    "key": 1, // 1 indicates this value is projected
    "anotherKey": 1
  }
  ).toArray((err, data) => {
    //find() returns a cursor object pointing to results. toArray() pushes results to an array
    if(err){throw err;}

    //do stuff to data
  }).insert({
    "key": "value"

    //returns WriteResults({"nInserted": 1});
  });

  database.collection('anotherCollection').update({ //by default, only modifies the first found document
    "queryParameter": "something to search for"
  },
  {
    /*Update Operators*/
    "$set": {"updateParameter": 1234125}, //update operators always being with $, like query operators
    "$inc": {"SomeCount": 1}, //increments some number
    "$unset": {"someKey": "Nothing that gets passed her affects the operation, only the key does"},
    "$rename": {"someKey": "newKeyName"},

  },
  {
    //Third argument is the options parameter
    "multi": true, //modifies all matching documents
    "upsert": true //will create a new document if nothing was found in this query
  });

  //returns WriteResult({
  //  "nMatched": how many fields were matched,
  //  "nUpserted": how many documents were created by the update,
  //  "nModified": how many fields were modified
  //})
});

/* Collections
================================ */

//Mongo handles arrays a bit differently...
// {
//  "arrayOfElements": [88, "Disco", 0.223] They are declared and stored normally.
// }

database.collection('collectionOfArrays').find({
  "arrayOfElements": "Disco" //will match any document with "Disco" as a value of "arrayOfElements" regardless of where it is in the array
}).update({
  "$set": {
    "arrayOfElements.1": "notDisco", //Element indicies can be accessed directly, but
    "arrayOfElements.$": "totallyDisco" //the $ placeholder is useful for changing the value of the element at the index found by the find operation above
  },
  "$pop": {
    "arrayOfElements": 1 //1 for last element, -1 for first element
  },
  "$push": {
    "arrayOfElements": "this will be pushed onto the array of elements"
  },
  "$addToSet": {
    "arrayOfElements": "this will be pushed onto the array of elements... only if it's not already there"
  },
  "$pull": {
    "arrayOfElements": "*all instances* of this will be removed from the array"
  }
})

//Associative arrays can be accessed just like in JS
//{
//  "anAssArray": {
//      "firstAss": 1,
//      "secondAss": 2
//  }
//}
//

database.collection('collectionOfArrays').update({
  "anAssArray": "firstAss"
},{
  "$set": {"anAssArray.firstAss": 126345} //Where it can find anAssArray with a firstAss property, it sets firstAss to the integer value 126345.
})

/* Cursor
================================ */

/*
  By default, returns first 20 results.
  Can iterate in command line:

  > it

  find() (and almost all data read operations) returns a cursor object. Assuming
  let cursor = db.collection('someCollection').find({})
*/

/*Cursor methods*/

cursor.sort({
  "price": 1, //Will sort by price ascending,
  "quantity": 0 //then will sort by quantity descending
});

cursor.skip(pageNumber) // Iterates results by changing where Mongo returns results from, here at index pageNumber.  This method is expensive for large sets.

cursor.limit(3) //Sets how many results Mongo will return.

/* Aggregations
================================ */
collection.aggregate(//Takes stage operators as parameters
  [{"$group": {"_id":"$fieldPath"}}]//Put aggregations into array
  )
//_id is here called the "group id" and is **required** by the group aggregator.  Together with the $fieldPath placeholder, the first key-value pair of the $group expression is called the "Group key".
//$fieldPath is a placeholder that tells the aggregator how to sort the results. It is always "$ + field to sort by".
//
//Anything that comes after the group id is an "accumulator"
//Assuming we group by the field "title"
collection.aggregate([
    {"$group": {"_id": "$title", "total": {"$sum": 1}}}
      //This keeps a count of each $title Mongo finds and then puts the total under a new field called "total"

      /*Other accumulators
        $avg
        $max
        $min
      */
  ])

//The aggregate method takes an array of stage operators, which runs queries through a pipeline. Data gets modified at each stage.
//
collection.aggregate([stage, stage, stage]);

/*Stage operators
  $match - best to use early and often to narrow the query
  $project - just like the projection part of find(). Best done right after $match
  $group
  $sort
  $limit
*/

/***********************************
NEVER FORGET TO CLOSE THE CONNECTION
***********************************/

db.close();

/* Data modeling
================================ */

//We need to be able to relate documents
//There is no formal structure in MongoDB for relating documents eg. foreign keys
//Simply set the _id field of the document you want to relate and do a second query matching the "key'd" field
//
//Another option is to embed documents. This gives the benefit of fewer queries, as well as atomic writes.


/* Mongoose
================================ */

const Schema = require('mongoose').Schema; //get reference to the schema object

let customer = new Schema({
  name: String, //field: validator
  address: String,
  email: String,
  dateActive: Date
  //Number
  //Boolean
  //Date
  //and more
});

//Schemas can be nested, in arrays or otherwise

let addressSchema = new Schema({
  type: String,
  street: String,
  city: String,
  state: String,
  country: String,
  postalCode: Number
});

let customerSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  address: [addressSchema], //arrays take arbitrary number of schemas
  createdOn: {type: Date, default: Date.now}, //object values include properties
  isActive: {type: Boolean, default: true}
});

//Mongoose uses some keywords that can make it difficult to create schemas.  Type is one of them

let packageSchema = new Schema({
  type: String //This tells Mongoose that the whole packageSchema is a string. What we want is the type key to hold a string value!
});

let packageSchema = new Schema({
  type: {type: String} //This casts the type correctly
});

/*Validators*/

let newSchema = new Schema({
  name: {type: String, required: true},
  dob: {type: Date, required: true},
  email: String,
address: {type: String, required: true, match: /[0-9]*{\s\w+}*/}, //pass a regex object for matching
age: {type: Number, required: false, min: 18, max: 999},
status: {type: String, required: true, default: "Happy!"} //if required and nothing is passed in, the default will be applied
});

newSchema.path("email").required(true, "Valid email required!"); //can add by chaining functions

let customValidator = [(value) {  //validators are arrays that contain functions and a custom error message
  //Test value here
  return true;
}, 'custom error message']

let someOtherSchema = new Schema({
  field: {type: Number, required: true, validate: customValidator}
})


/*Queries*/

//Schema objects also contain methods for searching the collection

const someSchema = require('../path/to/schema.js');

let query = someSchema.find(); //Without a callback, find() returns a query object

query.
  find({          //Helper methods on the query object reflect operations done in Mongo
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec((err, results) => {
      //display results or handle errors here
  });

  //The exact same thing can be accomplished via method chaining
query.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec((err, results) => {
      //display results or handle errors here
  });


/* MongoDB Administration
================================ */

/*

  Mongo supports ext4 and extfs, ext3 not recommended

  It's best to turn off access time updates on the file system.  noatime in fstab.

  On Ubuntu, Mongo is installed by default in /usr/bin and a config file is in /etc/mongod.conf (Read only access for all but file owner)

  If you need to perform operations on a database after unclean shutdown or other error, you'll want to start it on a different port so users don't connect and further corrupt data

*/

/*Configuration*/

/*
  Use a config file for startup!!!

  Mongo has different storage engines; mmapv1 is default.  Mongo will not start if it detects an engine mismatch between setting and what the file has.

  Journal flushing can be configured as an upper-bound using mmapv1. db.serverStatus().dur will show what the current setting is.

  directoryPerDb tells Mongo to put each databases' files into a single subdirectory under the main datapath.

  Mongo can be bound to a particular ip address under the net: bindIp: setting.  By default, it listens on all ips.  This can be useful for systems with multiple interfaces.

  net: http: enabled: true will start a web interface that includes debug information (port 28017) - **SECURITY RISK**

 */

/* Shell commands
================================ */

$ mongo //starts the shell at default port

> db //displays current database
> use <databaseName> //switch database; will create a database once something is saved

> show dbs
> show collections

> db.collection.stats() //shows stuff

/*The ObjectId object uses the following 12-byte pattern
    00000000 (Unix epoch) 000000 (Machine ID) 0000 (Process ID) 000000 (Counter)

    Because of the machine ID, two documents created at the exact same time by two different computers will still sort Machine A > Machine B.

    The counter allows for fast insertion by keeping the tree structure ordered.
 */

