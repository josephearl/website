# website

[@josephearl](https://twitter.com/josephearl)’s website <https://www.josephearl.co.uk>. 

Built using [Hugo](https://gohugo.io) and served with [Netlify](https://www.netlify.com).

## How it works
 
Content is stored as plain old Markdown in the `content` directory.

Static HTML is generated from the content using [Hugo](https://gohugo.io) and saved into the `public` directory.

[Netlify](https://www.netlify.com) detects changes to the Git repository and continually builds and deploys the site, as well as managing SSL certificates with Lets Encrypt.

Users can log into the [Netlify CMS](https://www.netlifycms.org) single-page app at [/admin](https://www.josephearl.co.uk/admin) and edit the content, which saves changes back to the GitHub repo.

Test the site locally:

    hugo server
