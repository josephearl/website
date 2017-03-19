# website

[@josephearl](https://twitter.com/josephearl)’s website <https://www.josephearl.co.uk>. 

Built using [Hugo](https://gohugo.io) and served with [Netlify](https://www.netlify.com).

## How it works
 
Content is stored as plain old Markdown in the `content` directory.

Static HTML is generated from the content using Hugo and saved into the `public` directory.

Netlify detects changes to the Git repository and continually builds and deploys the site, as well as managing SSL certificates with Lets Encrypt.

[Netlify CMS](https://www.netlifycms.org) is a single-page app stored as a Git submodule in the `static/admin` directory and available from [/admin](https://www.josephearl.co.uk/admin) which lets you edit the content from the live site and save the changes back to the GitHub repo.

Test the site locally:

    hugo server
