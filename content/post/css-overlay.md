---
date: "2017-04-01T15:49:13+01:00"
categories: []
tags: ["css", "overlay", "scrolling"]
description: ""
title: "Scrollable CSS overlay"
---

I recently had the need to create a CSS overlay for the search function on this site. My requirements were that the overlay should be scrollable, whilst the overlay was visible the body should *not* be scrollable, and any HTML for the overlay should be after the main content.

I first tried adding `overflow: hidden` to the body when the overlay was shown using JavaScript but this has the effect of scrolling the body and main content immediately to the top, giving a jarring user experience when the overlay is dismissed.

Then I hit upon [this solution](http://www.luxiyalu.com/playground/overlay/) which was almost what I wanted, except that the overlay had to come *before* the content in the HTML. 

Adding `z-index:1` to the overlay style gave me the perfect solution for my use-case.

**HTML**

```html
<body>
  <div id="main">
    lengthy content here
  </div>
  <div id="overlay">
    <div class="overlay-content"></div>
  </div>
</body>
```

**CSS**

```css
html, body {
  height: 100%;
}

#main {
  height: 100%;
  overflow: auto;
}
               
#overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
}

.overlay-content {
  height: 100%;
  overflow-y: scroll;
}
```

I don't particularly like having the extra `.overlay-content` div or having to wrap my content in a div, but it's probably the best I'm going to get with CSS for now.
