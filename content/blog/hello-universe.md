---
title: "Hello Universe"
date: 2023-08-18T13:23:34+02:00
description: "How this website is hosted. Short post about Raspberry Pi, NixOS and webhooks"
tags: ["raspberrypi", "nix", "nixos", "webhook"]
draft: true
---
## Raspberry Pi

It's my first post on this blog. I don't have much to write about so I will just describe how it's hosted. I'm using old Raspberry Pi 3B that I originally got for different purpose. It's low cost (if we ignore current supply problems and scalpers) and more than enough for my almost-never-visited website.

![Raspberry Pi 3B hosting this website](/avatar.avif "Raspberry Pi 3B hosting this website")

## NixOS

I'm using NixOS because it uses declarative configuration (definition), is generally easy to maintain (after initial learning curve), has the biggest repository[^1] and isn't owned by any company. All nginx config is just 14 lines of code. On system rebuild it automatically downloads all needed packages, generates nginx.conf file and manages systemd services.

```nix
services.nginx = {
    enable = true;
    virtualHosts = {
        "raroh73.com" = {
            forceSSL = true;
            useACMEHost = "raroh73.com"; # alternatively use "enableACME = true";
            serverAliases = [ "www.raroh73.com" ];
            root = "/srv/web/raroh73.com/public";
            extraConfig = ''
                error_page 404 /404.html;
            '';
        }
    }
};
```

## Webhooks

I'm using webhooks because it allows full automation without using Github Actions or other CI/CD services. When I push new commit to repository, Github automatically sends callback to my host and webhook server triggers Hugo build.

![Recent webhook pushes](/images/webhook-pushes.avif "Recent webhook pushes")

[^1]: <https://repology.org/repositories/statistics/total>
