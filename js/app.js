!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=(n(1),n(2),n(3),n(4),n(5),n(8),void n(9))},function(e,t){window.mip=window.mip||{},function(e){"use strict";e.forEach=function(e,t){Array.prototype.forEach.call(e,function(e,n){t(e,n)})},e.filter=function(e,t){return Array.prototype.filter.call(e,function(e,n){return t(e,n)})},e.hasClass=function(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},e.addClass=function(e,t){e.classList?e.classList.add(t):e.className+=" "+t},e.removeClass=function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},e.toggleClass=function(t,n){e.hasClass(t,n)?e.removeClass(t,n):e.addClass(t,n)}}(window.mip)},function(e,t){window.mip=window.mip||{},function(e){"use strict";var t=document.querySelectorAll(".card"),n=document.querySelectorAll(".project-card, .project-card-featured");t.length>0&&e.forEach(t,function(e,t){e.addEventListener("click",function(e){e.preventDefault();var t=this.querySelector("a").getAttribute("href");location.href=t},!1)}),n.length>0&&e.forEach(n,function(t,n){var o=t.querySelector(".button");["mouseenter","mouseout"].forEach(function(n){o.addEventListener(n,function(n){e.toggleClass(t,"active")},!1)}),o.addEventListener("click",function(n){e.toggleClass(t,"active")},!1)})}(window.mip)},function(e,t){!function(){"use strict";var e,t;window.onload=void(11==(e=window.navigator.userAgent,(t=e.indexOf("MSIE"))>0?parseInt(e.substring(t+5,e.indexOf(".",t))):navigator.userAgent.match(/Trident\/7\./)?11:0)&&document.querySelector("html").classList.add("ie11"))}()},function(e,t){!function(){"use strict";window.onload=function(){!function(){var e=document.createElement("img");if(!("srcset"in e&&"sizes"in e)){var t=document.createElement("script");t.type="text/javascript",t.src="//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js",t.setAttribute("async","");var n=document.getElementsByTagName("head")[0];n.appendChild(t)}}()}}()},function(e,t,n){window.mip=window.mip||{};var o,r,i=window.mip,a=n(6);o=i,r=document.querySelector("html"),o.removeClass(r,"no-js"),new a('a[href*="#"]',{ignore:"[data-scroll-ignore]",header:null,speed:500,offset:0,easing:"easeInOutCubic",customEasing:function(e){},before:function(){},after:function(){}})},function(e,t,n){(function(n){var o,r;/*! smooth-scroll v16.0.3 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)}(),function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var o=(new Date).getTime(),r=Math.max(0,16-(o-e)),i=window.setTimeout(function(){t(o+r)},r);return e=o+r,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),r=void 0!==n?n:"undefined"!=typeof window?window:this,void 0===(o=function(){return function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){var e={};return Array.prototype.forEach.call(arguments,function(t){for(var n in t){if(!t.hasOwnProperty(n))return;e[n]=t[n]}}),e},o=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,r=-1,i="",a=n.charCodeAt(0);++r<o;){if(0===(t=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");i+=1<=t&&t<=31||127==t||0===r&&48<=t&&t<=57||1===r&&48<=t&&t<=57&&45===a?"\\"+t.toString(16)+" ":128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(r):"\\"+n.charAt(r)}return"#"+i},r=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},i=function(t,n,o,r){if(n.emitEvents&&"function"==typeof e.CustomEvent){var i=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:r}});document.dispatchEvent(i)}};return function(a,c){var u,s,l,d,f={cancelScroll:function(e){cancelAnimationFrame(d),d=null,e||i("scrollCancel",u)},animateScroll:function(o,a,c){f.cancelScroll();var s=n(u||t,c||{}),m="[object Number]"===Object.prototype.toString.call(o),p=m||!o.tagName?null:o;if(m||p){var h=e.pageYOffset;s.header&&!l&&(l=document.querySelector(s.header));var v,g,w,y,b,E,S,A,C=function(t){return t?(n=t,parseInt(e.getComputedStyle(n).height,10)+t.offsetTop):0;var n}(l),O=m?o:function(t,n,o,i){var a=0;if(t.offsetParent)for(;a+=t.offsetTop,t=t.offsetParent;);return a=Math.max(a-n-o,0),i&&(a=Math.min(a,r()-e.innerHeight)),a}(p,C,parseInt("function"==typeof s.offset?s.offset(o,a):s.offset,10),s.clip),q=O-h,x=r(),L=0,M=(v=q,w=(g=s).speedAsDuration?g.speed:Math.abs(v/1e3*g.speed),g.durationMax&&w>g.durationMax?g.durationMax:g.durationMin&&w<g.durationMin?g.durationMin:parseInt(w,10)),j=function(t){var n,r,c;y||(y=t),L+=t-y,E=h+q*(r=b=1<(b=0===M?0:L/M)?1:b,"easeInQuad"===(n=s).easing&&(c=r*r),"easeOutQuad"===n.easing&&(c=r*(2-r)),"easeInOutQuad"===n.easing&&(c=r<.5?2*r*r:(4-2*r)*r-1),"easeInCubic"===n.easing&&(c=r*r*r),"easeOutCubic"===n.easing&&(c=--r*r*r+1),"easeInOutCubic"===n.easing&&(c=r<.5?4*r*r*r:(r-1)*(2*r-2)*(2*r-2)+1),"easeInQuart"===n.easing&&(c=r*r*r*r),"easeOutQuart"===n.easing&&(c=1- --r*r*r*r),"easeInOutQuart"===n.easing&&(c=r<.5?8*r*r*r*r:1-8*--r*r*r*r),"easeInQuint"===n.easing&&(c=r*r*r*r*r),"easeOutQuint"===n.easing&&(c=1+--r*r*r*r*r),"easeInOutQuint"===n.easing&&(c=r<.5?16*r*r*r*r*r:1+16*--r*r*r*r*r),n.customEasing&&(c=n.customEasing(r)),c||r),e.scrollTo(0,Math.floor(E)),function(t,n){var r,c,u,l=e.pageYOffset;if(t==n||l==n||(h<n&&e.innerHeight+l)>=x)return f.cancelScroll(!0),c=n,u=m,0===(r=o)&&document.body.focus(),u||(r.focus(),document.activeElement!==r&&(r.setAttribute("tabindex","-1"),r.focus(),r.style.outline="none"),e.scrollTo(0,c)),i("scrollStop",s,o,a),!(d=y=null)}(E,O)||(d=e.requestAnimationFrame(j),y=t)};0===e.pageYOffset&&e.scrollTo(0,0),S=o,A=s,m||history.pushState&&A.updateURL&&history.pushState({smoothScroll:JSON.stringify(A),anchor:S.id},document.title,S===document.documentElement?"#top":"#"+S.id),i("scrollStart",s,o,a),f.cancelScroll(!0),e.requestAnimationFrame(j)}}},m=function(t){if(!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)&&!t.defaultPrevented&&!(0!==t.button||t.metaKey||t.ctrlKey||t.shiftKey)&&"closest"in t.target&&(s=t.target.closest(a))&&"a"===s.tagName.toLowerCase()&&!t.target.closest(u.ignore)&&s.hostname===e.location.hostname&&s.pathname===e.location.pathname&&/#/.test(s.href)){var n,r=o(s.hash);if("#"===r){if(!u.topOnEmptyHash)return;n=document.documentElement}else n=document.querySelector(r);(n=n||"#top"!==r?n:document.documentElement)&&(t.preventDefault(),function(t){if(history.replaceState&&t.updateURL&&!history.state){var n=e.location.hash;n=n||"",history.replaceState({smoothScroll:JSON.stringify(t),anchor:n||e.pageYOffset},document.title,n||e.location.href)}}(u),f.animateScroll(n,s))}},p=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(u)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(o(history.state.anchor)))||f.animateScroll(t,null,{updateURL:!1})}};return f.destroy=function(){u&&(document.removeEventListener("click",m,!1),e.removeEventListener("popstate",p,!1),f.cancelScroll(),d=l=s=u=null)},function(){if(!("querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";f.destroy(),u=n(t,c||{}),l=u.header?document.querySelector(u.header):null,document.addEventListener("click",m,!1),u.updateURL&&u.popstate&&e.addEventListener("popstate",p,!1)}(),f}}(r)}.apply(t,[]))||(e.exports=o)}).call(this,n(7))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){!function(){"use strict";var e=document.querySelector("#menu-toggle");function t(e){"true"==e.getAttribute("aria-expanded")?e.setAttribute("aria-expanded","false"):e.setAttribute("aria-expanded","true")}e&&(e.addEventListener("click",function(e){e.preventDefault(),t(this)}),document.onload=t(e))}()},function(e,t){window.mip=window.mip||{},function(e){"use strict";var t,n={end:35,home:36,left:37,up:38,right:39,down:40},o={37:-1,38:-1,39:1,40:1};function r(t,n,o){e.forEach(t,function(e,t){e.setAttribute(n,o(e))})}e.nodelistToArray=function(e){for(var t=[],n=e.length;n--;t.unshift(e[n]));return t},window.onload=void((t=document.querySelectorAll(".tab-selector")).length>0&&e.forEach(t,function(t,i){!function(t){var i=t.querySelector('[role="tablist"]'),a=t.querySelectorAll('[role="tab"]'),c=t.querySelectorAll('[role="tabpanel"]');function u(e,t){var t=t,n=c.filter(function(t,n){return t.getAttribute("id")==e.getAttribute("aria-controls")})[0];r(a,"aria-selected",function(t){return(e===t).toString()}),r(a,"tabindex",function(t){return e===t?"0":"-1"}),r(c,"aria-hidden",function(e){return(n!==e).toString()}),t&&e.focus()}function s(e){e.preventDefault(),u(e.target,!1)}function l(e){var t=e.keyCode;switch(t){case n.end:e.preventDefault(),u(a[a.length-1]);break;case n.home:e.preventDefault(),u(a[0]);break;case n.up:case n.down:f(event)}}function d(e){var t=e.keyCode;switch(t){case n.left:case n.right:f(e)}}function f(e){var t=e.keyCode,r="vertical"==i.getAttribute("aria-orientation"),c=!1;r?t!==n.up&&t!==n.down||(e.preventDefault(),c=!0):t!==n.left&&t!==n.right||(c=!0),c&&function(e){var t=e.keyCode,r=a.indexOf(e.target);if(a.forEach(function(e){e.addEventListener("focus",m)}),o[t]&&void 0!==r){var i=a[r+o[t]];i?i.focus():t===n.left||t===n.up?a[a.length-1].focus():t!==n.right&&t!=n.down||a[0].focus()}}(e)}function m(e){setTimeout(function(e){e===document.activeElement&&u(e,!1)},300,e.target)}a=e.nodelistToArray(a),c=e.nodelistToArray(c),u(a[0],!1),a.forEach(function(e){e.addEventListener("click",s,!1),e.addEventListener("keydown",l,!1),e.addEventListener("keyup",d,!1)})}(t)}))}(window.mip)}]);
//# sourceMappingURL=app.js.map