---
pubDate: "2017-04-10T22:42:45+01:00"
categories: []
tags: ["static-sites", "performance", "pagespeed", "critical-css"]
description: ""
title: "Optimising CSS delivery"
---

In [a previous post](/post/static-sites-performance/) I covered my efforts to improve the PageSpeed ranking of my site.

Today I achieved a perfect 100/100 PageSpeed score on Desktop.

![PageSpeed Insights 100/100 score for https://www.josephearl.co.uk on Deskop](/images/optimising-css-delivery.png)

To do this I had to optimise my CSS delivery. What does that mean? Well, previously, all of my styles were loaded using a `link` in the `head`:

```html
<html>
  <head>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <p>Content</p>
  </body>
</html>
```

But this is bad and blocks rendering until **all** of `styles.css` has finished downloading.

To fix this, you need to work out what CSS is critical to render the visible portion of your page and inline that into your HTML, then include the rest of your styles at the end of your body:

```html
<html>
  <head>
    <!-- Critical CSS inlined into HTML -->
    <style>
      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>Content</p>
    <link rel="stylesheet" href="/styles.css" />
  </body>
</html>
```

Figuring out the critical CSS is the hard part! Luckily there are [some handy tools](https://github.com/addyosmani/critical-path-css-tools) to help you do this.

I ended up using the [hosted version of Penthouse](https://jonassebastianohlsson.com/criticalpathcssgenerator/), I just had to enter my URL and paste in my CSS and click a button and out popped my critical CSS.

My [Content Security Policy](https://content-security-policy.com) does not allow unsafe-inline, so I used [report-uri.io's hash tool](https://report-uri.io/home/hash/) to generate a hash for the contents of the critical style section in my head and added that to my policy.
