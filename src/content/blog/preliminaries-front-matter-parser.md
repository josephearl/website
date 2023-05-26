---
title: "Preliminaries — a front matter parser for Node.js"
pubDate: "2017-04-09T20:13:44+01:00"
description: ""
tags: ["preliminaries", "markdown", "nodejs"]
---

[Preliminaries](https://github.com/josephearl/preliminaries) is a small Node.js library for parsing front matter in Markdown documents.

You can easily parse YAML, JSON and TOML front matter, with custom delimiters if needed:

```js
var preliminaries = require("preliminaries")(true);
require("preliminaries-parser-yaml")(true);
require("preliminaries-parser-toml")(true);

// `preliminaries.parse` returns an object `{data: {}, content: ''}` with the front
// matter data and content
preliminaries.parse('{\n"name":"Joseph"\n}\nContent');
preliminaries.parse("---json\n{\nname: Joseph\n}\n---\nContent");
preliminaries.parse("---\nname: Joseph\n---\nContent");
preliminaries.parse("---yaml\nname: Joseph\n---\nContent");
preliminaries.parse('+++\nname = "Joseph"\n+++\nContent');
preliminaries.parse("~~~\nname: Joseph\n~~~\nContent", {
  delims: "~~~",
  lang: "yaml",
});
```

You can also stringify a JavaScript object and a content string back out:

```js
preliminaries.stringify("Content", { name: "Joseph" }, { lang: "yaml" });
preliminaries.stringify("Content", { name: "Joseph" }, { lang: "toml" });
preliminaries.stringify("Content", { name: "Joseph" }, { lang: "json" });
```

Or test if a string contains front matter:

```js
preliminaries.test('{\n"abc": "xyz"\n}');
preliminaries.test("---\nabc: xyz\n---");
preliminaries.test('+++\nabc = "xyz"\n+++');
preliminaries.test('~~~\nabc = "xyz"\n~~~');
```

The core `preliminaries` library has zero dependencies, all supported formats except JSON are optional and are provided via plugins.

Install `preliminaries` using [npm](https://www.npmjs.com/package/preliminaries) or [check it out on GitHub](https://github.com/josephearl/preliminaries).
