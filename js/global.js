'use strict';

var HAIDA = HAIDA || {};


// Create a general purpose namespace function
// This will allow us to create namespace a bit easier
// From: http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
HAIDA.createNS = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = HAIDA;
 
    // We want to be able to include or exclude the root namespace 
    // So we strip it if it's in the namespace
    if (nsparts[0] === "HAIDA") {
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
 

(function (HAIDA, undefined) {
	
  HAIDA.publicFunction = function() {
      console.log("This is a public function!");
  };

  var privateFunction = function() {
    console.log("This is a private function!");
  };
  
  MyObject.sayStuff = function() {
    this.publicFunction();
    privateFunction();
    privateNumber++;
    console.log(privateNumber);
  };

  var privateNumber = 0;

}(HAIDA));