HAIDA PROTOTYPE DEVELOPMENT NOTES
=================================================

GitHub: [Haida-Tests2](https://github.com/jcarpenter/Haida-Tests2)  
Last update: Sept 28


Architecture
------------------------------------------------


### High-level ###

* Use revealing module pattern.
* All code lives within anonymous closures, which provides privacy and state throughout the lifetime of the app.
* Use strict mode

Draft module structure:

* Gaia
    * Sheet
    * AppIcon
    * HistoryManager
    * TransitionManager
    * WindowManager


### Module pattern ###

The following is the revealing module pattern. Everything inside it is private, and we decide what to return (expose as public members) with the return. 

Self contained scope: private variables and functions. Executes immediately. Example from [Maciej Baron](http://www.impressivewebs.com/my-current-javascript-design-pattern/#comment-32835):

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

`window.MyObject = window.MyObject || {}` enables to check if the namespace already exists.

Some more notes:

* Save references to HTML elements in your objects, do not use IDs
* Subdivide namespace, one division per file. Must be declared in order, eg: spa -> spa.wb -> spa.wb.render
* Name JS file per namespace provided.
* Use parallel namespaces for CSS files and classes. For example, all classes from elements that belong to a object constructed from Screen() should start with "screen-".


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

* [JavaScript Namespaces and Modules](http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/)
* [Single page apps in depth](http://singlepageappbook.com/single-page.html)
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
















---


OLD NOTES
================================================


Working w/ objects (per Tom, Sept 26)
------------------------------------------------

    window.class = function class(arg1, arg2) {
        this.id = arg1;
        this.arry = []
    }
    class.prototype.method1 = function(name) {
        return this.arry.indexof()
    }
    var something = new window.class(1,2)

And parsing arrays:

    new instance[home,0,Home,,none,dsad]
    var newArray = Array.filter(function(item, index, argumemt) {
        return item.name == argument
    })


Create object instances
------------------------------------------------

    var email = new sheet("email","Email","0","symbol")
    var music = new sheet("music","Music","0","symbol")

