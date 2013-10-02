HAIDA PROTOTYPE NOTES
=================================================

GitHub: [Haida-Tests2](https://github.com/jcarpenter/Haida-Tests2)  
Last update: Sept 28


Design Patterns
------------------------------------------------


### High-level ###

App will be structured as follows:

* Revealing module pattern
* Strict mode
* PubSub
* Automated nested namespacing via dedicated function
* CSS3 animations
* Handlebars.js for templating?

Am also considering:

* Subdivide namespace, one division per file. Must be declared in order, eg: spa -> spa.wb -> spa.wb.render. The JS filename matches the namespace.
* Use parallel namespaces for CSS files and classes. For example, all classes from elements that belong to a object constructed from Screen() should start with "screen-".



### PubSub ###

To reinforce encapsulation, will have modules communcation with each other through event subscriptions instead of direct calls. 

There are many libraries available for PubSub, from jQuery-based to vanilla JS. I will use PubSubz, from Addy Osmani (author of [Learning JacaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)). 

Quotes on PubSub:

    "Don't make modules explicitly depend on each other. Everything each module needs to work should be confined into either the module or plugins that are shared among modules." [Brian Cray](http://briancray.com/posts/javascript-module-pattern)

    "Have modules communicate to each other through event subscriptions, not through direct calls to each other. They call this a pubsub. If you’re using jQuery, check out jQuery Tiny Pub/Sub." [Brian Cray](http://briancray.com/posts/javascript-module-pattern)

Vanilla JS pubsub options:

* Pubsubz: [GitHub](https://github.com/addyosmani/pubsubz)
* PubSubJS: [Article](http://roderick.dk/2010/10/12/introducing-pubsubjs-a-library-for-doing-publish-subscribe-in-javascript//), [GitHub](https://github.com/mroderick/PubSubJS).
* pubsub.js: [GitHub](https://github.com/phiggins42/bloody-jquery-plugins/tree/master)



### Namespaces ###

Namespaces can be extended via:

* Object literal notation
* Nested name spacing
* IIFE
* Namespace injection (a variation on IIFE, Immediately Invoked Functional Expression)

For my project, will use "automated nested namespacing" per [page 226](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailnamespacing) of Learning JavaScript Design Patterns, with a function setup to automatically define nested namespaces under the App global variable: App.createNS



### Module pattern ###

Will use the revealing module pattern. Everything inside it is private, and we decide what to return (expose as public members) with the return. 

Module pattern uses IIEFs (Immediately Invoked Function Expressions). These are effectively unnamed functions which are invoked immediately after they are defined. In JavaScript, variables and functions defined within such a context are only accessible within it, so this approach provides privacy, encapsulating logic from the global namespace.

Example from [Maciej Baron](http://www.impressivewebs.com/my-current-javascript-design-pattern/#comment-32835):

    (function ($, MyObject, undefined) {
      MyObject.publicFunction = function() {
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
    }(jQuery, window.MyObject = window.MyObject || {}));

    MyObject.sayStuff();
    MyObject.sayStuff();
    MyObject.publicFunction();
    MyObject.privateFunction(); // Returns error
    privateFunction(); // Returns error

`MyObject` is the namespace. Using an anonymous self-executing function enables private and public attributes.

`window.MyObject = window.MyObject || {}` enables to check if the namespace already exists. Will be using a slightly more powerful system that allows for easy creation of nested namespaces via a dedicated function (see Namespaces section, above).



### Prototypes ###

From Michael's slides, but I missed how this fits into the module pattern. There are four steps:

    // Step 1: define prototype
    var prisonerProto = {
        probation_length : 2,
        sentence_length : 4
    };

    // Step 2: create constructor
    var makePrisoner = function(name, id ) {
        // Step 3: explicity inherit from prototype(s)
        var prisoner
            = Object.create(prisonerProto);
            prisoner.id = id;
            prisoner.name = name;
            return prisoner;
    };

    // Step 4: instantiate
    var firstPrisoner = 
        makePrisoner( 'Joe','12A' );
    var secondPrisoner = 
        makePrisoner( 'Sam', '2BC' );


### Variables ###

Use underscores to denote private variables. eg: `_screen`

Watch out for accidental global variables:

    //Bad: i is not declared, so it becomes global.
    var visitPrison = function () {
        for( i = 0; i < 10; i++ ) {}
    }

    //Good: i is scoped to visitPrison
    var visitPrison = function () {
        var i
        for( i = 0; i < 10; i++ ) {}
    }

Declare first assign later. Declare at top of function. Use a single var statement per functional scope.

    var visitPrison = function () {
        var
            i, j, k, shoe_count, sheet_count, // declare
            shoe_count = 71, // assign
            sheet_count = 13,
        ;
    };

Name your variables to indicate scope & type. For local variables use `under_scores`. For module scope use `camelCase`.

| DataType      | Indicator                     | Examples      |
| ------------- | ----------------------------- | ------------- |
| Boolean       | sw, is, has, do               | is_used       |
| string        | name, text, type, string      | user_name     |
| Integer       | int, count, i,j,k, length     | list_length   |
| Number        | num,n,ratio                   | scale_ratio   |
| Regex         | regex                         | regex_match   |
| Array         | list                          | user_list     |
| Hash (mapt)   | map                           | user_map      |
| Object        | (no indicator)                | house_boat    |
| jQuery Obj    | $                             | $tabs         |
| Function      | verb noun                     | make_dog      |
| unknown       | data                          | http_data     |

Don't change variable's type: "If your function returns a string, always return a string. If there is an error, thow an exception – don't return false!")


### References ###

* [Example app for module pattern, Steve Kwan](https://github.com/stevekwan/experiments/blob/master/javascript/module-pattern.html)
* [JavaScript Namespaces and Modules](http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/)
* [Single page apps in depth](http://singlepageappbook.com/single-page.html)
* [Boilerplate FFOS app](https://github.com/robnyman/Firefox-OS-Boilerplate-App/blob/gh-pages/js/webapp.js)
* [Architecture of a single-page JavaScript web application? (Stack Overflow)](http://stackoverflow.com/questions/3050869/architecture-of-a-single-page-javascript-web-application)
* [Single Page Web Applications: JavaScript End-to-End (YouTube)](http://www.youtube.com/watch?v=OrIFaWJ9Glo) 
* [JavaScript for SPAs, Michael Mikowski * Josh Powell (slide deck)](http://html5devconf.com/archives/october2012/slides/Michael-S-Mikowski-Tuesday-2012-10-16-js4spa.pdf)
* [Strict mode (StackOverflow)](http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it)



Working with Git
------------------------------------------------

### Commands ###

Add all changed files (including new files and directories):

`git add *`

Create a commit with commit message:

`git commit -m 'Fixed that weird bug'`

Push to your remote origin from your working branch (in this case, master):

`git push origin master`


### References ###

* [Lifehacker tutorial](http://lifehacker.com/5983680/how-the-heck-do-i-use-github)
* [Visual reference](http://3.bp.blogspot.com/-uRYBgvv2DQ0/UjgZDC7EGkI/AAAAAAAAK_U/iBF4HJ6xs6c/s1600/git-and-github-workflow.png)
* [GitHub: Create A Repo](https://help.github.com/articles/create-a-repo)
* [Git Reference](http://gitref.org)


### High level steps ###

* Snapshot (add, commit)
* Update remote (push)




iOS App Setup
------------------------------------------------

### References ###

* [iOS Design Cheat Sheet](http://ivomynttinen.com/blog/the-ios-7-design-cheat-sheet/)
* [Safari on iOS7 and HTML5: Problems, Changes and new APIs](http://www.mobilexweb.com/blog/safari-ios7-html5-problems-apis-review)
* [StackOverflow: Load resources from relative path using local html in uiwebview](http://stackoverflow.com/questions/6420925/load-resources-from-relative-path-using-local-html-in-uiwebview?rq=1)


### Click handling ###

Currently using hacky approach. Detecting "touchend" and "mousedown", overriding default handling with "e.preventDefault()". This overrides UIWebView's default 300ms "wait to see if it's a double-tap" delay, making app feel extremely snappy. Downside is that scrolling triggers unintended touches. 

[TODO] Consider more thorough solutions:

* [Fast Click](https://github.com/ftlabs/fastclick)
* [Google Fast Buttons](https://developers.google.com/mobile/articles/fast_buttons)


### On quirks of iframes in UIWebView... ###

Very easy to load the content, either with EdgeCommons or just by inserting into DOM with .html(iframeGoesHere).

But position:fixed does not work. 

To get scrolling to work, must wrap iframe in div (frame), and set usual combo of "overflow":"scroll", and "-webkit-overflow-scrolling":"touch"

But that scrolls everything inside iframe as one, with toolbar at bottom.

If I turn off the above on frame div, I can get position:fixed working on iframe's toolbars, but then I can't scroll the content, no matter what I try.

All of the above work fine in Chrome :(




Arrays
------------------------------------------------

* `indexOf()` checks for target, and if it exists, returns index of. If not, returns -1.
* `move()` custom function. Moves element at old index to new index.
* `splice()` insert one more elements at specific index
* `unshift()` inserts an element at first position
* `push()` inserts an element at last position
* `pop()` remove last element
















