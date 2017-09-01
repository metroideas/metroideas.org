---
title: Chattanooga and Hamilton County tax calculator
date: 2017-09-01 09:45:00 -04:00
categories:
- Government
tags:
- Chattanooga
- Hamilton County
author:
- David Morton
layout: article-bare
---

The governments of [Chattanooga](http://www.timesfreepress.com/news/local/story/2017/aug/01/chattanooga-property-tax-rate-may-drop-bills-are-expected-increase/441422/) and [Hamilton County](http://www.timesfreepress.com/news/breakingnews/story/2017/aug/29/county-mayor-raising-property-taxes/446110/) are considering raising their respective property tax rates for fiscal year 2018.

Find out how the proposed increases would impact your annual tax bill. Enter your home's appraised or assessed value to get an estimate comparing your cost under the current and proposed rates.

<div class="grid" style="margin-bottom:15px;">
 <div class="half">
   <label for="appraisedValue">Appraised value</label>
   <br>
   <input type="text" id="appraisedValue" name="appraisedValue" placeholder="$116,700">
 </div>
 <div class="half">
   <label for="assessedValue">Assessed value</label>
   <br>
   <input type="text" id="assessedValue" name="assessedValue" placeholder="$29,200">
 </div>
</div>

<figure id="taxgraph"></figure>

Property owners in the Chattanooga city limits pay both city and county taxes.

If you don't know your home's appraised or assessed value, you can look it up on the [Hamilton County assessor of property website](http://assessor.hamiltontn.gov/). Here's a brief demo of how to find the appraised (total) and assessed values.

<script src="//d3js.org/d3.v4.min.js"></script>

<script>
function Property(t,e){this.appraisal=t||4*e||0,this.assessment=e||.25*t||0,this.currentBill=function(){return this.calculateCombinedTaxBill("current")},this.proposedBill=function(){return this.calculateCombinedTaxBill("proposed")},this.calculateCombinedTaxBill=function(t){var e=taxrates[t];return this.assessment*e/100}}function TaxBillGraph(){function t(t){d.selectAll("*").remove();var e=d.selectAll("g.row").data(t);e.exit().remove(),e.enter().append("g").attr("class",function(t){return"row "+t.type}).attr("transform",function(t){return"translate("+[0,c(t.type)]+")"}).merge(e);var r=d.selectAll("g.row").selectAll("g.bargroup").data(function(t){return p.map(function(e){return{key:e,value:t[e]}})});r.exit().remove(),r.enter().append("g").attr("class",function(t){return"bargroup "+t.key}).attr("transform",function(t){return"translate("+[o.left,f(t.key)]+")"}).merge(r),d3.selectAll("g.bargroup").call(function(t){t.append("rect"),t.append("text")}),d3.selectAll("g.bargroup text").attr("x",function(t){return u(t.value)}).attr("y",f.bandwidth()/2).attr("dx",-4).attr("alignment-baseline","middle").attr("text-anchor","end").attr("fill","white").text(function(t){return d3.format("$,")(t.value)}),d3.selectAll("g.bargroup rect").attr("x",0).attr("y",0).attr("height",f.bandwidth()).attr("fill",function(t){return g(t.key)}).attr("width",function(t){return u(t.value)}),d3.selectAll("g.row").append("text").call(function(t){t.attr("x",o.left).attr("fill","#444").text(function(t){switch(t.type){case"median":return"Median city taxbill";case"city":return"City and county";case"county":return"County only"}}),a?t.attr("y",-4):t.attr("x",o.left).attr("y",c.bandwidth()/2).attr("dx",-4).attr("text-anchor","end").attr("alignment-baseline","middle")}),d3.selectAll("g.row:first-of-type g.bargroup").append("text").attr("class","rate-label").attr("x",function(t){return u(t.value)}).attr("y",f.bandwidth()/2).attr("dx",4).attr("alignment-baseline","middle").attr("text-anchor","start").attr("fill","#444").text(function(t){return"current"==t.key?"Current rate":"Proposed"}),d3.selectAll("text").attr("font-size","12px")}var e=[{type:"city",current:3416,proposed:3581},{type:"county",current:1543,proposed:1617},{type:"median",current:1330,proposed:1472}],r=document.querySelector("#taxgraph"),a=+r.offsetWidth<600,n=a?{width:2,height:1.5}:{width:2,height:1},o={top:10,right:10,bottom:10,left:a?10:115},l=r.offsetWidth-o.left-o.right,i=Math.round(n.height/n.width*l)-o.top-o.bottom,s=d3.select(r).append("svg").attr("width",l+o.left+o.right).attr("height",i+o.top+o.bottom);s.append("style").text('text{font-family:"Merriweather Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";color:#444;');var d=s.append("g").attr("transform","translate("+[0,o.top]+")"),p=["current","proposed"],u=d3.scaleLinear().domain([0,6e3]).range([0,l]),c=d3.scaleBand().padding(.3).domain(e.map(function(t){return t.type})).rangeRound([0,i]),f=d3.scaleBand().domain(p).paddingInner(.1).rangeRound([0,c.bandwidth()]),g=d3.scaleOrdinal().range(["#3b71e8","#8dbb44"]).domain(f.domain());this.update=function(r){for(var a=e.length-1;a>=0;a--)"city"==e[a].type?e[a]=r:"county"==e[a].type&&(e[a]={type:"county",current:Math.round(.451667*r.current),proposed:Math.round(.4515885*r.proposed)});r.proposed>6e3?u.domain([0,r.proposed+.2*r.proposed+150]):r.proposed<1e3?u.domain([0,2e3]):u.domain([0,6e3]),t(e),r.proposed<2e3?(d3.selectAll("g.row:not(:last-of-type) g.bargroup text").attr("text-anchor","start").attr("dx",4).attr("fill","#444"),d3.selectAll("text.rate-label").attr("dx",50)):r.proposed>8e3&&d3.selectAll("g.row:last-of-type g.bargroup text").attr("text-anchor","start").attr("dx",4).attr("fill","#444")},this.draw=function(){t(e),d3.selectAll("g.row:not(:last-of-type) rect").attr("fill-opacity","0.25")}}Number.prototype.formatMoney=function(t,e,r){var a=this,t=isNaN(t=Math.abs(t))?2:t,e=void 0==e?".":e,r=void 0==r?",":r,n=a<0?"-":"",o=String(parseInt(a=Math.abs(Number(a)||0).toFixed(t))),l=(l=o.length)>3?l%3:0;return"$"+n+(l?o.substr(0,l)+r:"")+o.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+r)+(t?e+Math.abs(a-o).toFixed(t).slice(2):"")},String.prototype.formatMoney=function(){return Number(this.replace(/[^0-9\.]+/g,""))};var taxrates={current:4.5549,proposed:5.0422},appraisedValue=document.querySelector("#appraisedValue"),assessedValue=document.querySelector("#assessedValue"),textInputs=[appraisedValue,assessedValue],graph=new TaxBillGraph;graph.draw();for(var i=0;i<textInputs.length;i++)textInputs[i].addEventListener("keyup",function(t){var e=t.target.value.formatMoney(),r="appraisedValue"==t.target.id?new Property(e):new Property(null,e);r.assessment>0&&(graph.update({type:"city",current:Math.round(r.currentBill()),proposed:Math.round(r.proposedBill())}),"appraisedValue"==t.target.id?assessedValue.value=r.assessment.formatMoney(0):appraisedValue.value=r.appraisal.formatMoney(0))});
</script>