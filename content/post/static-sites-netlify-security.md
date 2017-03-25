---
description: ""
title: "Securing your Netlify static site"
date: "2017-03-25T00:12:41Z"
categories: []
tags: ["static-sites", "security", "netlify"]
---

A colleague at ThoughtWorks, Karl Stony, recently brought [Mozilla Observatory](https://observatory.mozilla.org/) to my attention through a post on the internal mailing list. It aggregates a number of tools and scans your site for a wide variety of security configuration issues.

I had previously enabled [forcing SSL](https://www.netlify.com/docs/ssl/#forcing-ssl) for my site in Netlify, and my site is static, so I was feeling pretty confident as I prepared to click the button to scan my site. 20 seconds or so later to my surprise I was greeted with the impressive grade of a ... **D**. I can't go home with that!

"What sort of security issues can a static site have?" I thought. Luckily Observatory breaks the results down for you and provides you with a suggestion for the best item to tackle next.

The first item I tackled was the lack of an [X-Frame-Options](https://wiki.mozilla.org/Security/Guidelines/Web_Security#X-Frame-Options) header which tells the browser whether your site may appear in `iframe`s. If you don't include this header, your site is vulnerable to clickjacking where a malicious site loads your site in an `iframe` and tricks the user into clicking links on your site, even though they may appear to not be on your site at all.

You can [configure custom headers for your Netlify site](https://www.netlify.com/docs/headers-and-basic-auth/#custom-headers) by adding a `_headers` file to the root of your site. To fix the X-Frame-Options issue I added the following to my `_headers`:

```
# All paths
/*
    # Block site from being framed with X-Frame-Options and CSP
    Content-Security-Policy: frame-ancestors 'none'
    X-Frame-Options: DENY
```

I deployed this and... nothing changed in the headers returned by my site. It turns out "root of your site" [means the root of the directory that Netlify will deploy](https://gitter.im/netlify/community?at=57b62aec187885ef4f5ba670), not the root of your repository (e.g. where `netlify.toml` lives). For Hugo this means it needs to end up in the `public` folder, so I moved `_headers` to the `static` directory (since Hugo will copy these straight to the `public` output directory) and re-deployed -- this time things worked as expected.

I initiated a rescan of my site in Observatory to confirm the X-Frame-Options issue was fixed and then moved onto fixing the lack of a [X-Content-Type-Options](https://wiki.mozilla.org/Security/Guidelines/Web_Security#X-Content-Type-Options) header.

The X-Content-Type-Options header tells the browser not to load scripts and stylesheets with an incorrect MIME type, which can be used to launch XSS attacks. To fix this issue all I had to add to my `_headers` file was:

```
    # Prevent browsers from incorrectly detecting non-scripts as scripts
    X-Content-Type-Options: nosniff
```

With that down, I moved onto creating a [Content Security Policy](https://wiki.mozilla.org/Security/Guidelines/Web_Security#Content_Security_Policy). This defines where things like scripts and images can be loaded from and one of its primary benefits is the ability to disable inline scripts which prevents attacks from improperly escaped user inputs. This also means all scripts and styles must be loaded from a `src` attribute.

The content security policy for every site is different -- it will depend on where your content is located and how secure you want to make your site. 

I decided I wanted to lock things down as much as possible, without too much effort. I used [Google CSP Evalutor](https://csp-evaluator.withgoogle.com) to get continuous feedback on my policy as I was designing it.

I settled on completely disabling plugins such as Flash and Silverlight and restricted the loading of images, stylesheets, scripts and fonts to only my own site. This required copying a few scripts and resources from external locations to my own site -- I had very few external resources to start with so this was feasible, but in many cases you may want to whitelist external domains instead.

One final thing -- you'll want to set a `report-uri` to be notified of any issues when browsers can't load content due to a misconfigured policy (or if you're using Content-Security-Policy-Report-Only, potential issues). 

You can run your own service  to collect these reports but I opted to use the free [report-uri.io](https://report-uri.io) service which takes a couple of minutes to sign up for and gives you a URL to use, as well some tools to analyze the reports you get.

The complete CSP that I added to my `_headers` looked like:

```
    # Don't load any resource type not explicitly enabled
    # Disable plugins like Flash or Silverlight
    # Load images, scripts, stylesheets and fonts from self
    # Send reports to report-uri.io
    Content-Security-Policy: default-src 'none'; object-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; report-uri https://<report-uri-subdomain>.report-uri.io/r/default/csp/enforce;
```

Another rescan in Observatory gave me a passing grade of **A+**; Mum and Dad will be proud!
