---
categories: []
tags: ["static-sites", "cms", "netlify"]
description: ""
title: "Content management workflows for static sites"
date: "2017-03-21T23:03:29Z"
---

Static sites are great! They’re quick, easy to make and host using services like [GitHub Pages](https://pages.github.com) and [Netlify](https://www.netlify.com). 

However, this often comes at the cost of the user-friendliness of the editing experience, especially for non-technical users who are unlikely to be familiar with [Markdown](https://daringfireball.net/projects/markdown/) or similar formats.

One option for solving this is to host your content externally using a CMS like [Contentful](https://www.contentful.com) which offers APIs for reading content and a rich editor UI for creating it. If you have a lot of existing content in a database then this is something you should certainly consider.

Another is to keep storing your content in a Git repository and use an editor UI that can load from and save changes back to the Git repository.

[Netlify CMS](https://github.com/netlify/netlify-cms) is one such editor -- it's a single-page app that works with almost any static site generator such as [Jekyll](http://jekyllrb.com), [Hugo](https://gohugo.io),or [Hexo](https://hexo.io) using a YAML configuration to describe the content model of your site.

When a user visits the app they will be prompted to login to GitHub, once authenticated they'll be able to create new content or edit existing content.

Netlify CMS relies on the GitHub API for managing files so you'll need to have your site stored in a GitHub repo. To connect to the repo and make changes the app needs to authenticate with the GitHub API -- you can create your own authentication provider to do this, or use [Netlify](https://www.netlify.com/docs/authentication-providers/#authentication-providers).

Adding Netlify CMS to your static site is as a simple as [adding 2 files to your static content directory](https://github.com/netlify/netlify-cms/blob/master/docs/quick-start.md#app-file-structure) and tweaking the configuration for your site.

[Forestry.io](https://forestry.io) is another alternative very similar to Netlify CMS but provided as a service so requires no modification to your existing site. It works with a greater variety of content hosts such as Amazon S3, Bitbucket and Fastly as well as GitHub and supports Jekyll and Hugo static site generators.
