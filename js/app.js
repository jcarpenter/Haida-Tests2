'use strict';




/*-------------------- DECLARE APP NAMESPACE  --------------------*/

//For namespacing, we're going to use a single global variable. App.
//To check that the namespace is not already being used, we will use first use
var App = App || {};





/*-------------------- NAMESPACE GENERATOR FUNCTION --------------------*/

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




/*-------------------- DEFINE APP NAMESPACE  --------------------*/

//and run init() to start things...

(function(App, undefined){

	//Declares & defines a private variable
	//var _haida_is = false;

	//Declares & defines a public method
	App.init = function(){

	}

}(App));

//Calls init public function




/*-------------------- TOUCH TARGETS --------------------*/

App.createNS("Touch")

App.Touch = function(){

  /*---- variables ---- */

  var topleft = document.getElementById("topleft");
  var topmiddle = document.getElementById("topmiddle");
  var topright = document.getElementById("topright");
  var bottom = document.getElementById("bottom");

  /*---- functions ---- */

  var toggle_targets = function() {
    topleft.classList.toggle("display_none");
    topmiddle.classList.toggle("display_none");
    topright.classList.toggle("display_none");
  }

  var touch = function (start_x,y,vector) {

    var start_x = x;
    var start_y = y;
    var end_x;
    var end_y;
    var distance = 200;

    if (vector == "up") {
      end_y = start_y - distance;

    } else if (vector == "right") {
      end_x = start_x + distance;

    } else if (vector == "down") {
      end_y = start_y + distance;

    } else if (vector == "left") {
      end_x = start_x - distance;
    
    } else if (vector == "") {
      end_y = start_y;
      end_x = start_x;
    }

    //add object to state
    //animate from start to end
    //callback function, remove from stage

  }

  /*---- return ---- */

  return {
    topleft: topleft,
    topmiddle: topmiddle,
    topright: topright,
    bottom: bottom,
    toggle_targets: toggle_targets
  }

}();




/*-------------------- ROCKET BAR --------------------*/

App.createNS("RocketBar");

App.RocketBar = function() {

  /*---- variables ---- */

  var rocket_bar = document.getElementById("rocket-bar");
  var cancel = document.getElementById("cancel");
  var rb_title = document.getElementById("title");

  /*---- interactions ---- */

  App.Touch.topleft.addEventListener("click", function() {
    pubsubz.publish('focus_rb');
  });

  cancel.addEventListener("click", function() {
    pubsubz.publish('close_rb');
  });

  /*---- functions ---- */

  var update_title = function(n) {
    rb_title.innerHTML = n;
  }

  var show_rb = function () {
    App.Touch.toggle_targets();
    rocket_bar.classList.add("show");
  }

  var focus_rb = function() {
    App.Touch.toggle_targets();
    pubsubz.publish("open_keyboard");
    rocket_bar.classList.add("focus");
  }

  var close_rb = function() {
    App.Touch.toggle_targets();
    pubsubz.publish("close_keyboard");
    rocket_bar.classList.remove("show");
    rocket_bar.classList.remove("focus");
  }

  /*---- subscribers ---- */

  var show_rb_sub = pubsubz.subscribe("show_rb", show_rb);
  var focus_rb_sub = pubsubz.subscribe("focus_rb", focus_rb);
  var close_rb_sub = pubsubz.subscribe("close_rb", close_rb);

  /*---- return ---- */

  return {
    rb_title: rb_title,
    update_title: update_title
  }

}();




/*-------------------- KEYBOARD --------------------*/

App.createNS("Keyboard");

App.Keyboard = function() {

  /*---- variables ---- */

  var keyboard = document.getElementById("keyboard");

  /*---- functions ---- */

  var open_keyboard = function() {
    keyboard.classList.add("open");
  }

  var close_keyboard = function() {
    keyboard.classList.remove("open");
  }

  /*---- subscribers ---- */

  var open_keyboard_sub = pubsubz.subscribe("open_keyboard", open_keyboard);
  var close_keyboard_sub = pubsubz.subscribe("close_keyboard", close_keyboard);

}();




/*-------------------- NOTIFICATIONS --------------------*/

App.createNS("Notifications")

App.Notifications = function() {
  
  /*---- variables ---- */

  var notifications_bar = document.getElementById("notifications-bar");
  var notifications_drawer = document.getElementById("notifications-drawer");

  /*---- interactions ---- */

  notifications_bar.addEventListener("click", function(){
    pubsubz.publish("open_notdrawer");
  })

  notifications_drawer.addEventListener("click", function(){
    pubsubz.publish("close_notdrawer");
  })

  /*---- functions ---- */

  var open_notdrawer = function() {
    notifications_drawer.classList.toggle("open");
  }

  var close_notdrawer = function() {
    notifications_drawer.classList.toggle("open");
  }

  /*---- subscribers ---- */

  var open_notdrawer_sub = pubsubz.subscribe("open_notdrawer", open_notdrawer);
  var close_notdrawer_sub = pubsubz.subscribe("close_notdrawer", close_notdrawer);

}()




