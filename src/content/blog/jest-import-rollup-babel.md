---
pubDate: "2017-04-15T20:28:05+01:00"
categories: []
tags: ["es6", "jest", "rollup", "babel"]
description: ""
title: "Using ES6 `import` in tests with Jest and Rollup"
---

Today while working on a new version of [Preliminaries](https://github.com/josephearl/preliminaries) using ES6 I was trying to get both [Rollup](https://rollupjs.org) working to bundle my code and [Jest](https://facebook.github.io/jest/) to run tests when [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)ing my code.

Rollup recommends\* something like the following `.babelrc`:

```js
{
  "ignore": [
    "node_modules/**"
  ],
  "presets": [
    ["es2015", { "modules": false }],
    "stage-0"
  ],
  "plugins": [
    "external-helpers"
  ]
}
```

which worked great for bundling my code, so I wrote a simple test:

```js
import Preliminaries from "../src/Preliminaries";

const preliminaries = new Preliminaries();

describe("Constructor:", () => {
  it("should return something", () => {
    expect(new Preliminaries()).not.toBeNull();
  });
});
```

however, when running `jest` I was greeted with the following error:

```
 FAIL  tests/test.test.js
  ● Test suite failed to run

    /Users/Joseph/Workspace/preliminaries/preliminaries/tests/test.test.js:12
    import Preliminaries from "../src/index";
    ^^^^^^
    SyntaxError: Unexpected token import

      at transformAndBuildScript (node_modules/jest-runtime/build/transform.js:320:12)
      at process._tickCallback (internal/process/next_tick.js:109:7)
```

It [turns out](https://github.com/facebook/jest/issues/3202#issuecomment-290967270) modules are required for tests, so the following config works for `jest`:

```js
{
  "ignore": [
    "node_modules/**"
  ],
  "presets": [
    "es2015",
    "stage-0"
  ]
}
```

but not for `rollup` of course!

```
🚨   (babel plugin) It looks like your Babel configuration specifies a module transformer. Please disable it. See https://github.com/rollup/rollup-plugin-babel#configuring-babel for more information
src/index.js
```

I was able to work around this by combining both these approaches with Babel's [`env` option](https://babeljs.io/docs/usage/babelrc/#env-option):

```
{
  "ignore": [
    "node_modules/**"
  ],
  "env": {
    "development": {
      "presets": [
        "flow",
        "es2015",
        "stage-0"
      ]
    },
    "production": {
      "presets": [
        "flow",
        ["es2015", { "modules": false }],
        "stage-0"
      ],
      "plugins": [
        "external-helpers"
      ]
    }
  }
}

```

and setting `NODE_ENV` in the scripts in my `package.json`:

```js
  "scripts": {
    "test": "NODE_ENV=development jest",
    "build": "NODE_ENV=production rollup -c"
  }
```

Success!
