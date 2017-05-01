---
permalink: "/projects/the-cost-of-education/brief/js/district-lookup.js"
---

(function() {
  "use strict";

  var form   = document.querySelector("form#lookup-address");
  var select = document.querySelector("select#district-selection");

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var input = document.querySelector("input#address");

    if (input.value) {
      gapi.client.setApiKey('AIzaSyAJZ-VYDjSjXn-tCI6KLCCGJfbnPDLy8xM');
      lookup(input.value, countyDistrict);
    } else {
      formMessage('Please enter your street address and city.');
    }
  });

  select.addEventListener('change', function(e) {
    e.preventDefault();

    if (this.value) {
      window.location.href = baseurl + this.value + '/';
    };
  })

  function lookup(address, callback) {
    var req = gapi.client.request({
        'path' : '/civicinfo/v2/representatives',
        'params' : {'includeOffices' : false, 'address' : address}
    });
   req.execute(callback);
  }

  function formMessage(message) {
    var el = document.getElementById('form-error');

    el.innerHTML = "";

    el.appendChild(document.createTextNode(message));
  }

  function countyDistrict(response, rawResponse) {
    var
    district,
    hamilton          = false,
    message           = document.getElementById('form-error'),
    normalizedAddress = response.normalizedInput.line1 + ' ' +
        response.normalizedInput.city + ', ' +
        response.normalizedInput.state + ' ' +
        response.normalizedInput.zip
    ;

    // Clear messages
    message.innerHTML = "";

    if (!response || response.error) {
      formMessage('There was an error looking up your county district. Please try again later.');
      return ;
    }

    for (var division in response.divisions) {
      switch(division) {
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:1": district = '1/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:2": district = '2/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:3": district = '3/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:4": district = '4/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:5": district = '5/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:6": district = '6/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:7": district = '7/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:8": district = '8/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton/council_district:9": district = '9/'; break;
        case "ocd-division/country:us/state:tn/county:hamilton":                    hamilton = true; break;
        default: break;
      }
      
      if (district) break;
    }

    if (district) {
      window.location.href = baseurl + district; // Open district profile
    } else if (hamilton) {
      formMessage("Our apologies. We cannot determine which Hamilton County district '" + 
        normalizedAddress + "' is located in.");
      return ;
    } else {
      formMessage("Please enter the street address and city where you're registered to vote in Hamilton County, Tennessee.");
      return ;
    }
  }
})();