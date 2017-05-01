---
permalink: "/projects/the-cost-of-education/brief/js/barchart.js"
---

(function(district) {
  "use strict";

  var data;

  window.onresize = function() {
    draw(document.querySelector("#barchart"))
  }

  function draw(container) {
    var
    x,
    y,
    color,
    axis,
    bars,
    svg,
    legend, 
    mobile  = (+container.offsetWidth <= 414),
    margin  = {
      top: 0, right: 16, bottom: 16, left: 100,
      width:  function() { return this.right + this.left; },
      height: function() { return this.top + this.bottom; }
    },
    ratio   = (mobile) ? { width: 1, height: 1 } : { width: 8, height: 3 },
    width   = +container.offsetWidth - margin.width(),
    height  = Math.round(width * ratio.height / ratio.width - margin.height())
    ;
    
    // Barchart
    // ---------------------------------------------------------------------------
    container.innerHTML = "";

    x = d3.scale.linear()
      .domain([0, 1])
      .range([0, width]);

    y = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.label; }))
      .rangeRoundBands([0, height], 0.25);

    color = d3.scale.ordinal()
      .domain(data[0].spending.map(function(k) { return k.range; }))
      .range(['#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c']);

    axis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height, 0, 0)
      .tickValues([.25, .5, .75, 1])
      .ticks(null, "%");
    
    svg = d3.select(container).append("svg")
        .attr("width", width + margin.width())
        .attr("height", height + margin.height())
        .call(title)
        .call(desc)
      .append("g")
        .attr("transform", "translate(" + [margin.left, margin.top] + ")");

    svg.append("g").attr("class", "axis")
      .call(axis)
      .attr("transform", "translate(0," + height + ")");

    bars = svg.selectAll("g.bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
          return "translate(0," + y(d.label) + ")";
        });

      bars.append("text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("y", y.rangeBand() / 2)
        .attr("dx", -6)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "end")
        .text(function(d) { return d.label; });

    bars.selectAll("g.spending")
        .data(function(d) { return d.spending; })
      .enter().append("g")
        .attr("class", "spending");

    d3.selectAll("g.spending").append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("width", function(d) { return x(d.width); })
      .attr("height", y.rangeBand())
      .attr("fill", function(d) { return color(d.range); })
      .attr("fill-opacity", 0.95);

    function title() {
      this.append("title")
        .text("School spending per student compared to county average");
    }
    
    function desc() {
      this.append("desc")
        .text("This chart shows how funding for " + district.replace("-", " ") + 
          " schools compare to the countywide average of $7,200 per student.");
    }

    // Hover
    // ---------------------------------------------------------------------------
    bars
      .on("mouseover", function(d) {
        var hover = d3.select(this).append("g").classed("hover", true);

        hover.append("rect")
          .attr("fill", "white")
          .attr("fill-opacity", 0.6)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", y.rangeBand())
          .attr("pointer-events", "none");

        hover.selectAll("text")
            .data(function(d) {
              return d.spending.filter(function(d) {
                return d.width != 0; });
            })
          .enter().append("text")
            .attr("x", function(d) { return x(d.x) + x(d.width) / 2; })
            .attr("y", y.rangeBand() / 2)
            .attr("dominant-baseline", "middle")
            .attr("text-anchor", "middle")
            .style("font-size", (+container.offsetWidth <= 375) ? "8px" : "12px")
            .text(function(d) { return d3.format("%")(d.width); });

      })
      .on("mouseout", function(d) {
        d3.select(".hover").remove();
      });

    // Legend
    // ---------------------------------------------------------------------------
    legend = function(data) {
      var scale = d3.scale.ordinal()
        .domain(data)
        .rangeRoundBands([0, width]);

      document.querySelector(".barchart .legend").innerHTML = "";

      var legend = d3.select(".barchart .legend").append("svg")
          .attr("height", y.rangeBand() / 2)
          .attr("width", width + margin.width())
        .append("g")
          .attr("transform", "translate(" + margin.left + ",0)");      

      var keys = legend.selectAll("g.key")
          .data(data)
        .enter().append("g")
          .attr("class", "key");

      keys.append("text")
        .attr("x", function(d) { return scale(d) + scale.rangeBand() / 2; })
        .attr("y", y.rangeBand() / 4)
        .attr("dy", -3)
        .attr("text-anchor", "middle")
        .text(function(d,i) {
          switch(i) {
          case 0:  return (mobile) ? "–10%" : "<–10%";
          case 2:  return (mobile) ? "Avg"  : "Average";
          case 4:  return (mobile) ? "+10%" : ">+10%";
          default: return "";  
          }
        });

      keys.append("rect")
        .attr("fill", function(d) { return d; })
        .attr("x", function(d) { return scale(d); })
        .attr("y", y.rangeBand() / 4)
        .attr("width", scale.rangeBand())
        .attr("height", y.rangeBand() / 4);
    }(color.range()); // End of legend()
  } // End of barchart()

  // Load barchart data
  // ---------------------------------------------------------------------------  
  d3.csv("../data/district-averages.csv", type, function(error, csv) {
    if (error) throw error;

    var keys = d3.keys(csv[0]).filter(function(k) { return k != "district"; });

    data = csv.filter(function(d) {
      return d.district == district || d.district == "Hamilton County"
    }).map(function(d) {
      var x = 0;

      return {
        label: (d.district == "Hamilton County")
               ? d.district
               : "District " + district.split('-')[1],
        spending: keys.map(function(k) {
          x += d[k];
          return { range: k, width: d[k], x: x - d[k] };
        })
      }
    });

    draw(document.querySelector("#barchart"));
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
})(fn);