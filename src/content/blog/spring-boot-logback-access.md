---
title: Customizing the logback-access format
pubDate: "2021-09-12T14:37:21Z"
description: "Learn how to enable HTTP access logs using logback and configure the output format."
tags: ["observability", "spring-boot", "logback", "logback-access", "tomcat"]
categories: []
---

If you're already using [Logback](http://logback.qos.ch) and [Logback Logstash Encoder](https://github.com/logstash/logstash-logback-encoder) with Spring Boot to log to something like ELK or Splunk and want to add HTTP access logs to your application then [logback-access](http://logback.qos.ch/access.html) is simple to integrate and the output format and destination can be easily configured through XML just like for standard Logback.

To begin add the logback-access dependency to your project:

```groovy
implementation 'ch.qos.logback:logback-access'
```

Then configure the embedded server (Tomcat in this case) to integrate with logback-access:

```java
@Configuration
public class LogbackAccessConfiguration implements WebServerFactoryCustomizer<ConfigurableTomcatWebServerFactory> {
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

By default the access events do not have a log level, to add one change the `encoder` configuration and adding a JSON object in `customFields` that will be merged with JSON output from the encoder:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashAccessEncoder">
            <customFields>{"level": "DEBUG"}</customFields>
        </encoder>
    </appender>

    <appender-ref ref="STDOUT" />
</configuration>
```

You can also [rename fields](https://github.com/logstash/logstash-logback-encoder#customizing-standard-field-names) in the JSON output and [add request and response headers](https://github.com/logstash/logstash-logback-encoder#header-fields) to the output.

If you want complete control over the output you can use `AccessEventCompositeJsonEncoder` instead of `LogstashAccessEncoder` to specify exactly which fields are included in the JSON and the [format of the message](http://logback.qos.ch/manual/layouts.html#logback-access).

In the following example we include the `timestamp` field from the [common fields](https://github.com/logstash/logstash-logback-encoder/blob/src/main/java/net/logstash/logback/fieldnames/LogstashCommonFieldNames.java#L26), the `requestedUrl`, `statusCode` and `elapsedTime` fields from the [access fields](https://github.com/logstash/logstash-logback-encoder/blob/main/src/main/java/net/logstash/logback/fieldnames/LogstashAccessFieldNames.java#L29), and in addition a constant `level` field, a `user_agent` field with value taken from a request header and a simple custom message format:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.AccessEventCompositeJsonEncoder">
            <providers>
                <timestamp/>
                <requestedUrl/>
                <statusCode/>
                <elapsedTime/>
                <pattern>
                    <pattern>
                        {
                            "level": "DEBUG",
                            "user_agent": "%i{User-Agent}",
                            "message": "%requestURL returned %statusCode in %elapsedTime ms"
                        }
                    </pattern>
                </pattern>
            </providers>
        </encoder>
    </appender>

    <appender-ref ref="STDOUT" />
</configuration>
```

If you want to ignore certain URLs and not have accesses to them logged, you can do this by adding a `filter` to your `appender` configuration, for example to not log accesses to the `/actuator` path (and sub paths):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <filter class="ch.qos.logback.core.filter.EvaluatorFilter">
            <evaluator class="ch.qos.logback.access.net.URLEvaluator">
                <URL>/actuator</URL>
            </evaluator>
            <OnMismatch>NEUTRAL</OnMismatch>
            <OnMatch>DENY</OnMatch>
        </filter>
        <encoder class="net.logstash.logback.encoder.LogstashAccessEncoder" />
    </appender>

    <appender-ref ref="STDOUT" />
</configuration>
```
