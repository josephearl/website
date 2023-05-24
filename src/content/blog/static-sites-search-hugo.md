---
description: ""
title: "Search your Hugo static site using lunr.js"
pubDate: "2017-03-29T21:10:04+01:00"
categories: []
tags: ["static-sites", "hugo", "search"]
---

In this post I'll show you how you can add easily add search to your [Hugo](https://gohugo.io) static site using [Hugo's Scratch feature](http://gohugo.io/extras/scratch/) and the [lunr.js](http://lunrjs.com) JavaScript library on the client.

First we'll need to create a JSON index of all our documents as part of our Hugo site generation process. Add a new document with `hugo new search-index.md` and set the type to `search-index` and the url the `index.json` in the frontmatter:

```markdown
---
date: "2017-03-28T00:02:24+01:00"
type: "search-index"
url: "index.json"
---
```

Then add a new `single.html` layout to `layouts/search-index` with the content:

```markdown
{{- $.Scratch.Add "index" slice -}}
{{- range where .Site.Pages "Type" "not in"  (slice "page" "search-index") -}}
{{- $.Scratch.Add "index" (dict "title" .Title "ref" .Permalink "tags" .Params.tags) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

If you run `hugo` you should see an `index.json` file with a list of all your posts in your public output folder.

Next we'll need to load our `index.json` into lunr.js -- add the lunr.js dependency to your project and then add some new JavaScript:

```javascript
function searchIndex() {
    return lunr(function() {
        this.field("title",{boost:10}),
        this.field("tags",{boost:5}),
        this.ref("ref")
    });
}

function loadIndexJson(indexJsonLoadedFunction) {
    var x = new XMLHttpRequest;
    x.overrideMimeType("application/json");
    x.open("GET", "/index.json", true);
    x.onreadystatechange = function() {
        if (4 == x.readyState && "200" == x.status) {
            indexJsonLoadedFunction(
                JSON.parse(x.responseText)
            );
        }
    }
    r.send(null)
}

function addToSearchIndex(lunrIndex, indexLoadedFunction) {
    return function(index) {
        var titles = {};
        index.forEach(function(item) {
            lunrIndex.add(item);
            // The lunr results only contain ref and score
            // so we have to keep track of any other values
            // we want to display ourselves
            titles[item.ref] = item.title;
        }
        indexLoadedFunction(lunrIndex, titles);
    }
}
```

Add an `input` for the search query and a `div` for the search results to your HTML:

```html
<p><input id="search-input" type="text" /></p>
<div id="search-results"></div>
```

Finally when the user types something, we'll need to search the index and render the results:

```javascript
function search(renderFactoryFunction) {
  return function (lunrIndex, titles) {
    var renderFunction = renderFactoryFunction(titles);
    return function (query) {
      var results = lunrIndex.search(query);
      renderFunction(results);
    };
  };
}

function renderSearchResults(searchResultsNode) {
  return function (titles) {
    return function (results) {
      // Create a list of results
      var ul = document.createElement("ul");
      results.forEach(function (result) {
        var li = document.createElement("li");
        // Create an item with the title
        li.appendChild(document.createTextNode(titles[result.ref]));
        ul.appendChild(li);
      });
      // Remove any existing content
      while (searchResultsNode.hasChildNodes()) {
        searchResultsNode.removeChild(searchResultsNode.lastChild);
      }
      // Render the list
      searchResultsNode.appendChild(ul);
    };
  };
}

function registerSearchHandler(searchInputNode, searchFactoryFunction) {
  return function (lunrIndex, titles) {
    var searchFunction = searchFactoryFunction(lunrIndex, titles);
    // Register an oninput event handler
    searchInputNode.oninput = function (event) {
      var query = event.target.value;
      searchFunction(query);
    };
  };
}
```

Putting it all together once your document has loaded:

```javascript
loadIndexJson(
  addToSearchIndex(
    searchIndex(),
    registerSearchHandler(
      document.getElementById("search-input"),
      search(renderSearchResults(document.getElementById("search-results")))
    )
  )
);
```

If the `search-index` document appears on your site, e.g. in the list of posts or elsewhere you'll want to exclude the `search-index` type, for instance updating or adding a `where` condition to page ranges in your Hugo theme templates:

```markdown
{{ range where .Paginator.Pages "Type" "ne" "search-index" }}
```

Topics I haven't covered here for brevity are error-handling and rendering a no-results message, and if you're using a JavaScript pre-processor and can write ES6 you may want to refactor the above code to use promises instead of callbacks.

One thing to be aware of is that the `index.json` can be become quite large with a lot of content and the search index will take a lot of time to load and prepare on the client.

To avoid this you can load your `index.json` into lunr.js as part of your build process and serialize the resulting index using [`lunrIndex.toJSON`](http://lunrjs.com/docs/#Index) to a file. Then load this file on the client using `lunr.Index.load`.
