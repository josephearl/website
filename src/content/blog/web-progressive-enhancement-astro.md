---
categories: []
tags:
  ["static-sites", "react", "mpa", "spa", "progressive-enhancement", "astro"]
description: "I recently found myself with some free time on my hands, so I decided to rewrite my website using Astro. Why did I choose Astro?"
title: "Back to progressive enhancement with Astro"
pubDate: "2023-05-24T12:07:13Z"
heroImage: "/images/astro.jpg"
---

I recently found myself with some free time on my hands, so I decided to rewrite my website using [Astro](https://astro.build) (it was previously built using Hugo).
Why did I choose Astro?

To understand why, let's take a step back to what I consider the best-practice design philosophy for the web: [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).
Progressive enhancement says that we should deliver a good baseline user experience for everyone, with a progressively more-compelling, fully-featured experience for users of newer browsers and devices.
This means, for example, that pages should work without JavaScript enabled, with JavaScript being used to enhance the user experience for those whose browsers support it.

Today, most modern websites are built using a framework like React as single-page applications (SPAs), and rendered entirely client-side.
As [many organisations](https://dev.to/tigt/making-the-worlds-fastest-website-and-other-mistakes-56na) have found, React has an amazing developer experience, but a not-so-great user experience because of the performance hit from all of the client-side JavaScript and rendering.

So what would the ideal web framework look like? Something that gives us the DevEx of React (and even lets us use React!), but renders components that don't need client-side JavaScript on the server or statically as part of the build process, and makes it easy to create interactive components which also work well for users without JavaScript.

[Next.js](https://nextjs.org) is probably the best-known web framework that has taken steps towards this - and with [Next.js 13](https://nextjs.org/blog/next-13) and the introduction of the `app` directory and support for suspense and streaming now has all of the building blocks needed.

Another good option (and the one I chose) is [Astro](https://astro.build). Astro is aimed at static sites (although it does [support server side rendering](https://docs.astro.build/en/guides/server-side-rendering/)) with some interactivity, and is more of a meta-framework: you can use React, Vue or plain old HTML to build your pages (and mix and match between them).

By default Astro will render React components statically to HTML, producing a site that requires no JavaScript.
For sites that need interactivity, Astro introduces the concept of [Islands](https://docs.astro.build/en/concepts/islands/), which are an interactive UI component on an otherwise static page of HTML.

![Astro Islands architecture](/images/astro-islands.webp)

While the building blocks for creating progressively enhanced sites with a great DevEx have largely been realised, there is still work to do to improve the experience to make this simpler and more fun.

One example of this is forms: it should be easy to create a form with validation, have that validation run on the client-side for users with JavaScript to provide quick feedback without reloading the page, while also having the validation run on the server on submit for security and for users without JavaScript enabled, and developers shouldn't have to write the validation or rendering code twice.

[Astro Reactive](https://docs.astro-reactive.dev/en/api/form/form-component/) is a library for Astro that provides this with its `Form` component, but it would be nice to see the frameworks introducing better support for this themselves.

As for why I chose Astro over Next.js -- my website does not need server-side rendering (which Next.js is better at), client-side routing (which Astro [does not currently support](https://github.com/withastro/roadmap/issues/532)) and lets me write reusable components in simple HTML, utilizing React only when necessary.
