window.mip = window.mip || {};
var mip = window.mip;

// Utility functions scoped to window.mip
(function($) {
  "use strict";

  // IE11-compatible forEach
  $.forEach = function(nodelist, callback) {
    Array.prototype.forEach.call(nodelist, function(node, i) {
      callback(node, i);
    });
  };

  // IE11-compatible filter
  $.filter = function(nodelist, test) {
    return Array.prototype.filter.call(nodelist, function(node, i) {
      return test(node, i);
    });
  };
  
  // Check if element has class
  // Returns boolean
  $.hasClass = function(el, className) {
    return (el.classList) 
      ? el.classList.contains(className)
      : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  };

  // Add class to element
  $.addClass = function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

  // Remove class from element
  $.removeClass = function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  // Check if element has class; then add/remove it
  $.toggleClass = function(el, className) {
    if ($.hasClass(el, className)) {
      $.removeClass(el, className);
    } else {
      $.addClass(el, className);
    }
  };
})(mip);