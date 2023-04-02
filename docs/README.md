# Touchlace
(WIP) A Lovelace (Home Assistant) alternative written in ReactJS. Mainly designed to run on tablets

![Touchlace preview on an wall mounted iPad](https://github.com/didair/touchlace/blob/main/docs/preview.jpeg)

## Features
* A beautiful interface!
* Configurable rooms
* 90+ icons for your devices
* Real time device updates using web sockets
* Basic configuration of all cards

### ... Also worth mentioning
* ✓ All data lives on your device
* ✓ Communicates directly with your Home Assistant server

### Supported entities
- [x] Light
- [x] Switch
- [x] Cover (Blinds etc)
- [ ] Scene
- [ ] Sensor
- [ ] Binary sensor
- [ ] Person

### Note
Since all data (including preferences and authentication) lives locally on your devices it will not sync between app/browsers. Please be careful to not clear the cache once all settings are made.

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