---
permalink: /projects/the-cost-of-education/map-hamilton-county-school-spending/map.js
---

  (function() {
  "use strict";

  var
  container = document.querySelector("#container"),
  map       = document.querySelector("#map"),
  sliders   = document.querySelector("#sliders"),
  mobile    = +(container.offsetWidth <= 414),
  data
  
  ;

  window.onresize = function() {
    draw();
  }

  function draw(mapWidth) {
    var margin  = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: function() { return this.right + this.left; },
      height: function() { return this.top + this.bottom; }
    };

    var ratio  = { width: 1, height: 1.05 };

    var width  = function() {
      if (!mapWidth) {
        var mapWidth = +map.offsetWidth;
      }

      return mapWidth - margin.width();
    }();

    var height = function() {
      var f = ratio.height / ratio.width;

      return Math.round(width * f - margin.height());
    }();

    // Map setup
    // ---------------------------------------------------------------------------
    map.innerHTML = "";

    var zones = {
      high:       topojson.feature(data, data.objects.high),
      middle:     topojson.feature(data, data.objects.middle),
      elementary: topojson.feature(data, data.objects.elementary)
    };

    var color = d3.scale.ordinal()
      .range(['rgb(236,231,242)','rgb(166,189,219)','rgb(54,144,192)','rgb(4,90,141)','rgb(8,68,89)'])
      .domain([1,2,3,4,5]);

    var projection = d3.geo.mercator()
      .center(d3.geo.centroid(zones.elementary))
      .translate([width / 2, height / 2])
      .scale(width * 100)
      .rotate([-.3, -.5])
      ;

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select(map).append("svg")
        .attr("width", width + margin.width())
        .attr("height", height + margin.height())
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var schools = svg.selectAll("g.school")
        .data(zones.elementary.features)
      .enter().append("g")
        .attr("class", "school");

    // Call default attributes on pageload
    schools.append("path").call(pathAttr);
    schools.append("circle").call(circleAttr);

    // g.school path attributes
    function pathAttr(d) {
      d.attr("d", path)
        .attr("fill", function(d) { return color(d.properties.quantile); })
        .attr("fill-opacity", 1)
        .attr("stroke", "white")
        .attr("stroke-width", "1px")
        .call(tooltip)
        .call(modal);
    }

    // g.school circle attributes
    function circleAttr(d) {
      d.attr("class", "location")
        .attr("cx", function(d) { return point(d).x; })
        .attr("cy", function(d) { return point(d).y; })
        .attr("r", 2)
        .attr("fill", "#252525");
    }

    // Returns x, y positions from object's long/lat
    function point(d) {
      var point = projection([d.properties.longitude, d.properties.latitude]);

      return { x: point[0], y: point[1] }
    }

    // Tooltip
    // ---------------------------------------------------------------------------
    function tooltip(d) {
      d.on("mousemove", function(d) {
        var tooltip = d3.select("#tooltip").classed("hidden", false);

        tooltip.attr("pointer-events", "none")
          .style("left", d3.event.pageX + 15 + "px")
          .style("top",  d3.event.pageY - 15 + "px");

        tooltip.html(d.properties.school);

        // wider border
        d3.select(this).attr("stroke-width", "2px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("stroke-width", "1px"); // Resets border size
        d3.select("#tooltip").classed("hidden", true);
      });
    }

    // Modal window
    // ---------------------------------------------------------------------------
    function modal(d) {
      var
      modal = d3.select("#modal"),
      close = modal.selectAll(".close")
      ;

      // Event opens modal
      d.on("click", function(d) {
        openModal(map);
        modalTable(d.properties);

        if (!mobile) {
          modalChart(d.properties);
        }

      });

      // Event closes modal
      close.on("click", function() {
        d3.event.stopPropagation();
        d3.event.preventDefault();
        closeModal();
      });

      // Closes modal window
      function closeModal() {
        if (!modal.classed("hidden")) {
          modal.classed("hidden", true);
          modal.selectAll(".chart").remove();
        }
      }

      function openModal(container) {
        d3.event.stopPropagation();
        d3.event.preventDefault()
        closeModal();

        modal.classed("hidden", false).style({
          left:  container.offsetLeft + "px",
          top:   container.offsetTop + "px",
          width: container.offsetWidth + "px"
        });
      }

      function modalTable(d) {
        var table = modal.select("table");
        var cells = table.selectAll("tr td:last-child");

        table.select("caption").html(d.school);

        cells[0].forEach(function(td) {
          var
          html,
          selection = d3.select(td);
          
          switch(selection.attr("class")) {
            case "minority":
            case "poverty":
            case "special":
            case "ell":
              html = d3.format("%.0f")(d[selection.attr("class")]);
              break;
            case "funding":
              html = d3.format("$,.0f")(d[selection.attr("class")]);
              break;
            default:
              html = d[selection.attr("class")];
          }

          selection.html(html);
        })
      }

      function modalChart(d) {
        var grades = [
          { name: "Elementary", value: 7095 },
          { name: "Middle", value: 7198 },
          { name: "High", value: 6557 }
        ];

        var data = [
          { name: d.school, value: d.funding },
          { name: "Hamilton County average", value: 7234 }
        ];

        grades.forEach(function(grade) {
          if (grade.name == d.type) {
            grade.name += " school average";
            data.push(grade);
          }
        });

        // Add div here to determine svg container width
        var chart = modal.append("div").attr("class", "chart");
        chart.html("Average spending per student");

        // Dimensions
        margin.top = 16; margin.bottom = 32; margin.left = 160; margin.right = 0;

        var width  = +document.querySelector(".chart").offsetWidth - margin.width();
        var height = 90;

        // Scales, axis
        var x = d3.scale.linear()
          .domain([0, 12000])
          .range([0, width]);

        var y = d3.scale.ordinal()
          .domain(data.map(function(d) { return d.name; }))
          .rangeRoundBands([0, height], 0.2);

        var axis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.format("$,"))
          .tickSize(-height, 0, 0)
          .tickValues([6000,8000,10000]);

        // Chart
        var svg = d3.select("div.chart").append("svg")
          .attr("width", width + margin.width())
          .attr("height", height + margin.height())
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g").attr("class", "axis")
          .call(axis)
          .attr("transform", "translate(0," + height + ")");

        var bars = svg.selectAll("g.bar")
            .data(data)
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
              return "translate(0," + y(d.name) + ")";
            });

        bars.append("rect")
          .attr("x", x(0))
          .attr("y", 0)
          .attr("height", y.rangeBand())
          .attr("width", function(d) { return x(d.value); })
          .attr("fill", color.range()[2]);

        bars.append("text")
          .attr("x", 0)
          .text(function(d) { return d.name; });

        bars.append("text")
          .attr("x", function(d) { return x(d.value); })
          .attr("fill", "white")
          .text(function(d) { return d3.format("$,.0f")(d.value); })

        bars.selectAll("text")
          .attr("y", y.rangeBand() / 2)
          .attr("dx", -5);
      }
    } // End of modal()
    
    // Legend
    // ---------------------------------------------------------------------------
    var legend = function(width, data) {
      var height = 36;
      
      var scale = d3.scale.ordinal()
        .domain(data)
        .rangeRoundBands([0, width]);

      var legend = svg.append("g")
        .attr("id", "legend")
        .attr("height", height)
        .attr("width", width)
        .attr("transform", "translate(8,20)");

      // Legend label centered on desktop
      legend.append("text")
        .attr("x", (mobile) ? 0 : width / 2)
        .attr("text-anchor", (mobile) ? "start" : "middle")
        .text("Per-student spending");

      var keys = legend.selectAll("g.key")
          .data(data)
        .enter().append("g")
          .attr("class", "key")
          .attr("transform", "translate(0,8)");

      keys.append("rect")
        .attr("fill", function(d) { return d; })
        .attr("x", function(d) { return scale(d); })
        .attr("y", 16)
        .attr("width", scale.rangeBand())
        .attr("height", 10);

      keys.append("text")
        .attr("x", function(d) { return scale(d) + scale.rangeBand() / 2; })
        .attr("y", 12)
        .text(function(d,i) {
          switch(i) {
          case 0:  return (mobile) ? "–10%" : "<–10%";
          case 2:  return (mobile) ? "Avg" : "Average";
          case 4:  return (mobile) ? "+10%" : ">+10%";
          default: return "";  
          }
        });
    }(width * .33, color.range());

    // Input control
    // ---------------------------------------------------------------------------
    // Check for IE
    // http://jsfiddle.net/jquerybyexample/gk7xA/
    function isIE() {
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

    // Listen for "change" events in IE, otherwise listen for "input" events
    if (isIE()) {
      d3.select(sliders).selectAll("input").on("change", filter);  
    } else {
      d3.select(sliders).selectAll("input").on("input", filter);  
    }
    
    function filter() {
      // Range input settings
      var
      grade     = +(d3.select("#sliders #grade    input")[0][0].value),
      funding   = +(d3.select("#sliders #funding  input")[0][0].value),
      minority  = +(d3.select("#sliders #minority input")[0][0].value),
      poverty   = +(d3.select("#sliders #poverty  input")[0][0].value),
      district  = +(d3.select("#sliders #district input")[0][0].value)
      ;

      grade = ["elementary","middle","high"][grade - 1];

      // Update grade data
      var schools = svg.selectAll("g.school")
        .data(zones[grade].features);

      // Remove unused svg elements
      schools.exit().remove();
      schools.select("path").remove();
      schools.select("circle").remove();

      // Add new svg groups
      schools.enter().append("g").attr("class", "school");
      
      // Append path to group
      schools.append("path")
        // Call default attributes
        .call(pathAttr)
        // Adjust fill-opacity, stroke via range input values
        .attr("fill-opacity", function(d) {
          var
          props   = d.properties,
          mute    = 0.3,
          full    = 1,
          opacity
          ;

          switch (true) {
            case (props.funding  <= funding):
            case (props.minority <= minority):
            case (props.poverty  <= poverty):
              opacity = mute;
              break;
            default:
              opacity = full;
          }

          if (district != 0 && props.district != district) {
            opacity = mute;
          }

          return opacity;
        })
        .attr("stroke", function(d) {
          if (district == 0) { return "white"; }
          if (d.properties.district == district) { return "#6d6e70"; }
        });
      
      // Append circle to group with default attributes
      schools.append("circle").call(circleAttr);

      // Update label outputs
      d3.select("#grade-output").html(grade);
      d3.select("#funding-output").html(d3.format("$,")(funding));
      d3.select("#minority-output").html(d3.format("%.01f")(minority));
      d3.select("#poverty-output").html(d3.format("%.01f")(poverty));
      d3.select("#district-output").html(function() {
        return [
          "Countywide",
          "In the 1st District",
          "In the 2nd District",
          "In the 3rd District",
          "In the 4th District",
          "In the 5th District",
          "In the 6th District",
          "In the 7th District",
          "In the 8th District",
          "In the 9th District"
        ][district];
      });
    }    
  } // End of draw()

  // Load and map geo/topojson data
  // ---------------------------------------------------------------------------
  d3.json("school-zones.topo.json", function(error, geo) {
    if (error) throw error;

    data = geo;

    d3.csv("data.csv", type, function(error, csv) {
      if (error) throw error;

      for (var grade in data.objects) {
        var schools = data.objects[grade].geometries;

        // To do: Refactor
        schools.forEach(function(school) {
          csv.forEach(function(row) {
            if (school.properties.geoid == row.geoid) {
              return school.properties = {
                school:    row.school,
                longitude: row.longitude,
                latitude:  row.latitude,
                funding:   row.spending,
                minority:  row.minority,
                poverty:   row.economic_disadvantage,
                district:  row.district,
                quantile:  row.quantile,
                grades:    row.grades,
                adm:       row.adm,
                special:   row.special_education,
                ell:       row.ell,
                type:      row.type
              };
            }
          })
        })
      }

      new pym.Child({ renderCallback: draw });
    });
  });

  function type(d) {
    for (var key in d) {
      if (+d[key]) {
        d[key] = +d[key];
      } else {
        d[key] = d[key];
      }
    }

    return d;
  }

})();