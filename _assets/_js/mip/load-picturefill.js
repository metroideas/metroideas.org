// Checks for picture and srcset support; loads picturefill when needed
// Via https://www.perpetual-beta.org/weblog/conditional-loading.html
(function() {
  "use strict";
  
  window.onload = function() {
    // call the method
    polyfillImages();
  }

  function polyfillImages() {
    // create an image node so we can test its properties
    var img = document.createElement('img');
    // feature detect
    var supportSrcset = ('srcset' in img) && ('sizes' in img);
    if (!supportSrcset) {
      // feature not available:
      // create a script tag
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js';
      script.setAttribute('async', '')
      // add it to the document <head>...
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
    }
  }
})();
