---
pubDate: "2017-03-30T21:07:57+01:00"
categories: []
tags: ["yubikey", "ssh", "macos"]
description: ""
title: "SSH authentication with YubiKey"
---

One great thing I've found I can do with my [YubiKey](https://www.yubico.com/product/y4/) is use it for SSH certificate based authentication. Your private key is stored on your YubiKey rather than your computer and requires your PIN to access or alter.

This means you can take your SSH logins wherever you go, to any computer that supports a YubiKey! Instead of your computer being authorized, it is your YubiKey.

The easiest way to get started on macOS is to use [YubiKey PIV Manager](https://www.yubico.com/support/knowledge-base/categories/articles/how-to-use-your-yubikey-with-macos-sierra/) (or `brew cask install yubikey-piv-manager`).

Open the YubiKey PIV Manager app and press the "Certificates" button, a new Certificates window should open at the Authentication page.

Press "Generate new key..." and choose "Create a self-signed certificate" from the Output section. Finally hit "OK" to generate your key -- you will be asked for your PIN.

Congratulations, you now have an SSH-compatible certificate on your YubiKey! If you previously used the "Pair with macOS" function, remove and re-insert your YubiKey to re-pair with your Mac (you'll be asked to authenticate).

To add your SSH public key to the `authorized_keys` of a target system you'll need to export your public key in the correct format.

To do this you'll need [opensc](https://github.com/OpenSC/OpenSC/wiki) (`brew install opensc`) installed and the path to the opensc libs handy.

If you installed with Homebrew this should be `OPENSC_LIBS=$(brew --prefix opensc)/lib`), or binary installation then `OPENSC_LIBS=/Library/OpenSC/lib/`.

Now you can export your public key in the correct format:

```bash
$ ssh-keygen -D $OPENSC_LIBS/opensc-pkcs11.so -e
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCbZsOpdVAgOrJqWqD2uDZl/WV+Qzv6tDbDdo/3AXygF3x47uUIjoQnK6Js9+5ccw6Of93vIaeTV3Gk+/097TjjdKDjJ5t6Q4JQH9x1GM6fgYp/JNXwFaIDrPSMqCygVA1xxf7RblohvcyLpnOgA1Er/bvSbb2VCIwDBa2ePOIx7m5f3xXFWCcKPpmK1buEuqT6gdIQOqnDh9Ug0eeEKHuQ7qoU6L5V88Q0K8My+dSy4ijNcPTQC27Hp97Q1n70Meu3x9nQWbvUDYXOpt2KXPPAssAHMXGti0VQcOjv0G318VfU1k96XoVxg3vbWlx5PU4SEMAvjmCrbE+g7ToQll6x
```

When you want to authenticate to a target system:

```bash
ssh -I $OPENSC_LIBS/opensc-pkcs11.so user@remote.example.com
```

You can also use it with ssh-agent (optional):

```bash
ssh-add -s $OPENSC_LIBS/opensc-pkcs11.so
```

Then verify it was added correctly:

```bash
ssh-add -L
```

Another alternative for SSH authentication with the YubiKey is to use as a second factor along with a username and password.

This is more involved -- you'll need to install the [YubiKey PAM U2F module](https://developers.yubico.com/pam-u2f/) on your SSH server and [YubiKey PAM module](https://developers.yubico.com/yubico-pam/) on your clients, but is well worth checking out if you're thinking of [using YubiKeys in your business](https://www.yubico.com/why-yubico/for-businesses/computer-login/linux/) for securing logins.
