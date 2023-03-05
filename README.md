# Touchlace
(WIP) A Lovelace (Home Assistant) alternative written in ReactJS.

## Installation
### Expose Home Assistant
To access Touchlace via the production env (touchlace.aekstrom.me) you need to expose your Home Assistant installation to the internet **with** SSL encryption. The easiest way to accomplish this is to get [Home Assistant Cloud](https://www.nabucasa.com/) or using the [DuckDNS addon and Let's Encrypt](https://www.home-assistant.io/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/).

### http configuration
Add this to your configuration.yaml:

```
http:
  cors_allowed_origins:
    - https://touchlace.aekstrom.me
```