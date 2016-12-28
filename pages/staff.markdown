---
title: Staff
permalink: "/staff/"
layout: index
---

{% assign current = site.authors | where: "current","true" | sort: "position" %}
{% assign former = site.authors | where: "current","false" | sort: "position" %}

<article>
<h2>Current</h2>
{% for profile in current %}
<section id="{{ profile.title | slugify }}">
  <h3><a href="{{ profile.url }}">{{ profile.title }}</a></h3>
  <p>{{ profile.description }}</p>
</section>
{% endfor %}
</article>

<hr>

<article>
<h2>Former</h2>
{% for profile in former %}
<section id="{{ profile.title | slugify }}">
  <h3><a href="{{ profile.url }}">{{ profile.title }}</a></h3>
  <p>{{ profile.description }}</p>
</section>
{% endfor %}
</article>