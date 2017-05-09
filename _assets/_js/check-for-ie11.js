// Checks for Internet Explorer 11. If true, adds "ie11" class to <body>
// This used to work around an IE11 flexbox bug where flex-basis ignores box-sizing
(function() {
  "use strict";
  
  window.onload = function() {
    if (getIEVersion() == 11) {
      var html = document.querySelector('html');
      html.classList.add('ie11');
    }
  }();

  function getIEVersion() {
    var sAgent = window.navigator.userAgent;
    var idx = sAgent.indexOf("MSIE");

    if (idx > 0) {
      return parseInt(sAgent.substring(idx+ 5, sAgent.indexOf(".", idx)));
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
      return 11;
    } else {
      return 0;
    }
  }
})();