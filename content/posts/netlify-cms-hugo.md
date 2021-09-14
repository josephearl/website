---
categories: []
tags: ["netlify", "cms", "hugo"]
description: ""
title: "Using Netlify CMS with Hugo"
date: "2017-03-22T23:48:18Z"
---

If you're using [Hugo](https://gohugo.io) to generate your static site and want to use [Netlify CMS](https://github.com/netlify/netlify-cms/blob/master/docs/quick-start.md) to edit your content, here are some tips to help you get started.

You'll have to use [YAML front matter](https://gohugo.io/content/front-matter/) in your Markdown documents since [Netlify CMS doesn't currently support TOML front matter](https://github.com/netlify/netlify-cms/issues/283).

When creating your `config.yml` make sure to include at least one collection or the CMS will fail to load.

Here's an example `config.yml` which supports a single "post" collection to allow creating and editing content in `content/post/`:  

```yaml
# Save changes to GitHub
backend:
  name: github
  repo: user/repo
  branch: master

# Use the Editorial workflow - https://github.com/netlify/netlify-cms/blob/master/docs/editorial_workflow.md
publish_mode: editorial_workflow

# Save image uploads to /img/uploads - https://gohugo.io/themes/creation/#static
media_folder: "static/img/uploads"
public_folder: "/img/uploads"

# Collections
collections: # A list of collections the CMS should be able to edit
  # Used in routes, ie.: /admin/collections/:slug/edit
  - name: "post"
    # Used in the UI, ie.: "New Post"
    label: "Post"
    # The path to the folder where the documents are stored
    folder: "content/post"
    # Allow users to create new documents in this collection
    create: true
    # Filename template e.g. YYYY-MM-DD-title.md
    slug: "{{slug}}"
    # The fields each document in this collection have
    fields:
      - {label: "Title", name: "title", widget: "string", tagname: "h1"}
      # Use required: false instead of optional: true - https://github.com/netlify/netlify-cms/issues/315
      - {label: "Description", name: "description", widget: "text", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
    meta:
      - {label: "Date", name: "date", widget: "datetime"}
# Does not currently work, see https://github.com/netlify/netlify-cms/issues/248
#      - {label: "Tags", name: "tags", widget: "list"}
#      - {label: "Categories", name: "categories", widget: "list"}
```
