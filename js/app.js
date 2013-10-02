'use strict';



/*-------------------- Declare App namespace --------------------*/

//For namespacing, we're going to use a single global variable. App.
//To check that the namespace is not already being used, we will use first use
var App = App || {};





/*-------------------- Define nested namespace generator --------------------*/

// Create a general purpose nested namespace generating function
// This will allow us to create nested namespaces a bit easier
// From: http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/

App.createNS = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = App;
 
    // We want to be able to include or exclude the root namespace 
    // So we strip it if it's in the namespace
    if (nsparts[0] === "App") {
        nsparts = nsparts.slice(1);
    }
 
    // Loop through the parts and create a nested namespace if necessary
    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];
        // Check if the current parent already has the namespace declared, if not create it
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        // Get a reference to the deepest element in the hierarchy so far
        parent = parent[partname];
    }
    // The parent is now completely constructed with empty namespaces and can be used.
    return parent;
};




/*-------------------- Define App  --------------------*/

//and run init() to start things...

(function(App, undefined){

	//Declares & defines a private variable
	var _haida_is = false;

	//Declares & defines a public method
	App.init = function(){
		console.log(_haida_is);
	}

}(App));

//Calls init public function
App.init();







/*-------------------- Declare PubSub object --------------------*/

//Using Pubsubz, from Addy Osmani
//https://github.com/addyosmani/pubsubz
//Will define pubsub as global var. Seems like it will work...
//Not sure if whould instead define as nested namespace within App?



/*
var testSubscriber = function( topics , data ){
    console.log( topics + ": " + data );
};

var testSubscription = pubsubz.subscribe( 'example1', testSubscriber );

pubsubz.publish( 'example1', 'hello world!' );
pubsubz.publish( 'example1', ['test','a','b','c'] );
pubsubz.publish( 'example1', [{'color':'blue'},{'text':'hello'}] );

setTimeout(function(){
    pubsubz.unsubscribe( testSubscription );
}, 0);

pubsubz.publish( 'example1', 'hello again!' );
*/






/*-------------------- Managers --------------------*/


App.createNS("WindowManager");
App.createNS("HistoryManager");


App.WindowManager = function(){

	return {
		
	}
}();



App.HistoryManager = function(){
	var _time_list = [];
	var _space_list = [];

	//logic for keeping time and space arrays up to date will live here
	var update_count = function(){
		console.log(_time_list.length);
		console.log(_space_list.length);
	}

	return {
		update_count: update_count
	}
}();

App.HistoryManager.update_count();