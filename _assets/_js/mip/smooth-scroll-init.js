window.mip = window.mip || {};
var mip = window.mip;
var smoothScroll = require('smooth-scroll');

(function($) {
  // Remove html root's 'no-js' class
  var html = document.querySelector('html');
  $.removeClass(html, 'no-js');
  
  // Initialize smooth scrolling
  smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: null,
    speed: 500,
    easing: 'easeInOutCubic',
    offset: 0,
    callback: function ( anchor, toggle ) {}
  });
})(mip);