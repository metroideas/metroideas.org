// main.js bundle includes sitewide JavaScript files
module.exports = function() {
  require('./mip/utilities.js');
  require('./mip/card-events.js');
  require('./mip/check-for-ie11.js');
  require('./mip/load-picturefill.js');
  require('./mip/smooth-scroll-init.js');
  require('./mip/navbar-toggle.js');
  require('./mip/tab-selector.js');
}();