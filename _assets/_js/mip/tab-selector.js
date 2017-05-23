// Check for .tab-selector and assign event listeners to each selector's tablist
// Adapted from https://www.w3.org/TR/wai-aria-practices/examples/tabs/js/tabs.js
window.mip = window.mip || {};
var mip = window.mip;

(function($) {
  "use strict";

  var keys = {
    end:   35,
    home:  36,
    left:  37,
    up:    38,
    right: 39,
    down:  40
  };

  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  $.nodelistToArray = function(nodelist) {
    var array = [];

    for (var i = nodelist.length; i--; array.unshift(nodelist[i]));

    return array;
  }

  // On page load, find and initialize tab selectors
  window.onload = function() {
    var selectors = document.querySelectorAll('.tab-selector');

    // Check for selector's child ARIA roles tablist, tabs and tabpanel
    if (selectors.length > 0) {
      $.forEach(selectors, function(selector, i) {
        initializeTabSelector(selector);
      });
    }  
  }();

  // Toggle attribute values on Nodelist based on a callback value()
  function setNodelistAttributes(nodelist, attr, value) {
    $.forEach(nodelist, function(node, i) {
      node.setAttribute(attr, value(node));
    });
  }

  // Initialize tab selector
  // Parse selector tree for tablist, tabs and tabpanels
  // Assign event listeners to all tabs
  // Open first tab on initialize
  function initializeTabSelector(selector) {
    var tablist = selector.querySelector('[role="tablist"]');
    var tabs    = selector.querySelectorAll('[role="tab"]');
    var panels  = selector.querySelectorAll('[role="tabpanel"]');

    // Convert nodelists to arrays
    tabs   = $.nodelistToArray(tabs);
    panels = $.nodelistToArray(panels);

    // Opens selected tab and panel; closes others
    // Requires tabs, panels be set in outer function
    function activateTab(tab, setFocus) {
      var setFocus = (setFocus);
      
      var panel = panels.filter(function(p, i) {
        return p.getAttribute("id") == tab.getAttribute("aria-controls");
      })[0];

      // Current tab is aria-selected
      setNodelistAttributes(tabs, "aria-selected", function(node) {
        return (tab === node).toString();
      });

      // Update tabindex
      setNodelistAttributes(tabs, "tabindex", function(node) {
        return (tab === node) ? "0" : "-1";
      });

      // Show/hide panels
      setNodelistAttributes(panels, "aria-hidden", function(node) {
        return (panel !== node).toString();
      });
      
      if (setFocus) {
        tab.focus();
      }
    }

    function clickEventListener(e) {
      e.preventDefault();
      activateTab(e.target, false);
    }

    function keydownEventListener(e) {
      var key = e.keyCode;

      switch(key) {
        // Jump to last tab
        case keys.end:
          e.preventDefault();
          activateTab(tabs[tabs.length - 1]);
          break;
        
        // Jump to first tab
        case keys.home:
          e.preventDefault();
          activateTab(tabs[0]);
          break;

        // Up, down in keydownEventListener
        case keys.up:
        case keys.down:
          tablistOrientation(event);
          break;
      }
    }

    function keyupEventListener(e) {
      var key = e.keyCode;

      switch(key) {
        case keys.left:
        case keys.right:
          tablistOrientation(e);
          break;
      }
    }

    // Determines whether to proceed to another tab based on arrow key press and
    // tablist orientation (default is horizontal)
    function tablistOrientation(e) {
      var key = e.keyCode;
      var vertical = tablist.getAttribute("aria-orientation") == "vertical";
      var proceed = false;

      if (vertical) {
        if (key === keys.up || key === keys.down) {
          e.preventDefault();
          proceed = true;
        }
      } else {
        if (key === keys.left || key === keys.right) {
          proceed = true;
        }
      }

      if (proceed) {
        switchTabOnArrowPress(e);
      }
    }

    function switchTabOnArrowPress(e) {
      var pressed = e.keyCode;
      var currentTabIndex = tabs.indexOf(e.target);

      tabs.forEach(function(t) {
        t.addEventListener("focus", focusEventDelay);
      });

      if (direction[pressed]) {
        if (currentTabIndex !== undefined) {
          var nextTab = tabs[currentTabIndex + direction[pressed]];
          
          if (nextTab) {
            nextTab.focus();
          } else if (pressed === keys.left || pressed === keys.up) {
            tabs[tabs.length - 1].focus();
          } else if (pressed === keys.right || pressed == keys.down) {
            tabs[0].focus();
          }
        }
      }
    }

    // 300ms delay between keyboard-activated tab focus and panel changing
    function focusEventDelay(e) {
      setTimeout(function(target) {
        if (target === document.activeElement) {
          activateTab(target, false);
        }
      }, 300, e.target);
    }
    
    // Open first tab
    activateTab(tabs[0], false);

    // Add listeners to tabs
    tabs.forEach(function(t) {
      t.addEventListener("click", clickEventListener, false);
      t.addEventListener("keydown", keydownEventListener, false);
      t.addEventListener("keyup", keyupEventListener, false);
    });
  }
})(mip);