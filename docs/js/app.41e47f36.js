(function(e){function t(t){for(var o,i,c=t[0],r=t[1],u=t[2],f=0,m=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&m.push(s[i][0]),s[i]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);l&&l(t);while(m.length)m.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var r=n[c];0!==s[r]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},s={app:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/haro/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=r;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show_message,expression:"show_message"}],staticClass:"message"},[e._v(e._s(e.message)+" "),n("span",{staticClass:"username"},[e._v(e._s(e.username))])]),n("div",{class:"haro "+e.animation},[n("img",{staticClass:"left",attrs:{src:"images/left.png"}}),n("img",{staticClass:"body",attrs:{src:"images/body.png"}}),n("img",{staticClass:"right",attrs:{src:"images/right.png"}}),n("div",{class:"eyes "+e.eye_animation},[n("div"),n("div")])])])},a=[],i=(n("159b"),n("ac1f"),n("1276"),n("99af"),n("b0c0"),n("a434"),{name:"App",data:function(){return{animation:"idle",eye_animation:"",show_message:!1,message:"",delay:null,follow_state:!1,queue:[],doit:!0,username:""}},mounted:function(){var e=this;this.ws(),setInterval((function(){"blink"!=e.eye_animation?e.eye_animation="blink":e.eye_animation=""}),5e3),setInterval((function(){e.doit&&e.queue.length&&e.check_queue()}),500)},methods:{ws:function(){var e=this;console.log("Connecting to monty WebSocket Server"),this.connection=new WebSocket("ws://localhost:1880/event"),setInterval((function(){3==e.connection.readyState&&(console.log("reloading"),location.reload())}),5e3),this.connection.onmessage=function(t){var n=JSON.parse(t.data);e.queue.push(n),console.log(e.queue)},this.connection.onopen=function(){console.log("Successfully connected to monty websocket server...")}},check_queue:function(){var e=this;e.doit&&e.queue.length&&(console.log(e.queue.length),console.log("entered"),e.show_message=!0,e.queue.forEach((function(t,n){if("first_chat"==t.event&&e.doit){e.doit=!1,e.message="";var o="Haro, haro, wassup",s=o.split("");s.forEach((function(t,n){e.follow_state||setTimeout((function(){e.message="".concat(e.message).concat(t)}),50*n)})),setTimeout((function(){var n=t.name.split("");n.forEach((function(t,n){e.follow_state||setTimeout((function(){e.username="".concat(e.username).concat(t)}),50*n)}))}),50*(s.length-1)),setTimeout((function(){e.queue.splice(n,1),console.log("removed"),e.show_message=!1,e.message="",e.username="",e.doit=!0}),6e3),console.log(t.name)}else if("message"==t.event&&e.doit){e.message="",e.doit=!1;var a=t.message.split("");a.forEach((function(t,n){e.follow_state||setTimeout((function(){e.message="".concat(e.message).concat(t)}),50*n)})),e.delay=setTimeout((function(){e.queue.splice(n,1),e.show_message=!1,e.message="",e.doit=!0}),5e3)}else"follow"==t.event&&e.doit?(e.follow_state=!0,e.message="",setTimeout((function(){e.animation="jump";var n="Thanks for following ".concat(t.user,"!").split("");n.forEach((function(t,n){setTimeout((function(){e.message="".concat(e.message).concat(t)}),50*n)}))}),1e3),setTimeout((function(){e.follow_state=!1,e.animation="idle",e.show_message=!1,e.message="",e.doit=!0}),6e3)):"jump"==t.event&&(e.animation="jump",setTimeout((function(){e.animation="idle"}),6e3));console.log(e.queue),console.log(e.doit)})))}}}),c=i,r=(n("5c0b"),n("2877")),u=Object(r["a"])(c,s,a,!1,null,null,null),l=u.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(l)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.41e47f36.js.map