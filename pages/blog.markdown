---
title: Blog
permalink: "/blog/"
layout: index
---

{% for post in site.posts %}
<article>
  <h2>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  <p>{{ post.description }}</p>
  <p><a href="{{ post.url }}">Read more</a></p>
</article>
{% endfor %}