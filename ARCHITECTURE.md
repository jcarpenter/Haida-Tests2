HAIDA PROTOTYPE ARCHITECTURE
=================================================

Open questions
------------------------------------------------

* Determine how best to load and wait for external JS files
* What is best way to import external pages, and their styles / JS?



High-level requirements
------------------------------------------------

* Extensible
* Home
* Sheets
* RocketBar
* Settings Drawer
* Task Switcher
* Chrome
* Swiping
* Streaming new app
* Bookmarking
* Transitions
* Navigating inside apps



Module structure
------------------------------------------------

* Variables
* Objects
* Methods
* Topics
* Subscribers
* Publishers


### PubSubz ###

* PubSubz
	* Imported from external file. Defines self inside IIFE as global namespace, "pubsubz". Provides all the functions necessary for pub/sub pattern.
	* Topics:
		* openSheet
		* prevSheet
		* nextSheet
		* openBottomDrawer
		* openTopLeftDrawer
		* openTopRightDrawer
		* openRocketBar?
		* init

### App ###

* Init
	* Publish init topic

### App.ScreenManager ###

* Requirements
	* Load sheet
	* Delete sheet
	* From relative or absolute URLs, enabling extensibility.
	* Update sheet order
* Variables
	* _time_list
	* _space_list
	* _activeSheet
* Functions
	* open_sheet
		* Args: id, number, name, type, chrome
		* Load desired sheet
		* Trigger transition, based on what is incoming (id,number,chrome args), active (_active_sheet), and open (_time_list).
		* If id=home
			* Deactivate left-right swipe areas (addClass to display:none)
			* To-home transition
	* open_settingsdrawer
	* open_topdrawer
	* transition
		* Args: incoming object, outgoing object, transition type
		* Functions:
			* if-then sequence runs through possibilities based on incoming, outgoing
			* last_sheet
			* first_sheet
			* go_home
			* unlock
			* open_settingsdrawer
			* open_rocketbar
* Subscribers
	* openSheet - Callback: open_sheet {sheet data object}
	* prevSheet - Callback: open_sheet _active_sheet --;
	* nextSheet - Callback: open_sheet _active_sheet ++;
* Publishers
	* 


### App.Home ###

* Requirements
	* Populate with apps
	* Needs to be accessed
	* Or imported from external files? Have had some problems with this... Eventually do want to be able to import external files and have them make system calls. iFrames are promising, but screwey with iOS. Need to try this again.
* Variables
	* 
* Functions
	* init
		* Create home app icons from preloads.json
		* Set scroll position to top
* Subscribers
	* init - Callback: App.Home.init()
* Publishers
	* open_sheet: when user taps icon, icon publishes App.Home.init()


### App.Chrome ###

*The following currently (10/7) lives inside App.ScreenManager. Will evaluate moving it into it's own space as I go.*

* Requirements
	* Show/hide RocketBar
	* Show/hide Settings Drawer
	* Show/hide 
* Variables
* Functions
	* open_rocketbar
	* 
* Subscribers
	* openBottomDrawer - Callback: open_sheet {home sheet}
	* openTopDrawer1 - Callback: open_rocketbar [FIXME: put this in separate namespace?]
	* openTopDrawer2 - Callback: open_settingsdrawer [FIXME: put in separate namespace]
* Publishers


### App.TaskSwitcher ###

* Basically a piece of UI that displays current chronological order.


### App.Content ###

* Could function as the "Bookmark registry"
* Populate initial home screen bookmarks ("setup" topic)
* Add / delete bookmarks ("add" and "delete" topics)

is user moving within same app
is user moving up or down array
is user moving to home?
is user moving from home?


### Preloaded ###

JSON object which is used to populate home app. May be better to keep in separate file and import into Home app?




Sheet management
------------------------------------------------

Will start by recreating the iOS approach. 
The system records the user's movements in two ways: spatial and chronological. The user can swipe left-right through their open apps and the Spatial array tracks their current position relative to the other open apps. Meanwhile the Chronological array updates to always order the most recent apps by strict chronology, with most recent apps listed at top of index (aka 0).

In following example, each letter represents an app, with th active app in bold. On the fourth row, the user decides to swipe backwards a few steps to "r". The table shows how the two arrays update with each step. 

| Spatial           | Chronological     |
| ----------------- | ----------------- |
| qwer**t** 		| qwer**t**			|
| qwert**y** 		| qwert**y**		|
| qwerty**u** 		| qwerty**u**		|
| qwert**y**u 		| qwertu**y**		|
| qwer**t**yu		| qweruy**t**		|
| qwe**r**tyu		| qweuyt**r**		|



Information to track
------------------------------------------------

We need to track...

* Which screen is currently visible?
* Is user at front or back of sheets order?
* Which apps are already open? Which sheets of those apps? What order?
* Is RocketBar active?
* Which chrome is needed? Which is active?



Scenario
------------------------------------------------

User taps music icon
	Home: deactive
	Frame: activate
	Sheet: create music0, load content
	Transition(s): closeHome(), makeSheet()
	Chronology: push music app to top
	Spatial: push music app to top

User taps artists (tab)
	Home: -
	Frame: -
	Group: already exists, already active
	Sheet: create music1, make active sheet of music group
	Content: load
	Transition: in-app
	Chronology: push music1 to top of music group. push music group to top of frame.
	Spatial: push music1 to top of spatial order. 

User taps back to main page
	Home: -
	Frame: -
	Group: already exists, already active
	Sheet: already exists, make active sheet of music group
	Content: load
	Transition: in-app
	Chronology: push music0 to top of music group. push music group to top of frame.
	Spatial: push music0 to top of music group. push music group to top of frame.

User presses home
	Home: activate
	Frame: deactive
	Group: -
	Sheet: -
	Content: -
	Transition: to home (handled by home activate function)
	Chronology: -
	Spatial: -

User taps email icon
	Home: deactive
	Frame: activate
	Group: create email, make active
	Sheet: create email0, make active sheet of email group
	Content: load
	Transition: new sheet
	Chronology: push email0 to top of email group. push email group to top of frame.
	Spatial: push email0 to top of email group. push email group to top of frame.

User swipes left (to music)
	Home: -
	Frame: -
	Group: make music active
	Sheet: - (music0 should still be active sheet of music group, and therefore visible)
	Content: - (already loaded)
	Transition: back sheet
	Chronology: do not change sheet order (active sheet is already on top). push music group to top of frame.
	Spatial: ... user is to left of email.. can swipe right to go back to email...  




Modules & Functions
------------------------------------------------

User swipes from side
swipePrev()
  - Is user at back?
  - Yes: hitEdge(left);
  - No: prevSheet();
swipeNext()
  - Is user at front? 
  - Yes: hitEdge(right);
  - No: nextSheet()


User taps home icon:
User taps link:



makeSheet(id, number, name, type, link, chrome)

id:      ID of app:				string 
number:  Number of sheet			number
name:    Name of app			string
type:    Type of content			string ("symbol" or "URL")
link:    URL of content			string (symbol name or URL)
chrome:  Chrome dependencies		string ("adult" or "teen" or "baby")

Is app already open?
  If yes (id already present in order array): bring to front,updateOrder()
  If no (id not present in order array): bring to front




	



updateChrome(urlType);
need to know how much chrome to display. Pass through a variable to the system.
Every time user clicks URL, system updates chrome accordingly.


nextSheet() -- transition forwards.
prevSheet() -- transition backwards.
hitEdge(side) -- no more sheets to right. Gives bounce,


openApps = array
  - lives in frame. Tracks app groups
  - todo: learn how to do array manipulation.
  - todo: determine schema


updateOrder() -- maintains order