---
title: "Improving your static site’s performance using PageSpeed Insights"
pubDate: "2017-03-26T09:02:59Z"
description: ""
tags: ["static-sites", "performance", "pagespeed"]
---

One of the main reasons to choose a static site is performance - they are blazingly fast to serve to your users. But can they be faster? I decided to use [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) to find out.

The first recommendation it gave me was to minify my JavaScript and reduce the size of my resources -- it turns out the [Hugo theme I am using](https://github.com/nodejh/hugo-theme-cactus-plus/) had an uniminified version of [jQuery](http://jquery.com) and about 300kb of JavaScript in total. Replacing jQuery with the minified version took less than a minute and bumped my PageSpeed score up a few points.

After discovering my theme had an unminified jQuery, I decided to take a look at what other assets the theme included that I might not need, and whether I _really_ needed jQuery at all. Straight away I spotted a couple of relatively large icon fonts that I was barely using so I stripped down to just the icons I needed using [Fontello](http://fontello.com) which reduced the size by over 90%!

Then it was on to tackling jQuery. Whilst jQuery used to be _the_ JavaScript library, these days many of it's most useful features are implemented by ES5. In my case it was used in a few of places -- to trigger some code when the document is ready `$(document).ready(fn)`, selecting elements by CSS and selectors, some uses of `jQuery.map` and `jQuery.each` and in the [jquery.tagcloud.plugin](https://github.com/addywaddy/jquery.tagcloud.js/).

I went with [this snippet](https://gist.github.com/dciccale/4087856) by [Denis Ciccale](https://github.com/dciccale) as replacement for the jQuery document ready code which made it as simple as replacing `$(document).ready(fn)` with `DOMReady(fn)`.

I replaced the `jQuery.map` and `jQuery.each` functions with the modern JavaScript equivalents `Array.map` and `Array.forEach`; similarly for selecting elements by CSS selectors I used `document.querySelectorAll`.

With jQuery removed from one area I moved onto what to do with the tag cloud plugin. Should I remove it entirely? Find an alternative? Or perhaps rewrite the plugin to not depend on jQuery?

I had a quick check for alternatives I could just drop in place but didn't find anything promising, so I decided to see how feasible it would be to rewrite it in pure JavaScript. It turned out to be relatively trivial, the only small hiccup I encountered in converting it was that `document.querySelectorAll` returns a `NodeList`, not an array of nodes or something that you can call `map` on (which you can in jQuery). Converting the NodeList to an array with `Array.prototype.slice.call` removed that problem and I was jQuery free (and 80kb of JavaScript lighter).

The next step I took was to combine my CSS into a single a file to reduce the number of files the browser has to fetch. At this point my PageSpeed score was 88/100 on Mobile and and 94/100 on Desktop and the only remaining suggestion from PageSpeed that was directly under my control was to optimize CSS delivery (the other remaining suggestion was to improve server speed) and I decided to call it a day. I'll cover my efforts to optimize CSS delivery in a future post.
