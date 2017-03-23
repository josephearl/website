---
date: "2017-03-23T20:10:13Z"
categories: []
tags: ["yubikey", "macos", "sierra"]
description: ""
title: "macOS Sierra Secure Login with YubiKey 4"
---

I recently bought a [YubiKey 4](https://www.yubico.com/product/y4/) and one of the first things I wanted to try out was securing the login to my MacBook Pro.

macOS Sierra [re-introduced native support](https://www.yubico.com/2016/09/yubikey-smart-card-support-for-macos-sierra-2/) for smart cards, making it easier to set up and use them with macOS.

Following the [setup guide for macOS Sierra](https://www.yubico.com/support/knowledge-base/categories/articles/how-to-use-your-yubikey-with-macos-sierra/) provided by Yubico took less than 5 minutes (protip: you can `brew cask install yubikey-piv-manager`).

It has some limitations -- you can't *require* the YubiKey to be present, and when present you can only set a simple 6-8 digit numeric passcode. 

What this amounts to is that you can have a very long password for when the YubiKey is not present, and a much shorter, quicker to enter passcode when it is.

It works when logging in after logging out and when unlocking the screen but not from a restart or cold boot, which is only a slight annoyance since I don't restart my computer that often.

My next step will be to try [YubiKey PAM](https://developers.yubico.com/yubico-pam/MacOS_X_Challenge-Response.html), which does allow you to require the YubiKey (althogh if you do this make sure get a second YubiKey for a backup) and will hopefully work from a restart.
