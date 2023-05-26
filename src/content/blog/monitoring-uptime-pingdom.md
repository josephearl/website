---
title: "Monitoring your site’s uptime with Pingdom"
pubDate: "2017-03-27T16:59:27Z"
description: ""
tags: ["observability", "pingdom"]
---

A couple of days ago my website went for a short period (10-20 mins) due to an issue with my DNS provider which I was only aware of because I happened to be actively working on my site at the time.

[Pingdom](https://www.pingdom.com) offer a quite well-hidden [free plan](https://www.pingdom.com/free) that lets you monitor one URL, or two if you're willing to tweet their advertisment. Pingdom checks the URL every minute to make sure it's up and also provides information on the response time, if there's an issue it will alert you via email.

The paid plan includes more advanced checks of your site like PageSpeed or synthetic transaction monitoring, SMS alerts and the ability to integrate with other services such as [PagerDuty](http://pagerduty.com) or [StatusPage](http://statuspage.io/), but for a personal blog like mine the free plan is easily sufficient.
