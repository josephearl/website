---
title: "Hosting your static site with Netlify"
pubDate: "2017-03-19T19:50:36Z"
description: ""
tags: ["static-sites", "netlify"]
---

This site is hosted with [Netlify](http://netlify.com). Why?

If you've ever used [GitHub Pages](https://pages.github.com) to host a [Jekyll](http://jekyllrb.com) site you'll know how easy it is to update and deploy your site with a `git push`.

Netlify does the same job, but also supports a bunch more static site generators (like [Hexo](https://hexo.io) or [Hugo](https://gohugo.io) -- which this site uses) as well as free HTTPS with custom domain names using [Let's Encrypt](https://letsencrypt.org).
Enabling HTTPS is as simple as clicking a button and Netlify manages renewing your SSL certificates for you.

They also provide a global CDN to ensure your content gets to your users as quickly as possible.

The Pro plan at $49/mo (but free for Open Source projects!) lets you [deploy branches to subdomains](https://www.netlify.com/docs/continuous-deployment/#branch-deploys) (e.g. deploy the `staging` branch to `staging.yoursite.com`) and [accept secure form submissions](https://www.netlify.com/docs/form-handling/) which you can hook up to actions with [Zapier](https://zapier.com).

You can view the [source for this site](https://github.com/josephearl/website) on GitHub.
