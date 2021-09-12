---
categories: []
tags: ["spring-boot", "logback", "logback-access"]
description: ""
title: "Customizing the logback-access format"
date: "2021-09-12T14:37:21Z"
draft: true
---

If you're already using [Logback](http://logback.qos.ch) and [Logback Logstash Encoder](https://github.com/logstash/logstash-logback-encoder) with Spring Boot to log to something like ELK or Splunk and want to add HTTP access logs to your application then [logback-access](http://logback.qos.ch/access.html) is simple to integrate and the output format and destination can be easily configured through XML just like for standard Logback.

To begin add the logback-access dependency to your project:

```groovy
implementation 'ch.qos.logback:logback-access'
```

Then configure the embedded server (Tomcat in this case) to integrate with logback-access:

```java
@Configuration
class LogbackAccessConfiguration implements TomcatWebServerFactoryCustomizer {
    @Override
    public void customize(ConfigurableTomcatWebServerFactory factory) {
        LogbackValve logbackValve = new LogbackValve();
        logbackValve.setFilename("logback-access.xml");
        factory.addEngineValves(logbackValve);
    }
}
```

And finally create a `logback-access.xml` in `src/main/resources`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashAccessEncoder" />
    </appender>

    <appender-ref ref="STDOUT" />
</configuration>
```

By default the access events do not have a log level, to add one change the `appender` configuration and adding a JSON object in `customFields` that will be merged with JSON output from the encoder:

```xml
<encoder class="net.logstash.logback.encoder.LogstashAccessEncoder">
    <customFields>{"level": "DEBUG"}</customFields>
</encoder>
```

You can also [rename fields](https://github.com/logstash/logstash-logback-encoder#customizing-standard-field-names) in the JSON output and [add request and response headers](https://github.com/logstash/logstash-logback-encoder#header-fields) to the output.

If you want complete control over the output you can use `AccessEventCompositeJsonEncoder` instead of `LogstashAccessEncoder` to specify exactly which fields are included in the JSON and the [format of the message](http://logback.qos.ch/manual/layouts.html#logback-access):

```xml
<encoder class="net.logstash.logback.encoder.AccessEventCompositeJsonEncoder">
    <providers>
        <timestamp/>
        <statusCode/>
        <method/>
        <protocol/>
        <requestedUri/>
        <requestedUrl/>
        <remoteHost/>
        <contentLength/>
        <elapsedTime/>
        <pattern>
            <pattern>
                {
                "message": "%h %l %user [%t{yyyy-MM-dd'T'HH:mm:ss.SSSZZ}] \"%m %U %H\" %s %replace(%b){'-','-1'}"
                }
            </pattern>
        </pattern>
    </providers>
</encoder>
```