/*-------------------- SETTINGS DRAWER --------------------*/

App.createNS("SettingsDrawer");

App.SettingsDrawer = function() {

  /*---- variables ---- */

  var old_title;
  var settings_drawer = document.getElementById("settings-drawer");

  /*---- interactions ---- */

  App.Touch.topright.addEventListener("click", function() {
    pubsubz.publish("open_settingsdrawer");
  })

  settings_drawer.addEventListener("click", function() {
    pubsubz.publish("close_settingsdrawer");
  });

  /*---- functions ---- */

  var init = function() {
    settings_drawer.classList.add("display_none");
  }

  var get_date = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
    return(today);
  }

  var open_settingsdrawer = function() {
    old_title = App.RocketBar.rb_title.innerHTML;
    App.RocketBar.update_title(get_date());
    settings_drawer.classList.add("open")
  }
  
  var close_settingsdrawer = function() {
    App.RocketBar.update_title(old_title);
    settings_drawer.classList.remove("open")
  }

  /*---- subscriptions ---- */

  var init_sub = pubsubz.subscribe("init", init)
  var open_sd_sub = pubsubz.subscribe("open_settingsdrawer", open_settingsdrawer);
  var close_sd_sub = pubsubz.subscribe("close_settingsdrawer", close_settingsdrawer);

}();




/*-------------------- TASK MANAGER --------------------*/

App.createNS("TaskManager");

App.TaskManager = function(){

  /*---- variables ---- */

  /*---- touch handlers ---- */

  /*---- functions ---- */

  //open tm
  //cancel tm
  ////select card

  /*---- subcriptions ---- */

  /*---- return ---- */  



}();





















  /*---- interactions ---- */

  /*
  //SWIPE FROM BOTTOM
  bottom.addEventListener("click", function() {
    if (rocketbar_isopen) {
      pubsubz.publish('close_rocketbar');
    } else if (settingsdrawer_isopen){
      pubsubz.publish('close_settingsdrawer');
    } else if (App.History.get_active_screen().id == "home") {
      // do nothing
    } else {
      pubsubz.publish('open_bottom', App.Home.home_obj)
    }
  });
  */


  /*
  var open_sheet = function(topics,incoming) {


    var outgoing = App.History.get_active_screen();


    //SETUP HOME
    if (incoming.id == "home" && outgoing.id == undefined) //setup home sheet
    {
      
      var sheet = new Sheet(incoming);
      home = sheet;
  
      $.getJSON("js/preloads.json", function(data) {
        $.each(data.preloads, function(key, data) {
          App.Icon.make_icon(data)
        });
      });

      $(home.html).animo( { animation: "PushfromForeground", duration: sheet_speed, timing: "ease-out"} );
      App.History.set_active_screen(home);

    }


    //LOAD HOME
    else if (incoming.id == "home" && outgoing.id != "home") 
    {

      console.log(home)
      $(home.html).removeClass("inactive_sheet");
      $(home.html).addClass("active_sheet");
      $(home.html).animo( { animation: "PushfromForeground", duration: sheet_speed, timing: "ease-out"} );

      $(outgoing.html).removeClass("active_sheet");
      $(outgoing.html).animo( {animation: "PushtoBackground", duration: sheet_speed, timing: "ease-out"}, function(){
        $(outgoing.html).animo("cleanse");
        $(outgoing.html).addClass("inactive_sheet")
      });
      App.History.set_active_screen(home); 

    }


    //LOAD WEBSITE
    else if (incoming.chrome == "site" && outgoing.chrome == "site")
    {
      //load url in active_sheet
      //transition
      //update history
      //console.log("load site in current window")

    } 


    //LOAD SHEET
    else if (outgoing.id == "home")
    {
      
      //CHECK IF INCOMING ALREADY EXISTS...
      //check if data.id already exists in App.History.history_list
      //aka: search array for an object that contains an id matching data.id

      
      if (target exists in App.History.history_list)
      {
        //bring to front
        //transition
        //update history
      } 
        else 
      {
        //make new Sheet ();
        //transition
        //update history
      }
      


      var sheet = new Sheet(incoming);
      $(sheet.html).animo( { animation: "PushfromBackground", duration: sheet_speed, timing: "ease-out"}, function(){
        $(sheet.html).addClass("active_sheet");
      });

      $(outgoing.html).animo( {animation: "PushtoForeground", duration: sheet_speed, timing: "ease-out"}, function(){
        $(outgoing.html).animo("cleanse");
        $(outgoing.html).removeClass("active_sheet");
        $(outgoing.html).addClass("inactive_sheet")
        App.History.set_active_screen(sheet);
      });
      

    }

  }
  */







