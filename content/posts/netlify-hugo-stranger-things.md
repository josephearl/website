---
categories: []
tags: ["netlify", "hugo", "debugging"]
description: ""
title: "Stranger things with Netlify and Hugo"
date: "2017-03-24T18:24:53Z"
---

I recently ran into a strange situation where [Netlify](https://www.netlify.com) was rendering my [Hugo](https://gohugo.io) static site differently to when I ran `hugo` locally from my laptop.

After several re-builds on Netlify with and without the cache I tracked the issue down to a version mismatch - locally I was running Hugo v0.19, and Netlify was running something else. Netlify offer specific commands for each version and so by switching Netlify to use the `hugo_0.19` command, everything was back to normal.

The [Hosting Hugo on Netlify](https://www.netlify.com/blog/2015/07/30/hosting-hugo-on-netlifyinsanely-fast-deploys/) post had led me to think that the `hugo` alias would track the latest Hugo release, but it turns out for backwards compatibility reasons this isn't the case and for Hugo builds using the `hugo` command it will [build using Hugo v0.17](https://www.netlify.com/docs/continuous-deployment/).
