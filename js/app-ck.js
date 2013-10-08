"use strict";var App=App||{};App.createNS=function(e){var t=e.split("."),n=App;t[0]==="App"&&(t=t.slice(1));for(var r=0;r<t.length;r++){var i=t[r];typeof n[i]=="undefined"&&(n[i]={});n=n[i]}return n};(function(e,t){e.init=function(){}})(App);App.createNS("ScreenManager");App.ScreenManager=function(){var e,t,n,r=document.getElementById("bottom-swipe"),i=document.getElementById("topleft-swipe"),s=document.getElementById("topright-swipe"),o=document.getElementById("status-bar"),u=document.getElementById("rocketbar-drawer"),a=document.getElementById("settings-drawer"),f=document.getElementById("keyboard");r.addEventListener("click",function(){t?pubsubz.publish("close_topdrawer1"):n?pubsubz.publish("close_topdrawer2"):pubsubz.publish("open_bottomdrawer")});i.addEventListener("click",function(){t||n||pubsubz.publish("open_topdrawer1")});s.addEventListener("click",function(){t||n||pubsubz.publish("open_topdrawer2")});var l=function(t){e=t;console.log("The active screen is now: "+e)},c=function(){console.log("opened: home")},h=function(){$(f).animo({animation:"showKeyboard",duration:.2,timing:"ease-out",keep:"true"})},p=function(){$(f).animo({animation:"hideKeyboard",duration:.2,timing:"ease-out",keep:"true"})},d=function(){h();$(o).animo({animation:"openFullRocketBar",duration:.2,timing:"ease-out",keep:"true"});$(u).children("#cursor").animo({animation:"blinking",duration:1,timing:"ease-out",iterate:"infinite"});$(u).children("#background").animo({animation:"darkenBG",duration:.3,timing:"ease-out",keep:"true"});u.classList.toggle("hidden");t=!0},v=function(){p();$(o).animo({animation:"closeFullRocketBar",duration:.2,timing:"ease-out"});$(u).animo({animation:"fadeOut",duration:.2,timing:"ease-out",keep:"true"},function(){$(u).animo("cleanse");$(u).children().animo("cleanse");u.classList.toggle("hidden");t=!1})},m=function(){$(a).animo({animation:"darkenBG",duration:.3,timing:"ease-out",keep:"true"});$(a).children("img").animo({animation:"slideInDown",duration:.3,timing:"ease-out",keep:"true"});a.classList.toggle("hidden");n=!0},g=function(){$(a).animo({animation:"lightenBG",duration:.3,timing:"ease-out",keep:"true"});$(a).children("img").animo({animation:"slideOutUp",duration:.3,timing:"ease-out"},function(){$(a).animo("cleanse");$(a).children("img").animo("cleanse");a.classList.toggle("hidden");n=!1})},y=function(){u.classList.toggle("hidden");a.classList.toggle("hidden")},b=pubsubz.subscribe("init",y),w=pubsubz.subscribe("open_bottomdrawer",c),E=pubsubz.subscribe("open_topdrawer1",d),S=pubsubz.subscribe("close_topdrawer1",v),x=pubsubz.subscribe("open_topdrawer2",m),T=pubsubz.subscribe("close_topdrawer2",g);return{}}();App.createNS("Home");App.Home=function(){var e=function(){$.getJSON("js/preloads.json",function(e){$.each(e.preloads,function(e,t){console.log(t.name);var n=$("#appIcon").html(),r=Handlebars.compile(n),i=r(t);$(home).append(i)})})},t=pubsubz.subscribe("init",e)}();App.createNS("HistoryManager");App.HistoryManager=function(){var e=[],t=[],n=function(){console.log(e.length);console.log(t.length)};return{update_count:n}}();App.HistoryManager.update_count();pubsubz.publish("init");