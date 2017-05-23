// Menu toggle button opens/closes dropdown navigation menu on small displays
// JavaScript and CSS use ARIA attributes for selectors and state change. 
(function() {
  "use strict";
  
  var defaultMenuButton = document.querySelector("#menu-toggle");
  
  if (defaultMenuButton) {
    defaultMenuButton.addEventListener('click', function(e) {
      e.preventDefault();

      toggleDropdownMenu(this);
    });

    document.onload = toggleDropdownMenu(defaultMenuButton);
  }

  function toggleDropdownMenu(button) {
    var ariaExpanded = (button.getAttribute("aria-expanded") == "true");

    if (!ariaExpanded) {
      button.setAttribute("aria-expanded", "true");
      return ;
    } 
    
    button.setAttribute("aria-expanded", "false");
  }
})();