/*-------------------- SCREEN MANAGER --------------------*/


App.createNS("ScreenManager");

App.ScreenManager = function(){

  /*---- variables ---- */

  var Sheet = function(data) {
  
    //Create sheet variables  
    this.name = data.name;
    this.id = data.id;
    this.number = data.number;
    this.type = data.type;
    this.chrome = data.chrome;

    //Create sheet from Handlebars template
    var source = $("#Sheet").html();
    var template = Handlebars.compile(source);
    var html = template(data)
    $("#frame").append(html)
    
    //Create variable for the sheet HTML element
    this.html = $("#frame").find("#" + this.id + "_" + this.number);

  }

  /*---- functions ---- */

  var create_sheet = function(data) {
    var sheet = new Sheet(data);
    return sheet;
  }

  /*---- subscribers ---- */

  var create_sheet_sub = pubsubz.subscribe('create_sheet', create_sheet);

  /*---- return ---- */

	return {
    create_sheet: create_sheet
	}

}();













/*-------------------- TRANSITIONS --------------------*/

App.createNS("Transition");

App.Transition = function(){

  var open = function(i){
    //var test = App.Home.sheet;
    $(i.html).animo( { animation: "PushfromForeground", duration: .4, timing: "ease-out"} );
    
    if(i.chrome = "home") {
      pubsubz.publish("show_rb");
    }

  }

  return {
    open: open
  }

}();











/*-------------------- HOME --------------------*/

App.createNS("Home");

App.Home = function(){

  /*---- variables ---- */

  var sheet;

  var object = {
    "name": "Home",
    "id": "home",
    "number": 0,
    "type": "symbol",
    "chrome": "home"
  }

  /*---- functions ---- */
  
  var init = function(){
    
    //Create home sheet
    sheet = App.ScreenManager.create_sheet(object);

    $.getJSON("js/preloads.json", function(data) {
      $.each(data.preloads, function(key, data) {
        App.Icon.make_icon(data)
      });
    });

  }

  /*---- subscribers ---- */

  var init_sub = pubsubz.subscribe('init', init);

  /*---- return ---- */

  return {
    sheet: function() { return sheet; },
    object: object
  }

}();


/*-------------------- ICONS --------------------*/

App.createNS("Icon");

App.Icon = function(data){
  
  var Icon = function(data){
  
    //Setup variables
    this.name = data.name;
    this.id = data.id;
    this.number = data.number;
    this.type = data.type;
    this.chrome = data.chrome;

    //Create icon from handlebars template
    var source = $("#appIcon").html();
    var template = Handlebars.compile(source);
    var html = template(data)
    $("#home_0").append(html)

    //create reference to icons HTML element
    this.html = $("#home_0").find("#icon_" + this.id);
  }

  var make_icon = function(data){
    var icon = new Icon(data);
    App.BookmarkList.add_new(icon);

    $(icon.html).click(function(){
      pubsubz.publish("open_sheet", icon);
    });
  }
  
  return { 
    make_icon: make_icon
  }

}();






















/*-------------------- HISTORY --------------------*/

App.createNS("History");

App.History = function(){
  
  /*---- variables ---- */

  var active_screen = {};
  var history_list = [];
  var space_list = [];

  /*---- function ---- */

  var set_active_screen = function(target){
    active_screen = target;
  }

  var get_active_screen = function(){
    return active_screen;
  }

  //logic for keeping time and space arrays up to date will live here
  var update_count = function(){
    //console.log(history_list.length);
    //console.log(space_list.length);
  }

  /*---- return ---- */

  return {
    set_active_screen: set_active_screen,
    get_active_screen: get_active_screen,
    history_list: history_list,
    update_count: update_count
  }
}();



/*-------------------- BOOKMARKS --------------------*/

App.createNS("Bookmarks");

App.BookmarkList = function(){

  /*---- variables ---- */

  var list = [];

  /*---- functions ---- */

  var add_new = function(i){
    list.push(i);
  }

  /*---- return ---- */

  return {
    add_new: add_new,
    list: list
  };

}();















/*-------------------- SETUP --------------------*/

App.createNS("Setup")

App.Setup = function(){

  /*---- setup ---- */

  var init = function(){

    //Wait for things to setup before starting intro animations...
    var setup_timer = setInterval(function() {
      
      stop_timer() 
      App.Transition.open(App.Home.sheet());
      //App.History.set_active_screen(sheet);

    },500); 

    var stop_timer = function() { clearInterval(setup_timer) }

    /*
    active_screen = App.History.active_screen;
    rocketbar_drawer.classList.toggle("display_none");
    settings_drawer.classList.toggle("display_none");
    */
  }

  /*---- subscriptions ---- */

  var init_sub = pubsubz.subscribe("init", init)

}();




/*-------------------- INITIATE --------------------*/

pubsubz.publish('init');
