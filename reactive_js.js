//Reactive programming is an extension of the functional paradigm in which iterable objects of arbitrary size (known as observables) are acted on as arrays.

//Promises are usually treated as observables that do some work, then disappear. Some libraries require a method to create an observable from a promise.

function getStuffFromApi() {
    return $.ajax('http://someapi.com/useful/path/name').fromPromise();
}

$(document).ready(() => {
    //With the observable created, we need to subscribe to it.  The subscribe method takes a function as its agument, and it will run the function on each item the obersvable passes.
    getStuffFromApi.subscribe(item => {
        $('#item-display').html(`<p>${item}</p>`);
        //... or whatever
    });

    //Imagine a scenario where our API returns an iterable object, and instead of passing the entire object on, we want to operate on each item in the collection.  The most naive approach would be to use a loop construct in the subscribe call:
    getStuffFromApi.subscribe(items => {
        items.each(item => {
            //Do stuff here
        });
    });

    //THis super sucks because we have a loop in each subscribe call.  A better option is to create an observable out of the iterable:
    getStuffFromApi.subscribe(items => {
        Observable.from(items).subscribe(item => {
            //Just try to write maintainable code here
        });
    });

    //This is a great use of observables, but hardly maintainable code, and it really misses the point of reactive programming.  An observable is an iterable, so we can use nice, composable functions to express what we want to do much more cleanly.  In this case, we want to take the iterable, turn it into an observable, and then map out each of its items into the same iterable stream.  In functional programming, this would be accomplished with a flatMap.  In reactive programming, we use the same.

    getStuffFromApi.flatMap(items => {
        return Observable.from(items);
    }).subscribe(item => {
        //Do things to each item here.
    });

    //Now, we can compose an entire chain of operations using flatMap.
    getStuffFromApi.flatMap(items => {
        return Observable.from(items);
    }).flatMap(item => {
        return processItemToNewFormat(item);
    }).subscribe(finalFormat => {
        $('#item-view').html(`<p>${finalFormat}</p>`);  //Yay!!
    })
});