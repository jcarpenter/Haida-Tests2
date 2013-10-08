/*!
* Pub/Sub implementation
* http://addyosmani.com/
* Licensed under the GPL
* http://jsfiddle.net/LxPrq/
*/(function(e,t,n){var r={},i=-1,s={};s.publish=function(e,t){if(!r[e])return!1;setTimeout(function(){var n=r[e],i=n?n.length:0;while(i--)n[i].func(e,t)},0);return!0};s.subscribe=function(e,t){r[e]||(r[e]=[]);var n=(++i).toString();r[e].push({token:n,func:t});return n};s.unsubscribe=function(e){for(var t in r)if(r[t])for(var n=0,i=r[t].length;n<i;n++)if(r[t][n].token===e){r[t].splice(n,1);return e}return!1};getPubSubz=function(){return s};e.pubsubz=getPubSubz()})(this,this.document);