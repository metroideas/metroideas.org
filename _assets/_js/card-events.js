window.mip = window.mip || {};
var mip = window.mip;
// Card, project card actions
(function($) {
  "use strict";

  var cards = document.querySelectorAll('.card');
  var projects = document.querySelectorAll('.project-card, .project-card-featured');
  
  // On card click, find child anchor and open link
  if (cards.length > 0) {
    $.forEach(cards, function(card, i) {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        var href = this.querySelector('a').getAttribute('href');
        location.href = href;
      }, false);
    });  
  }
  
  // On .project-card > .button:hover, toggle .active on parent
  if (projects.length > 0) {
    $.forEach(projects, function(project, i) {
      var button = project.querySelector('.button');

      ['mouseenter', 'mouseout'].forEach(function(hover) {
        button.addEventListener(hover, function(e) {
          $.toggleClass(project, 'active');
        }, false);
      });

      // Remove project card's active class on button click
      button.addEventListener('click', function(e) {
        $.toggleClass(project, 'active');
      }, false);
    });  
  }
})(mip);
