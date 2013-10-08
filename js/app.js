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
	//var _haida_is = false;

	//Declares & defines a public method
	App.init = function(){

	}

}(App));

//Calls init public function







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


App.createNS("ScreenManager");

App.ScreenManager = function(){

  /*---- variables ---- */

  var active_screen;
  var topdrawer1_isopen;
  var topdrawer2_isopen;

  var bottom_swipe = document.getElementById('bottom-swipe');
  var topleft_swipe = document.getElementById('topleft-swipe');
  var topright_swipe = document.getElementById('topright-swipe');

  var status_bar = document.getElementById('status-bar');
  var rocketbar_drawer = document.getElementById('rocketbar-drawer');
  var settings_drawer = document.getElementById('settings-drawer');
  var keyboard = document.getElementById('keyboard');


  /*---- touch handlers ---- */

  bottom_swipe.addEventListener("click", function() {
    //console.log("swipe up");
    if(topdrawer1_isopen){
      pubsubz.publish('close_topdrawer1');
    } else if (topdrawer2_isopen){
      pubsubz.publish('close_topdrawer2');
    } else {
      pubsubz.publish('open_bottomdrawer');
    }
  });

  topleft_swipe.addEventListener("click", function() {
    //console.log("open rocketbar");
    if(topdrawer1_isopen){
      //
    } else if (topdrawer2_isopen){
      //
    } else {
      pubsubz.publish('open_topdrawer1');
    }
  });

  topright_swipe.addEventListener("click", function() {
    //console.log("open settings drawer")
    if(topdrawer1_isopen){
      //
    } else if (topdrawer2_isopen){
      //
    } else {
      pubsubz.publish('open_topdrawer2');
    }
  });


  /*---- functions ---- */

  var set_active_screen = function(target){
    active_screen = target;
    console.log("The active screen is now: " + active_screen)
  }

  var open_bottomdrawer = function(){
    console.log("opened: home")
    
  }

  var showKeyboard = function(){
    $(keyboard).animo( { animation: "showKeyboard", duration: .2, timing: "ease-out", keep:"true"} )
  }

  var hideKeyboard = function(){
    $(keyboard).animo( { animation: "hideKeyboard", duration: .2, timing: "ease-out", keep:"true"} )
  }

  var open_topdrawer1 = function(){
    showKeyboard();
    $(status_bar).animo( { animation: "openFullRocketBar", duration: .2, timing: "ease-out", keep:"true"} );
    $(rocketbar_drawer).children("#cursor").animo( { animation: "blinking", duration: 1, timing: "ease-out", iterate: "infinite",} );
    $(rocketbar_drawer).children("#background").animo( { animation: "darkenBG", duration: .3, timing: "ease-out", keep:"true"} );
    rocketbar_drawer.classList.toggle("hidden");
    topdrawer1_isopen = true;
  }

  var close_topdrawer1 = function(){
    //console.log("closed: rocketbar")
    hideKeyboard();
    $(status_bar).animo( { animation: "closeFullRocketBar", duration: .2, timing: "ease-out"} );
    $(rocketbar_drawer).animo( { animation: "fadeOut", duration: .2, timing: "ease-out", keep:"true"}, function(){
      $(rocketbar_drawer).animo("cleanse");
      $(rocketbar_drawer).children().animo("cleanse");
      rocketbar_drawer.classList.toggle("hidden");
      topdrawer1_isopen = false;
    });
  }

  var open_topdrawer2 = function(){
    $(settings_drawer).animo( { animation: "darkenBG", duration: .3, timing: "ease-out", keep:"true"} );
    $(settings_drawer).children("img").animo( { animation: "slideInDown", duration: .3, timing: "ease-out", keep:"true"} );
    settings_drawer.classList.toggle("hidden");
    topdrawer2_isopen = true;
  }

  var close_topdrawer2 = function(){
    $(settings_drawer).animo( { animation: "lightenBG", duration: .3, timing: "ease-out", keep:"true"} );
    $(settings_drawer).children("img").animo( { animation: "slideOutUp", duration: .3, timing: "ease-out"}, function(){
      $(settings_drawer).animo("cleanse");
      $(settings_drawer).children("img").animo("cleanse");
      settings_drawer.classList.toggle("hidden");
      topdrawer2_isopen = false;
    });
  }

  var init = function(){

    rocketbar_drawer.classList.toggle("hidden");
    settings_drawer.classList.toggle("hidden");
    
    //create home icons

  }

  /*---- subscribers ---- */

  var init_sub = pubsubz.subscribe('init', init);
  var bottomdrawer_sub = pubsubz.subscribe('open_bottomdrawer', open_bottomdrawer);
  var open_topdrawer1_sub = pubsubz.subscribe('open_topdrawer1', open_topdrawer1);
  var close_topdrawer1_sub = pubsubz.subscribe('close_topdrawer1', close_topdrawer1);
  var open_topdrawer2_sub = pubsubz.subscribe('open_topdrawer2', open_topdrawer2);
  var close_topdrawer2_sub = pubsubz.subscribe('close_topdrawer2', close_topdrawer2);

  /*---- return ---- */

	return {
		
	}

}();



App.createNS("Home");

App.Home = function(){

  /*---- variables & objects ---- */


  /*---- functions ---- */

  var init = function(){

    $.getJSON("js/preloads.json", function(data){
      
      $.each(data.preloads, function(key, data){
        App.Icon.make_icon(data)
      });

    });
  }

  /*---- subscribers ---- */

  var init_sub = pubsubz.subscribe('init', init);

}();



App.createNS("Icon");

App.Icon = function(data){
  
  var Icon = function(data){
  
    this.name = data.name;
    this.id = data.id;
    this.number = data.number;
    this.type = data.type;
    this.chrome = data.chrome;

    var source = $("#appIcon").html();
    var template = Handlebars.compile(source);
    var html = template(data)
    $(home).append(html);
  }

  var make_icon = function(data){
    var icon = new Icon(data);
    App.BookmarkList.add_new(icon);
  }
  
  return {
    make_icon: make_icon
  }

}();



App.createNS("Bookmarks");

App.BookmarkList = function(){

  var list = [];

  var add_new = function(i){
    list.push(i);
  }

  return {
    add_new: add_new,
    list: list
  };

}();




App.createNS("HistoryManager");

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







/*-------------------- Tests --------------------*/

/*
var frame = document.getElementById("frame");

function display(url){
  console.log(url)
  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    //console.log(xmlhttp.responseText)
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
        console.log("los")
        idiot.innerHTML=xmlhttp.responseText;
      }
    }
  xmlhttp.open("GET",url,true);
  xmlhttp.responseType = "document";
  xmlhttp.send();
}

document.getElementById("frame").addEventListener("click", function(){
  display("http://localhost:8888/haida1/home.html");
});

*/



/*-------------------- Initiate --------------------*/

//App.init();

pubsubz.publish('init');
