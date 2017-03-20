---
title: Content management workflows for static sites
description: Test
---

Static sites are great! They’re quick, easy to make and [even easier to host](https://www.netlify.com). 

However, this often comes at the cost of the user-friendliness of the editing experience, especially for non-technical users who are unlikely to be familiar with [Markdown](https://daringfireball.net/projects/markdown/) or similar formats.

One option for solving this is to host your content externally using a CMS like [Contentful](https://www.contentful.com) which offers APIs for consuming content and a rich editor for creating it. If you have a lot of existing content in a database then this is something you should certainly consider.

Another (and the one I’ll go into more detail here) is to keep hosting your content in your Git repository but provide an editor and editing workflow on top of that.

The editor is also a static web app that can be served from a subdirectory of your static site like /admin