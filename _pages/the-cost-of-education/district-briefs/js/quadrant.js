---
permalink: /projects/the-cost-of-education/brief/js/quadrant.js
---

(function(district) {
  "use strict";

  var
  data,
  url  = "../data/" + fn + ".csv"
  ;
  
  window.onresize = function() {
    draw(document.querySelector("#quadrant"));
  }

  function draw(chart) {
    var
    x,
    y,
    xAxis,
    yAxis,
    svg,
    legend,
    schools
    ;

    // Dimensions
    var mobile = (+chart.offsetWidth <= 414);

    var margin = {
      top: 8,
      right: 14,
      bottom: 32,
      left: 14,
      width: function() { return this.right + this.left; },
      height: function() { return this.top + this.bottom; }
    };
    
    var ratio  = { width: 1, height: 1 };
    
    var width  = function() {
      if (!containerWidth) {
        var containerWidth = +chart.offsetWidth;
      }

      return containerWidth - margin.width();
    }();
    
    var height = function() {
      var f = ratio.height / ratio.width;

      return Math.round(width * f - margin.height());
    }();

    // SVG setup
    // ---------------------------------------------------------------------------
    chart.innerHTML = "";

    x = d3.scale.linear()
     .domain([2900,12000])
     .range([0, width])
     .nice();

    y = d3.scale.linear()
      .domain([-.5, .5])
      .range([height, 0]);

    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickValues([7200])
      .tickSize(-height, 0, 0)
      .tickFormat(d3.format("$,"));

    yAxis = d3.svg.axis()
      .scale(y)
      .orient("right")
      .tickValues([0])
      .tickSize(-width, 0, 0)
      .tickFormat(d3.format("%.1"));

    svg = d3.select(chart).append("svg")
        .attr("width", width + margin.width())
        .attr("height", height + margin.height())
        .call(title)
        .call(desc)
      .append("g")
        .attr("transform", "translate(" + [margin.left, margin.top] + ")");

    legend = d3.select(".quadrant .legend");

    legend.select(".buttons").style({
      "margin-left": margin.left + "px",
      "margin-right": margin.right + "px"
    });

    function title() {
      this.append("title")
        .text("School spending and student outcomes");
    }
    
    function desc() {
      this.append("desc")
        .text("This chart shows the percentage of students in " + district.replace("-", " ") + 
          " schools who are considered proficient or advanced compared to average per-student spending.")
    }

    // Axes and labels
    // ---------------------------------------------------------------------------
    svg.append("rect")
      .attr("class", "box")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);

    // Adds x axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Adds y axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr("transform", "translate(" + width + ",0)");

    // Remove y axis label
    d3.select("g.y.axis .tick text").remove();

    // Quad labels
    if (!mobile) {
      svg.append("text")
        .attr("class", "quadrant-label")
        .attr("x", x(x.domain()[0]) + 12)
        .attr("y", y(y.domain()[1]))
        .attr("dy", 24)
        .text("Low spending, high achievement");

      svg.append("text")
        .attr("class", "quadrant-label")
        .attr("x", x(x.domain()[1]) - 12)
        .attr("y", y(y.domain()[1]))
        .attr("text-anchor", "end")
        .attr("dy", 24)
        .text("High spending, high achievement");

      svg.append("text")
        .attr("class", "quadrant-label")
        .attr("x", x(x.domain()[0]) + 12)
        .attr("y", y(y.domain()[0]))
        .attr("dy", -24)
        .text("Low spending, low achievement");

      svg.append("text")
        .attr("class", "quadrant-label")
        .attr("x", x(x.domain()[1]) - 12)
        .attr("y", y(y.domain()[0]))
        .attr("dy", -24)
        .attr("text-anchor", "end")
        .text("High spending, low achievement");
    }

    // x and y axis labels
    svg.append("text")
      .attr("class", "axis")
      .attr("x", (mobile) ? width / 2 : 12)
      .attr("y", height)
      .attr("dy", (mobile) ? 24 : 12)
      .attr("text-anchor", (mobile) ? "middle" : "left")
      .text("Spending per student");

    svg.append("text")
      .attr("class", "axis")
      .attr("x", -height / 2)
      .attr("y", 0)
      .attr("dy", -6)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Adjusted student proficiency");

    // Initial scatterplot
    // ---------------------------------------------------------------------------
    schools = svg.selectAll("circle.school")
        .data(data)
      .enter().append("circle")
        .attr("class", "school")
        .call(circleAttr);

    function circleAttr() {
      return this.attr({
        cx: function(d) { return x(d.spending); },
        cy: function(d) { return y(testScore(d)); },
        r: 4
      }).call(tooltip)
    }

    function testScore(d) {
      var subject = (legend.select(".buttons #english").classed("primary")
        ? "english"
        : "math"
      );
      return d[subject];
    }

    function tooltip() {
      this.on("mouseover", function(d) {
        var tooltip = d3.select(".quadrant #tooltip").classed("hidden", false);

        // Text values
        tooltip.select("[data-item=grade]").html(d.grade);
        tooltip.select("[data-item=name]").html(d.name);
        tooltip.select("[data-item=spending]").html(d3.format("$,.0f")(d.spending));
        tooltip.select("[data-item=english]").html(d3.format("%")(d.scores.english));
        tooltip.select("[data-item=math]").html(d3.format("%")(d.scores.math));

        // Position
        tooltip
          .style("left", function() {
            var left = d3.event.pageX;
            left -= (left >= window.innerWidth * .75) ? 200 : 100;
            return left + "px";
          })
          .style("top", function() {
            var y = d3.event.pageY;
            return y + 15 + "px";
          });
      })

      .on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", true);
      });
    }

    // Inputs
    // ---------------------------------------------------------------------------
    // Title I filter
    d3.select("#title").on("click", function() {
      var button = d3.select(this);
      var active = button.classed("primary");

      button.classed("primary", !active);

      schools.style("fill-opacity", function(d) {
        return (!active && d.title || active) ? 0.9 : 0.1;
      });
      
    });

    // Select test scores for schools' y axis value
    // English
    d3.select("#english").on("click", function() {
      d3.select(this).classed("primary", true);
      d3.select("#math").classed("primary", false);

      schools.transition().call(transition)
        .attr("cy", function(d) { return y(testScore(d)); });
    });

    // Math
    d3.select("#math").on("click", function() {
      d3.select(this).classed("primary", true);
      d3.select("#english").classed("primary", false);

      schools.transition().call(transition)
        .attr("cy", function(d) { return y(testScore(d)); });
    });

    // Transition settings
    function transition(transition) {
      return transition.delay(100).duration(300);
    }
  } // End of draw()

  // Load barchart data
  // ---------------------------------------------------------------------------  
  d3.csv(url, type, function(error, csv) {
    if (error) throw error;

    function score(d, subject, averages) {
      var key = subject + "_" + d.type.toLowerCase();

      return (averages) ? d[key] - averages[d.type] : d[key];
    }

    var key = 0;
    
    data = csv.map(function(d) {
      return {
        key:      key++,
        name:     d.school,
        grade:   d["type"],
        title:    d.title_i,
        math:     score(d, "math", { "Elementary": .647, "Middle": .485, "High": .489 }),
        english:  score(d, "english", { "Elementary": .37, "Middle": .481, "High": .598 }),
        spending: d.spending,
        scores:   { math: score(d, "math"), english: score(d, "english") }
      };
    });

    draw(document.querySelector("#quadrant"));
  });

  function type(d) {
    for (var key in d) {
      if (+d[key] >= 0) {
        d[key] = +d[key];
      } else {
        d[key] = d[key];
      }
    }

    return d;
  }
})(fn)